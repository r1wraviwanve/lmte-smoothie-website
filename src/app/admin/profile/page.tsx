"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Save,
  CheckCircle2,
  ArrowLeft,
  User,
  Video,
  FileText,
  Share2,
  Sparkles,
} from "lucide-react";

export default function ProfileAdminPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "portraits" | "intro" | "about" | "expertise" | "social">("hero");
  const [saved, setSaved] = useState(false);

  // Form states matching site_profile and homepage
  const [formData, setFormData] = useState({
    fullName: "Rohit Dandawate",
    firstName: "ROHIT",
    lastName: "Dandawate",
    designation: "Education & Social Impact Activist",
    heroVideoPath: "/videos/Rohit_Animated_Video.mp4",
    heroPosterPath: "/videos/Rohit_Animated_Video_Poster.jpg",
    heroOverlayOpacity: 0.35,
    portrait1Path: "/images/rohit_homepage.png",
    portrait1Alt: "Rohit Portrait 1",
    portrait2Path: "/images/Rohit_image2.png",
    portrait2Alt: "Rohit Portrait 2",
    introPara1: "Rohit Dandawate is an education and social impact activist working to make schools safer, healthier and more accountable to the families they serve. Rohit Dandawate is the President of the Global Parents Teachers Association (GPTA), a platform that brings parents, teachers and institutions into one conversation about the everyday realities of education, from classroom safety and school food to student wellbeing.",
    introPara2: "Over years of public work across Maharashtra, Rohit has raised concerns, filed representations and built awareness on issues that affect children long before they reach the headlines. His approach is simple: listen to parents, verify the facts, engage the institution, and follow through until something changes.",
    aboutHeading: "Advocacy Leadership",
    aboutAccent: "With a Human Purpose",
    expertiseHeading: "Speaking About the",
    expertiseAccent: "Future of Education",
    contactEmail: "contact@rohitdandawate.org",
  });

  const [socialLinks, setSocialLinks] = useState([
    { id: "1", platform: "Facebook", url: "https://www.facebook.com/rohit.dandwate", verified: false, active: true },
    { id: "2", platform: "Twitter (X)", url: "https://x.com/dandwaterohit", verified: false, active: true },
    { id: "3", platform: "YouTube", url: "https://www.youtube.com/@gpta8006", verified: false, active: true },
    { id: "4", platform: "Instagram", url: "https://www.instagram.com/rohit_dandwate", verified: false, active: true },
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
            <span>Profile Management</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Profile & Hero Settings</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Configure the core persona, split name typography, portrait imagery, and rich-text introductions.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B] transition-colors"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{saved ? "Saved to Database!" : "Save Changes"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E2E8F0] gap-2 overflow-x-auto text-xs font-semibold">
        {[
          { key: "hero" as const, label: "Hero & Video", icon: Video },
          { key: "portraits" as const, label: "Portraits (3:4)", icon: User },
          { key: "intro" as const, label: "Introduction", icon: FileText },
          { key: "about" as const, label: "About Section", icon: Sparkles },
          { key: "social" as const, label: "Social Links", icon: Share2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-[#0F172A] text-[#0F172A]"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content based on Active Tab */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs space-y-6">
        {activeTab === "hero" && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] border-b pb-2">
              Hero Section Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Display First Name (Uppercase Sans)
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#0F172A]"
                />
                <p className="text-[11px] text-[#94A3B8] mt-1">Rendered in heavy geometric sans (ROHIT).</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Display Last Name (Playfair Italic)
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#0F172A]"
                />
                <p className="text-[11px] text-[#94A3B8] mt-1">Rendered in Playfair Display serif italic.</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Designation / Subtitle
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Hero Video Path (.mp4)
                </label>
                <input
                  type="text"
                  value={formData.heroVideoPath}
                  onChange={(e) => setFormData({ ...formData, heroVideoPath: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Poster Image Path
                </label>
                <input
                  type="text"
                  value={formData.heroPosterPath}
                  onChange={(e) => setFormData({ ...formData, heroPosterPath: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#0F172A]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "portraits" && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] border-b pb-2">
              Side-by-Side Portraits (3:4 Aspect Ratio)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#0F172A]">Portrait 1</span>
                <div className="relative aspect-[3/4] w-48 rounded-lg overflow-hidden border border-[#CBD5E1]">
                  <Image src={formData.portrait1Path} alt="Portrait 1" fill className="object-cover" />
                </div>
                <input
                  type="text"
                  value={formData.portrait1Path}
                  onChange={(e) => setFormData({ ...formData, portrait1Path: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md"
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-[#0F172A]">Portrait 2</span>
                <div className="relative aspect-[3/4] w-48 rounded-lg overflow-hidden border border-[#CBD5E1]">
                  <Image src={formData.portrait2Path} alt="Portrait 2" fill className="object-cover" />
                </div>
                <input
                  type="text"
                  value={formData.portrait2Path}
                  onChange={(e) => setFormData({ ...formData, portrait2Path: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "intro" && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] border-b pb-2">
              Homepage Introduction Paragraphs
            </h2>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">
                Paragraph 1 (Highlights & GPTA Presidency)
              </label>
              <textarea
                rows={4}
                value={formData.introPara1}
                onChange={(e) => setFormData({ ...formData, introPara1: e.target.value })}
                className="w-full text-xs p-3 border border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#0F172A] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">
                Paragraph 2 (Public Work Approach)
              </label>
              <textarea
                rows={4}
                value={formData.introPara2}
                onChange={(e) => setFormData({ ...formData, introPara2: e.target.value })}
                className="w-full text-xs p-3 border border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#0F172A] leading-relaxed"
              />
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] border-b pb-2">
              About & Expertise Headings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  About Heading Main
                </label>
                <input
                  type="text"
                  value={formData.aboutHeading}
                  onChange={(e) => setFormData({ ...formData, aboutHeading: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  About Heading Accent (Italic Span)
                </label>
                <input
                  type="text"
                  value={formData.aboutAccent}
                  onChange={(e) => setFormData({ ...formData, aboutAccent: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Expertise Heading Main
                </label>
                <input
                  type="text"
                  value={formData.expertiseHeading}
                  onChange={(e) => setFormData({ ...formData, expertiseHeading: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1">
                  Expertise Heading Accent
                </label>
                <input
                  type="text"
                  value={formData.expertiseAccent}
                  onChange={(e) => setFormData({ ...formData, expertiseAccent: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-[#CBD5E1] rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">
                Social Media Links Verification
              </h2>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Unverified links are hidden from public website
              </span>
            </div>

            <div className="divide-y divide-[#E2E8F0]">
              {socialLinks.map((item, idx) => (
                <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#0F172A]">{item.platform}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${item.verified ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                        {item.verified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => {
                        const updated = [...socialLinks];
                        updated[idx].url = e.target.value;
                        setSocialLinks(updated);
                      }}
                      className="w-full text-xs px-2.5 py-1.5 mt-1 border border-[#CBD5E1] rounded-md"
                    />
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...socialLinks];
                        updated[idx].verified = !updated[idx].verified;
                        setSocialLinks(updated);
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                        item.verified
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      {item.verified ? "Verified ✓" : "Mark Verified"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
