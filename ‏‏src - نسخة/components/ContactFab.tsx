import { useEffect, useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { useStore } from "@/lib/admin-store";

export function ContactFab() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { store } = useStore();
  if (!mounted) return null;
  const { whatsapp, telegram, supportPhone } = store.config;

  const wa = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`;
  const tg = `https://t.me/${telegram.replace(/^@/, "")}`;
  const tel = `tel:${supportPhone.replace(/\s/g, "")}`;

  return (
    <div className="fixed bottom-24 left-5 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-3 fade-in">
          <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#25D366] text-white font-bold shadow-lg hover:scale-105 transition">
            <MessageCircle className="size-4" /> واتساب
          </a>
          <a href={tg} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#229ED9] text-white font-bold shadow-lg hover:scale-105 transition">
            <MessageCircle className="size-4" /> تيليجرام
          </a>
          <a href={tel} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border font-bold shadow-lg hover:scale-105 transition">
            <Phone className="size-4 text-neon" /> اتصال
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="تواصل معنا"
        className="size-14 rounded-full bg-gradient-neon text-midnight shadow-glow flex items-center justify-center hover:scale-110 transition"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
