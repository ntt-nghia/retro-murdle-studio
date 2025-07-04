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
  // Generalize to handle any number of groups
  const groups = [
    { title: 'Suspects', items: suspects },
    { title: 'Weapons', items: weapons },
    { title: 'Locations', items: locations },
  ].filter(g => g.items && g.items.length > 0); // Filter out empty groups if any

  const iconSizeClass = "w-14 h-14";
  const iconHeaderWidth = "3.5rem";
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

  const Header = ({ items, orientation }: { items: any[]; orientation: 'horizontal' | 'vertical' }) => (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col justify-around h-full' : 'flex-row'}`}>
      {items.map(item => (
        <div key={item.name} className={`flex items-center justify-center ${iconSizeClass} ${textSizeClass}`} title={item.name}>
          {item.icon || item.avatar || item.name.charAt(0)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center" data-tutorial="deduction-grid">
      <div className="grid auto-cols-auto gap-px">
        {/* This empty cell is the top-left corner */}
        <div style={{ gridRow: 1, gridColumn: 1 }}></div>

        {/* Create the top header row (e.g., Weapons, Locations) */}
        {groups.slice(1).map((group, index) => (
          <div key={`top-header-${group.title}`} className="p-1" style={{ gridRow: 1, gridColumn: index + 2 }}>
            <Header items={group.items} orientation="horizontal" />
          </div>
        ))}
        
        {/* Create side headers and sub-grids row by row */}
        {groups.slice(0, -1).map((rowGroup, rowIndex) => (
          <React.Fragment key={`row-fragment-${rowGroup.title}`}>
            {/* Side Header (e.g., Suspects, Weapons) */}
            <div className="p-1" style={{ gridRow: rowIndex + 2, gridColumn: 1 }}>
              <Header items={rowGroup.items} orientation="vertical" />
            </div>
            
            {/* The sub-grids that form the upper-right triangle */}
            {groups.slice(rowIndex + 1).map((colGroup) => {
                const group1Index = groups.findIndex(g => g.title === rowGroup.title);
                const group2Index = groups.findIndex(g => g.title === colGroup.title);

                return (
                    <div 
                        key={`${rowGroup.title}-${colGroup.title}`} 
                        style={{ gridRow: group1Index + 2, gridColumn: group2Index + 1 }}
                    >
                    <SubGrid
                        rows={rowGroup.items}
                        cols={colGroup.items}
                        gridState={gridState}
                        onCellClick={onCellClick}
                    />
                    </div>
                );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
