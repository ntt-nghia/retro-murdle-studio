/**
 * This file contains the unified TypeScript schemas for the Murdle game.
 * It defines two main interfaces:
 * - MurdleGameMasterSchema: A comprehensive schema for the game master, including all solutions and game mechanics.
 * - MurdlePlayerSchema: A filtered schema for the player, containing only the information necessary to solve the puzzle.
 */

// Represents a single trait of a suspect.
type SuspectTrait = string;

// Represents a suspect in the game.
interface Suspect {
  name: string;
  relationship: string;
  description: string;
  traits: SuspectTrait[];
  motive: string;
  astrological_sign?: string; // Optional field for medium/hard difficulties
}

// Represents a weapon in the game.
interface Weapon {
  name: string;
  type?: string; // Optional field, as some weapons might not have a clear type
  weight: string;
  description: string;
  material?: string;
  availability?: string;
  preparation?: string;
  usage?: string;
  consequence?: string;
  condition?: string;
}

// Represents a location in the game.
interface Location {
  name: string;
  environment: string;
  description: string;
  significance: string;
  accessibility?: string;
  restrictions?: string[];
  condition?: string;
}

// Represents a clue in the game.
interface Clue {
  id: string;
  description: string;
  type: string;
  eliminates?: string[];
  points_to?: string[];
  decoded?: string;
  decoded_message?: string;
  requires_exhibit?: string;
  analysis?: string;
  logic?: string;
}

// Represents a statement made by a suspect.
interface Statement {
  speaker: string;
  statement: string;
  analysis: string;
}

// Represents a statement with truth value for the game master.
interface MasterStatement extends Statement {
  truth_value: boolean;
}

// Represents the solution to the murder mystery.
interface Solution {
  killer: string;
  weapon: string;
  location: string;
  motive?: string; // Motive is optional in the solution
  logic_chain: string[];
}

// Represents special mechanics for a game, often in medium/hard difficulties.
interface SpecialMechanics {
  [key: string]: any; // Flexible to accommodate various mechanics
}

/**
 * MurdleGameMasterSchema: The complete schema for a Murdle game, intended for game masters.
 * This schema includes all information, including the solution, truth values of statements,
 * and any special game mechanics.
 */
export interface MurdleGameMasterSchema {
  game_id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  victim: {
    name: string;
    background: string;
    death_details: string;
    case_context: string;
  };
  suspects: Suspect[];
  weapons: Weapon[];
  locations: Location[];
  clues: Clue[];
  solution: Solution;
  statements?: MasterStatement[]; // Optional, for medium/hard difficulties
  special_mechanics?: SpecialMechanics; // Optional, for medium/hard difficulties
}

/**
 * MurdlePlayerSchema: A filtered schema for a Murdle game, intended for players.
 * This schema omits sensitive information that would reveal the solution, such as
 * the `solution` object and the `truth_value` from statements.
 */
export interface MurdlePlayerSchema {
  game_id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  victim: {
    name: string;
    background: string;
    death_details: string;
    case_context: string;
  };
  suspects: Suspect[];
  weapons: Weapon[];
  locations: Location[];
  clues: Clue[];
  statements?: Statement[]; // Statements without truth values
  special_mechanics?: SpecialMechanics; // Special mechanics can be shown to the player
}
