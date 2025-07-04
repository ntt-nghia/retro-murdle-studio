"use client";
import { useState } from 'react';
import { cn } from "@/lib/utils";
import type { Story, Clue } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, MapPin, Microscope, Users } from "lucide-react";

interface StoryPanelProps {
  story: Pick<Story, 'title' | 'setting' | 'intro' | 'victim'>;
  clues: Clue[];
  onOpenModal: (type: "suspects" | "weapons" | "locations") => void;
}

export default function StoryPanel({
  story,
  clues,
  onOpenModal,
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
            <h2 className="text-xl font-bold retro-text-glow-cyan">CLUES & EVIDENCE</h2>
        </div>
        <div className="retro-frame-inset p-4 space-y-3">
          <ScrollArea className="h-64 font-code">
            {clues.map((clue, index) => (
              <div 
                key={index} 
                className="retro-frame bg-black/30 border-accent/50 p-2 cursor-pointer hover:bg-accent/20"
                onClick={() => handleToggleClue(index)}
              >
                <p className={cn("text-lime-300 transition-all", strikedClues[index] && "line-through opacity-60")}>
                  {clue.text}
                </p>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
