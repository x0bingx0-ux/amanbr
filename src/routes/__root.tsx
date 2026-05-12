import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-neon text-glow">404</h1>
        <h2 className="mt-4 text-xl font-semibold">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-neon px-5 py-3 text-sm font-bold text-midnight hover:opacity-90"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "أمان — محفظة مالية ومنصة استثمار" },
      { name: "description", content: "أمان: محفظة مالية رقمية احترافية، تحويلات فورية، ومنصة استثمار بعوائد يومية وشهرية." },
      { name: "theme-color", content: "#0b1220" },
      { property: "og:title", content: "أمان — محفظة مالية ومنصة استثمار" },
      { property: "og:description", content: "أمان: محفظة مالية رقمية احترافية، تحويلات فورية، ومنصة استثمار بعوائد يومية وشهرية." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "أمان — محفظة مالية ومنصة استثمار" },
      { name: "twitter:description", content: "أمان: محفظة مالية رقمية احترافية، تحويلات فورية، ومنصة استثمار بعوائد يومية وشهرية." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/u8My3hOwalflDPtB8rpf87BXxdp1/social-images/social-1777343274704-1000767142.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/u8My3hOwalflDPtB8rpf87BXxdp1/social-images/social-1777343274704-1000767142.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors />
        <Scripts />
      </body>
    </html>
  );
}
