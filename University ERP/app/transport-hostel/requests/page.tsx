"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";

export default function RequestsPage() {
  const [requests] = useState([
    { id: 1, type: "Leave", date: "2024-06-01", status: "Pending", details: "Family Function" },
    { id: 2, type: "Maintenance", date: "2024-06-05", status: "In Progress", details: "Broken chair" },
    { id: 3, type: "Transport", date: "2024-06-10", status: "Approved", details: "Bus route change" },
  ]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Requests</h1>
            <p className="text-gray-600">View and manage all your hostel and transport related requests</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">All Requests</h2>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-4 py-2">{req.type}</td>
                    <td className="px-4 py-2">{req.date}</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{req.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
