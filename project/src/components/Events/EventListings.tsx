import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Search, Filter, Star } from 'lucide-react';
import { mockEvents } from '../../data/mockData';

const EventListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const allEvents = [
    ...mockEvents,
    {
      id: '4',
      title: 'AI/ML Workshop',
      description: 'Hands-on workshop on machine learning fundamentals and practical applications.',
      date: '2025-02-18',
      venue: 'Computer Lab 1',
      category: 'Technical',
      organizer: 'CSE Department',
      registrationDeadline: '2025-02-15',
      isRegistered: false,
      seats: 50,
      registeredCount: 32,
      eligibility: 'B.Tech 2nd year and above',
      contactEmail: 'aiml.workshop@srmap.edu.in'
    },
    {
      id: '5',
      title: 'Annual Sports Meet',
      description: 'Inter-department sports competition featuring cricket, football, basketball and more.',
      date: '2025-03-01',
      venue: 'Sports Complex',
      category: 'Sports',
      organizer: 'Sports Committee',
      registrationDeadline: '2025-02-25',
      isRegistered: false,
      seats: 200,
      registeredCount: 145,
      eligibility: 'All students',
      contactEmail: 'sports@srmap.edu.in'
    },
    {
      id: '6',
      title: 'Entrepreneurship Summit',
      description: 'Meet successful entrepreneurs and learn about startup ecosystem.',
      date: '2025-02-28',
      venue: 'Main Auditorium',
      category: 'Academic',
      organizer: 'E-Cell',
      registrationDeadline: '2025-02-22',
      isRegistered: true,
      seats: 300,
      registeredCount: 287,
      eligibility: 'All students',
      contactEmail: 'ecell@srmap.edu.in'
    }
  ];

  const categories = ['all', 'Academic', 'Cultural', 'Technical', 'Sports'];
  const departments = ['all', 'CSE Department', 'Cultural Committee', 'Sports Committee', 'E-Cell', 'Research Cell'];

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDepartment = selectedDepartment === 'all' || event.organizer === selectedDepartment;
    
    return matchesSearch && matchesCategory && matchesDepartment;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Academic': 'bg-blue-100 text-blue-800',
      'Cultural': 'bg-purple-100 text-purple-800',
      'Technical': 'bg-green-100 text-green-800',
      'Sports': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const getSeatsStatus = (registered: number, total: number) => {
    const percentage = (registered / total) * 100;
    if (percentage >= 90) return { color: 'text-red-600', status: 'Almost Full' };
    if (percentage >= 70) return { color: 'text-orange-600', status: 'Filling Fast' };
    return { color: 'text-green-600', status: 'Available' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Listings</h1>
            <p className="text-gray-600">Discover and register for upcoming campus events</p>
          </div>
          <div className="text-sm text-gray-500">
            {filteredEvents.length} events found
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Organizers' : dept}
              </option>
            ))}
          </select>

          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const seatsStatus = getSeatsStatus(event.registeredCount || 0, event.seats || 100);
          
          return (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                  {event.isRegistered && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Registered
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.organizer}</span>
                  </div>
                  {event.seats && (
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 mr-2 text-gray-400" />
                      <span className={seatsStatus.color}>
                        {event.registeredCount}/{event.seats} registered • {seatsStatus.status}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Deadline: {formatDate(event.registrationDeadline)}
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                  {!event.isRegistered && !isDeadlinePassed(event.registrationDeadline) ? (
                    <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Register
                    </button>
                  ) : event.isRegistered ? (
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg cursor-not-allowed">
                      Registered
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
                      Closed
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or check back later for new events.</p>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(selectedEvent.category)} mb-2`}>
                    {selectedEvent.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 mb-6">{selectedEvent.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Event Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{formatDate(selectedEvent.date)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{selectedEvent.venue}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{selectedEvent.organizer}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Registration deadline: {formatDate(selectedEvent.registrationDeadline)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Registration Info</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Eligibility:</strong> {selectedEvent.eligibility}</p>
                    <p><strong>Contact:</strong> {selectedEvent.contactEmail}</p>
                    {selectedEvent.seats && (
                      <p><strong>Seats:</strong> {selectedEvent.registeredCount}/{selectedEvent.seats}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                {!selectedEvent.isRegistered && !isDeadlinePassed(selectedEvent.registrationDeadline) ? (
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Register Now
                  </button>
                ) : selectedEvent.isRegistered ? (
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg cursor-not-allowed">
                    Already Registered
                  </button>
                ) : (
                  <button className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
                    Registration Closed
                  </button>
                )}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventListings;