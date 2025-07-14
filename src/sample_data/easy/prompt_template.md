# 🎯 **Murdle Game Generation Prompt Template**

## **Core Variables for Customization**

### **INPUT PARAMETERS:**
```
THEME = {theme}
DIFFICULTY_LEVEL = {difficulty_level}
```

---

## **Simplified Generation Prompt**

**You are a master puzzle designer creating a Murdle-style logic puzzle game. Generate a complete murder mystery following this exact structure:**

### **Theme: `{theme}`**
Create a cohesive murder mystery with **{theme}** as the central concept. Intelligently design all elements to fit this theme:

- **Characters**: Choose 3 character types that naturally belong in **{theme}** setting
- **Locations**: Design 3 places that logically exist within **{theme}** environment  
- **Weapons**: Select 3 implements that would realistically be found in **{theme}** context
- **Story Elements**: All descriptions and clues should reinforce **{theme}** atmosphere

### **Difficulty Level: `{difficulty_level}`**
- **Beginner**: 2-3 logical steps, mostly direct assignments and simple elimination
- **Intermediate**: 4-5 logical steps, include professional logic and relationships  
- **Advanced**: 6+ logical steps, conditional reasoning and complex constraints
- **Expert**: Multi-layered elimination with professional contradictions and either/or logic

### **Smart Theme Integration:**
The AI should automatically determine appropriate:
- Character professions that fit **{theme}**
- Weapon types suitable for **{theme}** setting
- Location varieties matching **{theme}** environment
- Clue styles that work well with **{theme}** context
- Writing tone that complements **{theme}** atmosphere

**Available Clue Types:**
1. **Direct Assignment**: "Character X has Item Y"
2. **Location Discovery**: "Body/evidence found at Location Z"  
3. **Environmental Evidence**: "Physical traces link elements"
4. **Negative Constraint**: "Item X not at Location Y"
5. **Professional Logic**: "Behavior matches character background"
6. **Relationship Logic**: "Characters share history/connections"
7. **Either/Or Logic**: "Either Condition A or Condition B"
8. **Coded Information**: "Encrypted messages requiring decryption"
9. **Sensory Evidence**: "Smell/sound/visual environmental cues"

### **Logical Complexity: `{logical_complexity}`**
Structure the puzzle requiring exactly **{logical_complexity}** deductive steps:
- Each clue must be necessary for solution
- Progressive revelation through logical chains
- Exactly one valid solution path
- Strategic use of negative vs positive information

### **Writing Style Requirements:**
- **Simple Language**: Use common vocabulary, avoid complex or literary words
- **Short Sentences**: Maximum 15-20 words per sentence, clear and direct
- **Dark Humor**: Include subtle comedy and ironic observations like original Murdle games
- **Accessible Tone**: Write for global audience, especially non-native English speakers
- **Punchy Descriptions**: Brief, memorable character and location descriptions
- **Clear Logic**: Clues must be straightforward and unambiguous

**Example Original Murdle Style:**
- "A magician who perfected the sawing-your-husband-in-two routine. Then, she made his body disappear."
- "He drives a BMW. He has a staff of twenty-five. He's taken a vow of chastity, too, which is why he's on vacation."
- "Just a regular, ordinary brick. Nothing special. Just a brick."

### **Quality Standards:**
- **Thematic Coherence**: All elements naturally fit **{theme}** 
- **Logical Consistency**: Single unique solution reachable through deduction
- **Accessible Writing**: Simple, clear language suitable for international audience
- **Character Authenticity**: Professional behaviors create realistic constraints
- **Puzzle Balance**: Appropriate complexity for **{difficulty_level}**

---

## **Output Format Requirements:**

Generate the complete game as JSON following this exact structure:

```json
{
  "gameId": "murdle_[unique_number]",
  "title": "[DRAMATIC TITLE IN ALL CAPS]",
  "description": "[2-3 SHORT sentences from Detective Logico's perspective, using SIMPLE words]",
  "suspects": [
    {
      "name": "[CHARACTER NAME IN ALL CAPS]",
      "description": "[1-2 SHORT sentences with background, using SIMPLE words and dark humor]",
      "traits": ["[height]", "[handedness]", "[eye color]", "[hair color]"]
    }
    // Exactly 3 suspects
  ],
  "weapons": [
    {
      "name": "[WEAPON NAME IN ALL CAPS]",
      "description": "[SHORT, funny description using SIMPLE words]",
      "specs": "[WEIGHT-CLASS & materials]"
    }
    // Exactly 3 weapons
  ],
  "locations": [
    {
      "name": "[LOCATION NAME IN ALL CAPS]",
      "description": "[SHORT atmospheric description using SIMPLE words]",
      "type": "[INDOORS or OUTDOORS]"
    }
    // Exactly 3 locations
  ],
  "clues": [
    "[Clue 1: CLEAR, SIMPLE factual statement]",
    "[Clue 2: CLEAR evidence or constraint using common words]",
    "[Clue 3: SIMPLE logical relationship]",
    "[Clue 4: CLEAR professional/behavioral logic]",
    "[Clue 5: SIMPLE environmental or sensory evidence]",
    "[Clue 6: Optional CLEAR final constraint]"
  ]
}
```

**Generate the complete murder mystery now using the specified parameters above.**

---

## **Example Usage:**

**Simple Theme Examples:**
- `THEME = "Pirate Ship"` → AI creates sailors, captain, cook + ship locations + nautical weapons
- `THEME = "Cooking School"` → AI creates chefs, students, instructor + kitchen locations + cooking implements  
- `THEME = "Space Station"` → AI creates astronauts, scientist, commander + space locations + sci-fi tools
- `THEME = "Medieval Castle"` → AI creates knights, nobles, servants + castle locations + medieval weapons
- `THEME = "Art Gallery"` → AI creates artist, curator, critic + gallery locations + art supplies
- `THEME = "Circus"` → AI creates performers, ringmaster, trainer + circus locations + performance equipment

**Difficulty Examples:**
- `DIFFICULTY_LEVEL = "Beginner"` → Simple elimination and direct assignments
- `DIFFICULTY_LEVEL = "Advanced"` → Complex logical chains with professional reasoning

The AI will automatically create all appropriate characters, locations, weapons, and clues that fit the theme while maintaining the signature Murdle style!
