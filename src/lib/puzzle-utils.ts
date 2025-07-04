export const checkAnagram = (input: string, solution: string): boolean => {
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
  return normalize(input) === normalize(solution);
};

// The AI provides a direct solution for ciphers, so we just need to compare strings.
export const checkCipher = (input: string, solution:string): boolean => {
    return input.toLowerCase().trim() === solution.toLowerCase().trim();
}
