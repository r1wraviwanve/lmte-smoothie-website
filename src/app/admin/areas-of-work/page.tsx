"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";

interface AreaItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  isTopic: boolean;
  isActive: boolean;
  sortOrder: number;
}

export default function AreasOfWorkAdminPage() {
  const [areas, setAreas] = useState<AreaItem[]>([
    {
      id: "1",
      title: "Child Safety & School Audits",
      slug: "child-safety-school-audits",
      shortDescription: "Auditing campus transport, fire safety, and building security norms across private and public schools.",
      isTopic: true,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: "2",
      title: "Parent-Teacher Collaboration",
      slug: "parent-teacher-collaboration",
      shortDescription: "Building constructive, institutionalized dialogue between families and educators for student success.",
      isTopic: true,
      isActive: true,
      sortOrder: 2,
    },
    {
      id: "3",
      title: "Education Policy Reform",
      slug: "education-policy-reform",
      shortDescription: "Active representation to education ministries and local authorities on regulatory compliance.",
      isTopic: true,
      isActive: true,
      sortOrder: 3,
    },
    {
      id: "4",
      title: "Institutional Accountability",
      slug: "institutional-accountability",
      shortDescription: "Ensuring transparency in fee regulations, curriculum execution, and student welfare standards.",
      isTopic: true,
      isActive: true,
      sortOrder: 4,
    },
    {
      id: "5",
      title: "Student Mental & Physical Wellbeing",
      slug: "student-wellbeing",
      shortDescription: "Promoting mandatory playgrounds, nutritious canteens, and stress-free school environments.",
      isTopic: true,
      isActive: true,
      sortOrder: 5,
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
            <span>Areas of Work</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Areas of Work & Topics</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Drives the &quot;Topics of Focus&quot; in the Expertise section and public work archives.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B]">
          <Plus className="w-4 h-4" />
          <span>New Topic Area</span>
        </button>
      </div>

      <div className="space-y-3">
        {areas.map((item, index) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#F1F5F9] text-[#0F172A] text-xs font-bold flex items-center justify-center">
                  #{index + 1}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A]">{item.title}</h3>
                {item.isTopic && (
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Expertise Topic
                  </span>
                )}
              </div>
              <p className="text-xs text-[#64748B] max-w-2xl leading-relaxed">{item.shortDescription}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setAreas((prev) =>
                    prev.map((a) => (a.id === item.id ? { ...a, isTopic: !a.isTopic } : a))
                  );
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  item.isTopic
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : "bg-white text-[#64748B] border-[#CBD5E1]"
                }`}
              >
                {item.isTopic ? "In Expertise ✓" : "Add to Expertise"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
