import { useTranslation } from 'react-i18next';
import UsersForm from './users_form';

export default function UsersPage() {
  const { t } = useTranslation();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>{t('userPage.title')}</h1>
      </div>
      <UsersForm />
    </>
  );
}
