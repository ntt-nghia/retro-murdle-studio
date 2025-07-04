"use client";

import { useState } from "react";
import type { Clue } from "@/lib/types";
import { checkAnagram, checkCipher } from "@/lib/puzzle-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, Lock, Unlock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface PuzzleClueProps {
  clue: Clue;
  clueIndex: number;
  isSolved: boolean;
  onSolved: (clueIndex: number) => void;
}

export default function PuzzleClue({ clue, clueIndex, isSolved, onSolved }: PuzzleClueProps) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    let isCorrect = false;
    if (clue.puzzleType === 'anagram') {
        isCorrect = checkAnagram(answer, clue.solution);
    } else {
        isCorrect = checkCipher(answer, clue.solution);
    }
    
    if (isCorrect) {
      setFeedback("correct");
      onSolved(clueIndex);
    } else {
      setFeedback("incorrect");
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  return (
    <div className="p-2 space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-amber-400 font-bold">{clue.puzzleType?.toUpperCase()} PUZZLE</p>
        {isSolved ? <Unlock className="text-green-500" /> : <Lock className="text-red-500" />}
      </div>
      <p className="font-code text-amber-300">{clue.text}</p>
      
      {isSolved ? (
        <div className="retro-frame bg-green-900/50 border-green-500 p-2 text-green-300">
            <p className="font-bold">SOLUTION:</p>
            <p>{clue.solution}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex items-center gap-2">
                <Input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="retro-input flex-grow"
                    placeholder="ENTER SOLUTION..."
                />
                {clue.hint && (
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="button" variant="ghost" size="icon" className="!bg-transparent text-yellow-400 hover:!bg-yellow-400/20">
                                <Lightbulb />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="retro-frame bg-black border-yellow-400 text-yellow-300">
                            <p>{clue.hint}</p>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
          <Button type="submit" className="retro-button w-full !bg-yellow-500 !text-black hover:!bg-yellow-400">
            DECODE
          </Button>
        </form>
      )}

      {feedback === 'incorrect' && <p className="text-red-500 text-center font-bold text-blink">INCORRECT</p>}
    </div>
  );
}
