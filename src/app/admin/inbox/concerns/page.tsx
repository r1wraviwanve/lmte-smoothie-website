"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ConcernsInboxPage() {
  const [concerns] = useState([
    {
      id: "1",
      refCode: "EC-202609-0842",
      studentName: "Aditya (Grade 7)",
      guardian: "Mahesh Kadam",
      school: "St. Xavier's Model School, Pune",
      category: "School Canteen / Nutrition Violations",
      description: "School canteen continues selling expired snacks and carbonated drinks within 50 meters of classrooms despite official FDA circular.",
      date: "Sep 25, 2026",
      status: "under_review",
    },
    {
      id: "2",
      refCode: "EC-202609-0791",
      studentName: "Pooja (Grade 9)",
      guardian: "Sunita Joshi",
      school: "Vidya Mandir High School, Thane",
      category: "Playground & Physical Infrastructure",
      description: "School playground converted into commercial parking space during morning school hours violating DCPR 2034 Rule 38.",
      date: "Sep 20, 2026",
      status: "representation_made",
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
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Education Concerns Grievance Queue</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Formal concerns lodged by parents and guardians tracking institutional non-compliance.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {concerns.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-[#0F172A] text-white px-2 py-0.5 rounded">
                  {item.refCode}
                </span>
                <span className="text-xs font-semibold text-[#0F172A]">{item.school}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                item.status === "under_review"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-purple-50 text-purple-700 border-purple-200"
              }`}>
                {item.status.replace("_", " ")}
              </span>
            </div>

            <div>
              <div className="text-xs font-semibold text-blue-600 mb-1">{item.category}</div>
              <p className="text-xs text-[#334155] leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#94A3B8] pt-2 border-t border-[#F1F5F9]">
              <span>Guardian: {item.guardian} ({item.studentName})</span>
              <span>Lodged: {item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
