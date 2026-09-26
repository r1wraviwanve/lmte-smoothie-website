"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowLeft, ExternalLink } from "lucide-react";

export default function VideosAdminPage() {
  const [videos] = useState([
    {
      id: "1",
      title: "Reforming School Grounds & Playgrounds in Maharashtra",
      category: "speech",
      youtubeId: "DKexCzTU88w",
      date: "Aug 2026",
      featured: true,
    },
    {
      id: "2",
      title: "Addressing Child Mental Wellbeing & Screen Time in Modern Schools",
      category: "interview",
      youtubeId: "6RP-zSA4jZk",
      date: "Aug 2026",
      featured: true,
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
            <span>Media Library</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Video Library</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Owned speeches, interviews, awareness campaigns, and panel discussions.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B]">
          <Plus className="w-4 h-4" />
          <span>New Video</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                {item.category}
              </span>
              <span className="text-[11px] font-mono text-[#94A3B8]">ID: {item.youtubeId}</span>
            </div>

            <h3 className="text-sm font-bold text-[#0F172A]">{item.title}</h3>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-[#F1F5F9]">
              <span className="text-[#94A3B8]">{item.date}</span>
              <a
                href={`https://youtube.com/watch?v=${item.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                Watch on YouTube <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
