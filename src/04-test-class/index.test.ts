import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });
  test('should create account with initial balance', () => {
    const acc = new BankAccount(10);
    const result = acc.getBalance();
    expect(result).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = new BankAccount(10);
    const balance = acc.getBalance();
    const error = new InsufficientFundsError(balance);
    expect(() => acc.withdraw(15)).toThrow(error);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = new BankAccount(10);
    const acc2 = new BankAccount(0);
    const error = new InsufficientFundsError(acc.getBalance());
    expect(() => acc.transfer(15, acc2)).toThrow(error);
    expect(acc.getBalance()).toBe(10);
    expect(acc2.getBalance()).toBe(0);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = new BankAccount(10);
    expect(() => acc.transfer(5, acc)).toThrow(TransferFailedError);
    expect(acc.getBalance()).toBe(10);
  });

  test('should deposit money', () => {
    const acc = new BankAccount(10);
    acc.deposit(5);
    expect(acc.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    const acc = new BankAccount(10);
    acc.withdraw(5);
    expect(acc.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const acc = new BankAccount(10);
    const acc2 = new BankAccount(20);
    acc.transfer(7, acc2);
    expect(acc.getBalance()).toBe(3);
    expect(acc2.getBalance()).toBe(27);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomSpy = jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(42)
      .mockReturnValueOnce(1);
    const acc = new BankAccount(10);
    await expect(acc.fetchBalance()).resolves.toBe(42);
    randomSpy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(77) // balance
      .mockReturnValueOnce(1); // success
    const acc = new BankAccount(10);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(77);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = new BankAccount(10);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    expect(acc.getBalance()).toBe(10);
  });
});
