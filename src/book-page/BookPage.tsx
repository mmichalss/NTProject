import { useTranslation } from 'react-i18next';
import BookList from './book_list-form/BookListForm';

function BookPage() {
  const { t } = useTranslation();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>{t('books')}</h1>
      </div>
      <BookList />
    </>
  );
}

export default BookPage;
