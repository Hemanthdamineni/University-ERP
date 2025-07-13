"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  CreditCardIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface PaymentItem {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  isSelected: boolean;
  category: "tuition" | "hostel" | "transport" | "misc";
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  mode: string;
  transactionId: string;
  status: "success" | "failed" | "pending";
}

export default function FeePaymentPage() {
  const [loading, setLoading] = useState(true);
  const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<
    "upi" | "netbanking" | "card" | "wallet"
  >("upi");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const loadPaymentData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setPaymentItems([
        {
          id: "hostel-4",
          name: "Hostel Fees - Semester 4",
          amount: 47000,
          dueDate: "2025-01-15",
          isSelected: true,
          category: "hostel",
        },
        {
          id: "exam-4",
          name: "Exam Fee - Semester 4",
          amount: 2500,
          dueDate: "2025-01-15",
          isSelected: true,
          category: "misc",
        },
        {
          id: "sports-4",
          name: "Sports Fee - Semester 4",
          amount: 3000,
          dueDate: "2025-01-15",
          isSelected: false,
          category: "misc",
        },
      ]);

      setPaymentHistory([
        {
          id: "pay-001",
          date: "2024-12-15",
          amount: 146000,
          mode: "Net Banking",
          transactionId: "TXN123456789",
          status: "success",
        },
        {
          id: "pay-002",
          date: "2024-07-10",
          amount: 202000,
          mode: "UPI",
          transactionId: "UPI987654321",
          status: "success",
        },
        {
          id: "pay-003",
          date: "2024-01-12",
          amount: 193500,
          mode: "Credit Card",
          transactionId: "CC456789123",
          status: "success",
        },
      ]);

      setLoading(false);
    };

    loadPaymentData();
  }, []);

  const togglePaymentItem = (id: string) => {
    setPaymentItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  const selectedItems = paymentItems.filter((item) => item.isSelected);
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.amount, 0);

  const initiatePayment = async () => {
    if (totalAmount === 0) return;

    setProcessing(true);
    setShowPaymentModal(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Add to payment history
    const newPayment: PaymentHistory = {
      id: `pay-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      amount: totalAmount,
      mode:
        selectedPaymentMode.charAt(0).toUpperCase() +
        selectedPaymentMode.slice(1),
      transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: "success",
    };

    setPaymentHistory((prev) => [newPayment, ...prev]);

    // Remove paid items
    setPaymentItems((prev) => prev.filter((item) => !item.isSelected));

    setProcessing(false);
    setTimeout(() => setShowPaymentModal(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-700 bg-green-100";
      case "failed":
        return "text-red-700 bg-red-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const downloadReceipt = (transactionId: string) => {
    alert(`Downloading receipt for transaction ${transactionId}...`);
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Fee Payment
            </h1>
            <p className="text-gray-600">
              Pay your pending fees securely through multiple payment options
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Section */}
            <div className="space-y-6">
              {/* Outstanding Balance */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Outstanding Balance
                </h3>

                {paymentItems.length > 0 ? (
                  <div className="space-y-3">
                    {paymentItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={item.isSelected}
                            onChange={() => togglePaymentItem(item.id)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Due: {new Date(item.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                    ))}

                    <div className="border-t pt-3 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                          Total Amount:
                        </span>
                        <span className="text-xl font-bold text-indigo-600">
                          {formatCurrency(totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-600">All fees are up to date!</p>
                  </div>
                )}
              </div>

              {/* Payment Gateway */}
              {totalAmount > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => setSelectedPaymentMode("upi")}
                      className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                        selectedPaymentMode === "upi"
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <DevicePhoneMobileIcon className="w-5 h-5" />
                      UPI
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMode("netbanking")}
                      className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                        selectedPaymentMode === "netbanking"
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <BanknotesIcon className="w-5 h-5" />
                      Net Banking
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMode("card")}
                      className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                        selectedPaymentMode === "card"
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <CreditCardIcon className="w-5 h-5" />
                      Cards
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMode("wallet")}
                      className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                        selectedPaymentMode === "wallet"
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <DevicePhoneMobileIcon className="w-5 h-5" />
                      Wallet
                    </button>
                  </div>

                  <button
                    onClick={initiatePayment}
                    disabled={totalAmount === 0}
                    className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Pay {formatCurrency(totalAmount)}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Payments are processed securely through our trusted payment
                    partners
                  </p>
                </div>
              )}
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment History
              </h3>

              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(payment.amount)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="block text-xs text-gray-500">
                          Date
                        </span>
                        {new Date(payment.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500">
                          Mode
                        </span>
                        {payment.mode}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        TXN: {payment.transactionId}
                      </span>
                      <button
                        onClick={() => downloadReceipt(payment.transactionId)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Download Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Security & Privacy
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• All transactions are encrypted and secure</li>
              <li>• Payment confirmation will be sent via email and SMS</li>
              <li>
                • Refunds will be processed to the original payment source
              </li>
              <li>• Keep your transaction receipts for future reference</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Processing Payment
                  </h3>
                  <p className="text-gray-600">
                    Please wait while we process your payment...
                  </p>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-600">
                    Your payment has been processed successfully.
                  </p>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
