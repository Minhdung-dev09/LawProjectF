import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaTimes, FaFilter, FaCalendarAlt, FaVideo, FaPhone } from "react-icons/fa";

const MyConsultations = () => {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const consultations = [
    {
      id: "CONS-2024-001",
      date: "2024-03-15",
      time: "14:00",
      type: "Video Call",
      status: "scheduled",
      lawyer: "Sarah Johnson",
      topic: "Property Dispute Consultation",
      description: "Initial consultation regarding property boundary dispute with neighbor",
      details: {
        clientName: "John Smith",
        caseType: "Property Dispute",
        duration: "60 minutes",
        documents: ["Property Deed", "Previous Agreements"],
        notes: "Client seeking advice on property boundary dispute with neighbor",
        agenda: [
          "Review of property documents",
          "Discussion of dispute history",
          "Legal options analysis",
          "Next steps planning"
        ]
      }
    },
    {
      id: "CONS-2024-002",
      date: "2024-03-10",
      time: "10:30",
      type: "Phone Call",
      status: "completed",
      lawyer: "Michael Brown",
      topic: "Business Contract Review",
      description: "Review of partnership agreement terms and conditions",
      details: {
        clientName: "ABC Company",
        caseType: "Business Contract",
        duration: "45 minutes",
        documents: ["Business Agreement", "Financial Statements"],
        notes: "Review of partnership agreement terms and conditions",
        agenda: [
          "Contract terms review",
          "Risk assessment",
          "Recommendations",
          "Follow-up actions"
        ]
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "scheduled":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "scheduled":
        return "Scheduled";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Video Call":
        return <FaVideo className="text-blue-500" />;
      case "Phone Call":
        return <FaPhone className="text-green-500" />;
      default:
        return null;
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    const statusMatch = statusFilter === "all" || consultation.status === statusFilter;
    const timeMatch = timeFilter === "all" || true; // Add time filtering logic here
    return statusMatch && timeMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>My Consultations | Law Firm</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">My Consultations</h1>
            <p className="text-gray-500 mt-1">Schedule and manage your legal consultations</p>
          </div>

          {/* Filters */}
          <div className="px-8 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consultations List */}
          <div className="divide-y divide-gray-100">
            {filteredConsultations.map((consultation) => (
              <div key={consultation.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(consultation.type)}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{consultation.topic}</h3>
                        <p className="text-sm text-gray-500 mt-1">ID: {consultation.id}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{consultation.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Lawyer:</span>
                        {consultation.lawyer}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Date:</span>
                        {consultation.date}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Time:</span>
                        {consultation.time}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Type:</span>
                        {consultation.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(consultation.status)}`}>
                      {getStatusText(consultation.status)}
                    </span>
                    <button
                      onClick={() => setSelectedConsultation(consultation)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FaEye className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation Details Popup */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(selectedConsultation.type)}
                    <h2 className="text-2xl font-semibold text-gray-900">{selectedConsultation.topic}</h2>
                  </div>
                  <p className="text-gray-500 mt-1">ID: {selectedConsultation.id}</p>
                </div>
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Client Name</p>
                      <p className="mt-1 text-gray-900">{selectedConsultation.details.clientName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Case Type</p>
                      <p className="mt-1 text-gray-900">{selectedConsultation.details.caseType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lawyer</p>
                      <p className="mt-1 text-gray-900">{selectedConsultation.lawyer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="mt-1 text-gray-900">{selectedConsultation.details.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date & Time</p>
                      <p className="mt-1 text-gray-900">{selectedConsultation.date} at {selectedConsultation.time}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Consultation Type</p>
                      <p className="mt-1 text-gray-900">{selectedConsultation.type}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Agenda</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedConsultation.details.agenda.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gray-500 mr-2">•</span>
                          <span className="text-gray-900">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Documents</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedConsultation.details.documents.map((doc, index) => (
                        <li key={index} className="text-gray-900">{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Notes</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{selectedConsultation.details.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConsultations;