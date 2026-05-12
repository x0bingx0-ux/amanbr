import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { k as kycRequests } from "./admin-data-CzdN76wr.js";
import { Eye, X, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
function KycAdminPage() {
  const [list, setList] = useState(kycRequests);
  const act = (id, status) => {
    setList(list.map((k) => k.id === id ? {
      ...k,
      status
    } : k));
    toast.success(status === "approved" ? "تم قبول الطلب" : "تم رفض الطلب");
  };
  return /* @__PURE__ */ jsx(AdminShell, { title: "طلبات التحقق (KYC)", subtitle: "مراجعة والموافقة على هويات المستخدمين", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: list.map((k) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-card border border-border", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between items-start gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "size-14 rounded-xl bg-gradient-neon p-0.5", children: /* @__PURE__ */ jsx("div", { className: "size-full rounded-xl bg-card flex items-center justify-center font-bold text-neon", children: k.userName.charAt(0) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold", children: k.userName }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "رقم الهوية: ",
            k.idNumber
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "أُرسل ",
            k.submittedAt
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("button", { className: "px-3 py-2 rounded-lg bg-muted border border-border text-xs font-semibold hover:border-neon/30 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Eye, { className: "size-3.5" }),
          " عرض المستندات"
        ] }),
        k.status === "pending" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => act(k.id, "rejected"), className: "px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-bold flex items-center gap-1 hover:bg-destructive/20", children: [
            /* @__PURE__ */ jsx(X, { className: "size-3.5" }),
            " رفض"
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => act(k.id, "approved"), className: "px-3 py-2 rounded-lg bg-gradient-neon text-midnight text-xs font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Check, { className: "size-3.5" }),
            " موافقة"
          ] })
        ] }) : /* @__PURE__ */ jsx("span", { className: `text-xs px-3 py-2 rounded-lg font-bold ${k.status === "approved" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`, children: k.status === "approved" ? "تمت الموافقة" : "مرفوض" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 mt-4", children: ["الهوية (أمام)", "الهوية (خلف)", "سيلفي"].map((t) => /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-lg bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground", children: t }, t)) })
  ] }, k.id)) }) });
}
export {
  KycAdminPage as component
};
