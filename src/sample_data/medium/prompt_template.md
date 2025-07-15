# Murdle Game Generator Prompt Template

## INPUT VARIABLES

- **DIFFICULTY**: {novice | intermediate | expert}
- **THEME**: {user_input_theme}

## THEME-TO-ELEMENTS MAPPING

Based on **THEME**, derive these elements:

### Character Types

```
THEME → CHARACTER_ARCHETYPES (3 professional/social roles that fit the setting)
```

### Setting Elements

```
THEME → LOCATION_SETTING (3 places within the theme environment)
THEME → WEAPON_CATEGORY (3 objects that belong in this setting)
```

### Puzzle Framework

```
THEME → CLUE_TYPE_FOCUS (which clue types work best for this theme)
THEME → STORY_TONE (formal, casual, humorous, mysterious)
THEME → ENVIRONMENTAL_RULES (what makes sense in this world)
```

## DIFFICULTY SCALING

### Novice Level

- **Total Clues**: 3-4
- **Statement Pattern**: 2 truth claims, 1 obvious lie
- **Physical Traits**: Direct height/eye color references
- **Logic Steps**: 1-2 simple deductions
- **Contradiction Type**: Direct conflict with established facts

### Intermediate Level

- **Total Clues**: 4-6
- **Statement Pattern**: Mixed truth/observation claims, subtle lie
- **Physical Traits**: Comparative measurements, zodiac signs
- **Logic Steps**: 2-3 linked deductions
- **Contradiction Type**: Logical impossibility requiring cross-reference

### Expert Level

- **Total Clues**: 6-8
- **Statement Pattern**: Complex interdependent claims, hidden lie
- **Physical Traits**: Multiple trait combinations, behavioral patterns
- **Logic Steps**: 3-4 chained inferences
- **Contradiction Type**: Multi-step logical contradiction

## GENERATION TEMPLATE

**Create a murder mystery game with:**

### Basic Structure

```json
{
  "title": "[THEME-appropriate title]",
  "description": "[1-2 sentences setting scene in THEME]",
  "suspects": [3 characters from THEME],
  "weapons": [3 objects from THEME],
  "locations": [3 places from THEME],
  "clues": [DIFFICULTY-appropriate number],
  "statements": [3 statements with 1 lie from murderer]
}
```

### Character Template

```json
{
  "name": "[TITLE + COLOR/DESCRIPTOR NAME]",
  "description": "[Simple 1-sentence personality]",
  "traits": [
    "[HEIGHT]",
    "[HANDEDNESS]",
    "[EYE COLOR]",
    "[HAIR COLOR]",
    "[ZODIAC SIGN]"
  ]
}
```

### Weapon Template

```json
{
  "name": "[THEME-appropriate object]",
  "description": "[What it does, why it's here]",
  "specs": "[LIGHT/MEDIUM/HEAVY-WEIGHT + special properties]"
}
```

### Location Template

```json
{
  "name": "[THEME location]",
  "description": "[What happens here, key features]",
  "type": "[INDOORS/OUTDOORS]"
}
```

## CLUE GENERATION RULES

### Physical Trait Clues (Use for all difficulties)

- Height comparisons: "The tallest suspect...", "The shortest person..."
- Eye color: "Someone with blue eyes...", "Green-eyed person..."
- Zodiac: "A Virgo was...", "The Pisces..."

### Environmental Clues (Scale with difficulty)

- **Novice**: "X was not allowed in Y"
- **Intermediate**: "X was found in Y location"
- **Expert**: "Evidence suggests X happened because Y rule"

### Forensic Evidence (Higher difficulties)

- Physical traces: "A drop of X found in Y"
- Material evidence: "Fragment of X discovered at Y"

### Social/Behavioral (Expert level)

- Character relationships: "A didn't trust B"
- Behavioral patterns: "X always avoids Y"

## STATEMENT GENERATION FRAMEWORK

### Create exactly 3 statements where:

1. **Two suspects tell the truth** (their statements can be verified)
2. **One suspect lies** (the murderer - their statement contradicts facts)
3. **Statements connect** so you can figure out who's lying

### Statement Types:

- **Weapon Claims**: "I brought X"
- **Location Reports**: "Person A was at place B"
- **Negative Claims**: "I was not at X" or "Y was not at Z"

### Lie Detection Method:

Create statements where if you assume all are true, you get a logical impossibility. The person whose statement makes
things impossible is the liar (and murderer).

## SOLUTION VERIFICATION

Check that:

1. ✅ Only one valid killer-weapon-location combination exists
2. ✅ All clues point to the same solution
3. ✅ The lying suspect's statement creates detectable contradiction
4. ✅ Truth-telling suspects' statements are verifiable
5. ✅ Every clue helps solve the puzzle

## WRITING STYLE GUIDELINES

### Keep It Simple

- Use short, clear sentences
- Avoid complex vocabulary
- One main idea per sentence
- Direct descriptions, not flowery language

### Make It Accessible

- Explain unfamiliar terms
- Use common words when possible
- Keep character descriptions brief
- Focus on puzzle-relevant details

### Stay Focused

- Every element serves the puzzle
- No unnecessary complexity
- Clear cause-and-effect relationships
- Logical connections are obvious

---

## USAGE EXAMPLE

**INPUT**:

- DIFFICULTY: intermediate
- THEME: space station

**OUTPUT**: Game featuring astronauts, engineers, scientists with weapons like laser tools, gravity devices, air
recyclers in locations like command center, airlock, laboratory, with 4-5 clues including height comparisons and
equipment restrictions, plus 3 statements where one creates a logical contradiction about tool placement.

This template generates complete, playable murder mystery logic puzzles based on any theme and difficulty level while
maintaining the core deduction mechanics that make each puzzle uniquely solvable.

## Output Format

Generate a complete JSON following this structure:

```json
{
  "gameId": "[unique identifier]",
  "title": "[SHORT PUNCHY TITLE RELATED TO THEME]",
  "description": "[2-3 sentences setting up the murder scene in the theme setting]",
  "suspects": [
    {
      "name": "[TITLE/PROFESSION NAME FITTING THEME]",
      "description": "[1-2 sentences about personality and role in theme setting]",
      "traits": [
        "[height]",
        "[handedness]",
        "[eye color]",
        "[hair color]",
        "[zodiac sign]"
      ]
    },
    {
      "name": "[SECOND SUSPECT NAME]",
      "description": "[Their background in theme context]",
      "traits": [
        "[height]",
        "[different handedness]",
        "[different eye color]",
        "[different hair]",
        "[different zodiac]"
      ]
    },
    {
      "name": "[THIRD SUSPECT NAME]",
      "description": "[Their role and personality in theme]",
      "traits": [
        "[height]",
        "[third handedness]",
        "[third eye color]",
        "[third hair]",
        "[third zodiac]"
      ]
    }
  ],
  "weapons": [
    {
      "name": "[WEAPON NAME FITTING THEME]",
      "description": "[Brief description with thematic context]",
      "specs": "[WEIGHT-CLASS] and [any special properties relevant to theme]"
    },
    {
      "name": "[SECOND WEAPON]",
      "description": "[Description with theme elements]",
      "specs": "[Different weight class] [theme-appropriate properties]"
    },
    {
      "name": "[THIRD WEAPON]",
      "description": "[Theme-fitting description]",
      "specs": "[Third weight class] [thematic specifications]"
    }
  ],
  "locations": [
    {
      "name": "[LOCATION NAME IN THEME SETTING]",
      "description": "[Brief description with features relevant to puzzle logic]",
      "type": "INDOORS or OUTDOORS"
    },
    {
      "name": "[SECOND LOCATION]",
      "description": "[Theme-appropriate description with logical constraints]",
      "type": "INDOORS or OUTDOORS"
    },
    {
      "name": "[THIRD LOCATION]",
      "description": "[Final location fitting theme with puzzle-relevant details]",
      "type": "INDOORS or OUTDOORS"
    }
  ],
  "motives": [],
  "clues": [
    "[Physical evidence clue]",
    "[Environmental restriction clue]",
    "[Character trait observation]",
    "[Forensic discovery]",
    "[Additional clues based on difficulty level]"
  ],
  "statements": [
    {
      "speaker": "[EXACT NAME OF FIRST SUSPECT]",
      "statement": "[What first suspect claims - true if innocent, false if guilty]"
    },
    {
      "speaker": "[EXACT NAME OF SECOND SUSPECT]",
      "statement": "[What second suspect claims - true if innocent, false if guilty]"
    },
    {
      "speaker": "[EXACT NAME OF THIRD SUSPECT]",
      "statement": "[What third suspect claims - true if innocent, false if guilty]"
    }
  ]
}
```

