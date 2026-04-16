import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: -3, b: 2, action: Action.Add, expected: -1 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 5, b: 2, action: Action.Divide, expected: 2.5 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
];

const negativeTestCases = [
  {
    a: 'a',
    b: 2,
    action: Action.Add,
    expected: null,
  },
  {
    a: 2,
    b: 'b',
    action: Action.Subtract,
    expected: null,
  },
  { a: 3, b: 2, action: '', expected: null },
];

const floatTestCases = [
  {
    a: 2.2,
    b: 0.1,
    action: Action.Add,
    expected: 2.3,
  },
  {
    a: 5.5,
    b: 1.2,
    action: Action.Subtract,
    expected: 4.3,
  },
  { a: 0.9, b: 2, action: Action.Multiply, expected: 1.8 },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'returns $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test.each(negativeTestCases)(
    'returns null for invalid input $a $action $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  test.each(floatTestCases)(
    'returns float $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeCloseTo(expected);
    },
  );
});
