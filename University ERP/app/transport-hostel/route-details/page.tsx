"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { TruckIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface RouteDetails {
  routeName: string;
  busNumber: string;
  pickupPoint: string;
  dropPoint: string;
  timings: string;
  driver: string;
  contact: string;
  isActive: boolean;
}

export default function RouteDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState<RouteDetails | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setRoute({
        routeName: "Route 5 - City Center",
        busNumber: "AP16BU1234",
        pickupPoint: "City Center Bus Stop",
        dropPoint: "University Main Gate",
        timings: "7:30 AM - 8:30 AM (Pickup), 5:30 PM - 6:30 PM (Drop)",
        driver: "Ramesh Kumar",
        contact: "+91-9876543210",
        isActive: true,
      });
      setLoading(false);
    };
    fetchRoute();
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Route Details</h1>
            <p className="text-gray-600">Your assigned transport route and bus information</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <TruckIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <div className="text-lg font-semibold text-gray-900">{route?.routeName}</div>
                <div className="text-sm text-gray-500">Bus No: {route?.busNumber}</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {route?.isActive ? (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                    Inactive
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-gray-50 rounded p-3 flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500">Pickup Point</div>
                <div className="text-sm font-bold text-gray-900 flex items-center gap-1"><MapPinIcon className="w-4 h-4" />{route?.pickupPoint}</div>
              </div>
              <div className="bg-gray-50 rounded p-3 flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500">Drop Point</div>
                <div className="text-sm font-bold text-gray-900 flex items-center gap-1"><MapPinIcon className="w-4 h-4" />{route?.dropPoint}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-gray-50 rounded p-3 flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500">Timings</div>
                <div className="text-sm text-gray-700 flex items-center gap-1"><ClockIcon className="w-4 h-4" />{route?.timings}</div>
              </div>
              <div className="bg-gray-50 rounded p-3 flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500">Driver</div>
                <div className="text-sm text-gray-700">{route?.driver} ({route?.contact})</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
