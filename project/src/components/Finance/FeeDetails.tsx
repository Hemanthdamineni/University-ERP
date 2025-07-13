import React, { useState } from 'react';
import { CreditCard, Calendar, Download, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockFinances } from '../../data/mockData';

const FeeDetails = () => {
  const [selectedYear, setSelectedYear] = useState('2024-25');

  const feeBreakdown = [
    {
      semester: 'Semester 6',
      year: '2024-25',
      tuitionFees: 125000,
      hostelFees: 45000,
      transportFees: 8000,
      examFees: 2500,
      libraryFees: 1500,
      miscFees: 3000,
      total: 185000,
      paid: 185000,
      status: 'Paid',
      dueDate: '2024-08-15',
      paidDate: '2024-08-10'
    },
    {
      semester: 'Semester 7',
      year: '2024-25',
      tuitionFees: 125000,
      hostelFees: 45000,
      transportFees: 8000,
      examFees: 2500,
      libraryFees: 1500,
      miscFees: 3000,
      total: 185000,
      paid: 0,
      status: 'Pending',
      dueDate: '2025-02-15',
      paidDate: null
    },
    {
      semester: 'Semester 5',
      year: '2023-24',
      tuitionFees: 120000,
      hostelFees: 42000,
      transportFees: 7500,
      examFees: 2500,
      libraryFees: 1500,
      miscFees: 2500,
      total: 176000,
      paid: 176000,
      status: 'Paid',
      dueDate: '2024-02-15',
      paidDate: '2024-02-10'
    }
  ];

  const totalDue = feeBreakdown
    .filter(fee => fee.status === 'Pending')
    .reduce((sum, fee) => sum + (fee.total - fee.paid), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-orange-600 bg-orange-100';
      case 'Overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'Overdue':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fee Details</h1>
            <p className="text-gray-600">View your fee structure and payment history</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="2024-25">Academic Year 2024-25</option>
              <option value="2023-24">Academic Year 2023-24</option>
              <option value="2022-23">Academic Year 2022-23</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2 inline" />
              Download Receipt
            </button>
          </div>
        </div>
      </div>

      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Due</p>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(totalDue)}</p>
              <p className="text-sm text-gray-500">
                {totalDue > 0 ? 'Payment pending' : 'No outstanding dues'}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Due Date</p>
              <p className="text-2xl font-bold text-orange-600">Feb 15, 2025</p>
              <p className="text-sm text-gray-500">Semester 7 fees</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Paid</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(feeBreakdown.reduce((sum, fee) => sum + fee.paid, 0))}
              </p>
              <p className="text-sm text-gray-500">Till date</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Outstanding Dues Alert */}
      {totalDue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Outstanding Dues</h3>
              <p className="text-red-700 mb-4">
                You have pending fees of {formatCurrency(totalDue)} due by February 15, 2025. 
                Late payment may result in additional charges and academic restrictions.
              </p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Pay Now
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-700 hover:bg-red-100 rounded-lg transition-colors">
                  View Payment Options
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fee Breakdown Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Semester-wise Fee Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tuition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hostel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Misc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feeBreakdown.map((fee, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{fee.semester}</div>
                      <div className="text-sm text-gray-500">{fee.year}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatCurrency(fee.tuitionFees)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatCurrency(fee.hostelFees)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatCurrency(fee.transportFees)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {formatCurrency(fee.examFees + fee.libraryFees + fee.miscFees)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(fee.total)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(fee.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(fee.status)}`}>
                        {fee.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fee.status === 'Pending' ? (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                        Pay Now
                      </button>
                    ) : (
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
                        View Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fee Structure Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Fee Structure Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Payment Schedule:</h4>
            <ul className="space-y-1">
              <li>• Semester fees due at the beginning of each semester</li>
              <li>• Late payment charges: 2% per month after due date</li>
              <li>• Installment options available for financial hardship</li>
              <li>• Scholarship adjustments applied automatically</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Payment Methods:</h4>
            <ul className="space-y-1">
              <li>• Online payment via portal (recommended)</li>
              <li>• Bank transfer to university account</li>
              <li>• Demand draft payable to SRM University AP</li>
              <li>• UPI payments accepted for amounts up to ₹2,00,000</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeDetails;