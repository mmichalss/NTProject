import { GetBookDto } from '../book/book.dto';
import { GetUserDto } from '../user/user.dto';

export class GetLoanPagesDto {
  loans: GetWholeLoanDto[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  hasMore: boolean = false;
}
export class GetWholeLoanDto {
  id: number = 0;
  user: GetUserDto = new GetUserDto();
  book: GetBookDto = new GetBookDto();
  loanDate: string = '';
  dueDate: string = '';
}

export class GetLoanDto {
  id: number = 0;
  bookTitle: string = '';
  bookAuthor: string = '';
  loanDate: string = '';
  dueDate: string = '';

  constructor(
    id: number,
    bookTitle: string,
    bookAuthor: string,
    loanDate: string,
    dueDate: string,
  ) {
    this.id = id;
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.loanDate = loanDate;
    this.dueDate = dueDate;
  }
}

export class CreateLoanDto {
  userId: number | undefined;
  loanId: number | undefined;
  dueDate: Date | undefined;

  constructor(userId: number, loanId: number, dueDate: Date) {
    this.userId = userId;
    this.loanId = loanId;
    this.dueDate = dueDate;
  }
}

export class CreateLoanResponseDto {
  id: number | undefined;
  userId: number | undefined;
  loanId: number | undefined;
  loanDate: number | undefined;
  dueDate: number | undefined;
}
