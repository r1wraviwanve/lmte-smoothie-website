"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  ArrowLeft,
  ExternalLink,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  Video,
} from "lucide-react";
import { mediaItems, MediaItem } from "@/lib/media-data";

export default function MediaAdminPage() {
  const [items, setItems] = useState<MediaItem[]>(mediaItems);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

  // Form state for adding/editing media
  const [formUrl, setFormUrl] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("School Canteen / Student Health");
  const [formPlatform, setFormPlatform] = useState<"YouTube" | "Facebook">("YouTube");
  const [formType, setFormType] = useState<"youtube" | "facebook">("youtube");
  const [formVideoId, setFormVideoId] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Auto-detect platform and extract YouTube ID when URL is pasted
  const handleUrlChange = (url: string) => {
    setFormUrl(url);

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setFormPlatform("YouTube");
      setFormType("youtube");

      // Extract YouTube ID
      let videoId = "";
      if (url.includes("/shorts/")) {
        const parts = url.split("/shorts/");
        videoId = parts[1]?.split("?")[0] || "";
      } else if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        videoId = parts[1]?.split("?")[0] || "";
      } else if (url.includes("v=")) {
        const parts = url.split("v=");
        videoId = parts[1]?.split("&")[0] || "";
      }

      if (videoId) {
        setFormVideoId(videoId);
        setStatusMessage(`Detected YouTube video (ID: ${videoId})`);
      }
    } else if (url.includes("facebook.com")) {
      setFormPlatform("Facebook");
      setFormType("facebook");
      setFormVideoId("");
      setStatusMessage("Detected Facebook video/post");
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormUrl("");
    setFormTitle("");
    setFormCategory("School Canteen / Student Health");
    setFormPlatform("YouTube");
    setFormType("youtube");
    setFormVideoId("");
    setFormDescription("");
    setStatusMessage("");
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item: MediaItem) => {
    setEditingItem(item);
    setFormUrl(item.url);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormPlatform(item.platform);
    setFormType(item.type);
    setFormVideoId(item.videoId || "");
    setFormDescription(item.description || "");
    setStatusMessage("");
    setIsAddModalOpen(true);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formUrl) return;

    if (editingItem) {
      // Update existing item
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                title: formTitle,
                url: formUrl,
                category: formCategory,
                platform: formPlatform,
                type: formType,
                videoId: formVideoId || undefined,
                description: formDescription || undefined,
              }
            : item
        )
      );
    } else {
      // Add new item
      const newItem: MediaItem = {
        id: `media-${Date.now()}`,
        title: formTitle,
        url: formUrl,
        category: formCategory,
        platform: formPlatform,
        type: formType,
        videoId: formVideoId || undefined,
        description: formDescription || undefined,
      };
      setItems((prev) => [newItem, ...prev]);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to remove this media item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link href="/admin" className="hover:text-[#0F172A] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <span>/</span>
            <span>Media Library</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">In The Media & Press</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            {items.length} media items featured on the homepage (YouTube, Shorts, Facebook video).
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-sm hover:bg-[#1E293B] cursor-pointer transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media from URL</span>
        </button>
      </div>

      {/* 2. Media Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    item.platform === "YouTube"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {item.platform}
                </span>
                <span className="text-[11px] text-[#64748B] font-medium bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                  {item.category}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#0F172A] leading-snug line-clamp-3">
                {item.title}
              </h3>

              {item.description && (
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-[11px] text-[#94A3B8] font-mono">
                {item.videoId ? `ID: ${item.videoId}` : "Social Video"}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="text-xs text-[#64748B] hover:text-[#0F172A] flex items-center gap-1 font-medium cursor-pointer"
                  title="Edit item"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-medium cursor-pointer"
                  title="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  Watch <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Interactive Modal: Add Media from URL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">
                    {editingItem ? "Edit Media Record" : "Add Media from URL"}
                  </h2>
                  <p className="text-[11px] text-[#64748B]">Paste a link from YouTube, Shorts, or Facebook</p>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveMedia} className="space-y-4">
              {/* URL Input */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Media / Video URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=... or https://youtube.com/shorts/..."
                  value={formUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#0F172A]"
                />
                {statusMessage && (
                  <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> {statusMessage}
                  </p>
                )}
              </div>

              {/* Platform & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1">
                    Platform
                  </label>
                  <select
                    value={formPlatform}
                    onChange={(e) => {
                      const val = e.target.value as "YouTube" | "Facebook";
                      setFormPlatform(val);
                      setFormType(val === "YouTube" ? "youtube" : "facebook");
                    }}
                    className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-lg bg-white"
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Facebook">Facebook</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. School Canteen / Student Health"
                    className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-lg"
                  />
                </div>
              </div>

              {/* Video ID (if YouTube) */}
              {formPlatform === "YouTube" && (
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1">
                    YouTube Video ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DKexCzTU88w"
                    value={formVideoId}
                    onChange={(e) => setFormVideoId(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-lg font-mono"
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Headline / Title <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Paste headline (Marathi or English)..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full text-xs p-3 border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#0F172A] leading-relaxed"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Description / Context (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief background or outcome summary..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full text-xs p-3 border border-[#CBD5E1] rounded-lg leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B] cursor-pointer shadow-sm transition-all"
                >
                  {editingItem ? "Update Record" : "Add to Media"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
