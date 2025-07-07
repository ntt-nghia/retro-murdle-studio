"use client";
import {useState} from 'react';
import {cn} from "@/lib/utils";
import type {Clue, Story} from "@/lib/types";
import {ScrollArea} from "@/components/ui/scroll-area";

interface StoryPanelProps {
  story: Story;
  clues: Clue[];
}

export default function StoryPanel({
                                     story,
                                     clues,
                                   }: StoryPanelProps) {
  const [strikedClues, setStrikedClues] = useState<boolean[]>(() =>
    Array(clues.length).fill(false)
  );

  const handleToggleClue = (index: number) => {
    setStrikedClues((prev) => {
      const newStriked = [...prev];
      newStriked[index] = !newStriked[index];
      return newStriked;
    });
  };

  return (
    <div className="space-y-3">
      <div className="retro-frame" data-tutorial="story-panel">
        <h1 className="text-xl font-black retro-text-glow-pink p-2">{story.title}</h1>
        <div className="retro-frame-inset p-3">
          <ScrollArea className="h-40 font-code text-lime-300">
            <p className="whitespace-pre-wrap">{story.intro}</p>
            <div className="mt-3 space-y-2">
              <p className="text-amber-400 font-bold">VICTIM: {story.victim.name}</p>
              <p className="whitespace-pre-wrap">{story.victim.background}</p>
              <p className="text-red-400 font-bold mt-2">MOTIVE FOR MURDER:</p>
              <p className="whitespace-pre-wrap">{story.victim.motive_for_murder}</p>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="retro-frame" data-tutorial="clues-panel">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-lg font-bold retro-text-glow-cyan">CLUES & EVIDENCE</h2>
        </div>
        <div className="retro-frame-inset p-3 space-y-2">
          <ScrollArea className="h-48 font-code">
            {clues.map((clue, index) => (
              <div
                key={index}
                className="retro-frame bg-black/30 border-accent/50 p-2 cursor-pointer hover:bg-accent/20 mb-2"
                onClick={() => handleToggleClue(index)}
              >
                <p className={cn("text-lime-300 transition-all", strikedClues[index] && "line-through opacity-60")}>
                  <span className="text-amber-400 mt-1 uppercase">
                    #{index + 1}
                  </span> {clue.text}
                </p>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
