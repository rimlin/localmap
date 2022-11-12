import type { AppProps } from 'next/app';
import { trpc } from '~/utils/trpc';
import 'react-spring-bottom-sheet/dist/style.css';
import '~/ui-library/base/normalize.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
