import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('value')).resolves.toBe('value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('error message')).toThrow('error message');
  });

  test('should throw error with default message if message is not provided', async () => {
    await expect(async () => throwError()).rejects.toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const error = new MyAwesomeError();
    expect(() => throwCustomError()).toThrow(error);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const error = new MyAwesomeError();
    const result = async () => await rejectCustomError();
    await expect(async () => await result()).rejects.toThrow(error);
  });
});
