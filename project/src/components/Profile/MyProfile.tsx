import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Download, 
  Edit3, 
  Save, 
  X,
  Calendar,
  Hash,
  Home,
  FileText
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    phone: user?.phone || '',
    email: user?.email || '',
    address: '123 Main Street, Amaravati, Andhra Pradesh 522503'
  });

  const handleSave = () => {
    // Here you would typically make an API call to update the user data
    console.log('Saving data:', editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      phone: user?.phone || '',
      email: user?.email || '',
      address: '123 Main Street, Amaravati, Andhra Pradesh 522503'
    });
    setIsEditing(false);
  };

  const documents = [
    { name: 'Bonafide Certificate', type: 'PDF', size: '245 KB' },
    { name: 'Academic Transcript', type: 'PDF', size: '189 KB' },
    { name: 'ID Card', type: 'PDF', size: '95 KB' },
    { name: 'Fee Receipt - Semester 6', type: 'PDF', size: '156 KB' },
    { name: 'Course Completion Certificate', type: 'PDF', size: '203 KB' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and documents</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 mr-2 inline" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4 mr-2 inline" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-2 inline" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          
          {/* Profile Picture */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <img
                src={user?.profilePicture || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-gray-200"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-gray-600">{user?.rollNumber}</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Non-editable fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Read-only</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.rollNumber}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Read-only</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">March 15, 2002</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Read-only</span>
              </div>
            </div>

            {/* Editable fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{user?.phone}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{user?.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              {isEditing ? (
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-2" />
                  <textarea
                    value={editedData.address}
                    onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                    rows={3}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="text-gray-900">123 Main Street, Amaravati, Andhra Pradesh 522503</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.program}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.branch}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">Semester {user?.semester}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.academicYear}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current CGPA</label>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.cgpa}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Room</label>
              <div className="flex items-center space-x-2">
                <Home className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.hostelRoom}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transport Route</label>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{user?.transportRoute}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents & Downloads</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{doc.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-blue-100 rounded-lg transition-all">
                  <Download className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> All documents are automatically generated and watermarked with official university seal. 
            For any discrepancies, please contact the academic office through the helpdesk.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;