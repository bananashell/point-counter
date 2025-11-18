"use client";

import { Highscore } from "./components/Highscore";
import { TeamDrawer } from "./components/TeamDrawer";

export default function Home() {
    return (
        <div className="min-h-screen bg-yellow-300 p-4 font-mono">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-6xl font-black text-black mb-4 transform rotate-1 inline-block bg-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                        QUIZ TRACKER
                    </h1>
                    <p className="text-xl font-bold text-black bg-pink-400 inline-block px-4 py-2 border-3 border-black transform -rotate-1 shadow-[4px_4px_0px_0px_#000]">
                        Keep score like a boss! 💪
                    </p>
                </div>

                {/* Main Highscore View */}
                <Highscore />
            </div>

            {/* Team Management Drawer */}
            <TeamDrawer />
        </div>
    );
}
