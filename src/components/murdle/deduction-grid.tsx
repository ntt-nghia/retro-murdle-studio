
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

const GridCell = ({ state, onClick }: { state: CellState, onClick: () => void }) => {
  return (
    <div
      className="w-12 h-12 flex items-center justify-center cursor-pointer retro-frame-inset bg-black/50"
      onClick={onClick}
    >
      {state === 'x' && <X className="w-10 h-10 text-red-500" />}
      {state === 'check' && <Check className="w-10 h-10 text-green-500" />}
      {state === 'question' && <HelpCircle className="w-10 h-10 text-yellow-500" />}
    </div>
  );
};

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
    <div className="grid" style={{ gridTemplateColumns: `repeat(${cols.length}, 3rem)`, gap: '2px' }}>
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
  <div className="flex justify-around">
    {items.map(item => (
      <div key={item.name} className="w-12 h-12 flex items-center justify-center text-3xl" title={item.name}>
        {item.icon || item.avatar || item.name.charAt(0)}
      </div>
    ))}
  </div>
);

const SideHeader = ({ items }: { items: any[] }) => (
    <div className="flex flex-col justify-around h-full">
      {items.map(item => (
        <div key={item.name} className="h-12 w-12 flex items-center justify-center text-3xl" title={item.name}>
          {item.icon || item.avatar || item.name.charAt(0)}
        </div>
      ))}
    </div>
);


export default function DeductionGrid({ suspects, weapons, locations, gridState, onCellClick }: DeductionGridProps) {
  const groups = [
    { title: 'Suspects', items: suspects },
    { title: 'Weapons', items: weapons },
    { title: 'Locations', items: locations },
  ];

  const colGroups = groups.slice(0, -1);
  const rowGroups = groups.slice(1);
  
  const iconHeaderSize = "3rem";

  return (
    <div className="flex justify-center" data-tutorial="deduction-grid">
      <div className="inline-grid gap-1">
        {/* Top Header Row (Icons) */}
        {colGroups.map((group, index) => (
          <div key={group.title} style={{ gridRow: 1, gridColumn: index + 2 }} className="p-1">
            <TopHeader items={group.items} />
          </div>
        ))}
        
        {/* Subsequent Rows (Side Headers + Grids) */}
        {rowGroups.map((rowGroup, rowIndex) => (
          <React.Fragment key={rowGroup.title}>
            {/* Side Header */}
            <div style={{ gridRow: rowIndex + 2, gridColumn: 1, width: iconHeaderSize }} className="flex items-stretch">
                <SideHeader items={rowGroup.items} />
            </div>
            
            {/* Sub-Grids for the row */}
            {colGroups.map((colGroup, colIndex) => {
              // This creates the lower-left triangular matrix
              if (colIndex > rowIndex) {
                return null;
              }
              return (
                <div key={`${rowGroup.title}-${colGroup.title}`} style={{ gridRow: rowIndex + 2, gridColumn: colIndex + 2 }}>
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
