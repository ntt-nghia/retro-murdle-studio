# Retro Sleuth AI Development Guidelines

This document provides essential information for developers working on the Retro Sleuth AI project.

## Build/Configuration Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

### Environment Setup
1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```
   You'll need to obtain a Gemini API key from Google AI Studio.

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
This will start the development server with Turbopack on port 9002. Access the application at http://localhost:9002.

### AI Development
The project uses Genkit with Google's Gemini AI model for generating murder mysteries and extracting story hints.

To run the AI development server:
```bash
npm run genkit:dev
```

To run the AI development server with watch mode:
```bash
npm run genkit:watch
```

### Production Build
```bash
npm run build
npm run start
```

## Testing Information

### Testing Framework
The project uses Jest for testing with the following configuration:
- TypeScript support via ts-jest
- JSDOM for DOM testing
- Path aliases matching the project's import structure

### Running Tests
```bash
npm test
```

### Adding New Tests
1. Create test files in the `src/__tests__` directory with the naming convention `*.test.ts` or `*.test.tsx`
2. For component tests, use React Testing Library patterns
3. For utility function tests, use standard Jest assertions

### Example Test
Here's an example test for the puzzle utility functions:

```typescript
// src/__tests__/puzzle-utils.test.ts
import { checkAnagram, checkCipher } from '../lib/puzzle-utils';

describe('Puzzle Utilities', () => {
  describe('checkAnagram', () => {
    it('should return true for valid anagrams', () => {
      expect(checkAnagram('listen', 'silent')).toBe(true);
      expect(checkAnagram('Astronomer', 'Moon starer')).toBe(true);
    });

    it('should return false for non-anagrams', () => {
      expect(checkAnagram('hello', 'world')).toBe(false);
    });
  });

  describe('checkCipher', () => {
    it('should return true for matching strings', () => {
      expect(checkCipher('hello', 'hello')).toBe(true);
      expect(checkCipher('Hello', 'hello')).toBe(true);
    });

    it('should return false for non-matching strings', () => {
      expect(checkCipher('hello', 'world')).toBe(false);
    });
  });
});
```

## Additional Development Information

### Project Structure
- `src/app`: Next.js app router pages and layouts
- `src/components`: React components
  - `src/components/murdle`: Game-specific components
  - `src/components/ui`: Reusable UI components
- `src/ai`: AI functionality using Genkit
  - `src/ai/flows`: AI flow definitions for different features
- `src/lib`: Utility functions and types
- `src/hooks`: Custom React hooks

### AI Integration
The project uses Genkit with Google's Gemini AI model for:
1. Generating murder mysteries with suspects, weapons, locations, and clues
2. Extracting story hints from content

Key AI files:
- `src/ai/genkit.ts`: AI configuration
- `src/ai/flows/generate-murdle-mystery.ts`: Mystery generation flow
- `src/ai/flows/extract-story-hints.ts`: Story hints extraction flow

### Code Style
- TypeScript is used throughout the project
- React components use functional style with hooks
- Server actions are used for AI interactions
- Tailwind CSS is used for styling with custom utility classes for retro effects

### Error Handling
- TypeScript build errors and ESLint errors are ignored during builds (see `next.config.ts`)
- AI errors are caught and displayed to the user in the UI

### Performance Considerations
- The AI generation can be slow, so the application provides a loading state
- Sample data is available for testing without AI generation
