"use client";

import { useQuiz } from "../contexts/QuizContext";
import { AddTeamSection } from "./AddTeamSection";
import { TeamsGrid } from "./TeamsGrid";

export function TeamDrawer() {
    const { isDrawerOpen, toggleDrawer } = useQuiz();

    return (
        <>
            {/* Backdrop */}

            <div
                className={`fixed inset-0 ${
                    isDrawerOpen
                        ? "bg-black/80"
                        : "bg-black/0 pointer-events-none"
                } transition-all duration-400 z-40`}
                onClick={toggleDrawer}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-4xl bg-yellow-300 border-l-4 border-black shadow-[-12px_0px_0px_0px_#000] transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
                    isDrawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-4xl font-black text-black bg-white px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_#000] transform rotate-1">
                            ⚙️ TEAM MANAGEMENT
                        </h2>
                        <button
                            onClick={toggleDrawer}
                            className="text-4xl font-black text-black bg-red-400 px-4 py-2 border-4 border-black hover:bg-red-300 active:shadow-[1px_1px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] transition-all transform -rotate-2"
                        >
                            ×
                        </button>
                    </div>

                    {/* Add Team Section */}
                    <AddTeamSection />

                    {/* Teams Grid */}
                    <TeamsGrid />
                </div>
            </div>
        </>
    );
}
