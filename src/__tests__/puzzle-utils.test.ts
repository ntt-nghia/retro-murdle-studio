import { checkAnagram, checkCipher } from '@/lib/puzzle-utils';

describe('Puzzle Utilities', () => {
  describe('checkAnagram', () => {
    it('should return true for valid anagrams', () => {
      expect(checkAnagram('listen', 'silent')).toBe(true);
      expect(checkAnagram('Astronomer', 'Moon starer')).toBe(true);
      expect(checkAnagram('The Morse Code', 'Here come dots')).toBe(true);
    });

    it('should return false for non-anagrams', () => {
      expect(checkAnagram('hello', 'world')).toBe(false);
      expect(checkAnagram('test', 'testing')).toBe(false);
    });

    it('should ignore spaces, punctuation, and case', () => {
      expect(checkAnagram('A gentleman', 'Elegant man')).toBe(true);
      expect(checkAnagram('Eleven plus two', 'Twelve plus one')).toBe(true);
    });
  });

  describe('checkCipher', () => {
    it('should return true for matching strings', () => {
      expect(checkCipher('hello', 'hello')).toBe(true);
      expect(checkCipher('Hello', 'hello')).toBe(true);
      expect(checkCipher(' hello ', 'hello')).toBe(true);
    });

    it('should return false for non-matching strings', () => {
      expect(checkCipher('hello', 'world')).toBe(false);
      expect(checkCipher('test', 'testing')).toBe(false);
    });
  });
});
