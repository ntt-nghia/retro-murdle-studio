"use client";

import { useState, useMemo } from "react";
import introJs from "intro.js";
import type { MurdleData } from "@/lib/types";
import StoryPanel from "./story-panel";
import DeductionGrid from "./deduction-grid";
import ItemModal from "./item-modal";
import AccusationForm from "./accusation-form";
import SolutionModal from "./solution-modal";
import { Button } from "../ui/button";
import { HelpCircle, RefreshCw } from "lucide-react";

interface MurdleGameLayoutProps {
  murdleData: MurdleData;
  onRestart: () => void;
  isSample: boolean;
}

type CellState = "empty" | "x" | "check" | "question";
type GridState = { [key: string]: CellState };

export default function MurdleGameLayout({ murdleData, onRestart, isSample }: MurdleGameLayoutProps) {
  const { story, suspects, weapons, locations, clues, solution } = murdleData;
  const allItems = useMemo(() => ({ suspects, weapons, locations }), [suspects, weapons, locations]);

  const [gridState, setGridState] = useState<GridState>({});

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
        currentState === "empty" ? "x"
        : currentState === "x" ? "check"
        : currentState === "check" ? "question"
        : "empty";
      return { ...prevState, [key]: nextState };
    });
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

  const startTutorial = () => {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          element: '[data-tutorial="story-panel"]',
          intro: "Welcome, detective! Your first step is to read the story, victim details, and setting. This will give you the background of the case.",
        },
        {
          element: '[data-tutorial="navigation-panel"]',
          intro: "Next, familiarize yourself with the Suspects, Weapons, and Locations. Click each button to view their details in a modal. Knowing the key players is crucial.",
        },
        {
          element: '[data-tutorial="clues-panel"]',
          intro: "Here you will find all the clues for the case. As you use a clue to make a deduction, click on it to strike it through and keep track of your progress.",
        },
        {
          element: '[data-tutorial="deduction-grid"]',
          intro: "This is your deduction grid. Use the clues to mark off impossibilities and confirm connections. Click a cell once for 'X', twice for '✓', three times for '?', and a fourth time to clear it.",
        },
        {
          element: '[data-tutorial="accusation-form"]',
          intro: "Once you have enough evidence and are confident you know the solution, you can make your final accusation here. Be certain, as there are no second chances!",
        },
        {
          element: '[data-tutorial="restart-button"]',
          intro: "If you want to start a new mystery or go back to the main menu, click here. Good luck, detective!",
        }
      ],
      showBullets: false,
      showStepNumbers: true,
      exitOnOverlayClick: true,
      doneLabel: 'Let\'s Solve It!',
      nextLabel: 'Next &rarr;',
      prevLabel: '&larr; Previous',
    });
    intro.start();
  };

  return (
    <div className="max-w-[90%] mx-auto">
       <div className="flex justify-between items-center mb-4 p-4 retro-frame">
          <h1 className="text-3xl font-black retro-text-rainbow">Retro Sleuth AI</h1>
          <div className="flex gap-2">
            {isSample && (
              <Button onClick={startTutorial} className="retro-button !bg-blue-500 hover:!bg-blue-400">
                <HelpCircle className="mr-2 h-4 w-4" />
                TUTORIAL
              </Button>
            )}
            <Button onClick={onRestart} className="retro-button" data-tutorial="restart-button">
              <RefreshCw className="mr-2 h-4 w-4" />
              RESTART
            </Button>
          </div>
       </div>

      <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-full">
        <div className="lg:w-1/2 w-full">
          <StoryPanel
            story={story}
            clues={clues}
            onOpenModal={openModal}
          />
        </div>
        <div className="lg:w-1/2 w-full space-y-8">
          <div className="retro-frame overflow-x-auto">
            <h2 className="text-2xl font-bold retro-text-glow-pink p-4 text-center">DEDUCTION GRID</h2>
            <div className="p-2 md:p-4">
              <DeductionGrid
                suspects={suspects}
                weapons={weapons}
                locations={locations}
                gridState={gridState}
                onCellClick={handleCellClick}
              />
            </div>
          </div>
          <AccusationForm
            suspects={suspects}
            weapons={weapons}
            locations={locations}
            onAccuse={() => setGameState("accusing")}
          />
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
            story={story}
            items={allItems}
          />
        )}
      </div>
    </div>
  );
}
