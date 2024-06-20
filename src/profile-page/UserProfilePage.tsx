import { useTranslation } from 'react-i18next';
import UserProfileForm from './UserProfileForm';

export default function UserProfilePage() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>{t('userPage.userProfile')}</h1>
      <UserProfileForm />
    </div>
  );
}
