"use client";

import { useQuiz } from "../contexts/QuizContext";

export function AddTeamSection() {
    const { newTeamName, setNewTeamName, addTeam } = useQuiz();

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addTeam();
        }
    };

    return (
        <div className="mb-8 bg-cyan-400 border-4 border-black p-6 shadow-[12px_12px_0px_0px_#000] transform -rotate-1">
            <h2 className="text-3xl font-black mb-4 text-black">
                ADD NEW TEAM
            </h2>
            <div className="flex gap-4">
                <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Enter team name..."
                    className="flex-1 px-4 py-3 text-xl font-bold border-4 border-black bg-white focus:outline-none focus:bg-yellow-100"
                    onKeyPress={handleKeyPress}
                />
                <button
                    onClick={addTeam}
                    className="px-6 py-3 bg-green-400 border-4 border-black text-xl font-black text-black hover:bg-green-300 active:shadow-[2px_2px_0px_0px_#000] shadow-[6px_6px_0px_0px_#000] transition-all"
                >
                    ADD TEAM
                </button>
            </div>
        </div>
    );
}
