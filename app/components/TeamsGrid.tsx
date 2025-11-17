"use client";

import { useQuiz } from "../contexts/QuizContext";
import { TeamCard } from "./TeamCard";

export function TeamsGrid() {
    const { teams } = useQuiz();

    if (teams.length === 0) {
        return (
            <div className="text-center bg-orange-400 border-4 border-black p-12 shadow-[8px_8px_0px_0px_#000] transform rotate-1">
                <div className="text-4xl font-black text-black mb-4">
                    NO TEAMS YET!
                </div>
                <div className="text-xl font-bold text-black">
                    Add your first team above to get started 🎯
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
            ))}
        </div>
    );
}
