import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { trpc } from '~/utils/trpc';
import 'react-spring-bottom-sheet/dist/style.css';
import '~/ui-library/base/normalize.scss';
import { useTranslation } from '~/infrastructure/i18n';
import { useEffect } from 'react';
import { initializeZodLocale } from '~/infrastructure/validation';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation('zod');

  useEffect(() => {
    initializeZodLocale(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component {...pageProps} />;
};

export default trpc.withTRPC(appWithTranslation(MyApp));
