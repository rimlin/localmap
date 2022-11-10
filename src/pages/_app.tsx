import type { AppProps } from 'next/app';
import { trpc } from '~/utils/trpc';
import 'react-spring-bottom-sheet/dist/style.css';
import '../styles/global.css';
import '../styles/normalize.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
