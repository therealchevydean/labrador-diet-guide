# Labrador Diet Guide 🐕

> **Production SEO & Affiliate Engine for Labrador Retriever Canine Nutrition.**

A high-performance Next.js 15 programmatic SEO guide addressing what human foods are safe, healthy, and toxic for America's most popular dog breed. Built to solve real dietary questions and monetize via Amazon Associates.

---

## 🌟 Features
- **Comprehensive Database:** 29 curated, veterinary-informed human food evaluations specific to Labrador genetics (POMC gene obesity trait, hip dysplasia risks).
- **Search & Instant Filters:** Client-side instant keyword filtering for Safe vs Toxic foods.
- **Programmatic SEO:** Dynamic `[slug]` pages with auto-generated **JSON-LD Schema (`FAQPage`)** for Google Rich Snippets.
- **Monetization Wired:** Amazon Associates tracking tag (`pugdietguide-20`) embedded with proper `rel="noopener sponsored"` attributes across:
  - Slow feeder bowls (bloat/GDV prevention).
  - Veterinary large-breed joint supplements (glucosamine/chondroitin).
  - Food-specific healthy treat alternatives.
- **Automated Sitemap & Robots:** Built-in `sitemap.xml` and `robots.txt` dynamic generation for instant Google Search Console indexing.

---

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Tailwind CSS
- **Data Engine:** Static JSON dataset with pre-rendered static paths (`generateStaticParams`)
- **Hosting:** Vercel

---

## 🚀 Running Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📈 Deployment
Deploys instantly to Vercel with zero configuration. Connected to GitHub repo `therealchevydean/labrador-diet-guide`.
