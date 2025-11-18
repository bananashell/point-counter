"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

export interface Team {
    id: number;
    name: string;
    points: number;
}

interface QuizContextType {
    // State
    teams: Team[];
    newTeamName: string;
    editingTeam: number | null;
    editingName: string;
    isDrawerOpen: boolean;

    // Actions
    setNewTeamName: (name: string) => void;
    addTeam: () => void;
    updatePoints: (id: number, change: number) => void;
    startEditing: (team: Team) => void;
    saveTeamName: (id: number) => void;
    cancelEditing: () => void;
    deleteTeam: (id: number) => void;
    setEditingName: (name: string) => void;
    toggleDrawer: () => void;
    setDrawerOpen: (open: boolean) => void;
    clearAllTeams: () => void;
}

const STORAGE_KEY = "quiz-tracker-teams";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
    children: ReactNode;
}

// Helper functions for localStorage
const loadTeamsFromStorage = (): Team[] => {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error loading teams from localStorage:", error);
        return [];
    }
};

const saveTeamsToStorage = (teams: Team[]) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
    } catch (error) {
        console.error("Error saving teams to localStorage:", error);
    }
};

export function QuizProvider({ children }: QuizProviderProps) {
    const [teams, setTeams] = useState<Team[]>(() => loadTeamsFromStorage());
    const [newTeamName, setNewTeamName] = useState("");
    const [editingTeam, setEditingTeam] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Save teams to localStorage whenever teams change
    useEffect(() => {
        saveTeamsToStorage(teams);
    }, [teams]);

    const addTeam = () => {
        if (newTeamName.trim()) {
            const newTeam: Team = {
                id: Date.now(),
                name: newTeamName.trim(),
                points: 0,
            };
            setTeams([...teams, newTeam]);
            setNewTeamName("");
        }
    };

    const updatePoints = (id: number, change: number) => {
        setTeams(
            teams.map((team) =>
                team.id === id
                    ? { ...team, points: Math.max(0, team.points + change) }
                    : team
            )
        );
    };

    const startEditing = (team: Team) => {
        setEditingTeam(team.id);
        setEditingName(team.name);
    };

    const saveTeamName = (id: number) => {
        if (editingName.trim()) {
            setTeams(
                teams.map((team) =>
                    team.id === id
                        ? { ...team, name: editingName.trim() }
                        : team
                )
            );
        }
        setEditingTeam(null);
        setEditingName("");
    };

    const cancelEditing = () => {
        setEditingTeam(null);
        setEditingName("");
    };

    const deleteTeam = (id: number) => {
        setTeams(teams.filter((team) => team.id !== id));
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const setDrawerOpen = (open: boolean) => {
        setIsDrawerOpen(open);
    };

    const clearAllTeams = () => {
        setTeams([]);
    };

    const value: QuizContextType = {
        // State
        teams,
        newTeamName,
        editingTeam,
        editingName,
        isDrawerOpen,

        // Actions
        setNewTeamName,
        addTeam,
        updatePoints,
        startEditing,
        saveTeamName,
        cancelEditing,
        deleteTeam,
        setEditingName,
        toggleDrawer,
        setDrawerOpen,
        clearAllTeams,
    };

    return (
        <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}
