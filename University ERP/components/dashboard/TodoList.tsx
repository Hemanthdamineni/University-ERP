"use client";

import React, { useState } from "react";
import {
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { TodoItem } from "@/lib/api/mockData";

interface TodoListProps {
  todos: TodoItem[];
}

type FilterType = "assigned" | "missing" | "done";
type TimeFilterType = "no_due_date" | "done_early" | "this_week" | "earlier";

export default function TodoList({ todos }: TodoListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("assigned");
  const [expandedTimeFilters, setExpandedTimeFilters] = useState<
    TimeFilterType[]
  >(["earlier"]);
  const [selectedCourse, setSelectedCourse] = useState<string>(
    "AEC 104 Creativity and Critical Thi...",
  );

  const toggleTimeFilter = (filter: TimeFilterType) => {
    setExpandedTimeFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  const filteredTodos = todos.filter((todo) => todo.category === activeFilter);

  const groupedTodos = filteredTodos.reduce(
    (acc, todo) => {
      if (!acc[todo.timeCategory]) {
        acc[todo.timeCategory] = [];
      }
      acc[todo.timeCategory].push(todo);
      return acc;
    },
    {} as Record<TimeFilterType, TodoItem[]>,
  );

  const getTimeCategoryLabel = (category: TimeFilterType) => {
    switch (category) {
      case "no_due_date":
        return "No due date";
      case "done_early":
        return "Done early";
      case "this_week":
        return "This week";
      case "earlier":
        return "Earlier";
    }
  };

  const getTimeCategoryCount = (category: TimeFilterType) => {
    return groupedTodos[category]?.length || 0;
  };

  return (
    <div className="w-full h-full bg-white rounded-xl p-4 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-black">To-Do-List</h2>
        <button className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
          <PlusIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-3">
        {(["assigned", "missing", "done"] as FilterType[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-sm font-medium capitalize transition-colors ${
              activeFilter === filter
                ? "text-black border-b-2 border-teal-800"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Course Selector */}
      <div className="mb-3">
        <div className="bg-teal-800 rounded-xl p-2 border border-teal-600">
          <div className="flex items-center justify-between">
            <span className="text-white text-xs">{selectedCourse}</span>
            <ChevronDownIcon className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Time Category Filters */}
      <div className="space-y-2 flex-1 overflow-y-auto">
        {(
          [
            "no_due_date",
            "done_early",
            "this_week",
            "earlier",
          ] as TimeFilterType[]
        ).map((timeFilter) => {
          const count = getTimeCategoryCount(timeFilter);
          const isExpanded = expandedTimeFilters.includes(timeFilter);

          return (
            <div key={timeFilter}>
              <button
                onClick={() => toggleTimeFilter(timeFilter)}
                className="w-full flex items-center justify-between py-1 text-left"
              >
                <span className="text-xs text-black font-medium">
                  {getTimeCategoryLabel(timeFilter)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{count}</span>
                  {count > 0 &&
                    (isExpanded ? (
                      <ChevronUpIcon className="w-3 h-3 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="w-3 h-3 text-gray-400" />
                    ))}
                </div>
              </button>

              {/* Expanded Todo Items */}
              {isExpanded && groupedTodos[timeFilter] && (
                <div className="ml-3 mt-1 space-y-1">
                  {groupedTodos[timeFilter].map((todo) => (
                    <div key={todo.id} className="flex items-start gap-2 py-1">
                      <div className="mt-1">
                        {todo.status === "completed" ? (
                          <div className="w-3 h-3 bg-green-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <div className="w-3 h-3 border-2 border-gray-400 rounded"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-black">{todo.description}</p>
                        {todo.status === "overdue" && (
                          <div className="mt-1">
                            <span className="text-xs text-gray-500 font-bold">
                              Turned in
                            </span>
                            <br />
                            <span className="text-xs text-gray-500 font-bold">
                              Done late
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
