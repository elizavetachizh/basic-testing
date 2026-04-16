import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 2;
    const b = 3;
    const action = Action.Add;
    const add = simpleCalculator({ a, b, action });
    expect(add).toBe(5);
  });

  test('should return null if one of arguments is negative number', () => {
    const a = 2;
    const b = -2;
    const action = Action.Add;
    const add = simpleCalculator({ a, b, action });
    expect(add).toBeNull();
  });

  test('should subtract two numbers', () => {
    const a = 2;
    const b = 3;
    const action = Action.Subtract;
    const subtract = simpleCalculator({ a, b, action });
    expect(subtract).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const a = 10;
    const b = 3;
    const action = Action.Multiply;
    const multiply = simpleCalculator({ a, b, action });
    expect(multiply).toBe(30);
  });

  test('should divide two numbers', () => {
    const a = 12;
    const b = 3;
    const action = Action.Divide;
    const divide = simpleCalculator({ a, b, action });
    expect(divide).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const a = 4;
    const b = 2;
    const action = Action.Exponentiate;
    const exponentiate = simpleCalculator({ a, b, action });
    expect(exponentiate).toBe(16);
  });

  test('should return null for invalid action', () => {
    const a = 4;
    const b = 2;
    const action = '%';
    const percentage = simpleCalculator({ a, b, action });
    expect(percentage).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const a = '5';
    const b = Infinity;
    const action = Action.Exponentiate;
    const percentage = simpleCalculator({ a, b, action });
    expect(percentage).toBe(null);
  });
});
