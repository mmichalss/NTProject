export class RegisterDto {
  username: string = '';
  password: string = '';
  role: Role = 'user';
  email: string = '';
}

export type Role = 'admin' | 'user';

export class RegisterResponseDto {
  username: string = '';
  role: Role = 'user';
  email: string = '';
}
