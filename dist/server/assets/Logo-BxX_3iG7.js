import { jsxs, jsx } from "react/jsx-runtime";
const logo = "/assets/aman-logo-DgoCpykV.png";
function Logo({ size = 40, withText = false, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 ${className}`, children: [
    /* @__PURE__ */ jsx("img", { src: logo, alt: "بنك أمان", width: size, height: size, className: "object-contain drop-shadow-[0_0_15px_rgba(200,170,80,0.35)]" }),
    withText && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-glow text-neon leading-tight", children: "بنك أمان" }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground tracking-widest uppercase", children: "Aman Bank" })
    ] })
  ] });
}
export {
  Logo as L,
  logo as l
};
