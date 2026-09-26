import { ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Compass,
  Briefcase,
  Award,
  FileText,
  Rocket,
  Video,
  Image as ImageIcon,
  FolderOpen,
  Newspaper,
  Calendar,
  Mail,
  AlertCircle,
  Mic,
  Settings,
  ShieldCheck,
  Search,
  ExternalLink,
  Users,
} from "lucide-react";

const navigationGroups = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Profile",
    items: [
      { name: "Profile & Hero", href: "/admin/profile", icon: User },
      { name: "Journey Timeline", href: "/admin/journey", icon: Compass },
      { name: "Areas of Work", href: "/admin/areas-of-work", icon: Briefcase },
      { name: "GPTA Page", href: "/admin/gpta", icon: Award },
    ],
  },
  {
    title: "Impact",
    items: [
      { name: "Representations", href: "/admin/representations", icon: FileText, badge: "3" },
      { name: "Initiatives", href: "/admin/initiatives", icon: Rocket, badge: "5" },
      { name: "Recognition", href: "/admin/recognition", icon: Award },
    ],
  },
  {
    title: "Media Library",
    items: [
      { name: "Media & Press", href: "/admin/media", icon: Newspaper, badge: "4" },
      { name: "Video Library", href: "/admin/videos", icon: Video },
      { name: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon },
      { name: "Documents", href: "/admin/documents", icon: FolderOpen },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Articles & Op-Eds", href: "/admin/articles", icon: Newspaper },
      { name: "Events & Talks", href: "/admin/events", icon: Calendar },
    ],
  },
  {
    title: "Inbox",
    items: [
      { name: "Contact Messages", href: "/admin/inbox/contact", icon: Mail },
      { name: "Education Concerns", href: "/admin/inbox/concerns", icon: AlertCircle },
      { name: "Speaking Invites", href: "/admin/inbox/speaking", icon: Mic },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Settings & Counters", href: "/admin/settings", icon: Settings },
      { name: "SEO & Redirects", href: "/admin/seo", icon: Search },
      { name: "Users & Roles", href: "/admin/users", icon: Users },
      { name: "Audit Logs", href: "/admin/audit-logs", icon: ShieldCheck },
    ],
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex antialiased">
      {/* 1. Left Sidebar (Fixed 260px) */}
      <aside className="w-64 border-r border-[#E2E8F0] bg-white flex flex-col fixed inset-y-0 left-0 z-30 shadow-sm">
        {/* Brand Header */}
        <div className="h-16 border-b border-[#E2E8F0] flex items-center justify-between px-6 bg-white">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm tracking-wider">
              RD
            </div>
            <div>
              <div className="font-bold text-sm leading-tight text-[#0F172A]">Rohit Dandawate</div>
              <div className="text-[11px] font-medium text-[#64748B]">Admin CMS v2.0</div>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navigationGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                {group.title}
              </div>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium text-[#334155] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#64748B]" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#E2E8F0] text-[#334155] rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-medium text-[#0F172A] bg-white border border-[#CBD5E1] rounded-md shadow-xs hover:bg-[#F1F5F9] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
            <span>View Public Site</span>
          </Link>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-[#E2E8F0] bg-white sticky top-0 z-20 px-8 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-[#64748B]">Workspace</span>
            <span className="text-xs text-[#CBD5E1]">/</span>
            <span className="text-xs font-semibold text-[#0F172A]">Production Database</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Database Connected</span>
            </div>

            <div className="flex items-center gap-2.5 pl-4 border-l border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-full bg-[#E2E8F0] text-[#334155] font-semibold text-xs flex items-center justify-center">
                SA
              </div>
              <div className="text-left text-xs hidden sm:block">
                <div className="font-semibold text-[#0F172A]">Super Admin</div>
                <div className="text-[11px] text-[#64748B]">admin@rohitdandawate.org</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
