"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function SettingsAdminPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Rohit Dandawate",
    copyrightName: "Rohit Dandawate",
    defaultTheme: "dark",
    allowThemeToggle: true,
    impactValue: 150,
    impactSuffix: "+",
    impactLabel: "Public Representations",
    impactVerified: false,
    contactEmail: "contact@rohitdandawate.org",
    responseWindow: "We usually respond within 48-72 business hours.",
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
            <span>Settings</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Site & System Settings</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Configure site metadata, impact counters, theme preferences, and legal text.
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
          <span>{saved ? "Saved!" : "Save Settings"}</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Impact Counter Settings */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">
              Impact Counter (Homepage Statistic)
            </h2>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
              settings.impactVerified ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              {settings.impactVerified ? "Verified" : "Unverified (Draft)"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Counter Value</label>
              <input
                type="number"
                value={settings.impactValue}
                onChange={(e) => setSettings({ ...settings, impactValue: Number(e.target.value) })}
                className="w-full text-xs px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Suffix</label>
              <input
                type="text"
                value={settings.impactSuffix}
                onChange={(e) => setSettings({ ...settings, impactSuffix: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Label</label>
              <input
                type="text"
                value={settings.impactLabel}
                onChange={(e) => setSettings({ ...settings, impactLabel: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <p className="text-xs text-[#64748B]">Preview on Homepage: <span className="font-bold text-[#0F172A]">{settings.impactValue}{settings.impactSuffix} {settings.impactLabel}</span></p>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, impactVerified: !settings.impactVerified })}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Toggle Verification Status
            </button>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] border-b pb-3">
            Appearance & Theme Defaults
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Default Theme</label>
              <select
                value={settings.defaultTheme}
                onChange={(e) => setSettings({ ...settings, defaultTheme: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-md bg-white"
              >
                <option value="dark">Dark Theme (Cinematic Black)</option>
                <option value="light">Light Theme (Warm Ivory)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Theme Toggle</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="toggleAllowed"
                  checked={settings.allowThemeToggle}
                  onChange={(e) => setSettings({ ...settings, allowThemeToggle: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="toggleAllowed" className="text-xs text-[#334155]">
                  Allow visitors to toggle between dark and light themes
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
