import { Bell, Search, X, Check } from "lucide-react";
import { user } from "@/lib/mock-data";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/admin-store";

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { store, update } = useStore();
  const unread = store.notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const markAllRead = () => {
    update((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
  };

  return (
    <header className="flex items-center justify-between mb-8 gap-4">
      <div className="min-w-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight truncate">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1 truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="size-11 rounded-xl bg-card border border-border hover:border-neon/40 hidden md:flex items-center justify-center text-muted-foreground hover:text-neon">
          <Search className="size-4" />
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="size-11 rounded-xl bg-card border border-border hover:border-neon/40 flex items-center justify-center text-muted-foreground hover:text-neon relative"
          >
            <Bell className="size-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-neon text-midnight text-[10px] font-bold flex items-center justify-center shadow-glow">
                {unread}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute top-full mt-2 left-0 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h4 className="font-bold text-sm">الإشعارات</h4>
                <div className="flex items-center gap-2">
                  {unread > 0 && (
                    <button onClick={markAllRead} className="text-[10px] text-neon hover:underline flex items-center gap-1">
                      <Check className="size-3" /> قراءة الكل
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {store.notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted-foreground">لا توجد إشعارات</div>
                ) : (
                  store.notifications.map((n) => (
                    <div key={n.id} className={`p-3 ${!n.read ? "bg-neon/5" : ""}`}>
                      <div className="flex items-start gap-2">
                        {!n.read && <span className="size-2 rounded-full bg-neon shadow-glow mt-1.5 shrink-0" />}
                        <div className="min-w-0">
                          <div className="text-xs font-bold">{n.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{n.body}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">{n.date}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Link to="/notifications" onClick={() => setOpen(false)} className="block p-3 text-center text-xs text-neon hover:bg-neon/5 border-t border-border">
                عرض جميع الإشعارات
              </Link>
            </div>
          )}
        </div>

        <Link to="/settings" className="flex items-center gap-3 ps-2">
          <div className="text-left hidden sm:block">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">المعرّف</div>
            <div className="text-xs font-mono font-semibold text-neon">{user.id}</div>
          </div>
          <div className="size-11 rounded-full bg-gradient-neon p-0.5">
            <div className="size-full rounded-full bg-card flex items-center justify-center text-neon font-bold text-sm">
              {user.initials}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
