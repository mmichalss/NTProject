import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginRequestDto } from './dto/login/login-request.dto';
import { GetBookDto } from './dto/book/book.dto';
import {
  GetLoanDto,
  GetLoanPagesDto,
  GetWholeLoanDto,
} from './dto/loan/loan.dto';
import { GetUserDto } from './dto/user/user.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register/register.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

export class LibraryClient {
  private baseUrl = 'http://localhost:8080/api';
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
    });
  }
  public async login(
    data: LoginRequestDto,
  ): Promise<ClientResponse<undefined | Error>> {
    try {
      const response: AxiosResponse = await this.client.post(
        'auth/login',
        data,
      );

      this.client.interceptors.response.use(
        (config) => {
          config.headers['Authorization'] = `Bearer ${response.data.token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
      //saving a token
      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;

      return {
        success: true,
        data: undefined,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: axiosError.response?.data,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getMe(): Promise<ClientResponse<GetUserDto | undefined>> {
    try {
      const response: AxiosResponse<GetUserDto> =
        await this.client.get('users/me');
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllBooks(): Promise<
    ClientResponse<GetBookDto[] | undefined>
  > {
    try {
      const response: AxiosResponse<GetBookDto[]> =
        await this.client.get('books');

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllLoans(): Promise<
    ClientResponse<GetLoanPagesDto[] | undefined>
  > {
    try {
      const id: number = (await this.getMe()).data!!.id;
      const response: AxiosResponse<GetLoanPagesDto[]> = await this.client.get(
        `loans`,
        {
          params: {
            userId: id,
          },
        },
      );
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllUsers(): Promise<
    ClientResponse<GetUserDto[] | undefined>
  > {
    try {
      const response: AxiosResponse<GetUserDto[]> =
        await this.client.get('users');

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async register(
    data: RegisterDto,
  ): Promise<ClientResponse<RegisterResponseDto | undefined>> {
    try {
      const response: AxiosResponse<RegisterResponseDto> =
        await this.client.post('auth/register', data);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }
}
