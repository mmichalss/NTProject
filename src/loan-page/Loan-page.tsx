import { useTranslation } from 'react-i18next';
import LoanList from './Loan_list-from';

function LoanPage() {
  const { t } = useTranslation();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ textAlign: 'center' }}>{t('loans')}</h1>
      </div>
      <LoanList />
    </>
  );
}

export default LoanPage;
