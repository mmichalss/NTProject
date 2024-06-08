export class RegisterDto {
  password: string = '';
  username: string = '';
  role: Role = 'ROLE_READER';
  email: string = '';
}

export type Role = 'ROLE_ADMIN' | 'ROLE_READER';

export class RegisterResponseDto {
  username: string = '';
  role: Role = 'ROLE_READER';
  email: string = '';
}
