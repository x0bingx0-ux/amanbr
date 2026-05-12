import { jsx, jsxs } from "react/jsx-runtime";
import { createRootRoute, Outlet, Link, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/assets/styles-BFSxW7Nl.css";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-dvh items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-neon text-glow", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold", children: "الصفحة غير موجودة" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-xl bg-gradient-neon px-5 py-3 text-sm font-bold text-midnight hover:opacity-90",
        children: "العودة للرئيسية"
      }
    ) })
  ] }) });
}
const Route$y = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "أمان — محفظة مالية ومنصة استثمار" },
      { name: "description", content: "أمان: محفظة مالية رقمية احترافية، تحويلات فورية، ومنصة استثمار بعوائد يومية وشهرية." },
      { name: "theme-color", content: "#0b1220" },
      { property: "og:title", content: "أمان — محفظة مالية ومنصة استثمار" },
      { property: "og:description", content: "أمان: محفظة مالية رقمية احترافية، تحويلات فورية، ومنصة استثمار بعوائد يومية وشهرية." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "أمان — محفظة مالية ومنصة استثمار" },
      { name: "twitter:description", content: "أمان: محفظة مالية رقمية احترافية، تحويلات فورية، ومنصة استثمار بعوائد يومية وشهرية." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/u8My3hOwalflDPtB8rpf87BXxdp1/social-images/social-1777343274704-1000767142.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/u8My3hOwalflDPtB8rpf87BXxdp1/social-images/social-1777343274704-1000767142.webp" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: () => /* @__PURE__ */ jsx(Outlet, {}),
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "ar", dir: "rtl", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Toaster, { position: "top-center", richColors: true }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$x = () => import("./withdraw-D8lrR2-Q.js");
const Route$x = createFileRoute("/withdraw")({
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./wallet-DetWcr6q.js");
const Route$w = createFileRoute("/wallet")({
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./two-factor-BtretLTO.js");
const Route$v = createFileRoute("/two-factor")({
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./transfers-89dtBMBt.js");
const Route$u = createFileRoute("/transfers")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./transactions-DZP8w3PB.js");
const Route$t = createFileRoute("/transactions")({
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./settings-lmdIgeDG.js");
const Route$s = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./scan-CvIS4mRB.js");
const Route$r = createFileRoute("/scan")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./register-DP8C4Z-u.js");
const Route$q = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./profits-IR8RkLKx.js");
const Route$p = createFileRoute("/profits")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./profile-b8tMZTJE.js");
const Route$o = createFileRoute("/profile")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./notifications-BeWKyGvL.js");
const Route$n = createFileRoute("/notifications")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./my-id-DAhVc1h5.js");
const Route$m = createFileRoute("/my-id")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./login-D2QFeERr.js");
const Route$l = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./kyc-BEnPNCoy.js");
const Route$k = createFileRoute("/kyc")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./investment-BtH02--Q.js");
const Route$j = createFileRoute("/investment")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./exchange-Cl9-EFGe.js");
const Route$i = createFileRoute("/exchange")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./deposit-0zYtxjyQ.js");
const Route$h = createFileRoute("/deposit")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./change-password-ccPGM8TS.js");
const Route$g = createFileRoute("/change-password")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./index-TowuVMDF.js");
const Route$f = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admin.index-CwDCliGh.js");
const Route$e = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./invest._planId-DVVgN6QJ.js");
const Route$d = createFileRoute("/invest/$planId")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin.users-BClKublG.js");
const Route$c = createFileRoute("/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin.transactions-DVcYAJnz.js");
const Route$b = createFileRoute("/admin/transactions")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.settings-CPHgvMDU.js");
const Route$a = createFileRoute("/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.notifications-C_hTFTrN.js");
const Route$9 = createFileRoute("/admin/notifications")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.login-DLw7RnjI.js");
const Route$8 = createFileRoute("/admin/login")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.kyc-kZAP5F9p.js");
const Route$7 = createFileRoute("/admin/kyc")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.investments-DIzxnj30.js");
const Route$6 = createFileRoute("/admin/investments")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.exchange-B90HCRnH.js");
const Route$5 = createFileRoute("/admin/exchange")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.deposits-oaDPNJ0z.js");
const Route$4 = createFileRoute("/admin/deposits")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.deposit-info-BiU6F7tc.js");
const Route$3 = createFileRoute("/admin/deposit-info")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.balances-CS3-IolY.js");
const Route$2 = createFileRoute("/admin/balances")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.agents-m4S7-kDm.js");
const Route$1 = createFileRoute("/admin/agents")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.admins-BRklxk_T.js");
const Route = createFileRoute("/admin/admins")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WithdrawRoute = Route$x.update({
  id: "/withdraw",
  path: "/withdraw",
  getParentRoute: () => Route$y
});
const WalletRoute = Route$w.update({
  id: "/wallet",
  path: "/wallet",
  getParentRoute: () => Route$y
});
const TwoFactorRoute = Route$v.update({
  id: "/two-factor",
  path: "/two-factor",
  getParentRoute: () => Route$y
});
const TransfersRoute = Route$u.update({
  id: "/transfers",
  path: "/transfers",
  getParentRoute: () => Route$y
});
const TransactionsRoute = Route$t.update({
  id: "/transactions",
  path: "/transactions",
  getParentRoute: () => Route$y
});
const SettingsRoute = Route$s.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$y
});
const ScanRoute = Route$r.update({
  id: "/scan",
  path: "/scan",
  getParentRoute: () => Route$y
});
const RegisterRoute = Route$q.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$y
});
const ProfitsRoute = Route$p.update({
  id: "/profits",
  path: "/profits",
  getParentRoute: () => Route$y
});
const ProfileRoute = Route$o.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$y
});
const NotificationsRoute = Route$n.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => Route$y
});
const MyIdRoute = Route$m.update({
  id: "/my-id",
  path: "/my-id",
  getParentRoute: () => Route$y
});
const LoginRoute = Route$l.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$y
});
const KycRoute = Route$k.update({
  id: "/kyc",
  path: "/kyc",
  getParentRoute: () => Route$y
});
const InvestmentRoute = Route$j.update({
  id: "/investment",
  path: "/investment",
  getParentRoute: () => Route$y
});
const ExchangeRoute = Route$i.update({
  id: "/exchange",
  path: "/exchange",
  getParentRoute: () => Route$y
});
const DepositRoute = Route$h.update({
  id: "/deposit",
  path: "/deposit",
  getParentRoute: () => Route$y
});
const ChangePasswordRoute = Route$g.update({
  id: "/change-password",
  path: "/change-password",
  getParentRoute: () => Route$y
});
const IndexRoute = Route$f.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$y
});
const AdminIndexRoute = Route$e.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => Route$y
});
const InvestPlanIdRoute = Route$d.update({
  id: "/invest/$planId",
  path: "/invest/$planId",
  getParentRoute: () => Route$y
});
const AdminUsersRoute = Route$c.update({
  id: "/admin/users",
  path: "/admin/users",
  getParentRoute: () => Route$y
});
const AdminTransactionsRoute = Route$b.update({
  id: "/admin/transactions",
  path: "/admin/transactions",
  getParentRoute: () => Route$y
});
const AdminSettingsRoute = Route$a.update({
  id: "/admin/settings",
  path: "/admin/settings",
  getParentRoute: () => Route$y
});
const AdminNotificationsRoute = Route$9.update({
  id: "/admin/notifications",
  path: "/admin/notifications",
  getParentRoute: () => Route$y
});
const AdminLoginRoute = Route$8.update({
  id: "/admin/login",
  path: "/admin/login",
  getParentRoute: () => Route$y
});
const AdminKycRoute = Route$7.update({
  id: "/admin/kyc",
  path: "/admin/kyc",
  getParentRoute: () => Route$y
});
const AdminInvestmentsRoute = Route$6.update({
  id: "/admin/investments",
  path: "/admin/investments",
  getParentRoute: () => Route$y
});
const AdminExchangeRoute = Route$5.update({
  id: "/admin/exchange",
  path: "/admin/exchange",
  getParentRoute: () => Route$y
});
const AdminDepositsRoute = Route$4.update({
  id: "/admin/deposits",
  path: "/admin/deposits",
  getParentRoute: () => Route$y
});
const AdminDepositInfoRoute = Route$3.update({
  id: "/admin/deposit-info",
  path: "/admin/deposit-info",
  getParentRoute: () => Route$y
});
const AdminBalancesRoute = Route$2.update({
  id: "/admin/balances",
  path: "/admin/balances",
  getParentRoute: () => Route$y
});
const AdminAgentsRoute = Route$1.update({
  id: "/admin/agents",
  path: "/admin/agents",
  getParentRoute: () => Route$y
});
const AdminAdminsRoute = Route.update({
  id: "/admin/admins",
  path: "/admin/admins",
  getParentRoute: () => Route$y
});
const rootRouteChildren = {
  IndexRoute,
  ChangePasswordRoute,
  DepositRoute,
  ExchangeRoute,
  InvestmentRoute,
  KycRoute,
  LoginRoute,
  MyIdRoute,
  NotificationsRoute,
  ProfileRoute,
  ProfitsRoute,
  RegisterRoute,
  ScanRoute,
  SettingsRoute,
  TransactionsRoute,
  TransfersRoute,
  TwoFactorRoute,
  WalletRoute,
  WithdrawRoute,
  AdminAdminsRoute,
  AdminAgentsRoute,
  AdminBalancesRoute,
  AdminDepositInfoRoute,
  AdminDepositsRoute,
  AdminExchangeRoute,
  AdminInvestmentsRoute,
  AdminKycRoute,
  AdminLoginRoute,
  AdminNotificationsRoute,
  AdminSettingsRoute,
  AdminTransactionsRoute,
  AdminUsersRoute,
  InvestPlanIdRoute,
  AdminIndexRoute
};
const routeTree = Route$y._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router;
};
export {
  getRouter
};
