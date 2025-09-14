'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+971000000000';
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@briansarabica.com';

const PRODUCTS = [
  {
    id: 'roasted',
    name: 'Roasted Beans',
    img: '/images/coffee-bag-roasted.svg',
    blurb: 'Freshly roasted Arabica, curated profiles for cafes & hotels.',
    specs: ['Profiles: medium / medium-dark', 'Packs: 1kg · 5kg · 10kg · 20kg', 'Cupping notes: cocoa, citrus, red fruit']
  },
  {
    id: 'green',
    name: 'Unroasted (Green) Beans',
    img: '/images/coffee-bag-green.svg',
    blurb: 'Direct lots from Rwenzori & Elgon. Screen 15–18, washed & natural.',
    specs: ['Packaging: 60kg jute + GrainPro', 'Processing: washed · natural · honey', 'Use: roasters, importers, B2B']
  },
  {
    id: 'ground',
    name: 'Ground Coffee',
    img: '/images/coffee-bag-ground.svg',
    blurb: 'Consistency for offices & retail. Ground for Moka/Filter/Espresso.',
    specs: ['Packs: 1kg · 5kg', 'Grind: espresso · filter · moka', 'Private label available']
  },
  {
    id: 'bulk',
    name: 'Bulk Purchase',
    img: '/images/bulk-pallet.svg',
    blurb: 'Pallets & container quantities for distributors.',
    specs: ['Flexible MOQs', 'Sea or air freight', 'Docs & packing list provided']
  }
];

function WhatsAppLink({ children, text }) {
  const url = useMemo(() => {
    const msg = encodeURIComponent(text || 'Hi — I’m interested in Brian\'s Arabica.');
    const phone = WHATSAPP.replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${msg}`;
  }, []);
  return <a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function EmailLink({ children, subject }) {
  const url = `mailto:${EMAIL}?subject=${encodeURIComponent(subject || 'Coffee Quote Request')}`;
  return <a className="btn btn-outline" href={url}>{children}</a>;
}

export default function Page() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <main>
      {/* HERO */}
      <section className="section relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div style={{ y }} className="absolute inset-0 -z-10 opacity-90">
          <Image src="/images/hero-illustration.svg" alt="Ugandan highlands hero" fill priority />
        </motion.div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="badge mb-4">Premium Arabica</div>
            <h1 className="font-display text-4xl md:text-6xl leading-tight">
              Brian&apos;s Arabica <span className="gradient-text">— Straight from Uganda</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-black/80">
              Ugandan coffee for Dubai’s cafes, hotels, and importers. Direct lots, traceable, quote-based.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <WhatsAppLink text="Hi — I’d like to request a coffee quote.">Request a Quote (WhatsApp)</WhatsAppLink>
              <EmailLink subject="Coffee Quote Request — Brian's Arabica">Email Us</EmailLink>
            </div>
            <p className="mt-4 text-sm text-black/60">Prefer email? {EMAIL}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[360px] md:h-[460px]"
          >
            <Image src="/images/animated-route.svg" alt="Uganda to Dubai route" fill />
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="section max-w-7xl mx-auto pb-12">
        <h2 className="font-display text-3xl md:text-4xl">Four simple ways to buy</h2>
        <p className="text-black/70 mt-2">Roasted, Green, Ground, or Bulk — all quote‑based with WhatsApp & Email support.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              className="card p-6 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              viewport={{ once: true }}
            >
              <div className="relative h-44 mb-4">
                <Image src={p.img} alt={p.name} fill />
              </div>
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="text-sm text-black/70 mt-1">{p.blurb}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {p.specs.map((s, k) => <li key={k}>• {s}</li>)}
              </ul>
              <div className="mt-auto pt-6 flex gap-3">
                <WhatsAppLink text={`Hi — I’m interested in ${p.name}. Please share details and pricing.`}>WhatsApp</WhatsAppLink>
                <EmailLink subject={`${p.name} — Quote Request`}>Email</EmailLink>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="separator" />

      {/* WHY UGANDA */}
      <section className="section max-w-7xl mx-auto py-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Why Uganda</h2>
            <p className="mt-3 text-black/80">High‑altitude Arabica from Rwenzori & Elgon ranges with vibrant profiles. Robust supply via established cooperatives and export partners.</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>• Traceable lots and packing lists.</li>
              <li>• Freshness options: air freight for roasted; sea or air for bulk.</li>
              <li>• Documents on request.</li>
            </ul>
          </div>
          <div className="relative h-60 md:h-72">
            <Image src="/images/coffee-bag-showcase.svg" alt="Coffee bags showcase" fill />
          </div>
        </div>
      </section>

      <hr className="separator" />

      {/* CONTACT FORM */}
      <section id="contact" className="section max-w-4xl mx-auto py-6">
        <div className="card p-8">
          <h2 className="font-display text-2xl md:text-3xl">Request a Quote</h2>
          <p className="text-sm text-black/70 mt-1">Prefer WhatsApp or Email? Use the buttons above — this form is optional.</p>

          <form
            className="grid md:grid-cols-2 gap-4 mt-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = Object.fromEntries(new FormData(form).entries());
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              const out = await res.json();
              alert(out.message || 'Submitted');
              if (res.ok) form.reset();
            }}
          >
            <input className="hidden" name="companyWebsite" tabIndex="-1" autoComplete="off" />
            <input className="border rounded-lg px-4 py-3" name="name" placeholder="Your name" required />
            <input className="border rounded-lg px-4 py-3" name="email" type="email" placeholder="Email" required />
            <input className="border rounded-lg px-4 py-3 md:col-span-2" name="company" placeholder="Company (optional)" />
            <select className="border rounded-lg px-4 py-3" name="productType" defaultValue="roasted">
              <option value="roasted">Roasted Beans</option>
              <option value="green">Unroasted (Green) Beans</option>
              <option value="ground">Ground Coffee</option>
              <option value="bulk">Bulk Purchase</option>
            </select>
            <input className="border rounded-lg px-4 py-3" name="volume" placeholder="Estimated volume (e.g., 60kg, 1 pallet)" />
            <textarea className="border rounded-lg px-4 py-3 md:col-span-2" name="message" placeholder="Tell us what you need" rows={4} />
            <div className="md:col-span-2 flex gap-3">
              <button className="btn btn-primary" type="submit">Send Request</button>
              <WhatsAppLink>WhatsApp</WhatsAppLink>
              <EmailLink>Email</EmailLink>
            </div>
          </form>
        </div>
      </section>

      <footer className="section max-w-7xl mx-auto py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo-wordmark.svg" alt="Brian's Arabica" className="h-8" />
            <span className="text-sm text-black/70">© {new Date().getFullYear()} Brian&apos;s Arabica</span>
          </div>
          <div className="text-sm text-black/60">Imports for Dubai · Generic data placeholder · Edit as details finalize.</div>
        </div>
      </footer>
    </main>
  );
}
