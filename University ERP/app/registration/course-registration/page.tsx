"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";

interface Course {
  code: string;
  name: string;
  credits: number;
  type: "Core" | "Elective";
  slot: string;
  faculty: string;
  selected: boolean;
  clash?: boolean;
}

const CREDIT_MIN = 18;
const CREDIT_MAX = 28;
const DEADLINE = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2); // 2 days from now

export default function CourseRegistrationPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [program, setProgram] = useState("B.Tech");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState(5);
  const [year, setYear] = useState("2024-25");
  const [submitting, setSubmitting] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses([
        { code: "CS501", name: "Algorithms", credits: 4, type: "Core", slot: "A", faculty: "Dr. Rao", selected: true },
        { code: "CS502", name: "Operating Systems", credits: 4, type: "Core", slot: "B", faculty: "Dr. Mehta", selected: true },
        { code: "CS503", name: "Database Systems", credits: 3, type: "Core", slot: "C", faculty: "Dr. Singh", selected: true },
        { code: "CS504", name: "AI Elective", credits: 3, type: "Elective", slot: "D", faculty: "Dr. Iyer", selected: false },
        { code: "CS505", name: "ML Elective", credits: 3, type: "Elective", slot: "D", faculty: "Dr. Iyer", selected: false },
        { code: "CS506", name: "Cybersecurity", credits: 3, type: "Elective", slot: "E", faculty: "Dr. Nair", selected: false },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.max(0, Math.floor((DEADLINE.getTime() - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Slot clash logic
  useEffect(() => {
    const selected = courses.filter((c) => c.selected);
    const slotMap: Record<string, number> = {};
    selected.forEach((c) => {
      slotMap[c.slot] = (slotMap[c.slot] || 0) + 1;
    });
    setCourses((prev) =>
      prev.map((c) => ({ ...c, clash: c.selected && slotMap[c.slot] > 1 }))
    );
  }, [courses.map((c) => c.selected).join("")]);

  const totalCredits = courses.filter((c) => c.selected).reduce((sum, c) => sum + c.credits, 0);
  const slotClash = courses.some((c) => c.clash);
  const creditError = totalCredits < CREDIT_MIN || totalCredits > CREDIT_MAX;

  const handleSelect = (code: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.code === code ? { ...c, selected: !c.selected } : c
      )
    );
    setDraftSaved(false);
    setFinalSubmitted(false);
    setError("");
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setFinalSubmitted(false);
    setError("");
  };

  const handleSubmit = () => {
    if (slotClash) {
      setError("Slot clash detected. Please resolve before submitting.");
      return;
    }
    if (creditError) {
      setError(`Total credits must be between ${CREDIT_MIN} and ${CREDIT_MAX}.`);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFinalSubmitted(true);
      setDraftSaved(false);
      setError("");
    }, 1200);
  };

  const formatTimer = (t: number) => {
    const d = Math.floor(t / (60 * 60 * 24));
    const h = Math.floor((t % (60 * 60 * 24)) / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Registration</h1>
              <p className="text-gray-600">Register for your core and elective courses for the upcoming semester.</p>
            </div>
            {/* Top Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-wrap gap-6">
              <div>
                <div className="text-xs text-gray-500">Program</div>
                <div className="font-semibold text-gray-900">{program}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Branch</div>
                <div className="font-semibold text-gray-900">{branch}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Semester</div>
                <div className="font-semibold text-gray-900">{semester}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Academic Year</div>
                <div className="font-semibold text-gray-900">{year}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Credit Limit</div>
                <div className="font-semibold text-gray-900">{CREDIT_MIN} - {CREDIT_MAX}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Current Total</div>
                <div className={`font-semibold ${creditError ? "text-red-600" : "text-gray-900"}`}>{totalCredits} Credits</div>
              </div>
            </div>
            {/* Course Selection Table */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Available Courses</h2>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Course Name</th>
                    <th className="px-4 py-2 text-left">Code</th>
                    <th className="px-4 py-2 text-left">Credits</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Slot</th>
                    <th className="px-4 py-2 text-left">Faculty</th>
                    <th className="px-4 py-2 text-left">Add/Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.code} className={c.clash ? "bg-red-50" : ""}>
                      <td className="px-4 py-2">{c.name}</td>
                      <td className="px-4 py-2">{c.code}</td>
                      <td className="px-4 py-2">{c.credits}</td>
                      <td className="px-4 py-2">{c.type}</td>
                      <td className="px-4 py-2">{c.slot}</td>
                      <td className="px-4 py-2">{c.faculty}</td>
                      <td className="px-4 py-2">
                        <button
                          className={`px-3 py-1 rounded text-xs font-medium ${c.selected ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                          onClick={() => handleSelect(c.code)}
                          disabled={finalSubmitted}
                        >
                          {c.selected ? "Remove" : "Add"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {slotClash && <div className="mt-2 text-red-600 text-sm">Slot clash detected! Please resolve before submitting.</div>}
            </div>
            {/* Submission Footer */}
            <div className="flex flex-wrap gap-4 items-center justify-between bg-white rounded-lg shadow-sm p-6">
              <div>
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2"
                  onClick={handleSaveDraft}
                  disabled={finalSubmitted}
                >
                  Save Draft
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  onClick={handleSubmit}
                  disabled={finalSubmitted || submitting}
                >
                  {submitting ? "Submitting..." : "Submit Final"}
                </button>
                {finalSubmitted && <span className="ml-4 text-green-700 font-medium">Registration Submitted!</span>}
                {draftSaved && !finalSubmitted && <span className="ml-4 text-gray-600">Draft Saved</span>}
                {error && <span className="ml-4 text-red-600">{error}</span>}
              </div>
              <div className="text-sm text-gray-500">Deadline: <span className="font-semibold text-gray-900">{formatTimer(timer)}</span></div>
            </div>
          </div>
          {/* Sidebar Panel */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Live Summary</h3>
              <div className="mb-2">Total Credits: <span className={`font-bold ${creditError ? "text-red-600" : "text-gray-900"}`}>{totalCredits}</span></div>
              <div className="mb-2">Selected Courses:</div>
              <ul className="list-disc pl-5 text-sm mb-2">
                {courses.filter((c) => c.selected).map((c) => (
                  <li key={c.code}>{c.name} ({c.code})</li>
                ))}
              </ul>
              {slotClash && <div className="text-red-600 text-sm mb-2">Slot clash detected!</div>}
              {creditError && <div className="text-red-600 text-sm mb-2">Credits out of allowed range!</div>}
              <button
                className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={handleSubmit}
                disabled={finalSubmitted || submitting}
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 