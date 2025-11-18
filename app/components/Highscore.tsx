"use client";

import { useQuiz } from "../contexts/QuizContext";

export function Highscore() {
    const { teams, toggleDrawer } = useQuiz();

    // Sort teams by points in descending order
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

    if (teams.length === 0) {
        return (
            <div className="text-center bg-orange-400 border-4 border-black p-12 shadow-[8px_8px_0px_0px_#000] transform rotate-1">
                <div className="text-4xl font-black text-black mb-4">
                    NO TEAMS YET!
                </div>
                <div className="text-xl font-bold text-black mb-6">
                    Add your first team to get started 🎯
                </div>
                <button
                    onClick={toggleDrawer}
                    className="px-8 py-4 bg-green-400 border-4 border-black text-2xl font-black text-black hover:bg-green-300 active:shadow-[2px_2px_0px_0px_#000] shadow-[6px_6px_0px_0px_#000] transition-all transform rotate-2"
                >
                    MANAGE TEAMS ⚙️
                </button>
            </div>
        );
    }

    return (
        <div className="bg-purple-400 border-4 border-black p-6 shadow-[12px_12px_0px_0px_#000] transform rotate-1">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-extrabold text-black">
                    🏆 HIGHSCORE 🏆
                </h2>
                <button
                    onClick={toggleDrawer}
                    className="px-6 py-3 bg-cyan-400 border-4 border-black text-lg font-black text-black hover:bg-cyan-300 active:shadow-[1px_1px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] transition-all transform -rotate-2"
                >
                    MANAGE TEAMS ⚙️
                </button>
            </div>
            <div className="space-y-3">
                {sortedTeams.map((team, index) => {
                    const position = index + 1;
                    let positionColor = "bg-gray-300";
                    let positionIcon = "";

                    // Special styling for top 3 positions
                    if (position === 1) {
                        positionColor = "bg-yellow-400";
                        positionIcon = "🥇";
                    } else if (position === 2) {
                        positionColor = "bg-gray-400";
                        positionIcon = "🥈";
                    } else if (position === 3) {
                        positionColor = "bg-orange-600";
                        positionIcon = "🥉";
                    }

                    return (
                        <div
                            key={team.id}
                            className={`flex items-center justify-between p-4 ${positionColor} border-3 border-black shadow-[4px_4px_0px_0px_#000] transform hover:rotate-1 transition-transform`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-3xl font-black text-black bg-white px-3 py-1 border-2 border-black">
                                    {positionIcon || `#${position}`}
                                </div>
                                <div className="text-2xl font-black text-black">
                                    {team.name}
                                </div>
                            </div>
                            <div className="text-4xl font-black text-black bg-white px-4 py-2 border-3 border-black transform rotate-3">
                                {team.points}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
