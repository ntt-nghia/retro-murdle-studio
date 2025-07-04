"use client";

import { useState, useMemo } from "react";
import type { MurdleData, Suspect, Weapon, Location, Clue } from "@/lib/types";
import StoryPanel from "./story-panel";
import DeductionGrid from "./deduction-grid";
import ItemModal from "./item-modal";
import AccusationForm from "./accusation-form";
import SolutionModal from "./solution-modal";

interface MurdleGameLayoutProps {
  murdleData: MurdleData;
  onRestart: () => void;
}

type CellState = "empty" | "x" | "check";
type GridState = { [key: string]: CellState };

export default function MurdleGameLayout({ murdleData, onRestart }: MurdleGameLayoutProps) {
  const { story, suspects, weapons, locations, clues, solution } = murdleData;
  const allItems = useMemo(() => ({ suspects, weapons, locations }), [suspects, weapons, locations]);

  const [gridState, setGridState] = useState<GridState>({});
  const [revealedClueCount, setRevealedClueCount] = useState(1);
  const [puzzleSolutions, setPuzzleSolutions] = useState<{ [key: number]: boolean }>({});

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "suspects" | "weapons" | "locations" | null;
  }>({ isOpen: false, type: null });

  const [gameState, setGameState] = useState<"playing" | "accusing" | "solved" | "failed">(
    "playing"
  );
  
  const handleCellClick = (key: string) => {
    setGridState((prevState) => {
      const currentState = prevState[key] || "empty";
      const nextState: CellState =
        currentState === "empty" ? "x" : currentState === "x" ? "check" : "empty";
      return { ...prevState, [key]: nextState };
    });
  };
  
  const handleRevealClue = () => {
    if (revealedClueCount < clues.length) {
      setRevealedClueCount(revealedClueCount + 1);
    }
  };

  const handlePuzzleSolved = (clueIndex: number) => {
    setPuzzleSolutions((prev) => ({ ...prev, [clueIndex]: true }));
  };

  const openModal = (type: "suspects" | "weapons" | "locations") => {
    setModalState({ isOpen: true, type });
  };
  const closeModal = () => setModalState({ isOpen: false, type: null });

  const handleAccusation = (accusation: { suspect: string; weapon: string; location: string }) => {
    if (
      accusation.suspect === solution.suspect &&
      accusation.weapon === solution.weapon &&
      accusation.location === solution.location
    ) {
      setGameState("solved");
    } else {
      setGameState("failed");
    }
  };


  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-full">
      <div className="lg:w-1/2 w-full">
        <StoryPanel
          story={story}
          clues={clues}
          revealedClueCount={revealedClueCount}
          puzzleSolutions={puzzleSolutions}
          onRevealClue={handleRevealClue}
          onPuzzleSolved={handlePuzzleSolved}
          onOpenModal={openModal}
        />
      </div>
      <div className="lg:w-1/2 w-full">
        <div className="retro-frame">
           <h2 className="text-2xl font-bold retro-text-glow-pink p-4 text-center">DEDUCTION GRID</h2>
           <DeductionGrid
              suspects={suspects}
              weapons={weapons}
              locations={locations}
              gridState={gridState}
              onCellClick={handleCellClick}
            />
        </div>
        <div className="mt-8">
            <AccusationForm
              suspects={suspects}
              weapons={weapons}
              locations={locations}
              onAccuse={() => setGameState("accusing")}
            />
        </div>
      </div>

      {modalState.isOpen && modalState.type && (
        <ItemModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          items={allItems[modalState.type]}
          type={modalState.type}
        />
      )}

      {(gameState === "accusing" || gameState === "failed") && (
         <SolutionModal
            isOpen={true}
            onClose={() => setGameState("playing")}
            title={gameState === 'failed' ? "ACCUSATION FAILED!" : "MAKE YOUR ACCUSATION"}
            isFinalAccusation={true}
            onAccuse={handleAccusation}
            status={gameState}
            items={allItems}
          />
      )}
      
      {gameState === 'solved' && (
        <SolutionModal
          isOpen={true}
          onClose={onRestart}
          title="CASE SOLVED!"
          solution={solution}
          story={{title: story.title, intro: story.intro, setting: story.setting, victim: story.victim}}
          items={allItems}
        />
      )}
    </div>
  );
}
