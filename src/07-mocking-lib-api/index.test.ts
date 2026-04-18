import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedAxios = jest.mocked(axios);

  beforeEach(() => {
    jest.clearAllMocks();
    (throttledGetDataFromApi as unknown as { cancel: () => void }).cancel();
  });

  afterEach(() => {
    (throttledGetDataFromApi as unknown as { cancel: () => void }).cancel();
  });

  test('should create instance with provided base url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: {} });
    mockedAxios.create.mockReturnValue({ get: getMock } as never);

    await throttledGetDataFromApi('/todos');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: {} });
    mockedAxios.create.mockReturnValue({ get: getMock } as never);

    await throttledGetDataFromApi('/users/1');

    expect(getMock).toHaveBeenCalledWith('/users/1');
  });

  test('should return response data', async () => {
    const responseData = { id: 1, title: 'test' };
    const getMock = jest.fn().mockResolvedValue({ data: responseData });
    mockedAxios.create.mockReturnValue({ get: getMock } as never);

    await expect(throttledGetDataFromApi('/posts/1')).resolves.toEqual(
      responseData,
    );
  });
});
