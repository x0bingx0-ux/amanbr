import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { A as AppShell, T as TopBar } from "./TopBar-36Uf0NX_.js";
import { X, Camera, AlertCircle, Type } from "lucide-react";
import { useState } from "react";
import { u as useStore } from "./admin-store-eij9P5VY.js";
import { toast } from "sonner";
import { Scanner } from "@yudiel/react-qr-scanner";
import "./Logo-BxX_3iG7.js";
import "./mock-data-DmIvE9ki.js";
function ScanPage() {
  const [code, setCode] = useState("");
  const {
    store
  } = useStore();
  const [found, setFound] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [permError, setPermError] = useState(null);
  const lookup = (raw) => {
    let id = raw.trim();
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.id) id = parsed.id;
    } catch {
    }
    const u = store.users.find((x) => x.id.toUpperCase() === id.toUpperCase());
    if (u) {
      setFound(u);
      toast.success(`تم العثور على ${u.name}`);
      setScanning(false);
    } else {
      setFound(null);
      toast.error("لم يتم العثور على هذا المعرّف");
    }
  };
  const startCamera = async () => {
    setPermError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment"
        }
      });
      stream.getTracks().forEach((t) => t.stop());
      setScanning(true);
    } catch (e) {
      const msg = e?.name === "NotAllowedError" ? "تم رفض إذن الكاميرا. فعّله من إعدادات المتصفح ثم أعد المحاولة." : "لا يمكن الوصول إلى الكاميرا على هذا الجهاز.";
      setPermError(msg);
      toast.error(msg);
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsx(TopBar, { title: "مسح الباركود", subtitle: "امسح أو أدخل معرّف المستلم" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-square rounded-3xl bg-gradient-card border border-neon/30 shadow-glow flex flex-col items-center justify-center relative overflow-hidden", children: scanning ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Scanner, { onScan: (results) => {
          if (results?.[0]?.rawValue) lookup(results[0].rawValue);
        }, onError: (err) => {
          setPermError(err?.message || "خطأ في الكاميرا");
          setScanning(false);
        }, constraints: {
          facingMode: "environment"
        }, styles: {
          container: {
            width: "100%",
            height: "100%"
          },
          video: {
            objectFit: "cover"
          }
        } }),
        /* @__PURE__ */ jsx("button", { onClick: () => setScanning(false), className: "absolute top-3 left-3 p-2 rounded-full bg-black/60 text-white z-10", children: /* @__PURE__ */ jsx(X, { className: "size-4" }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-8 border-2 border-neon/60 rounded-2xl pointer-events-none", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-px -left-px size-6 border-t-4 border-l-4 border-neon rounded-tl-xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-px -right-px size-6 border-t-4 border-r-4 border-neon rounded-tr-xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-px -left-px size-6 border-b-4 border-l-4 border-neon rounded-bl-xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-px -right-px size-6 border-b-4 border-r-4 border-neon rounded-br-xl" })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-8 border-2 border-neon/40 rounded-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-px -left-px size-6 border-t-4 border-l-4 border-neon rounded-tl-xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-px -right-px size-6 border-t-4 border-r-4 border-neon rounded-tr-xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-px -left-px size-6 border-b-4 border-l-4 border-neon rounded-bl-xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-px -right-px size-6 border-b-4 border-r-4 border-neon rounded-br-xl" })
        ] }),
        /* @__PURE__ */ jsx(Camera, { className: "size-16 text-neon mb-3" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold mb-1", children: "وجّه الكاميرا نحو الباركود" }),
        /* @__PURE__ */ jsxs("button", { onClick: startCamera, className: "mt-4 px-5 py-2.5 rounded-xl bg-gradient-neon text-midnight text-xs font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Camera, { className: "size-4" }),
          " تشغيل الكاميرا"
        ] })
      ] }) }),
      permError && /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "size-4 shrink-0 mt-0.5" }),
        " ",
        /* @__PURE__ */ jsx("span", { children: permError })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-card border border-border", children: [
        /* @__PURE__ */ jsxs("label", { className: "text-xs text-muted-foreground font-semibold flex items-center gap-1 mb-2", children: [
          /* @__PURE__ */ jsx(Type, { className: "size-3" }),
          " أو أدخل المعرّف يدوياً"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("input", { value: code, onChange: (e) => setCode(e.target.value), placeholder: "AMN-XXXXXX", className: "flex-1 px-4 py-3 rounded-xl bg-input border border-border focus:border-neon focus:outline-none text-sm font-mono" }),
          /* @__PURE__ */ jsx("button", { onClick: () => lookup(code), className: "px-5 rounded-xl bg-gradient-neon text-midnight text-sm font-bold", children: "بحث" })
        ] }),
        found && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 rounded-xl bg-neon/5 border border-neon/30", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "المستلم" }),
          /* @__PURE__ */ jsx("div", { className: "font-bold mt-1", children: found.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: found.phone }),
          /* @__PURE__ */ jsxs(Link, { to: "/transfers", className: "block mt-3 py-2.5 rounded-xl bg-gradient-neon text-midnight text-center text-xs font-bold", children: [
            "إرسال تحويل إلى ",
            found.name.split(" ")[0]
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ScanPage as component
};
