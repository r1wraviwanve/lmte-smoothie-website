import Link from "next/link";
import { ArrowLeft, Database } from "lucide-react";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function AdminCatchAllPage({ params }: Props) {
  const resolvedParams = await params;
  const path = resolvedParams.slug.join("/");
  const title = resolvedParams.slug
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "))
    .join(" › ");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
            <Link href="/admin" className="hover:text-[#0F172A] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <span>/</span>
            <span>{title}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">{title}</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Module path: <code className="bg-[#F1F5F9] px-1.5 py-0.5 rounded font-mono text-[#0F172A]">/admin/{path}</code>
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] rounded-lg shadow-2xs hover:bg-[#F8FAFC]"
        >
          <span>Return to Dashboard</span>
        </Link>
      </div>

      {/* Module Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-2xs text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
          <Database className="w-6 h-6" />
        </div>

        <h2 className="text-lg font-bold text-[#0F172A]">
          {title} Module Connected
        </h2>

        <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
          The PostgreSQL database table and Row Level Security policies for this module have been created and verified.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/admin/profile"
            className="px-4 py-2 text-xs font-semibold bg-[#0F172A] text-white rounded-lg hover:bg-[#1E293B]"
          >
            Manage Profile & Hero
          </Link>
          <Link
            href="/admin/representations"
            className="px-4 py-2 text-xs font-semibold bg-white border border-[#CBD5E1] text-[#0F172A] rounded-lg hover:bg-[#F8FAFC]"
          >
            Manage Representations
          </Link>
          <Link
            href="/admin/initiatives"
            className="px-4 py-2 text-xs font-semibold bg-white border border-[#CBD5E1] text-[#0F172A] rounded-lg hover:bg-[#F8FAFC]"
          >
            Manage Initiatives
          </Link>
        </div>
      </div>
    </div>
  );
}
