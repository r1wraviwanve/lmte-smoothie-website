"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { representationsData, RepresentationItem } from "@/lib/representations-data";

export default function RepresentationsAdminPage() {
  const [items, setItems] = useState<RepresentationItem[]>(representationsData);
  const [selectedItem, setSelectedItem] = useState<RepresentationItem | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link href="/admin" className="hover:text-[#0F172A] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <span>/</span>
            <span>Representations</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Public Representations</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage the 150+ official public petitions, representations, municipal memos, and press clippings.
          </p>
        </div>

        <button
          onClick={() => setSelectedItem({ id: 0, number: "04", title: "", category: "School Infrastructure", description: "", date: "2026-09-26" })}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Representation</span>
        </button>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-[#E2E8F0]">
                {item.image && (
                  <Image src={item.image} alt={item.title} fill className="object-cover object-top" />
                )}
                <span className="absolute top-2 left-2 bg-[#0F172A] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                  #{item.number}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-[#0F172A] mt-2 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-[#64748B] mt-1 line-clamp-3 leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8]">{item.date}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="p-1.5 rounded text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setItems(items.filter((i) => i.id !== item.id))}
                  className="p-1.5 rounded text-[#64748B] hover:text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-[#0F172A]">
              {selectedItem.id ? `Edit Representation #${selectedItem.number}` : "New Representation"}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Title (Primary / Marathi)</label>
                <input
                  type="text"
                  value={selectedItem.title}
                  onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Category</label>
                <input
                  type="text"
                  value={selectedItem.category}
                  onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">Description / Summary</label>
                <textarea
                  rows={3}
                  value={selectedItem.description}
                  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                  className="w-full text-xs p-3 border rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!selectedItem.id) {
                    setItems([...items, { ...selectedItem, id: Date.now() }]);
                  } else {
                    setItems(items.map((i) => (i.id === selectedItem.id ? selectedItem : i)));
                  }
                  setSelectedItem(null);
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#0F172A] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
