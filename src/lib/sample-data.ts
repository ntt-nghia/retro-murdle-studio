import type { GenerateMurdleMysteryOutput } from "@/ai/flows/generate-murdle-mystery";

export const sampleMurdleData: GenerateMurdleMysteryOutput = {
  murdleData: {
    story: {
      title: "The Blackwood Estate Murder",
      intro: "The annual Blackwood charity gala was supposed to be the social event of the season. Instead, it became a scene of horror when Lord Edmund Blackwood, the estate's reclusive owner, was found dead in his locked study. The storm raging outside has trapped all the guests inside the manor, and one of them is a killer. The victim was discovered with a fatal wound, and three potential murder weapons have been identified. Can you solve this deadly puzzle before the killer strikes again?",
      victim: {
        name: "Lord Edmund Blackwood",
        background: "A wealthy and reclusive nobleman who inherited the Blackwood estate. Known for his sharp business dealings and secretive nature, he had many enemies despite his charitable facade.",
        motive_for_murder: "Lord Blackwood possessed damaging secrets about several guests and had recently changed his will, threatening to expose those who had wronged him."
      }
    },
    suspects: [
      {
        name: "Dr. Helena Marsh",
        avatar: "👩‍⚕️",
        profession: "Personal Physician",
        description: "The victim's longtime personal doctor and trusted confidante.",
        traits: "Tall stature • Left-handed • Medical expertise • Access to poisons • Wears distinctive red glasses"
      },
      {
        name: "Captain William Sterling",
        avatar: "🎖️",
        profession: "Military Officer",
        description: "A decorated war veteran and the victim's former business partner.",
        traits: "Medium height • Right-handed • Military training • Knife expertise • Distinctive scar on left cheek"
      },
      {
        name: "Miss Charlotte Worthington",
        avatar: "🎭",
        profession: "Estate Manager",
        description: "The young and ambitious manager of the Blackwood estate's affairs.",
        traits: "Short stature • Right-handed • Knowledge of estate layout • Financial expertise • Always wears pearl necklace"
      }
    ],
    weapons: [
      {
        name: "Antique Letter Opener",
        icon: "🗡️",
        description: "A sharp, ornate silver letter opener from Lord Blackwood's desk collection.",
        traits: "Light weight • Sharp blade • Silver material • Easily concealed • Requires precision"
      },
      {
        name: "Medical Syringe",
        icon: "💉",
        description: "A professional medical syringe containing a lethal dose of morphine.",
        traits: "Very light weight • Disposable plastic • Requires medical knowledge • Silent method • Quick acting"
      },
      {
        name: "Military Dagger",
        icon: "🔪",
        description: "A heavy ceremonial military dagger with an engraved handle.",
        traits: "Heavy weight • Steel blade • Military origin • Requires strength • Distinctive engravings"
      }
    ],
    locations: [
      {
        name: "The Study",
        icon: "📚",
        description: "Lord Blackwood's private study with locked doors and heavy curtains.",
        traits: "INDOORS"
      },
      {
        name: "The Conservatory",
        icon: "🌿",
        description: "A glass-walled garden room filled with exotic plants and natural light.",
        traits: "INDOORS"
      },
      {
        name: "The Garden Maze",
        icon: "🌲",
        description: "An elaborate hedge maze behind the manor, dark and secluded.",
        traits: "OUTDOORS"
      }
    ],
    clues: [
      {
        text: "The victim was found with a puncture wound. The Medical Syringe and Military Dagger have been ruled out as the murder weapon.",
        type: "elimination"
      },
      {
        text: "The murder did not take place in the Garden Maze or the Conservatory.",
        type: "elimination"
      },
      {
        text: "Dr. Helena Marsh was not in the Study at the time of the murder.",
        type: "elimination"
      },
      {
        text: "The person who used the Antique Letter Opener was not Captain William Sterling.",
        type: "relationship"
      },
      {
        text: "Miss Charlotte Worthington was not in the Conservatory during the incident.",
        type: "relationship"
      }
    ],
    solution: {
      suspect: "Miss Charlotte Worthington",
      weapon: "Antique Letter Opener",
      location: "The Study",
      motive: "Charlotte discovered that Lord Blackwood was planning to fire her and expose her embezzlement of estate funds. Facing financial ruin and imprisonment, she saw murder as her only escape.",
      method: "Charlotte waited until Lord Blackwood was alone in his study reviewing documents. She entered under the pretense of discussing estate business, then grabbed the letter opener from his desk and stabbed him in a moment of desperate panic.",
      reveal_narrative: "Miss Charlotte Worthington, the seemingly innocent estate manager, was driven to murder by desperation. Lord Blackwood had discovered her embezzlement and was preparing to destroy her life. In his own study, surrounded by the wealth she had been stealing, she used his own letter opener to silence him forever. Her knowledge of the estate layout allowed her to commit the perfect crime... or so she thought."
    }
  }
};
