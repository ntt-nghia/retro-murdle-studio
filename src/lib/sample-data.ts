import type { GenerateMurdleMysteryOutput } from "@/ai/flows/generate-murdle-mystery";

export const sampleMurdleData: GenerateMurdleMysteryOutput = {
  murdleData: {
    story: {
      title: "The Serpent's Shadow",
      setting: "Blackwood Manor, a sprawling Gothic estate shrouded in mist and secrets, perched on a cliff overlooking a stormy sea.",
      atmosphere: "A palpable tension hangs in the air, thick with unspoken rivalries and old money. Rain lashes against the stained-glass windows, and the distant cry of a lighthouse echoes the manor's isolation.",
      intro: "The annual Blackwood gala was the event of the season, but its glittering facade shattered when the host, Lord Alistair Blackwood, a ruthless industrialist with a venomous reputation, was found dead in his private study. A single, clean puncture wound marked his chest. The storm has trapped the remaining guests in the manor, turning a night of celebration into a theater of suspicion. The killer walks among them.",
      victim: {
        name: "Lord Alistair Blackwood",
        background: "A self-made tycoon who built his empire on cunning and cruelty. He was admired for his wealth but despised for his methods.",
        motive_for_murder: "Lord Blackwood had recently announced plans to cut off several key associates, leaving them ruined. He collected enemies like he collected rare art."
      }
    },
    suspects: [
      {
        name: "Lady Genevieve Blackwood",
        avatar: "💎",
        profession: "The Trophy Wife",
        description: "Alistair's young, beautiful, and deeply unhappy wife.",
        background: "Married into wealth, Genevieve found herself in a gilded cage. She is elegant and composed, but her eyes betray a desperate longing for freedom. She often sought solace in the Billiards Room.",
        motive: "Alistair's iron-clad prenuptial agreement would leave her with nothing in a divorce, but his death would make her a very wealthy widow.",
        relationship_to_victim: "Wife"
      },
      {
        name: "Silas Croft",
        avatar: "⚖️",
        profession: "The Bitter Partner",
        description: "Alistair's long-time business partner, recently betrayed.",
        background: "Silas was the architect of their early success, but Alistair pushed him into the shadows. He is a pragmatic and proud man, now simmering with resentment after being forced out of the company.",
        motive: "Alistair was about to expose a secret deal Silas made, which would not only ruin him financially but also land him in prison. He had to be silenced.",
        relationship_to_victim: "Business Partner"
      },
      {
        name: "Elara Vance",
        avatar: "🔮",
        profession: "The Enigmatic Mystic",
        description: "A spiritual advisor with a mysterious connection to the Blackwood family.",
        background: "Elara was a frequent visitor, hired by Alistair for her supposed insights. She carries an aura of mystique and claims to see truths others cannot. She spent much of the evening in the Observatory.",
        motive: "Alistair discovered she was a charlatan who had been extorting money from his late mother for years and threatened to expose her to her wealthy clientele.",
        relationship_to_victim: "Spiritual Advisor"
      }
    ],
    weapons: [
      {
        name: "Ornate Letter Opener",
        icon: "🗡️",
        description: "A sharp, serpent-themed letter opener made of silver, a gift from a rival, kept on the desk in the Study."
      },
      {
        name: "Poisoned Brandy",
        icon: "🍷",
        description: "A decanter of Alistair's favorite expensive brandy, which he often drank in the Billiards Room, potentially laced with a fast-acting toxin."
      },
      {
        name: "Heavy Velvet Curtain Cord",
        icon: "🎗️",
        description: "A thick, tasseled cord from the heavy blackout curtains in the Observatory, strong enough to be used for strangulation."
      }
    ],
    locations: [
      {
        name: "The Study",
        icon: "📚",
        description: "A room of dark mahogany, filled with leather-bound books, a massive oak desk, and the lingering scent of cigar smoke."
      },
      {
        name: "The Observatory",
        icon: "🔭",
        description: "A circular room at the top of the manor's tallest tower, with a large brass telescope aimed at the stormy sky."
      },
      {
        name: "The Billiards Room",
        icon: "🎱",
        description: "A dimly lit chamber with a full-sized billiards table, a well-stocked bar, and green-shaded lamps casting long shadows."
      }
    ],
    clues: [
      {
        text: "The coroner confirmed the cause of death was a single puncture wound. Poison and strangulation have been ruled out.",
        type: "elimination"
      },
      {
        text: "The murder did not happen in the Billiards Room or the Observatory.",
        type: "elimination"
      },
      {
        text: "Lady Genevieve was not in the Study at the time of the murder.",
        type: "elimination"
      },
      {
        text: "Elara Vance did not use the Ornate Letter Opener.",
        type: "relationship"
      },
      {
        text: "The person in the Billiards room was not Silas Croft.",
        type: "relationship"
      }
    ],
    solution: {
      suspect: "Silas Croft",
      weapon: "Ornate Letter Opener",
      location: "The Study",
      motive: "Silas killed Alistair to prevent his own financial and social ruin after Alistair threatened to expose his fraudulent dealings.",
      method: "Knowing Alistair would be in his Study after the party, Silas confronted him. The argument escalated, and in a moment of cold fury, Silas grabbed the nearest object - the letter opener on the desk - and stabbed Alistair, staging it to look like a suicide before slipping out unnoticed.",
      reveal_narrative: "It was a crime of desperation, committed by a man of pride. Silas Croft, pushed to the brink, saw only one way out. He confronted his old partner in the heart of his power, the Study. The letter opener, a symbol of the very correspondence that built their empire, became the instrument of its bloody end. It was a direct, calculated act, befitting a man who had spent his life in the cutthroat world of business."
    }
  }
};
