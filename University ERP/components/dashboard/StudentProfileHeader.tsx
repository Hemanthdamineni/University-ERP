"use client";

import React from "react";
import { StudentProfile } from "@/lib/api/mockData";

interface StudentProfileHeaderProps {
  profile: StudentProfile;
}

export default function StudentProfileHeader({
  profile,
}: StudentProfileHeaderProps) {
  return (
    <div className="w-full h-full bg-white-200 rounded-xl p-4 overflow-hidden">
      <div className="w-full h-full flex flex-col justify-between">
        {/* Title */}
        <h2 className="text-xl font-bold text-[#0A272B] mb-4">Basic Info</h2>
        {/* Info Rows as Flex */}
        <div className="flex flex-wrap gap-8 mb-2 justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-lg font-bold text-black">Name</span>
            <span className="text-lg text-black whitespace-nowrap overflow-hidden text-ellipsis">{profile.name}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">DOB</span>
            <span className="text-base text-black">{profile.dob}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">Age</span>
            <span className="text-base text-black">{profile.age}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">Gender</span>
            <span className="text-base text-black">{profile.gender}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 mb-2 justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">Program</span>
            <span className="text-base text-black whitespace-nowrap">{profile.program}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">Specialization</span>
            <span className="text-base text-black whitespace-nowrap">{profile.specialization}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">Minor/OE</span>
            <span className="text-base text-black">{profile.minorOE}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">A.Y</span>
            <span className="text-base text-black">{profile.academicYear}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">Sem</span>
            <span className="text-base text-black">{profile.semester}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black">Sec</span>
            <span className="text-base text-black">{profile.section}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black whitespace-nowrap">Previous Semester GPA (SGPA)</span>
            <span className="text-base text-black">{profile.previousSemesterGPA.toFixed(2)} / 10.00</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-base font-bold text-black whitespace-nowrap">Latest Cumulative GPA (CGPA)</span>
            <span className="text-base text-black">{profile.latestCGPA.toFixed(2)} / 10.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
