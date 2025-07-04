import type { GenerateMurdleMysteryOutput } from "@/ai/flows/generate-murdle-mystery";

export const sampleMurdleData: GenerateMurdleMysteryOutput = {
  murdleData: {
    story: {
      title: "The Case of the Silent Nightingale",
      setting: "A lavish Victorian manor on a stormy night.",
      intro: "The grand Blackwood Manor, owned by the reclusive Lord Harrington, was a place of secrets. Tonight, a storm rages outside, mirroring the turmoil within. The famed opera singer, Eleonora Vance, known as 'The Nightingale,' was found lifeless in the music room. Her voice, once the toast of the town, is now silenced forever. The few guests and staff present are trapped by the storm, and one of them is a killer.",
      victim: {
        name: "Eleonora Vance",
        background: "A rising star in the opera world, known for her powerful voice and charismatic stage presence. She was a guest of Lord Harrington.",
        motive_for_murder: "Eleonora had recently discovered a secret about one of the guests, a secret she threatened to expose."
      }
    },
    suspects: [
      {
        name: "Lord Harrington",
        avatar: "🧐",
        profession: "Retired Aristocrat",
        description: "The enigmatic and wealthy owner of Blackwood Manor.",
        background: "Lord Harrington inherited his fortune and title but has lived in seclusion for years. He invited Eleonora to perform at a private gathering.",
        motive: "Eleonora discovered he was bankrupt and planned to use her performance to announce it and ruin him.",
        relationship_to_victim: "Host",
        story_hints: "He seemed unusually agitated, constantly checking his pocket watch."
      },
      {
        name: "Beatrice Sinclair",
        avatar: "🎭",
        profession: "Rival Singer",
        description: "A jealous rival of Eleonora, also a guest.",
        background: "Beatrice was once the reigning diva of the opera, but Eleonora's talent has overshadowed her. She was heard arguing with Eleonora earlier in the evening.",
        motive: "Professional jealousy and the fear of her own career fading into obscurity.",
        relationship_to_victim: "Rival",
        story_hints: "She was seen near the conservatory, where a similar decorative dagger is missing from a collection."
      },
      {
        name: "Alistair Finch",
        avatar: "✒️",
        profession: "Journalist",
        description: "A gossip columnist who snuck into the party.",
        background: "Alistair is known for his scandalous articles. He believed Eleonora was his ticket to a career-making story about the secrets of the upper class.",
        motive: "Eleonora refused to give him an exclusive story and threatened to expose him as a fraud.",
        relationship_to_victim: "Acquaintance",
        story_hints: "He was seen scribbling furiously in a notepad in the library."
      }
    ],
    weapons: [
      {
        name: "Poisoned Wine",
        icon: "🍷",
        description: "A glass of expensive red wine, laced with a fast-acting poison.",
        story_connection: "A spilled glass of red wine was found near the victim's body. The bottle it came from is missing from the cellar."
      },
      {
        name: "Antique Dagger",
        icon: "🗡️",
        description: "An ornate, silver-handled dagger from Lord Harrington's collection.",
        story_connection: "The dagger is missing from a display case in the conservatory. It matches the description of the murder weapon."
      },
      {
        name: "Heavy Candlestick",
        icon: "🕯️",
        description: "A solid brass candlestick from the grand hall.",
        story_connection: "A candlestick was found out of place in the music room, with a faint, dark stain on its base."
      }
    ],
    locations: [
      {
        name: "The Library",
        icon: "📚",
        description: "A vast room filled with floor-to-ceiling bookshelves and a large, imposing fireplace.",
        story_connection: "A book on rare poisons was found left open on a reading table."
      },
      {
        name: "The Conservatory",
        icon: "🌿",
        description: "A glass-walled room filled with exotic plants and the scent of damp earth.",
        story_connection: "The display case for antique weapons has been forced open."
      },
      {
        name: "The Music Room",
        icon: "🎹",
        description: "A room with a grand piano, velvet curtains, and where the body was discovered.",
        story_connection: "The site of the murder. The air is thick with tension."
      }
    ],
    clues: [
      {
        text: "The victim was not stabbed. The coroner found no puncture wounds.",
        type: "elimination",
        isPuzzle: false,
        puzzleType: "",
        solution: "",
        hint: ""
      },
      {
        text: "Lord Harrington was seen in the Library, far from the Music Room, at the estimated time of death.",
        type: "elimination",
        isPuzzle: false,
        puzzleType: "",
        solution: "",
        hint: ""
      },
      {
        text: "The killer acted out of desperation, not just anger. The evidence suggests a planned action, not a crime of passion.",
        type: "relationship",
        isPuzzle: false,
        puzzleType: "",
        solution: "",
        hint: ""
      },
      {
        text: "The following message was found scrawled on a piece of sheet music: 'Svool, I've got you now.' What is the first word?",
        type: "puzzle",
        isPuzzle: true,
        puzzleType: "anagram",
        solution: "Fools",
        hint: "Unscramble the letters to reveal a word."
      },
      {
        text: "The murder weapon was something that could be easily concealed.",
        type: "direct_statement",
        isPuzzle: false,
        puzzleType: "",
        solution: "",
        hint: ""
      }
    ],
    solution: {
      suspect: "Beatrice Sinclair",
      weapon: "Poisoned Wine",
      location: "The Music Room",
      motive: "Consumed by professional jealousy, Beatrice poisoned Eleonora to reclaim her spot as the top opera singer.",
      method: "Beatrice offered Eleonora a glass of wine before her performance, pretending it was a peace offering. The wine was laced with a fast-acting poison she acquired from a shady apothecary, which she read about in a book from the library.",
      reveal_narrative: "The final clue was Beatrice's desperation. While others had motives, only she stood to gain her entire world back with Eleonora gone. She feigned friendship, offering a toast to her rival's success, a toast that sealed Eleonora's fate. The argument was a ruse to make it seem like a crime of passion, but the poison was planned.",
      story_connections: [
        "Beatrice's argument with the victim.",
        "The spilled wine.",
        "The open book on poisons in the library."
      ]
    }
  }
};
