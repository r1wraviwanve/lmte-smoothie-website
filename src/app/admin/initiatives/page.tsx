"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowLeft, ExternalLink, Edit3, Trash2, X } from "lucide-react";

interface InitiativeItem {
  id: string;
  title: string;
  image: string;
  publication: string;
  description: string;
  category: string;
  status: string;
}

export default function InitiativesAdminPage() {
  const [initiatives, setInitiatives] = useState<InitiativeItem[]>([
    {
      id: "1",
      title: "Campus Hygiene & Nutrition Audits",
      image: "/images/initiatives/action_01_lokmat_canteen.jpg",
      publication: "Lokmat",
      description: "Demanding strict monitoring and quarterly compliance reports against high-sugar and fatty food sales in school canteens.",
      category: "Canteen & Nutrition",
      status: "Draft",
    },
    {
      id: "2",
      title: "Statewide Junk Food Ban Enforcement",
      image: "/images/initiatives/action_02_toi_junk_food.jpg",
      publication: "Times of India",
      description: "Sounding the alarm across Maharashtra on the 10-year ban on fast food and HFSS items in school premises.",
      category: "Policy Reform",
      status: "Draft",
    },
    {
      id: "3",
      title: "FSSAI Safety Act Compliance",
      image: "/images/initiatives/action_03_pudhari_canteen.jpg",
      publication: "Pudhari",
      description: "Pushing for regulatory inspection and legal penalties under Section 56 of FSSAI Act for defaulting school vendors.",
      category: "Canteen & Nutrition",
      status: "Draft",
    },
    {
      id: "4",
      title: "School Canteen Oversight Committees",
      image: "/images/initiatives/action_04_mumbai_mirror.jpg",
      publication: "Mumbai Mirror",
      description: "Advocating 30-day inspection drives, school-level food monitoring committees, and active parent oversight.",
      category: "School Infrastructure",
      status: "Draft",
    },
    {
      id: "5",
      title: "Student Data Privacy & APAAR ID",
      image: "/images/initiatives/action_05_midday_apaar.jpg",
      publication: "Mid-Day",
      description: "Public representations seeking statutory clarity and data protection safeguards against student ID data exposure.",
      category: "Student Data",
      status: "Draft",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InitiativeItem | null>(null);

  const handleOpenAddModal = () => {
    setEditingItem({
      id: `init-${Date.now()}`,
      title: "",
      image: "/images/initiatives/action_01_lokmat_canteen.jpg",
      publication: "Press Release",
      description: "",
      category: "Child Safety",
      status: "Draft",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: InitiativeItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title) return;

    setInitiatives((prev) => {
      const exists = prev.some((i) => i.id === editingItem.id);
      if (exists) {
        return prev.map((i) => (i.id === editingItem.id ? editingItem : i));
      }
      return [editingItem, ...prev];
    });

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this initiative from CMS?")) {
      setInitiatives((prev) => prev.filter((i) => i.id !== id));
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
            <span>Initiatives</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Initiatives & Actions Taken</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            {initiatives.length} featured initiatives driving the homepage action grid.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Initiative</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-[#E2E8F0]">
                <Image src={item.image} alt={item.title} fill className="object-cover object-top" />
                <span className="absolute top-2 right-2 bg-white/90 text-[#0F172A] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {item.publication}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] mt-2 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-[#64748B] mt-1 line-clamp-3 leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {item.status}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="text-xs text-[#64748B] hover:text-[#0F172A] flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <a
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold ml-1"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <h2 className="text-base font-bold text-[#0F172A]">
                {initiatives.some((i) => i.id === editingItem.id) ? "Edit Initiative" : "New Initiative"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1">Publication Source</label>
                  <input
                    type="text"
                    value={editingItem.publication}
                    onChange={(e) => setEditingItem({ ...editingItem, publication: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1">Category</label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Summary / Card Description</label>
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
