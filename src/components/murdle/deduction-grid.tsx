
"use client";

import React from "react";
import { Check, X, HelpCircle } from "lucide-react";
import type { Suspect, Weapon, Location } from "@/lib/types";

type CellState = "empty" | "x" | "check" | "question";

interface DeductionGridProps {
  suspects: Suspect[];
  weapons: Weapon[];
  locations: Location[];
  gridState: { [key: string]: CellState };
  onCellClick: (key: string) => void;
}

export default function DeductionGrid({ suspects, weapons, locations, gridState, onCellClick }: DeductionGridProps) {
  const groups = [
    { title: 'Suspects', items: suspects },
    { title: 'Weapons', items: weapons },
    { title: 'Locations', items: locations },
  ];

  const rowGroups = groups.slice(0, -1);
  const colGroups = groups.slice(1);

  const iconSizeClass = "w-14 h-14";
  const iconHeaderWidth = "3.5rem"; // Corresponds to w-14
  const textSizeClass = "text-4xl";
  const markSizeClass = "w-11 h-11";

  const GridCell = ({ state, onClick }: { state: CellState, onClick: () => void }) => (
    <div
      className={`flex items-center justify-center cursor-pointer retro-frame-inset bg-black/50 ${iconSizeClass}`}
      onClick={onClick}
    >
      {state === 'x' && <X className={`${markSizeClass} text-red-500`} />}
      {state === 'check' && <Check className={`${markSizeClass} text-green-500`} />}
      {state === 'question' && <HelpCircle className={`${markSizeClass} text-yellow-500`} />}
    </div>
  );
  
  const SubGrid = ({
    rows,
    cols,
    gridState,
    onCellClick,
  }: {
    rows: any[];
    cols: any[];
    gridState: { [key: string]: CellState };
    onCellClick: (key: string) => void;
  }) => (
    <div className="p-1 bg-black/20">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${cols.length}, ${iconHeaderWidth})`, gap: '2px' }}>
        {rows.map((row) =>
          cols.map((col) => {
            const keyParts = [row.name, col.name].sort();
            const key = keyParts.join('-');
            return (
              <GridCell
                key={key}
                state={gridState[key] || 'empty'}
                onClick={() => onCellClick(key)}
              />
            );
          })
        )}
      </div>
    </div>
  );

  const TopHeader = ({ items }: { items: any[] }) => (
    <div className="flex">
      {items.map(item => (
        <div key={item.name} className={`flex items-center justify-center ${iconSizeClass} ${textSizeClass}`} title={item.name}>
          {item.icon || item.avatar || item.name.charAt(0)}
        </div>
      ))}
    </div>
  );

  const SideHeader = ({ items }: { items: any[] }) => (
    <div className="flex flex-col justify-around h-full">
      {items.map(item => (
        <div key={item.name} className={`flex items-center justify-center ${iconSizeClass} ${textSizeClass}`} title={item.name}>
          {item.icon || item.avatar || item.name.charAt(0)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center" data-tutorial="deduction-grid">
      <div className="flex flex-col gap-px">
        {/* Header Row */}
        <div className="flex gap-px">
          <div style={{ width: iconHeaderWidth }} className="flex-shrink-0" />
          {colGroups.map((group) => (
            <div key={group.title} className="p-1">
              <TopHeader items={group.items} />
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {rowGroups.map((rowGroup, rowIndex) => (
          <div key={rowGroup.title} className="flex gap-px">
            <div style={{ width: iconHeaderWidth }} className="flex-shrink-0 flex items-stretch p-1">
              <SideHeader items={rowGroup.items} />
            </div>
            {colGroups.slice(rowIndex).map((colGroup) => (
              <div key={`${rowGroup.title}-${colGroup.title}`}>
                <SubGrid
                  rows={rowGroup.items}
                  cols={colGroup.items}
                  gridState={gridState}
                  onCellClick={onCellClick}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
