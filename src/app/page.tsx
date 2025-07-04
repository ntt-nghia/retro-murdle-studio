"use client";

import { useState } from "react";
import type { GenerateMurdleMysteryOutput } from "@/ai/flows/generate-murdle-mystery";
import { generateMysteryAction } from "@/app/actions";
import GameSetup from "@/components/murdle/game-setup";
import MurdleGameLayout from "@/components/murdle/murdle-game-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { sampleMurdleData } from "@/lib/sample-data";

type GameState = "setup" | "loading" | "playing";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [murdleData, setMurdleData] =
    useState<GenerateMurdleMysteryOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSampleData, setIsSampleData] = useState(false);

  const handleGenerateMystery = async (theme: string, difficulty: "Easy" | "Medium" | "Hard") => {
    setGameState("loading");
    setError(null);
    setIsSampleData(false);
    try {
      const result = await generateMysteryAction({ theme, difficulty });
      if (result) {
        setMurdleData(result);
        setGameState("playing");
      } else {
        throw new Error("Failed to generate mystery. The AI returned no data.");
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "An unknown error occurred."
      );
      setGameState("setup");
    }
  };

  const handleLoadSample = () => {
    setError(null);
    setMurdleData(sampleMurdleData);
    setIsSampleData(true);
    setGameState("playing");
  };

  const handleRestart = () => {
    setGameState("setup");
    setMurdleData(null);
    setError(null);
    setIsSampleData(false);
  };

  const renderContent = () => {
    switch (gameState) {
      case "setup":
        return (
          <GameSetup
            onGenerate={handleGenerateMystery}
            onLoadSample={handleLoadSample}
            error={error}
          />
        );
      case "loading":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
             <h1 className="text-4xl md:text-6xl font-black retro-text-glow-pink mb-4">
              RETRO SLEUTH AI
            </h1>
            <p className="text-xl retro-text-glow-cyan mb-8">
              GENERATING YOUR MYSTERY... PLEASE WAIT...
            </p>
            <div className="w-full max-w-md space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-32 w-full" />
            </div>
            <p className="mt-8 text-lg text-blink">CONNECTING TO CYBER-SPACE...</p>
          </div>
        );
      case "playing":
        if (murdleData) {
          return (
            <MurdleGameLayout
              murdleData={murdleData.murdleData}
              onRestart={handleRestart}
              isSample={isSampleData}
            />
          );
        }
        return null;
    }
  };

  return <main className="container mx-auto p-4">{renderContent()}</main>;
}
