"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function SEOAdminPage() {
  const [saved, setSaved] = useState(false);
  const [seo, setSeo] = useState({
    siteTitle: "Rohit Dandawate | Education & Social Impact Activist",
    metaDescription: "Advocating for safer, healthier, and more accountable educational environments across Maharashtra.",
    canonicalUrl: "https://rohitdandawate.org",
    ogImage: "/images/rohit_homepage.png",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link href="/admin" className="hover:text-[#0F172A] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <span>/</span>
            <span>SEO</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">SEO & Social Meta Tags</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Optimize search engine indexation, OpenGraph sharing cards, and page metadata.
          </p>
        </div>

        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B]"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{saved ? "Saved to Database!" : "Save SEO Settings"}</span>
        </button>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Meta Title</label>
          <input
            type="text"
            value={seo.siteTitle}
            onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
            className="w-full text-xs px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Meta Description</label>
          <textarea
            rows={3}
            value={seo.metaDescription}
            onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
            className="w-full text-xs p-3 border rounded-md leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Canonical Base URL</label>
            <input
              type="text"
              value={seo.canonicalUrl}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              className="w-full text-xs px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Default OG Image Path</label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              className="w-full text-xs px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
