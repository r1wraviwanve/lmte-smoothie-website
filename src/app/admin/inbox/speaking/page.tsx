"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SpeakingInboxPage() {
  const [invitations] = useState([
    {
      id: "1",
      name: "Dr. Arvind Shinde",
      organization: "Maharashtra Educational Forum",
      event: "State Conference on Child Mental Health",
      city: "Chhatrapati Sambhajinagar",
      audience: 350,
      topic: "Reforming School Grounds & Mental Wellbeing",
      date: "Oct 15, 2026",
      status: "Confirmed",
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
            <span>Inbox</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Speaking & Keynote Invitations</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Invitations for talks, panel discussions, and educational seminars.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {invitations.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#0F172A]">{item.event}</span>
                <span className="text-xs text-[#64748B] ml-2">by {item.organization}</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-3 rounded-lg border border-[#F1F5F9] text-xs">
              <div>
                <span className="text-[#94A3B8] block">Topic</span>
                <span className="font-semibold text-[#0F172A]">{item.topic}</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block">Location</span>
                <span className="font-semibold text-[#0F172A]">{item.city}</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block">Audience</span>
                <span className="font-semibold text-[#0F172A]">~{item.audience} Attendees</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block">Event Date</span>
                <span className="font-semibold text-[#0F172A]">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
