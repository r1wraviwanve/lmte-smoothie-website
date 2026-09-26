"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";

export default function UsersAdminPage() {
  const [users] = useState([
    {
      id: "1",
      email: "admin@rohitdandawate.org",
      role: "super_admin",
      status: "Active",
      mfa: "Enforced",
      lastLogin: "Just now",
    },
    {
      id: "2",
      email: "editor@rohitdandawate.org",
      role: "editor",
      status: "Active",
      mfa: "Optional",
      lastLogin: "2 days ago",
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
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Users & Access Roles</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage administrative access and invite-only team permissions.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg shadow-2xs hover:bg-[#1E293B]">
          <Plus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold">
            <tr>
              <th className="py-3 px-6">User Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">MFA Status</th>
              <th className="py-3 px-6">Account Status</th>
              <th className="py-3 px-6">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[#F8FAFC]">
                <td className="py-3.5 px-6 font-semibold text-[#0F172A]">{u.email}</td>
                <td className="py-3.5 px-6">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-[#64748B]">{u.mfa}</td>
                <td className="py-3.5 px-6">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-[#94A3B8]">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
