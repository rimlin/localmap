import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Map } from '~/features/map';
import { MobileDetectionContext } from '~/infrastructure/mobileDetection';
import { DefaultLayout } from '~/features/layout';

type ServerSideProps = {
  isMobile: boolean;
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
}) => {
  const UA = req.headers['user-agent'];
  const isMobile = Boolean(
    UA?.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
    ),
  );

  return {
    props: {
      isMobile,
    },
  };
};

const IndexPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { isMobile } = props;

  return (
    <MobileDetectionContext.Provider value={{ isMobile }}>
      <DefaultLayout>
        <Map />
      </DefaultLayout>
    </MobileDetectionContext.Provider>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
