import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { CheckCircle2, Upload, Camera } from "lucide-react";
import { u as user } from "./mock-data-DmIvE9ki.js";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
import "react";
import "./admin-store-eij9P5VY.js";
function KycPage() {
  const statusMap = {
    pending: {
      label: "قيد المراجعة",
      color: "bg-warning/10 text-warning"
    },
    approved: {
      label: "تم التحقق",
      color: "bg-success/10 text-success"
    },
    rejected: {
      label: "مرفوض",
      color: "bg-destructive/10 text-destructive"
    }
  };
  const s = statusMap[user.kycStatus];
  const steps = [{
    icon: Upload,
    title: "الهوية الوطنية (الوجه)",
    done: true
  }, {
    icon: Upload,
    title: "الهوية الوطنية (الخلف)",
    done: true
  }, {
    icon: Camera,
    title: "صورة سيلفي مع الهوية",
    done: true
  }, {
    icon: CheckCircle2,
    title: "إدخال رقم الهوية",
    done: true
  }];
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "التحقق من الهوية (KYC)", subtitle: "مطلوب للاستفادة من كافة خدمات أمان" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-gradient-card border border-border mb-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "حالة التحقق" }),
          /* @__PURE__ */ jsx("span", { className: `inline-block px-3 py-1 rounded-full text-xs font-bold ${s.color}`, children: s.label })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "size-14 rounded-full bg-success/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "size-7 text-success" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: steps.map((st, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-card border border-border flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: `size-11 rounded-xl flex items-center justify-center ${st.done ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsx(st.icon, { className: "size-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: st.title }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: st.done ? "مكتمل" : "مطلوب" })
        ] }),
        st.done && /* @__PURE__ */ jsx(CheckCircle2, { className: "size-5 text-success" })
      ] }, i)) })
    ] })
  ] });
}
export {
  KycPage as component
};
