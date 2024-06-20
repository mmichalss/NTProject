import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginRequestDto } from './dto/login/login-request.dto';
import {
  GetBookDto,
  CreateBookDto,
  CreateBookResponseDto,
} from './dto/book/book.dto';
import {
  CreateLoanDto,
  CreateLoanResponseDto,
  GetLoanPagesDto,
  GetLoanReturnedDto,
  GetLoansReturnedPagesDto,
} from './dto/loan/loan.dto';
import {
  GetUserDto,
  UpdateUserDto,
  UpdateUserResponseDto,
} from './dto/user/user.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register/register.dto';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

interface RoleJwtPayload extends JwtPayload {
  role?: string;
}

export class LibraryClient {
  private baseUrl = 'http://localhost:8080/api';
  private client: AxiosInstance;
  private token: string | null = null;
  private cookies = new Cookies();

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
    });

    this.client.interceptors.request.use((config) => {
      const token = this.cookies.get('token');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
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

      const decoded = jwtDecode<JwtPayload>(response.data.token);

      if (decoded.exp) {
        this.cookies.set('token', response.data.token, {
          expires: new Date(decoded.exp * 1000),
        });
      }
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

  public getUserRole(): string {
    const token = this.cookies.get('token');
    if (token) {
      const decoded = jwtDecode<RoleJwtPayload>(token);
      if (decoded.role) {
        return decoded.role;
      }
    }
    return '';
  }

  public logout(): void {
    this.cookies.remove('token');
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

      console.log(response.data);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }
  public async createBook(
    data: CreateBookDto,
  ): Promise<ClientResponse<CreateBookResponseDto | undefined>> {
    try {
      const response: AxiosResponse<CreateBookResponseDto> =
        await this.client.post('books', data);

      console.log(response.data);
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

  public async deleteBook(
    id: number,
  ): Promise<ClientResponse<undefined | Error>> {
    try {
      const response: AxiosResponse = await this.client.delete(`books/${id}`);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllLoansUsers(
    page: number = 1,
    size: number = 10,
  ): Promise<ClientResponse<GetLoanPagesDto | undefined>> {
    try {
      const meResponse = await this.getMe();
      if (!meResponse.success || !meResponse.data) {
        throw new Error('Unable to retrieve user information');
      }

      const id: number = meResponse.data.id;
      const response: AxiosResponse<GetLoanPagesDto> = await this.client.get(
        `loans`,
        {
          params: {
            page: page,
            size: size,
            userId: id,
          },
        },
      );

      console.log(response.data);
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
  public async getAllLoansReturnedUsers(
    page: number = 1,
    size: number = 10,
  ): Promise<ClientResponse<GetLoansReturnedPagesDto | undefined>> {
    try {
      const meResponse = await this.getMe();
      if (!meResponse.success || !meResponse.data) {
        throw new Error('Unable to retrieve user information');
      }

      const id: number = meResponse.data.id;
      const response: AxiosResponse<GetLoansReturnedPagesDto> =
        await this.client.get(`loans/returned`, {
          params: {
            page: page,
            size: size,
            userId: id,
          },
        });

      console.log(response.data);
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

  public async getAllLoansAdmin(
    userId: number,
    page: number = 1,
    size: number = 10,
  ): Promise<ClientResponse<GetLoanPagesDto | undefined>> {
    try {
      const response: AxiosResponse<GetLoanPagesDto> = await this.client.get(
        `loans`,
        {
          params: {
            page: page,
            size: size,
            userId: userId,
          },
        },
      );

      console.log(response.data);
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
  public async createLoan(
    data: CreateLoanDto,
  ): Promise<ClientResponse<CreateLoanResponseDto | undefined>> {
    try {
      const response: AxiosResponse<CreateLoanResponseDto> =
        await this.client.post('loans', data);
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

  public async deleteLoan(
    id: number,
  ): Promise<ClientResponse<undefined | Error>> {
    try {
      const response: AxiosResponse = await this.client.delete(`loans/${id}`);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }
  public async returnBook(
    loanId: number,
  ): Promise<ClientResponse<GetLoanReturnedDto | undefined>> {
    try {
      const response: AxiosResponse<GetLoanReturnedDto> =
        await this.client.patch(`loans/${loanId}`);

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

  public async updateUser(
    id: number,
    data: UpdateUserDto,
  ): Promise<ClientResponse<UpdateUserResponseDto | undefined>> {
    try {
      const response: AxiosResponse<UpdateUserResponseDto> =
        await this.client.patch(`users/${id}`, data);

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

  public async deleteUser(
    id: number,
  ): Promise<ClientResponse<undefined | Error>> {
    try {
      const response: AxiosResponse = await this.client.delete(`users/${id}`);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);

      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }
}
