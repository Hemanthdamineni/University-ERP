"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

interface FeeComponent {
  name: string;
  amount: number;
  status: "paid" | "unpaid" | "partial";
}

interface SemesterFee {
  semester: string;
  academicYear: string;
  tuitionFees: number;
  hostelFees: number;
  transportFees: number;
  miscellaneous: number;
  total: number;
  paidAmount: number;
  status: "paid" | "unpaid" | "partial";
  dueDate: string;
  components: FeeComponent[];
}

export default function FeeDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [feeData, setFeeData] = useState<SemesterFee[]>([]);
  const [totalDue, setTotalDue] = useState(0);
  const [overdue, setOverdue] = useState(0);

  useEffect(() => {
    const loadFeeData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockData: SemesterFee[] = [
        {
          semester: "Semester 1",
          academicYear: "2023-24",
          tuitionFees: 125000,
          hostelFees: 45000,
          transportFees: 15000,
          miscellaneous: 8500,
          total: 193500,
          paidAmount: 193500,
          status: "paid",
          dueDate: "2023-07-15",
          components: [
            { name: "Tuition Fees", amount: 125000, status: "paid" },
            { name: "Hostel Fees", amount: 45000, status: "paid" },
            { name: "Transport Fees", amount: 15000, status: "paid" },
            { name: "Library Fee", amount: 3500, status: "paid" },
            { name: "Exam Fee", amount: 2000, status: "paid" },
            { name: "Sports Fee", amount: 3000, status: "paid" },
          ],
        },
        {
          semester: "Semester 2",
          academicYear: "2023-24",
          tuitionFees: 125000,
          hostelFees: 45000,
          transportFees: 15000,
          miscellaneous: 8500,
          total: 193500,
          paidAmount: 193500,
          status: "paid",
          dueDate: "2024-01-15",
          components: [
            { name: "Tuition Fees", amount: 125000, status: "paid" },
            { name: "Hostel Fees", amount: 45000, status: "paid" },
            { name: "Transport Fees", amount: 15000, status: "paid" },
            { name: "Library Fee", amount: 3500, status: "paid" },
            { name: "Exam Fee", amount: 2000, status: "paid" },
            { name: "Sports Fee", amount: 3000, status: "paid" },
          ],
        },
        {
          semester: "Semester 3",
          academicYear: "2024-25",
          tuitionFees: 130000,
          hostelFees: 47000,
          transportFees: 16000,
          miscellaneous: 9000,
          total: 202000,
          paidAmount: 202000,
          status: "paid",
          dueDate: "2024-07-15",
          components: [
            { name: "Tuition Fees", amount: 130000, status: "paid" },
            { name: "Hostel Fees", amount: 47000, status: "paid" },
            { name: "Transport Fees", amount: 16000, status: "paid" },
            { name: "Library Fee", amount: 3500, status: "paid" },
            { name: "Exam Fee", amount: 2500, status: "paid" },
            { name: "Sports Fee", amount: 3000, status: "paid" },
          ],
        },
        {
          semester: "Semester 4",
          academicYear: "2024-25",
          tuitionFees: 130000,
          hostelFees: 47000,
          transportFees: 16000,
          miscellaneous: 9000,
          total: 202000,
          paidAmount: 150000,
          status: "partial",
          dueDate: "2025-01-15",
          components: [
            { name: "Tuition Fees", amount: 130000, status: "paid" },
            { name: "Hostel Fees", amount: 47000, status: "unpaid" },
            { name: "Transport Fees", amount: 16000, status: "paid" },
            { name: "Library Fee", amount: 3500, status: "paid" },
            { name: "Exam Fee", amount: 2500, status: "unpaid" },
            { name: "Sports Fee", amount: 3000, status: "unpaid" },
          ],
        },
      ];

      setFeeData(mockData);

      // Calculate totals
      const due = mockData.reduce(
        (sum, sem) => sum + (sem.total - sem.paidAmount),
        0,
      );
      setTotalDue(due);

      // Calculate overdue (simplified check - in real app would check dates)
      const overdueAmount = mockData
        .filter(
          (sem) => sem.status !== "paid" && new Date(sem.dueDate) < new Date(),
        )
        .reduce((sum, sem) => sum + (sem.total - sem.paidAmount), 0);
      setOverdue(overdueAmount);

      setLoading(false);
    };

    loadFeeData();
  }, [selectedYear]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-700 bg-green-100";
      case "unpaid":
        return "text-red-700 bg-red-100";
      case "partial":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "unpaid":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case "partial":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const downloadInvoice = (semester: string) => {
    alert(`Downloading invoice for ${semester}...`);
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Fee Details
            </h1>
            <p className="text-gray-600">
              Monitor your fee payments and due amounts
            </p>
          </div>

          {/* Fee Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div
              className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${totalDue > 0 ? "border-red-500" : "border-green-500"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Total Due
                  </h3>
                  <p
                    className={`text-2xl font-bold ${totalDue > 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    {formatCurrency(totalDue)}
                  </p>
                </div>
                {getStatusIcon(totalDue > 0 ? "unpaid" : "paid")}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {totalDue > 0 ? "Payment required" : "All fees cleared"}
              </p>
            </div>

            <div
              className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${overdue > 0 ? "border-red-500" : "border-gray-300"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Overdue Amount
                  </h3>
                  <p
                    className={`text-2xl font-bold ${overdue > 0 ? "text-red-600" : "text-gray-500"}`}
                  >
                    {formatCurrency(overdue)}
                  </p>
                </div>
                {overdue > 0 && (
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {overdue > 0
                  ? "Immediate payment required"
                  : "No overdue amount"}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Next Due Date
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">Jan 15</p>
                </div>
                <ClockIcon className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Semester 4 payment</p>
            </div>
          </div>

          {/* Filter and Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="2023-24">2023-24</option>
                  <option value="2024-25">2024-25</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <DocumentArrowDownIcon className="w-5 h-5" />
                Fee Policy
              </button>
            </div>
          </div>

          {/* Fee Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Semester-wise Fee Breakdown
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tuition
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hostel
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transport
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Miscellaneous
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feeData.map((fee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {fee.semester}
                          </div>
                          <div className="text-sm text-gray-500">
                            {fee.academicYear}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatCurrency(fee.tuitionFees)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatCurrency(fee.hostelFees)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatCurrency(fee.transportFees)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatCurrency(fee.miscellaneous)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                        {formatCurrency(fee.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(fee.status)}`}
                        >
                          {fee.status.charAt(0).toUpperCase() +
                            fee.status.slice(1)}
                        </span>
                        {fee.status === "partial" && (
                          <div className="text-xs text-gray-500 mt-1">
                            Paid: {formatCurrency(fee.paidAmount)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => downloadInvoice(fee.semester)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Fee Policy
              </h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Late payment charges: 2% per month after due date</li>
                <li>• Partial payments accepted with prior approval</li>
                <li>• Refunds processed within 30 working days</li>
                <li>• Fee structure subject to annual revision</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900 mb-2">
                Scholarship Adjustments
              </h4>
              <ul className="text-xs text-green-800 space-y-1">
                <li>• Merit scholarship: 25% tuition fee waiver applied</li>
                <li>• SAP credits automatically adjusted in billing</li>
                <li>• Need-based assistance available on request</li>
                <li>• External scholarships require documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
