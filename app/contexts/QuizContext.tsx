"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
    children: ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [newTeamName, setNewTeamName] = useState("");
    const [editingTeam, setEditingTeam] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
