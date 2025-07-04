"use client";

import type { Suspect, Weapon, Location } from "@/lib/types";
import { Check, X } from "lucide-react";

type CellState = "empty" | "x" | "check";

interface DeductionGridProps {
  suspects: Suspect[];
  weapons: Weapon[];
  locations: Location[];
  gridState: { [key: string]: CellState };
  onCellClick: (key: string) => void;
}

const GridCell = ({ state, onClick }: { state: CellState, onClick: () => void }) => {
  return (
    <div
      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer retro-frame-inset bg-black/50"
      onClick={onClick}
    >
      {state === 'x' && <X className="w-8 h-8 text-red-500" />}
      {state === 'check' && <Check className="w-8 h-8 text-green-500" />}
    </div>
  );
};

interface SubGridProps {
  rows: { name: string, icon?: string }[];
  cols: { name: string, icon?: string }[];
  gridState: { [key: string]: CellState };
  onCellClick: (key: string) => void;
  title: string;
}

const SubGrid = ({ rows, cols, gridState, onCellClick, title }: SubGridProps) => (
  <div className="retro-frame-inset p-2 md:p-4">
    <h3 className="text-lg font-bold text-center mb-2 retro-text-glow-cyan">{title}</h3>
    <div className="grid grid-cols-1 gap-2 overflow-x-auto p-1">
      <div className="flex gap-1 sticky top-0 bg-background/80 z-10">
        <div className="w-16 md:w-20 flex-shrink-0" />
        {cols.map((col) => (
          <div key={col.name} className="w-10 md:w-12 flex-shrink-0 flex items-center justify-center text-2xl" title={col.name}>
            {col.icon || col.name.charAt(0)}
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row.name} className="flex gap-1 items-center">
          <div className="w-16 md:w-20 flex-shrink-0 text-right pr-2 text-2xl truncate" title={row.name}>
             {row.icon || row.name.split(' ').pop()?.substring(0,4)}
          </div>
          {cols.map((col) => (
            <GridCell
              key={`${row.name}-${col.name}`}
              state={gridState[`${row.name}-${col.name}`] || 'empty'}
              onClick={() => onCellClick(`${row.name}-${col.name}`)}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);


export default function DeductionGrid({ suspects, weapons, locations, gridState, onCellClick }: DeductionGridProps) {
  return (
    <div className="space-y-4">
      <SubGrid
        rows={suspects}
        cols={locations}
        gridState={gridState}
        onCellClick={onCellClick}
        title="SUSPECTS vs. LOCATIONS"
      />
      <SubGrid
        rows={suspects}
        cols={weapons}
        gridState={gridState}
        onCellClick={onCellClick}
        title="SUSPECTS vs. WEAPONS"
      />
      <SubGrid
        rows={weapons}
        cols={locations}
        gridState={gridState}
        onCellClick={onCellClick}
        title="WEAPONS vs. LOCATIONS"
      />
    </div>
  );
}
