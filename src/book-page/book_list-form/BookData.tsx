import { useCallback } from 'react';
import { useApi } from '../../api/ApiProvider';
import { GetBookDto, GetBookMappedDto } from '../../api/dto/book/book.dto';
import { ClientResponse } from '../../api/library-client';
import React from 'react';

export default function useBooks() {
  const apiClient = useApi();
  const [rows, setBooks] = React.useState<GetBookMappedDto[] | undefined>();

  const fetchBooks = useCallback(async () => {
    try {
      const response: ClientResponse<GetBookDto[] | undefined> =
        await apiClient.getAllBooks();
      if (response.success) {
        setBooks(
          response.data!!.map(
            ({
              id,
              isbn,
              title,
              author,
              publisher,
              yearPublished,
              available,
            }) =>
              new GetBookMappedDto(
                id,
                isbn,
                title,
                author,
                publisher,
                yearPublished,
                available,
              ),
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [apiClient]);

  React.useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { rows, fetchBooks };
}
