
-- =====================================================
-- 1. ENUMS
-- =====================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.kyc_status AS ENUM ('none', 'pending', 'approved', 'rejected');
CREATE TYPE public.user_status AS ENUM ('active', 'suspended');
CREATE TYPE public.currency AS ENUM ('SYP', 'USD');
CREATE TYPE public.tx_type AS ENUM ('deposit','withdraw','transfer_in','transfer_out','investment','profit','exchange','admin_credit','admin_debit','fee');
CREATE TYPE public.tx_status AS ENUM ('pending','completed','failed','cancelled');
CREATE TYPE public.request_status AS ENUM ('pending','approved','rejected');
CREATE TYPE public.risk_level AS ENUM ('low','medium','high');

-- =====================================================
-- 2. PROFILES
-- =====================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  public_id TEXT UNIQUE NOT NULL DEFAULT ('AMN-' || upper(substring(replace(gen_random_uuid()::text,'-','') from 1 for 6))),
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  kyc_status public.kyc_status NOT NULL DEFAULT 'none',
  status public.user_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. USER ROLES (separate table — prevents privilege escalation)
-- =====================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function used in RLS policies (avoids recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT public.has_role(_user_id, 'admin') $$;

-- =====================================================
-- 4. WALLETS (one row per user/currency)
-- =====================================================
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  currency public.currency NOT NULL,
  balance NUMERIC(20,4) NOT NULL DEFAULT 0,
  locked NUMERIC(20,4) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, currency),
  CHECK (balance >= 0),
  CHECK (locked >= 0)
);
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_wallets_user ON public.wallets(user_id);

-- =====================================================
-- 5. TRANSACTIONS + DOUBLE-ENTRY LEDGER
-- =====================================================
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  counterparty_id UUID REFERENCES auth.users(id),
  type public.tx_type NOT NULL,
  amount NUMERIC(20,4) NOT NULL CHECK (amount > 0),
  currency public.currency NOT NULL,
  fee NUMERIC(20,4) NOT NULL DEFAULT 0,
  status public.tx_status NOT NULL DEFAULT 'pending',
  reference TEXT UNIQUE,                  -- public ref no (RCPT-...)
  idempotency_key TEXT UNIQUE,            -- prevents double submission
  note TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_tx_user_date ON public.transactions(user_id, created_at DESC);
CREATE INDEX idx_tx_status ON public.transactions(status);

CREATE TABLE public.ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  account TEXT NOT NULL,                  -- e.g. 'user:<uuid>:SYP', 'system:fees:SYP'
  debit NUMERIC(20,4) NOT NULL DEFAULT 0,
  credit NUMERIC(20,4) NOT NULL DEFAULT 0,
  currency public.currency NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK ((debit > 0 AND credit = 0) OR (credit > 0 AND debit = 0))
);
ALTER TABLE public.ledger_entries ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_ledger_tx ON public.ledger_entries(transaction_id);
CREATE INDEX idx_ledger_account ON public.ledger_entries(account);

-- =====================================================
-- 6. KYC
-- =====================================================
CREATE TABLE public.kyc_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  doc_type TEXT NOT NULL,
  doc_number TEXT,
  doc_front_url TEXT,
  doc_back_url TEXT,
  selfie_url TEXT,
  status public.request_status NOT NULL DEFAULT 'pending',
  reviewer_id UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);
ALTER TABLE public.kyc_requests ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 7. INVESTMENT PLANS + USER INVESTMENTS
-- =====================================================
CREATE TABLE public.investment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  profit_rate NUMERIC(8,4) NOT NULL,
  profit_type TEXT NOT NULL CHECK (profit_type IN ('daily','monthly')),
  duration INT NOT NULL,
  duration_unit TEXT NOT NULL,
  min_amount NUMERIC(20,4) NOT NULL,
  max_amount NUMERIC(20,4) NOT NULL,
  risk public.risk_level NOT NULL DEFAULT 'low',
  badge TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.investment_plans ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.investment_plans(id),
  amount NUMERIC(20,4) NOT NULL CHECK (amount > 0),
  currency public.currency NOT NULL DEFAULT 'USD',
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ,
  total_profit NUMERIC(20,4) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 8. AGENTS (withdrawal/deposit agents)
-- =====================================================
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  city TEXT,
  address TEXT,
  phone TEXT,
  rating NUMERIC(3,2) DEFAULT 5,
  image_url TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 9. DEPOSIT / WITHDRAW REQUESTS
-- =====================================================
CREATE TABLE public.deposit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC(20,4) NOT NULL CHECK (amount > 0),
  currency public.currency NOT NULL,
  method TEXT NOT NULL,
  receipt_url TEXT,
  agent_id UUID REFERENCES public.agents(id),
  status public.request_status NOT NULL DEFAULT 'pending',
  reviewer_id UUID REFERENCES auth.users(id),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);
ALTER TABLE public.deposit_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.withdraw_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC(20,4) NOT NULL CHECK (amount > 0),
  currency public.currency NOT NULL,
  method TEXT NOT NULL,
  agent_id UUID REFERENCES public.agents(id),
  destination JSONB NOT NULL DEFAULT '{}'::jsonb,
  status public.request_status NOT NULL DEFAULT 'pending',
  reviewer_id UUID REFERENCES auth.users(id),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);
ALTER TABLE public.withdraw_requests ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 10. NOTIFICATIONS
-- =====================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,  -- NULL = broadcast
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_notif_user ON public.notifications(user_id, created_at DESC);

-- =====================================================
-- 11. APP CONFIG (singleton-like)
-- =====================================================
CREATE TABLE public.app_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 12. ADMIN AUDIT LOG
-- =====================================================
CREATE TABLE public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 13. RLS POLICIES
-- =====================================================

-- profiles
CREATE POLICY "profiles_self_read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- user_roles
CREATE POLICY "roles_self_read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "roles_admin_write" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- wallets — read own, admin all; NO direct inserts/updates from clients
CREATE POLICY "wallets_self_read" ON public.wallets FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "wallets_admin_write" ON public.wallets FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- transactions
CREATE POLICY "tx_self_read" ON public.transactions FOR SELECT TO authenticated USING (user_id = auth.uid() OR counterparty_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "tx_admin_write" ON public.transactions FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- ledger
CREATE POLICY "ledger_admin_only" ON public.ledger_entries FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- kyc
CREATE POLICY "kyc_self_read" ON public.kyc_requests FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "kyc_self_insert" ON public.kyc_requests FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "kyc_admin_update" ON public.kyc_requests FOR UPDATE TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- plans (public read, admin write)
CREATE POLICY "plans_public_read" ON public.investment_plans FOR SELECT TO authenticated USING (true);
CREATE POLICY "plans_admin_write" ON public.investment_plans FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- investments
CREATE POLICY "inv_self_read" ON public.investments FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "inv_admin_write" ON public.investments FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- agents (public read, admin write)
CREATE POLICY "agents_public_read" ON public.agents FOR SELECT TO authenticated USING (enabled OR public.is_admin(auth.uid()));
CREATE POLICY "agents_admin_write" ON public.agents FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- deposit/withdraw requests
CREATE POLICY "dep_self_read" ON public.deposit_requests FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "dep_self_insert" ON public.deposit_requests FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "dep_admin_update" ON public.deposit_requests FOR UPDATE TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "wd_self_read" ON public.withdraw_requests FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "wd_self_insert" ON public.withdraw_requests FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "wd_admin_update" ON public.withdraw_requests FOR UPDATE TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- notifications
CREATE POLICY "notif_self_read" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid() OR user_id IS NULL OR public.is_admin(auth.uid()));
CREATE POLICY "notif_self_update" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "notif_admin_write" ON public.notifications FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- app_config (public read, admin write)
CREATE POLICY "config_public_read" ON public.app_config FOR SELECT TO authenticated USING (true);
CREATE POLICY "config_admin_write" ON public.app_config FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- audit log (admin only)
CREATE POLICY "audit_admin_read" ON public.admin_audit_log FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

-- =====================================================
-- 14. TRIGGERS: auto-create profile + wallets + role on signup
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)), NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  INSERT INTO public.wallets (user_id, currency, balance) VALUES (NEW.id, 'SYP', 0), (NEW.id, 'USD', 0)
    ON CONFLICT (user_id, currency) DO NOTHING;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER wallets_touch BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =====================================================
-- 15. ATOMIC TRANSFER FUNCTION (with idempotency + double-entry)
-- =====================================================
CREATE OR REPLACE FUNCTION public.process_transfer(
  _to_public_id TEXT,
  _amount NUMERIC,
  _currency public.currency,
  _idempotency_key TEXT,
  _note TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _from UUID := auth.uid();
  _to UUID;
  _tx_id UUID;
  _ref TEXT;
  _existing UUID;
BEGIN
  IF _from IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF _amount <= 0 THEN RAISE EXCEPTION 'Amount must be positive'; END IF;

  -- idempotency check
  SELECT id INTO _existing FROM public.transactions WHERE idempotency_key = _idempotency_key;
  IF _existing IS NOT NULL THEN RETURN _existing; END IF;

  SELECT id INTO _to FROM public.profiles WHERE public_id = _to_public_id;
  IF _to IS NULL THEN RAISE EXCEPTION 'Recipient not found'; END IF;
  IF _to = _from THEN RAISE EXCEPTION 'Cannot transfer to self'; END IF;

  -- lock sender wallet
  PERFORM 1 FROM public.wallets WHERE user_id = _from AND currency = _currency FOR UPDATE;
  IF (SELECT balance FROM public.wallets WHERE user_id = _from AND currency = _currency) < _amount THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;

  _ref := 'RCPT-' || upper(substring(replace(gen_random_uuid()::text,'-','') from 1 for 10));

  INSERT INTO public.transactions (user_id, counterparty_id, type, amount, currency, status, reference, idempotency_key, note, completed_at)
  VALUES (_from, _to, 'transfer_out', _amount, _currency, 'completed', _ref, _idempotency_key, _note, now())
  RETURNING id INTO _tx_id;

  -- update balances
  UPDATE public.wallets SET balance = balance - _amount WHERE user_id = _from AND currency = _currency;
  INSERT INTO public.wallets (user_id, currency, balance) VALUES (_to, _currency, _amount)
    ON CONFLICT (user_id, currency) DO UPDATE SET balance = public.wallets.balance + _amount;

  -- mirror transaction for receiver
  INSERT INTO public.transactions (user_id, counterparty_id, type, amount, currency, status, reference, note, completed_at)
  VALUES (_to, _from, 'transfer_in', _amount, _currency, 'completed', _ref, _note, now());

  -- double-entry ledger
  INSERT INTO public.ledger_entries (transaction_id, account, debit, credit, currency) VALUES
    (_tx_id, 'user:' || _from || ':' || _currency, _amount, 0, _currency),
    (_tx_id, 'user:' || _to   || ':' || _currency, 0, _amount, _currency);

  RETURN _tx_id;
END $$;

-- Admin credit/debit
CREATE OR REPLACE FUNCTION public.admin_adjust_balance(
  _user_id UUID, _currency public.currency, _delta NUMERIC, _note TEXT
)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _tx_id UUID; _ref TEXT;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN RAISE EXCEPTION 'Forbidden'; END IF;
  _ref := 'ADM-' || upper(substring(replace(gen_random_uuid()::text,'-','') from 1 for 10));
  INSERT INTO public.transactions (user_id, type, amount, currency, status, reference, note, completed_at)
  VALUES (_user_id, CASE WHEN _delta >= 0 THEN 'admin_credit' ELSE 'admin_debit' END, abs(_delta), _currency, 'completed', _ref, _note, now())
  RETURNING id INTO _tx_id;

  INSERT INTO public.wallets (user_id, currency, balance) VALUES (_user_id, _currency, GREATEST(_delta,0))
    ON CONFLICT (user_id, currency) DO UPDATE SET balance = GREATEST(public.wallets.balance + _delta, 0);

  INSERT INTO public.ledger_entries (transaction_id, account, debit, credit, currency) VALUES
    (_tx_id, 'system:treasury:' || _currency, CASE WHEN _delta>0 THEN _delta ELSE 0 END, CASE WHEN _delta<0 THEN abs(_delta) ELSE 0 END, _currency),
    (_tx_id, 'user:' || _user_id || ':' || _currency, CASE WHEN _delta<0 THEN abs(_delta) ELSE 0 END, CASE WHEN _delta>0 THEN _delta ELSE 0 END, _currency);

  INSERT INTO public.admin_audit_log (admin_id, action, target_type, target_id, details)
  VALUES (auth.uid(), 'adjust_balance', 'user', _user_id::text, jsonb_build_object('delta', _delta, 'currency', _currency, 'note', _note));

  RETURN _tx_id;
END $$;
