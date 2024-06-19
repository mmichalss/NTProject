import { useApi } from '../api/ApiProvider';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteBook({
  bookId,
  onDelete,
}: {
  bookId: number;
  onDelete: () => void;
}) {
  const apiClient = useApi();

  const deleteBook = async () => {
    await apiClient.deleteBook(bookId);
    onDelete();
  };

  return (
    <IconButton onClick={deleteBook}>
      <DeleteIcon />
    </IconButton>
  );
}
