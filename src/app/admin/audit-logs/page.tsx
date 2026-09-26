"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuditLogsAdminPage() {
  const [logs] = useState([
    {
      id: "1",
      action: "UPDATE",
      entity: "site_profile",
      actor: "admin@rohitdandawate.org",
      summary: "Updated Hero video and overlay opacity",
      timestamp: "Today at 02:15 AM",
    },
    {
      id: "2",
      action: "INSERT",
      entity: "media_items",
      actor: "admin@rohitdandawate.org",
      summary: "Imported 4 media archive items from seed",
      timestamp: "Today at 02:06 AM",
    },
    {
      id: "3",
      action: "MIGRATION",
      entity: "schema_20260926000001",
      actor: "system",
      summary: "Deployed 34 tables with Row Level Security",
      timestamp: "Today at 02:00 AM",
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
            <span>System</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Audit Trail & Security Logs</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Append-only security log recording administrative actions and content mutations.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold">
            <tr>
              <th className="py-3 px-6">Action</th>
              <th className="py-3 px-6">Entity</th>
              <th className="py-3 px-6">Actor</th>
              <th className="py-3 px-6">Summary</th>
              <th className="py-3 px-6">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#F8FAFC]">
                <td className="py-3.5 px-6">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {log.action}
                  </span>
                </td>
                <td className="py-3.5 px-6 font-mono text-[#0F172A]">{log.entity}</td>
                <td className="py-3.5 px-6 text-[#64748B]">{log.actor}</td>
                <td className="py-3.5 px-6 text-[#334155]">{log.summary}</td>
                <td className="py-3.5 px-6 text-[#94A3B8]">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
