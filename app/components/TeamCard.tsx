"use client";

import { useQuiz, type Team } from "../contexts/QuizContext";

interface TeamCardProps {
    team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
    const {
        editingTeam,
        editingName,
        setEditingName,
        startEditing,
        saveTeamName,
        updatePoints,
        deleteTeam,
    } = useQuiz();

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            saveTeamName(team.id);
        }
    };

    const handleBlur = () => {
        saveTeamName(team.id);
    };

    return (
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] transform hover:rotate-1 transition-transform">
            {/* Team Name */}
            <div className="mb-4">
                {editingTeam === team.id ? (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-1 px-2 py-1 text-lg font-bold text-black border-2 border-black bg-yellow-100 focus:outline-none"
                            onKeyPress={handleKeyPress}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    </div>
                ) : (
                    <h3
                        className="text-2xl font-black text-black cursor-pointer hover:bg-yellow-200 px-2 py-1 border-2 border-transparent hover:border-black"
                        onClick={() => startEditing(team)}
                    >
                        {team.name}
                    </h3>
                )}
            </div>

            {/* Points Display */}
            <div className="text-center mb-6">
                <div className="text-6xl font-black text-black bg-yellow-300 border-4 border-black px-4 py-2 inline-block transform rotate-2 shadow-[4px_4px_0px_0px_#000]">
                    {team.points}
                </div>
                <p className="text-sm font-bold text-black mt-2">POINTS</p>
            </div>

            {/* Control Buttons */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={() => updatePoints(team.id, 1)}
                        className="flex-1 px-4 py-3 bg-green-400 border-3 border-black text-lg font-black text-black hover:bg-green-300 active:shadow-[1px_1px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] transition-all"
                    >
                        +1
                    </button>
                    <button
                        onClick={() => updatePoints(team.id, 3)}
                        className="flex-1 px-4 py-3 bg-green-500 border-3 border-black text-lg font-black text-black hover:bg-green-400 active:shadow-[1px_1px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] transition-all"
                    >
                        +3
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => updatePoints(team.id, -1)}
                        className="flex-1 px-4 py-3 bg-red-400 border-3 border-black text-lg font-black text-black hover:bg-red-300 active:shadow-[1px_1px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] transition-all"
                    >
                        -1
                    </button>
                    <button
                        onClick={() => updatePoints(team.id, -3)}
                        className="flex-1 px-4 py-3 bg-red-500 border-3 border-black text-lg font-black text-black hover:bg-red-400 active:shadow-[1px_1px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] transition-all"
                    >
                        -3
                    </button>
                </div>

                <button
                    onClick={() => deleteTeam(team.id)}
                    className="w-full px-4 py-2 bg-purple-400 border-3 border-black text-sm font-black text-black hover:bg-purple-300 active:shadow-[1px_1px_0px_0px_#000] shadow-[3px_3px_0px_0px_#000] transition-all"
                >
                    DELETE TEAM
                </button>
            </div>
        </div>
    );
}
