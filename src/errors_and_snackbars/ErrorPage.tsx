import { useTranslation } from 'react-i18next';

export default function ErrorPage({ errorName }: { errorName: string }) {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2
        style={{ fontSize: '3rem', textAlign: 'center', fontStyle: 'italic' }}
      >
        {t('errors.error')}:
      </h2>
      <h1 style={{ fontSize: '4rem', textAlign: 'center' }}>{errorName}</h1>
    </div>
  );
}
