"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function GPTAPageAdmin() {
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState({
    officialName: "Global Parents Teachers Association",
    mission: "To establish a transparent, accountable, and child-first education system by empowering parents and teachers as equal partners in school governance.",
    vision: "Every school in Maharashtra adhering to statutory safety, health, and fee standards with active parental oversight.",
    contactEmail: "contact@gpta.org.in",
    registrationDetails: "Registered under the Societies Registration Act, 1860.",
    showRegistration: true,
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
            <span>GPTA Page</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">GPTA Page Management</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Configure the Global Parents Teachers Association singleton profile and mission.
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
          <span>{saved ? "Saved to Database!" : "Save Changes"}</span>
        </button>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Official Organization Name</label>
          <input
            type="text"
            value={data.officialName}
            onChange={(e) => setData({ ...data, officialName: e.target.value })}
            className="w-full text-xs px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Mission Statement</label>
          <textarea
            rows={3}
            value={data.mission}
            onChange={(e) => setData({ ...data, mission: e.target.value })}
            className="w-full text-xs p-3 border rounded-md leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Vision Statement</label>
          <textarea
            rows={3}
            value={data.vision}
            onChange={(e) => setData({ ...data, vision: e.target.value })}
            className="w-full text-xs p-3 border rounded-md leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Contact Email</label>
            <input
              type="email"
              value={data.contactEmail}
              onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
              className="w-full text-xs px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Registration Details</label>
            <input
              type="text"
              value={data.registrationDetails}
              onChange={(e) => setData({ ...data, registrationDetails: e.target.value })}
              className="w-full text-xs px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
