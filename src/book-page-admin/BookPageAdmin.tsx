import { useTranslation } from 'react-i18next';
import BookFormAdmin from './BookPageAdminForm';
import CreateBook from './CreateBook';

export default function BookPageAdmin() {
  const { t } = useTranslation();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>{t('bookPage.title')}</h1>
      </div>
      <BookFormAdmin />
    </>
  );
}
