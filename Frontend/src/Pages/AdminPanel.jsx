import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { backendUrl } from "../App";

function AdminPanel() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    checkedIn: 0,
    checkedOut: 0,
    loading: true,
  });

  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${backendUrl}/patient/all`);
      if (response.ok) {
        const patients = await response.json();
        const checkedInCount = patients.filter(
          (p) => p.status === "CheckedIn"
        ).length;
        const checkedOutCount = patients.filter(
          (p) => p.status === "CheckedOut"
        ).length;

        setStats({
          totalPatients: patients.length,
          checkedIn: checkedInCount,
          checkedOut: checkedOutCount,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  const modules = [
    {
      id: "all-patients",
      title: "All Patients List",
      path: "/admin-dashboard/all-patients",
      icon: "👥",
      description: "Manage all patients database",
      details: "View, edit, and manage complete patient records with status tracking",
      color: "from-blue-600 to-cyan-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "today-patients",
      title: "Today's Patients",
      path: "/admin-dashboard/today-patients",
      icon: "📅",
      description: "Daily patient operations",
      details: "Monitor all patients added today and their real-time status",
      color: "from-purple-600 to-pink-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "filter-download",
      title: "Reports & Export",
      path: "/admin-dashboard/checked-out",
      icon: "📊",
      description: "Generate reports & downloads",
      details: "Export patient data in multiple formats for analysis and records",
      color: "from-orange-500 to-red-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "generate-ids",
      title: "Generate Login IDs",
      path: "/admin-dashboard/generate-ids",
      icon: "🔑",
      description: "Manage access credentials",
      details: "Create and manage login IDs for doctors and staff members",
      color: "from-indigo-600 to-blue-500",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: "delete-data",
      title: "Data Management",
      path: "/admin-dashboard/delete-patients",
      icon: "🗑️",
      description: "Remove patient records",
      details: "Delete specific or bulk patient records with date filters",
      color: "from-red-600 to-pink-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-5xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Hospital Management</span>
          </div>
          {/* <p className="text-gray-600 text-lg mt-2">
            Complete control over patient management, operations, and system administration
          </p> */}
        </div>

        {/* Operations Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hospital Operations</h2>
          <p className="text-gray-600">Access all administrative modules and operations</p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link key={module.id} to={module.path} className="group">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full hover:border-gray-300">
                {/* Header Bar with Gradient */}
                <div className={`bg-linear-to-r ${module.color} h-2`}></div>

                {/* Content */}
                <div className="p-8">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-4xl mb-3 inline-block">{module.icon}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-3 group-hover:text-gray-700">
                        {module.title}
                      </h3>
                    </div>
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transform transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Descriptions */}
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    {module.description}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {module.details}
                  </p>

                  {/* Action Button */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${module.bgColor} ${module.textColor} font-semibold text-sm group-hover:opacity-80 transition-opacity`}>
                    <span>Open</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h3.414l-8.707 8.707a1 1 0 001.414 1.414L15.828 6.414V10a1 1 0 102 0V4a1 1 0 00-1-1h-6z"></path>
                    </svg>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Info Section */}
        <div className="mt-16 bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-10-1h2v2H8V4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Dashboard Tips</h3>
              <p className="text-gray-700 mb-2">
                💡 All statistics update in real-time. Each module provides comprehensive tools for specific operations.
              </p>
              <p className="text-gray-600 text-sm">
                Use the navigation above to quickly access all patient management, reporting, and administrative functions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
