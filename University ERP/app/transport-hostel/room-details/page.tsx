"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { HomeIcon, UserGroupIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface RoomDetails {
  roomNumber: string;
  block: string;
  floor: number;
  occupancy: number;
  capacity: number;
  amenities: string[];
  isActive: boolean;
  roommates: { name: string; roll: string }[];
}

export default function RoomDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<RoomDetails | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setRoom({
        roomNumber: "B-204",
        block: "Block B",
        floor: 2,
        occupancy: 3,
        capacity: 4,
        amenities: ["WiFi", "Attached Bathroom", "Study Table", "Cupboard"],
        isActive: true,
        roommates: [
          { name: "Amit Kumar", roll: "21BCE1234" },
          { name: "Riya Sharma", roll: "21BCE5678" },
          { name: "You", roll: "21BCE9999" },
        ],
      });
      setLoading(false);
    };
    fetchRoom();
  }, []);

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
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Details</h1>
            <p className="text-gray-600">Your hostel room assignment and amenities</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <HomeIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">Room {room?.roomNumber} ({room?.block})</div>
                <div className="text-sm text-gray-500">Floor: {room?.floor}</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {room?.isActive ? (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    <CheckCircleIcon className="w-4 h-4 mr-1" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                    <XCircleIcon className="w-4 h-4 mr-1" /> Inactive
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-gray-50 rounded p-3 flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500">Occupancy</div>
                <div className="text-lg font-bold text-gray-900">{room?.occupancy} / {room?.capacity}</div>
              </div>
              <div className="bg-gray-50 rounded p-3 flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500">Amenities</div>
                <div className="text-sm text-gray-700">{room?.amenities.join(", ")}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Roommates</div>
              <ul className="list-disc pl-5 text-sm text-gray-800">
                {room?.roommates.map((mate) => (
                  <li key={mate.roll} className={mate.name === "You" ? "font-semibold text-indigo-700" : ""}>
                    {mate.name} ({mate.roll})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
