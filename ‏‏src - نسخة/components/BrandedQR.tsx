import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/aman-logo.png";

export function BrandedQR({ value, size = 240 }: { value: string; size?: number }) {
  return (
    <div
      className="relative inline-block p-4 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, #0b1220 0%, #0f1e3a 100%)",
        boxShadow: "0 0 0 2px rgba(34,211,238,0.35), 0 0 40px rgba(34,211,238,0.25)",
      }}
    >
      {/* Corner accents */}
      <span className="absolute top-2 right-2 size-4 border-t-2 border-r-2 border-neon rounded-tr-md" />
      <span className="absolute top-2 left-2 size-4 border-t-2 border-l-2 border-neon rounded-tl-md" />
      <span className="absolute bottom-2 right-2 size-4 border-b-2 border-r-2 border-neon rounded-br-md" />
      <span className="absolute bottom-2 left-2 size-4 border-b-2 border-l-2 border-neon rounded-bl-md" />

      <div className="bg-white p-3 rounded-xl">
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          bgColor="#ffffff"
          fgColor="#0b1220"
          imageSettings={{
            src: logo,
            height: Math.round(size * 0.22),
            width: Math.round(size * 0.22),
            excavate: true,
          }}
        />
      </div>
    </div>
  );
}
