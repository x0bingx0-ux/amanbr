import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { u as user } from "./mock-data-DmIvE9ki.js";
import { ArrowRight, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./Logo-BxX_3iG7.js";
import "./admin-store-eij9P5VY.js";
function ProfilePage() {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: "1990-05-15",
    address: "دمشق - المزة",
    city: "دمشق"
  });
  const update = (k) => (e) => setForm({
    ...form,
    [k]: e.target.value
  });
  const save = (e) => {
    e.preventDefault();
    toast.success("تم حفظ المعلومات الشخصية بنجاح");
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "المعلومات الشخصية", subtitle: "حدّث بياناتك الشخصية" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/settings", className: "text-xs text-muted-foreground hover:text-neon flex items-center gap-1 mb-4", children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "size-3" }),
        " العودة للإعدادات"
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: save, className: "bg-card rounded-2xl border border-border p-6 space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "size-16 rounded-full bg-gradient-neon p-0.5", children: /* @__PURE__ */ jsx("div", { className: "size-full rounded-full bg-card flex items-center justify-center text-neon font-bold", children: user.initials }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold", children: form.name }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "عضو منذ ٢٠٢٣" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "الاسم الكامل", value: form.name, onChange: update("name") }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "البريد الإلكتروني", value: form.email, onChange: update("email"), type: "email" }),
          /* @__PURE__ */ jsx(Field, { label: "رقم الهاتف", value: form.phone, onChange: update("phone") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "تاريخ الميلاد", value: form.dob, onChange: update("dob"), type: "date" }),
          /* @__PURE__ */ jsx(Field, { label: "المدينة", value: form.city, onChange: update("city") })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: "العنوان", value: form.address, onChange: update("address") }),
        /* @__PURE__ */ jsxs("button", { type: "submit", className: "w-full py-3.5 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2 hover:opacity-90", children: [
          /* @__PURE__ */ jsx(Save, { className: "size-4" }),
          " حفظ التعديلات"
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text"
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs text-muted-foreground mb-2 font-medium", children: label }),
    /* @__PURE__ */ jsx("input", { type, value, onChange, className: "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm" })
  ] });
}
export {
  ProfilePage as component
};
