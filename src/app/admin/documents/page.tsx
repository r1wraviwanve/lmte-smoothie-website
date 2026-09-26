"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowLeft, FileText, Download } from "lucide-react";

export default function DocumentsAdminPage() {
  const [documents] = useState([
    {
      id: "1",
      title: "Municipal Commissioner Representation - School Playgrounds (DCPR 38)",
      file: "representation_01_playgrounds.pdf",
      size: "2.4 MB",
      date: "Aug 06, 2026",
      downloads: 142,
    },
    {
      id: "2",
      title: "FDA Maharashtra Circular on Canteen Nutrition Standards",
      file: "fda_canteen_circular_2026.pdf",
      size: "1.8 MB",
      date: "Aug 10, 2026",
      downloads: 89,
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link href="/admin" className="hover:text-[#0F172A] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <span>/</span>
            <span>Documents</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Document & Letter Repository</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Official government petitions, PDF circulars, and signed representations.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B]">
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="space-y-3">
        {documents.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">{item.title}</h3>
                <div className="text-xs text-[#64748B] mt-0.5 flex items-center gap-3">
                  <span className="font-mono">{item.file}</span>
                  <span>•</span>
                  <span>{item.size}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-[#64748B]">{item.downloads} downloads</span>
              <button className="px-3 py-1.5 text-xs font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] rounded-md hover:bg-[#F8FAFC] flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
