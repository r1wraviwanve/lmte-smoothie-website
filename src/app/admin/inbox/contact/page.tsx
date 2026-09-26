"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactInboxPage() {
  const [messages] = useState([
    {
      id: "1",
      name: "Suresh Patil",
      email: "spatil@gmail.com",
      phone: "+91 98220 12345",
      organization: "Parents Association, Pune",
      message: "Respected Rohit ji, We would like your guidance on challenging the arbitrary fee hike imposed by the school management in Kothrud.",
      date: "Sep 24, 2026",
      status: "New",
    },
    {
      id: "2",
      name: "Anita Deshmukh",
      email: "anita.d@yahoo.com",
      phone: "+91 97654 32100",
      organization: "Individual Parent",
      message: "Thank you for raising the issue of school playground requirements with the Municipal Commissioner. We support this fully.",
      date: "Sep 22, 2026",
      status: "Reviewed",
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
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Contact Inquiries</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Public inquiries and messages submitted via the website contact form.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#0F172A]">{item.name}</span>
                <span className="text-xs text-[#64748B] ml-2">({item.organization})</span>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                item.status === "New" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}>
                {item.status}
              </span>
            </div>

            <p className="text-xs text-[#334155] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg border border-[#F1F5F9]">
              &ldquo;{item.message}&rdquo;
            </p>

            <div className="flex items-center justify-between text-xs text-[#94A3B8] pt-1">
              <span>Email: <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">{item.email}</a> • Phone: {item.phone}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
