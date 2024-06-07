import { useCallback } from 'react';
import { useApi } from '../api/ApiProvider';
import { GetBookDto } from '../api/dto/book/book.dto';
import { ClientResponse } from '../api/library-client';
import React from 'react';

export default function useBooks() {
  const apiClient = useApi();
  const [books, setBooks] = React.useState<GetBookDto[] | undefined>();

  const fetchBooks = useCallback(async () => {
    try {
      const response: ClientResponse<GetBookDto[] | undefined> =
        await apiClient.getAllBooks();
      if (response.success) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [apiClient]);

  React.useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return books;
}
