import logo from "@/assets/aman-logo.png";

export function Logo({ size = 40, withText = false, className = "" }: { size?: number; withText?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt="بنك أمان" width={size} height={size} className="object-contain drop-shadow-[0_0_15px_rgba(200,170,80,0.35)]" />
      {withText && (
        <div>
          <h1 className="text-xl font-bold text-glow text-neon leading-tight">بنك أمان</h1>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Aman Bank</p>
        </div>
      )}
    </div>
  );
}
