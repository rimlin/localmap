import React from 'react';
import Head from 'next/head';
import { Sidebar } from '~/features/sidebar';
import styles from './DefaultLayout.module.scss';
import { MobileNavigation } from '~/features/navigation';
import { useIsMobile } from '~/infrastructure/mobileDetection';

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <title>LocalMap</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
          integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
          crossOrigin=""
        />
      </Head>
      <main className={styles.root}>
        <Sidebar />
        {children}
        {isMobile && <MobileNavigation />}
      </main>
    </>
  );
};
