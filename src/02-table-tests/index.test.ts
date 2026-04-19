import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 5, b: 2, action: Action.Divide, expected: 2.5 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: -3, b: '2', action: Action.Add, expected: null },
  { a: 5, b: 0, action: '', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'returns $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
