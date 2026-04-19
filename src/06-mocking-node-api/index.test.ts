import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval * 3);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockedExistsSync = jest.mocked(existsSync);
  const mockedReadFile = jest.mocked(readFile);
  const mockedJoin = jest.mocked(join);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    mockedJoin.mockReturnValue('/tmp/file.txt');
    mockedExistsSync.mockReturnValue(false);

    await readFileAsynchronously('file.txt');

    expect(mockedJoin).toHaveBeenCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    mockedJoin.mockReturnValue('/tmp/missing.txt');
    mockedExistsSync.mockReturnValue(false);

    await expect(readFileAsynchronously('missing.txt')).resolves.toBeNull();
    expect(mockedReadFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    mockedJoin.mockReturnValue('/tmp/existing.txt');
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(Buffer.from('hello'));

    await expect(readFileAsynchronously('existing.txt')).resolves.toBe('hello');
    expect(mockedReadFile).toHaveBeenCalledWith('/tmp/existing.txt');
  });
});
