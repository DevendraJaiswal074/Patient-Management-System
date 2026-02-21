import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const cards = [
    {
      title: "View All Patients",
      description:
        "View date-wise all patients with Checked In / Checked Out status",
      path: "/admin-dashboard/all-patients",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-10 fill-white"
        >
          <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Z" />
        </svg>
      ),
    },
    {
      title: "Filter Patient List",
      description: " Download : Date-Wise Patient List.",
      path: "/admin-dashboard/checked-out",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-10"
          fill="#fff"
        >
          <path d="M509-269q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
        </svg>
      ),
    },
    // {
    //   title: "Checked In Patients",
    //   description: "View all patients currently checked in",
    //   path: "/admin-dashboard/checked-in",
    //   color: "bg-green-600",
    //   hoverColor: "hover:bg-green-700",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 -960 960 960"
    //       className="w-10 fill-white"
    //     >
    //       <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    //     </svg>
    //   ),
    // },
    {
      title: "Today's Patients",
      description: "View all patients added today with their status",
      path: "/admin-dashboard/today-patients",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-10 fill-white"
        >
          <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm280-200q-17 0-28.5-11.5T440-400q0-17 11.5-28.5T480-440q17 0 28.5 11.5T520-400q0 17-11.5 28.5T480-360Zm-160 0q-17 0-28.5-11.5T280-400q0-17 11.5-28.5T320-440q17 0 28.5 11.5T360-400q0 17-11.5 28.5T320-360Zm320 0q-17 0-28.5-11.5T600-400q0-17 11.5-28.5T640-440q17 0 28.5 11.5T680-400q0 17-11.5 28.5T640-360Z" />
        </svg>
      ),
    },
    {
      title: "Generate Login IDs",
      description: "Create & manage login credentials for doctors and staff",
      path: "/admin-dashboard/generate-ids",
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-10 fill-white"
        >
          <path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
        </svg>
      ),
    },
    {
      title: "Delete Patient Data",
      description: "Remove specific patients or bulk delete by date",
      path: "/admin-dashboard/delete-patients",
      color: "bg-red-600",
      hoverColor: "hover:bg-red-700",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-10 fill-white"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <h2 className="text-4xl font-bold text-gray-700 mb-6 text-center">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.path}
              className={`${card.color} ${card.hoverColor} rounded-xl p-6 text-white shadow-lg transition-all transform hover:scale-105`}
            >
              <div className="flex flex-col items-center text-center gap-3">
                {card.icon}
                <h3 className="text-lg font-bold">{card.title}</h3>
                <p className="text-sm text-white/80">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
