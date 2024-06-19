import { useTranslation } from 'react-i18next';
import LoanHistoryForm from './LoanHistoryForm';

export default function LoanHistoryPage() {
  const { t } = useTranslation();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>{t('historyOfLoans')}</h1>
      </div>
      <LoanHistoryForm />
    </>
  );
}
