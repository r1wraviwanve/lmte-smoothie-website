import Link from "next/link";
import {
  FileText,
  Rocket,
  Newspaper,
  User,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Plus,
  ArrowUpRight,
  Database,
  Layers,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Public Representations", count: "3", subtext: "150+ in official archive", icon: FileText, href: "/admin/representations", color: "text-blue-600 bg-blue-50 border-blue-200" },
    { label: "Active Initiatives", count: "5", subtext: "Audits, Canteens, Safety", icon: Rocket, href: "/admin/initiatives", color: "text-amber-600 bg-amber-50 border-amber-200" },
    { label: "Media & Press Items", count: "4", subtext: "YouTube, Facebook, Print", icon: Newspaper, href: "/admin/media", color: "text-rose-600 bg-rose-50 border-rose-200" },
    { label: "Milestones / Journey", count: "3", subtext: "2015 — Present", icon: Layers, href: "/admin/journey", color: "text-purple-600 bg-purple-50 border-purple-200" },
  ];

  const needsAttention = [
    {
      title: "Social Links Need Official Verification",
      description: "4 social media links (Facebook, Twitter/X, YouTube, Instagram) imported as is_verified = false until confirmed.",
      type: "warning",
      actionText: "Verify Links",
      href: "/admin/profile",
    },
    {
      title: "Impact Counter Verification Pending",
      description: "Counter '150+ Public Representations' is active in database with verified = false.",
      type: "warning",
      actionText: "Review Counter",
      href: "/admin/settings",
    },
    {
      title: "3 Journey Milestones Flagged With [PLACEHOLDER]",
      description: "Labels contain [PLACEHOLDER] (2022 Present President GPTA, 2018 Advocate, 2015 Mobilizer) awaiting date confirmation.",
      type: "info",
      actionText: "Review Milestones",
      href: "/admin/journey",
    },
    {
      title: "Draft Representations Ready for Review",
      description: "Representations #01 (Sakal), #02 (Punyanagari), and #03 (Mid-Day) are saved in draft status.",
      type: "info",
      actionText: "Manage Status",
      href: "/admin/representations",
    },
  ];

  const recentRepresentations = [
    { number: "#01", title: "शाळांना कायमस्वरूपी क्रीडांगण बंधनकारक करा!", category: "School Infrastructure", source: "Sakal", date: "Aug 06, 2026", status: "Draft" },
    { number: "#02", title: "शाळांसाठी क्रीडांगण बंधनकारक करा — मनपाकडे मागणी", category: "DCPR 2034 Compliance", source: "Punyanagari", date: "Aug 06, 2026", status: "Draft" },
    { number: "#03", title: "Playground Regulations & Student Stress Reduction", category: "Student Welfare", source: "Mid-Day", date: "Sep 19, 2026", status: "Draft" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Administration CMS</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Manage Rohit Dandawate profile, impact records, initiatives, media archives, and system configurations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] rounded-lg shadow-2xs hover:bg-[#F8FAFC] transition-colors"
          >
            <User className="w-4 h-4 text-[#64748B]" />
            <span>Edit Profile</span>
          </Link>

          <Link
            href="/admin/representations"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Representation</span>
          </Link>
        </div>
      </div>

      {/* 2. Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-2xs hover:shadow-xs hover:border-[#CBD5E1] transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#64748B]">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors">
                  {stat.count}
                </div>
                <div className="text-xs text-[#94A3B8] mt-1 flex items-center gap-1">
                  <span>{stat.subtext}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. Needs Attention & Database Integrity Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                Needs Attention
              </h2>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {needsAttention.length} Items
            </span>
          </div>

          <div className="space-y-3">
            {needsAttention.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h3 className="text-xs font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{item.description}</p>
                </div>
                <Link
                  href={item.href}
                  className="shrink-0 px-3 py-1.5 text-xs font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] rounded-md shadow-2xs hover:bg-[#F1F5F9] transition-colors self-start sm:self-center"
                >
                  {item.actionText}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Database Status & Quick Access */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-[#F1F5F9] mb-4">
              <Database className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                Database & Schema Status
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-[#F8FAFC]">
                <span className="text-[#64748B]">Migration Status</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Initial Schema Deployed
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F8FAFC]">
                <span className="text-[#64748B]">PostgreSQL Tables</span>
                <span className="font-semibold text-[#0F172A]">34 Tables with RLS</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F8FAFC]">
                <span className="text-[#64748B]">Homepage Seed</span>
                <span className="font-semibold text-blue-600">supabase/seed.sql Ready</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F8FAFC]">
                <span className="text-[#64748B]">Storage Buckets</span>
                <span className="font-semibold text-[#0F172A]">public-media, documents, submissions</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[#64748B]">Role Enforcement</span>
                <span className="font-semibold text-purple-700">super_admin / admin / editor</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F1F5F9]">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-[#1E293B] transition-colors"
            >
              <span>Preview Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Recent Representations Table Preview */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Recent Representations (Impact Section)
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              These records drive the 150+ Public Representations gallery on the public homepage.
            </p>
          </div>

          <Link
            href="/admin/representations"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold">
              <tr>
                <th className="py-3 px-6">Number</th>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Source</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {recentRepresentations.map((row) => (
                <tr key={row.number} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-6 font-bold text-[#0F172A]">{row.number}</td>
                  <td className="py-3.5 px-6 font-medium text-[#0F172A] max-w-sm truncate">{row.title}</td>
                  <td className="py-3.5 px-6 text-[#64748B]">{row.category}</td>
                  <td className="py-3.5 px-6 text-[#64748B]">{row.source}</td>
                  <td className="py-3.5 px-6 text-[#64748B]">{row.date}</td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      href="/admin/representations"
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
