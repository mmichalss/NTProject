export class GetBookDto {
  id: number = 0;
  isbn: string = '';
  title: string = '';
  author: string = '';
  publisher: string = '';
  yearPublished: number = 0;
  available: boolean = false;
}

export class GetBookMappedDto {
  id: number = 0;
  isbn: string = '';
  title: string = '';
  author: string = '';
  publisher: string = '';
  yearPublished: number = 0;
  available: string = '';

  constructor(
    id: number,
    isbn: string,
    title: string,
    author: string,
    publisher: string,
    yearPublished: number,
    available: boolean,
  ) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.yearPublished = yearPublished;
    this.available = available.toString();
  }
}
