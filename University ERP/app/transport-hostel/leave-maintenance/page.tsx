"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";

export default function LeaveMaintenancePage() {
  const [tab, setTab] = useState<"leave" | "maintenance">("leave");
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, date: "2024-05-10", reason: "Medical", status: "Approved" },
    { id: 2, date: "2024-06-01", reason: "Family Function", status: "Pending" },
  ]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    { id: 1, issue: "Leaky tap", date: "2024-05-15", status: "Resolved" },
    { id: 2, issue: "Broken chair", date: "2024-06-05", status: "In Progress" },
  ]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Leave & Maintenance</h1>
            <p className="text-gray-600">Request leave or report maintenance issues</p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded ${tab === "leave" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border"}`}
              onClick={() => setTab("leave")}
            >
              Leave Requests
            </button>
            <button
              className={`px-4 py-2 rounded ${tab === "maintenance" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border"}`}
              onClick={() => setTab("maintenance")}
            >
              Maintenance Requests
            </button>
          </div>

          {tab === "leave" ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Your Leave Requests</h2>
              <ul className="divide-y divide-gray-200">
                {leaveRequests.map((req) => (
                  <li key={req.id} className="py-2 flex justify-between items-center">
                    <span>
                      {req.date} - {req.reason}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {req.status}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-medium">
                New Leave Request
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Your Maintenance Requests</h2>
              <ul className="divide-y divide-gray-200">
                {maintenanceRequests.map((req) => (
                  <li key={req.id} className="py-2 flex justify-between items-center">
                    <span>
                      {req.date} - {req.issue}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {req.status}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-medium">
                New Maintenance Request
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 