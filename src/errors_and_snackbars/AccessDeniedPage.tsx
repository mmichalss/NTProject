import { useTranslation } from 'react-i18next';

export default function AccessDeniedPage() {
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
      <h1> {t('FORBIDDEN')} </h1>
      <h2> {t('forbiddenText')}</h2>
    </div>
  );
}
