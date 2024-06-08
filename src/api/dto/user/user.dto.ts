export class GetUserDto {
  id: number = 0;
  email: string = '';
  name: string = '';
  lastName: string = '';
}

export class UpdateUserDto {
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

export class UpdateUserResponseDto {
  id: number = 0;
  name: string = '';
  lastName: string = '';
  email: string = '';
}
