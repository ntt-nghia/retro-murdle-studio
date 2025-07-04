"use client";
import type { Story, Clue } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PuzzleClue from "./puzzle-clue";
import { BookOpen, MapPin, Microscope, Users } from "lucide-react";

interface StoryPanelProps {
  story: Pick<Story, 'title' | 'setting' | 'intro' | 'victim'>;
  clues: Clue[];
  revealedClueCount: number;
  puzzleSolutions: { [key: number]: boolean };
  onRevealClue: () => void;
  onPuzzleSolved: (clueIndex: number) => void;
  onOpenModal: (type: "suspects" | "weapons" | "locations") => void;
}

export default function StoryPanel({
  story,
  clues,
  revealedClueCount,
  puzzleSolutions,
  onRevealClue,
  onPuzzleSolved,
  onOpenModal,
}: StoryPanelProps) {
  const revealedClues = clues.slice(0, revealedClueCount);

  return (
    <div className="space-y-4">
      <div className="retro-frame" data-tutorial="story-panel">
        <h1 className="text-2xl font-black retro-text-glow-pink p-2">{story.title}</h1>
        <div className="retro-frame-inset p-4">
          <ScrollArea className="h-48 font-code text-lime-300">
            <p className="whitespace-pre-wrap">{story.intro}</p>
            <p className="whitespace-pre-wrap mt-4">VICTIM: {story.victim.name}</p>
            <p className="whitespace-pre-wrap mt-2">{story.victim.background}</p>
          </ScrollArea>
        </div>
      </div>

      <div className="retro-frame" data-tutorial="navigation-panel">
        <h2 className="text-xl font-bold p-2 retro-text-glow-cyan">NAVIGATION</h2>
        <div className="grid grid-cols-3 gap-2 p-2">
            <Button className="retro-button !text-xs" onClick={() => onOpenModal('suspects')}><Users className="mr-2 h-4 w-4"/>SUSPECTS</Button>
            <Button className="retro-button !text-xs" onClick={() => onOpenModal('weapons')}><Microscope className="mr-2 h-4 w-4"/>WEAPONS</Button>
            <Button className="retro-button !text-xs" onClick={() => onOpenModal('locations')}><MapPin className="mr-2 h-4 w-4"/>LOCATIONS</Button>
        </div>
      </div>

      <div className="retro-frame" data-tutorial="clues-panel">
        <div className="flex justify-between items-center p-2">
            <h2 className="text-xl font-bold retro-text-glow-cyan">CLUES</h2>
            <div className="retro-input !text-red-500 px-2 py-1 text-lg">
                {revealedClueCount} / {clues.length}
            </div>
        </div>
        <div className="retro-frame-inset p-4 space-y-3">
          <ScrollArea className="h-64 font-code">
            {revealedClues.map((clue, index) => (
               <div key={index} className={"p-2 " + (clue.isPuzzle ? "puzzle-frame" : "retro-frame bg-green-900/50 border-green-500")}>
                {clue.isPuzzle ? (
                  <PuzzleClue
                    clue={clue}
                    clueIndex={index}
                    isSolved={!!puzzleSolutions[index]}
                    onSolved={onPuzzleSolved}
                  />
                ) : (
                  <p className="text-green-300 p-2">{clue.text}</p>
                )}
              </div>
            ))}
          </ScrollArea>
           <Button
              className="retro-button w-full"
              onClick={onRevealClue}
              disabled={revealedClueCount >= clues.length}
              data-tutorial="next-clue-button"
            >
              NEXT CLUE
            </Button>
        </div>
      </div>
    </div>
  );
}
