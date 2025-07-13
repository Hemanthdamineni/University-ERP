"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { CheckCircleIcon, ExclamationTriangleIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";

interface SapSummary {
  credits: number;
  eligibilityScore: number;
  remarks: string;
}

interface ScholarshipStatus {
  id: string;
  name: string;
  type: string;
  status: "applied" | "under_review" | "approved" | "rejected";
  amount: number;
  disbursementDate?: string;
  isNew?: boolean;
}

export default function ScholarshipsPage() {
  const [loading, setLoading] = useState(true);
  const [sap, setSap] = useState<SapSummary | null>(null);
  const [scholarships, setScholarships] = useState<ScholarshipStatus[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSap({
        credits: 18,
        eligibilityScore: 8.4,
        remarks: "Maintain CGPA > 8.0 for continued eligibility."
      });
      setScholarships([
        {
          id: "sch-001",
          name: "Merit Scholarship",
          type: "Merit",
          status: "approved",
          amount: 25000,
          disbursementDate: "2024-09-01",
        },
        {
          id: "sch-002",
          name: "Need-Based Grant",
          type: "Need-Based",
          status: "under_review",
          amount: 15000,
          isNew: true,
        },
        {
          id: "sch-003",
          name: "External Foundation Award",
          type: "External",
          status: "applied",
          amount: 10000,
        },
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  const applyForScholarship = () => {
    alert("Redirecting to scholarship application form...");
  };

  const downloadCertificate = (name: string) => {
    alert(`Downloading certificate for ${name}...`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SAP & Scholarships</h1>
            <p className="text-gray-600">Track your SAP credits and scholarship status</p>
          </div>

          {/* SAP Credits Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SAP Credits</h3>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
              <div>
                <span className="text-gray-500">Total SAP Credits:</span>
                <span className="ml-2 text-xl font-bold text-indigo-700">{sap?.credits}</span>
              </div>
              <div>
                <span className="text-gray-500">Eligibility Score:</span>
                <span className="ml-2 text-lg font-semibold text-green-700">{sap?.eligibilityScore}</span>
              </div>
              <div>
                <span className="text-gray-500">Remarks:</span>
                <span className="ml-2 text-sm text-gray-700">{sap?.remarks}</span>
              </div>
            </div>
          </div>

          {/* Scholarship Status Table */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Scholarship Status</h3>
              <button
                onClick={applyForScholarship}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-medium"
              >Apply Now</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Scholarship Name</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Disbursement Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((sch) => (
                    <tr key={sch.id} className={sch.isNew ? "bg-yellow-50" : ""}>
                      <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-2">
                        {sch.name}
                        {sch.isNew && (
                          <span className="ml-1 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded-full">New</span>
                        )}
                      </td>
                      <td className="px-4 py-2">{sch.type}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          sch.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : sch.status === "under_review"
                            ? "bg-yellow-100 text-yellow-700"
                            : sch.status === "applied"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {sch.status === "approved" && <CheckCircleIcon className="w-4 h-4" />}
                          {sch.status === "under_review" && <ExclamationTriangleIcon className="w-4 h-4" />}
                          {sch.status === "applied" && <span>⏳</span>}
                          {sch.status === "rejected" && <span>✖</span>}
                          {sch.status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-4 py-2">₹{sch.amount.toLocaleString()}</td>
                      <td className="px-4 py-2">{sch.disbursementDate || "-"}</td>
                      <td className="px-4 py-2">
                        {sch.status === "approved" && (
                          <button
                            onClick={() => downloadCertificate(sch.name)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 text-xs"
                          >
                            <DocumentArrowDownIcon className="w-4 h-4" />
                            Certificate
                          </button>
                        )}
                        <a
                          href="/assets/scholarship-guidelines.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-indigo-600 underline text-xs"
                        >View Guidelines</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 