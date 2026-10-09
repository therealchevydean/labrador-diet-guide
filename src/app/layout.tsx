import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Labrador Diet Guide | Safe Foods, Nutrition & Diet Plans for Labs",
  description: "Complete veterinary-informed dietary guide for Labrador Retrievers. Learn what human foods are safe, toxic foods to avoid, joint supplements, and weight management tips.",
  keywords: ["Labrador diet", "can labradors eat", "labrador retriever nutrition", "labrador safe foods", "dog food guide"],
  openGraph: {
    title: "Labrador Diet Guide | Safe Foods & Health Guide",
    description: "Veterinary-informed food safety and nutrition guide designed specifically for Labrador Retrievers.",
    url: "https://labradordietguide.com",
    siteName: "Labrador Diet Guide",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 text-xl font-black text-indigo-700 tracking-tight">
              <span>🐕</span>
              <span>LabradorDietGuide</span>
            </a>
            <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
              <a href="/" className="hover:text-indigo-600 transition">Food Database</a>
              <a href="/#nutrition-guide" className="hover:text-indigo-600 transition">Nutritional Needs</a>
              <a href="/#supplements" className="hover:text-indigo-600 transition">Joint & Health</a>
            </nav>
          </div>
        </header>

        <div className="flex-grow">
          {children}
        </div>

        <footer className="bg-white border-t border-slate-200 mt-20 py-10">
          <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm space-y-3">
            <p className="font-semibold text-slate-700">Labrador Diet Guide &copy; {new Date().getFullYear()} &bull; Built for Labrador Health & Longevity</p>
            <p className="max-w-xl mx-auto text-xs leading-relaxed text-slate-400">
              Disclaimer: This guide is for educational purposes only and is not a substitute for clinical veterinary advice. Always consult your veterinarian before making significant dietary changes.
            </p>
            <p className="text-xs text-slate-400">
              Disclosure: As an Amazon Associate, we earn from qualifying purchases at zero extra cost to you.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
