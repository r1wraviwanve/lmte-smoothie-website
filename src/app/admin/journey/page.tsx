"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowLeft, AlertCircle, Edit3, Trash2, X } from "lucide-react";

interface MilestoneItem {
  id: string;
  years: string;
  title: string;
  description: string;
  image: string;
  label: string;
  aspect: string;
  isDraft: boolean;
}

export default function JourneyAdminPage() {
  const [milestones, setMilestones] = useState<MilestoneItem[]>([
    {
      id: "1",
      years: "2022 / PRESENT",
      title: "President, GPTA",
      description: "Leading the Global Parents Teachers Association to revolutionize the dialogue between parents and educational institutions across the state.",
      image: "/images/White_dress.png",
      label: "[PLACEHOLDER] GPTA Founded",
      aspect: "4/5",
      isDraft: true,
    },
    {
      id: "2",
      years: "2018 / 2022",
      title: "School Safety Advocate",
      description: "Spearheaded multiple public campaigns addressing critical gaps in school transport, fire safety, and campus security.",
      image: "/images/rohit_homepage.png",
      label: "[PLACEHOLDER] Safety Campaign",
      aspect: "4/6",
      isDraft: true,
    },
    {
      id: "3",
      years: "2015 / 2018",
      title: "Community Mobilizer",
      description: "Worked at the grassroots level organizing parents to audit school fee structures and demand transparency in educational expenses.",
      image: "/images/Community_mobilizer.png",
      label: "[PLACEHOLDER] Early Activism",
      aspect: "1/1",
      isDraft: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MilestoneItem | null>(null);

  const handleOpenAdd = () => {
    setEditingItem({
      id: `milestone-${Date.now()}`,
      years: "2024 / PRESENT",
      title: "",
      description: "",
      image: "/images/rohit_homepage.png",
      label: "[PLACEHOLDER]",
      aspect: "4/5",
      isDraft: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MilestoneItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title) return;

    setMilestones((prev) => {
      const exists = prev.some((m) => m.id === editingItem.id);
      if (exists) {
        return prev.map((m) => (m.id === editingItem.id ? editingItem : m));
      }
      return [editingItem, ...prev];
    });

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this milestone?")) {
      setMilestones((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link href="/admin" className="hover:text-[#0F172A] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <span>/</span>
            <span>Journey Timeline</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Journey & Milestones</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage the horizontal 3-card timeline displayed on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Milestone</span>
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <span className="font-bold">Placeholders Flagged:</span> All milestones are currently marked with <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">[PLACEHOLDER]</code> until official dates are confirmed by Rohit Dandawate.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {milestones.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden border border-[#E2E8F0]">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-600 tracking-wider">
                  {item.years}
                </span>
                <h3 className="text-base font-bold text-[#0F172A] mt-1">{item.title}</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
              <span className="text-[10px] bg-[#F1F5F9] text-[#64748B] font-mono px-2 py-0.5 rounded">
                Aspect: {item.aspect}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <h2 className="text-base font-bold text-[#0F172A]">
                {milestones.some((m) => m.id === editingItem.id) ? "Edit Milestone" : "New Milestone"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded text-[#94A3B8] hover:text-[#0F172A]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Time Period</label>
                <input
                  type="text"
                  placeholder="e.g. 2022 / PRESENT"
                  value={editingItem.years}
                  onChange={(e) => setEditingItem({ ...editingItem, years: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Role / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. President, GPTA"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full text-xs p-3 border rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#64748B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B]"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
