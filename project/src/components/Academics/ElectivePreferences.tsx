import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Clock, Users, Star, Save, Send, AlertCircle } from 'lucide-react';

const ElectivePreferences = () => {
  const [selectedTab, setSelectedTab] = useState('professional');
  const [preferences, setPreferences] = useState({
    professional: [],
    open: [],
    minor: []
  });

  const electiveOptions = {
    professional: [
      {
        id: 'pe1',
        code: 'CS401',
        name: 'Machine Learning',
        faculty: 'Dr. Rajesh Kumar',
        credits: 3,
        slot: 'A1',
        seats: 45,
        description: 'Introduction to ML algorithms and applications'
      },
      {
        id: 'pe2',
        code: 'CS402',
        name: 'Blockchain Technology',
        faculty: 'Dr. Priya Sharma',
        credits: 3,
        slot: 'B1',
        seats: 30,
        description: 'Fundamentals of blockchain and cryptocurrency'
      },
      {
        id: 'pe3',
        code: 'CS403',
        name: 'Cloud Computing',
        faculty: 'Dr. Amit Singh',
        credits: 3,
        slot: 'C1',
        seats: 40,
        description: 'Cloud platforms and distributed computing'
      },
      {
        id: 'pe4',
        code: 'CS404',
        name: 'Cyber Security',
        faculty: 'Dr. Neha Gupta',
        credits: 3,
        slot: 'D1',
        seats: 35,
        description: 'Network security and ethical hacking'
      }
    ],
    open: [
      {
        id: 'oe1',
        code: 'EC301',
        name: 'Digital Signal Processing',
        faculty: 'Dr. Ravi Patel',
        credits: 3,
        slot: 'A2',
        seats: 25,
        description: 'Signal processing techniques and applications'
      },
      {
        id: 'oe2',
        code: 'ME301',
        name: 'Robotics Engineering',
        faculty: 'Dr. Sita Devi',
        credits: 3,
        slot: 'B2',
        seats: 20,
        description: 'Robot design and control systems'
      },
      {
        id: 'oe3',
        code: 'BT301',
        name: 'Bioinformatics',
        faculty: 'Dr. Kiran Kumar',
        credits: 3,
        slot: 'C2',
        seats: 30,
        description: 'Computational biology and data analysis'
      }
    ],
    minor: [
      {
        id: 'mn1',
        code: 'DS301',
        name: 'Data Science Minor',
        faculty: 'Dr. Analytics Team',
        credits: 18,
        slot: 'Multiple',
        seats: 50,
        description: 'Complete data science specialization track'
      },
      {
        id: 'mn2',
        code: 'AI301',
        name: 'Artificial Intelligence Minor',
        faculty: 'Dr. AI Team',
        credits: 18,
        slot: 'Multiple',
        seats: 40,
        description: 'AI and machine learning specialization'
      }
    ]
  };

  const deadline = new Date('2025-03-15');
  const daysLeft = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(preferences[selectedTab]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPreferences(prev => ({
      ...prev,
      [selectedTab]: items
    }));
  };

  const addToPreferences = (elective) => {
    if (preferences[selectedTab].length >= 5) return;
    
    setPreferences(prev => ({
      ...prev,
      [selectedTab]: [...prev[selectedTab], elective]
    }));
  };

  const removeFromPreferences = (electiveId) => {
    setPreferences(prev => ({
      ...prev,
      [selectedTab]: prev[selectedTab].filter(item => item.id !== electiveId)
    }));
  };

  const availableElectives = electiveOptions[selectedTab].filter(
    elective => !preferences[selectedTab].find(pref => pref.id === elective.id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Elective Preferences</h1>
            <p className="text-gray-600">Select and rank your preferred elective courses</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-orange-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deadline Warning */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-orange-800">Important Instructions</h3>
            <ul className="text-sm text-orange-700 mt-1 space-y-1">
              <li>• Rank at least 3 options in order of preference</li>
              <li>• Check for slot clashes before submitting</li>
              <li>• Preferences cannot be changed after deadline</li>
              <li>• Allocation is based on CGPA and preference order</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'professional', label: 'Professional Electives' },
              { key: 'open', label: 'Open Electives' },
              { key: 'minor', label: 'Minor Courses' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Electives */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Courses</h3>
              <div className="space-y-4">
                {availableElectives.map((elective) => (
                  <div
                    key={elective.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{elective.name}</h4>
                        <p className="text-sm text-gray-500">{elective.code} • {elective.faculty}</p>
                      </div>
                      <button
                        onClick={() => addToPreferences(elective)}
                        disabled={preferences[selectedTab].length >= 5}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm rounded-lg transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{elective.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{elective.credits} credits</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Slot {elective.slot}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{elective.seats} seats</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Preferences ({preferences[selectedTab].length}/5)
              </h3>
              
              {preferences[selectedTab].length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Drag courses here or click "Add" to set preferences</p>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="preferences">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-3"
                      >
                        {preferences[selectedTab].map((elective, index) => (
                          <Draggable key={elective.id} draggableId={elective.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`border rounded-lg p-4 bg-white transition-shadow ${
                                  snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900">{elective.name}</h4>
                                      <p className="text-sm text-gray-500">{elective.code} • Slot {elective.slot}</p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => removeFromPreferences(elective.id)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            <p>Make sure to rank at least 3 preferences before submitting.</p>
            <p>You can save as draft and return later to make changes.</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Save className="w-4 h-4 mr-2 inline" />
              Save Draft
            </button>
            <button 
              disabled={preferences[selectedTab].length < 3}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4 mr-2 inline" />
              Submit Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectivePreferences;