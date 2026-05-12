import { jsx, jsxs } from "react/jsx-runtime";
import { A as AdminShell } from "./AdminShell-BKdfZ_3s.js";
import { u as useStore, g as getCurrentAdmin } from "./admin-store-eij9P5VY.js";
import { useState } from "react";
import { toast } from "sonner";
import { Shield, Trash2, UserPlus, KeyRound, Save } from "lucide-react";
import "@tanstack/react-router";
import "./Logo-BxX_3iG7.js";
function AdminsPage() {
  const {
    store,
    update
  } = useStore();
  const me = getCurrentAdmin();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const addAdmin = (e) => {
    e.preventDefault();
    if (!u || !p) return toast.error("املأ جميع الحقول");
    if (store.admins.some((a) => a.username === u)) return toast.error("اسم المستخدم موجود مسبقاً");
    update((s) => ({
      ...s,
      admins: [...s.admins, {
        username: u,
        password: p,
        createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("ar-EG")
      }]
    }));
    toast.success("تمت إضافة المسؤول");
    setU("");
    setP("");
  };
  const remove = (username) => {
    if (username === me) return toast.error("لا يمكنك حذف حسابك الحالي");
    if (store.admins.length <= 1) return toast.error("يجب إبقاء مسؤول واحد على الأقل");
    if (!confirm(`حذف المسؤول ${username}؟`)) return;
    update((s) => ({
      ...s,
      admins: s.admins.filter((a) => a.username !== username)
    }));
    toast.success("تم الحذف");
  };
  const [target, setTarget] = useState(me || (store.admins[0]?.username ?? ""));
  const [cur, setCur] = useState("");
  const [np1, setNp1] = useState("");
  const [np2, setNp2] = useState("");
  const changePass = (e) => {
    e.preventDefault();
    if (np1.length < 4) return toast.error("كلمة المرور قصيرة جداً");
    if (np1 !== np2) return toast.error("كلمتا المرور غير متطابقتين");
    const acc = store.admins.find((a) => a.username === target);
    if (!acc) return toast.error("المستخدم غير موجود");
    if (target === me && acc.password !== cur) return toast.error("كلمة المرور الحالية غير صحيحة");
    update((s) => ({
      ...s,
      admins: s.admins.map((a) => a.username === target ? {
        ...a,
        password: np1
      } : a)
    }));
    toast.success("تم تغيير كلمة المرور");
    setCur("");
    setNp1("");
    setNp2("");
  };
  return /* @__PURE__ */ jsx(AdminShell, { title: "إدارة المسؤولين", subtitle: "إضافة مسؤولين جدد وتغيير كلمات المرور", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Shield, { className: "size-4 text-neon" }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "المسؤولون الحاليون" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          store.admins.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-border", children: store.admins.map((a) => /* @__PURE__ */ jsxs("div", { className: "py-3 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "font-semibold text-sm flex items-center gap-2", children: [
            a.username,
            a.username === me && /* @__PURE__ */ jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-neon/10 text-neon", children: "أنت" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "منذ ",
            a.createdAt
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => remove(a.username), className: "p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20", children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" }) })
      ] }, a.username)) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: addAdmin, className: "mt-6 pt-6 border-t border-border space-y-3", children: [
        /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-sm flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(UserPlus, { className: "size-4 text-neon" }),
          " إضافة مسؤول جديد"
        ] }),
        /* @__PURE__ */ jsx("input", { value: u, onChange: (e) => setU(e.target.value), placeholder: "اسم المستخدم", className: inp }),
        /* @__PURE__ */ jsx("input", { type: "text", value: p, onChange: (e) => setP(e.target.value), placeholder: "كلمة المرور", className: inp }),
        /* @__PURE__ */ jsxs("button", { className: "w-full py-3 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(UserPlus, { className: "size-4" }),
          " إضافة"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: changePass, className: "bg-card rounded-2xl border border-border p-6 space-y-4 h-fit", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(KeyRound, { className: "size-4 text-neon" }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "تغيير كلمة المرور" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-1.5 block", children: "المستخدم المستهدف" }),
        /* @__PURE__ */ jsx("select", { value: target, onChange: (e) => setTarget(e.target.value), className: inp, children: store.admins.map((a) => /* @__PURE__ */ jsx("option", { value: a.username, children: a.username }, a.username)) })
      ] }),
      target === me && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-1.5 block", children: "كلمة المرور الحالية" }),
        /* @__PURE__ */ jsx("input", { type: "password", value: cur, onChange: (e) => setCur(e.target.value), className: inp })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-1.5 block", children: "كلمة المرور الجديدة" }),
        /* @__PURE__ */ jsx("input", { type: "password", value: np1, onChange: (e) => setNp1(e.target.value), className: inp })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-semibold mb-1.5 block", children: "تأكيد كلمة المرور" }),
        /* @__PURE__ */ jsx("input", { type: "password", value: np2, onChange: (e) => setNp2(e.target.value), className: inp })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "w-full py-3 rounded-xl bg-gradient-neon text-midnight font-bold flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Save, { className: "size-4" }),
        " تحديث"
      ] })
    ] })
  ] }) });
}
const inp = "w-full px-3 py-2.5 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm";
export {
  AdminsPage as component
};
