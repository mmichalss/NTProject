import { useTranslation } from 'react-i18next';
import LoanAdminForm from './LoanAdminForm';

import { useParams } from 'react-router-dom';

export default function LoanAdminPage() {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>{t('loanPage.title')}</h1>
      </div>
      <LoanAdminForm userId={Number(userId)} />
    </>
  );
}
