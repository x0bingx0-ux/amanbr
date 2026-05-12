ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS transaction_pin_hash text;

CREATE OR REPLACE FUNCTION public.set_transaction_pin(_pin text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF _pin IS NULL OR length(_pin) < 4 THEN RAISE EXCEPTION 'PIN must be at least 4 digits'; END IF;
  UPDATE public.profiles SET transaction_pin_hash = extensions.crypt(_pin, extensions.gen_salt('bf')) WHERE id = auth.uid();
END $$;

CREATE OR REPLACE FUNCTION public.verify_transaction_pin(_pin text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE _h text;
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  SELECT transaction_pin_hash INTO _h FROM public.profiles WHERE id = auth.uid();
  IF _h IS NULL THEN RETURN true; END IF; -- no pin set yet -> allow (user can set later)
  RETURN _h = extensions.crypt(_pin, _h);
END $$;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;