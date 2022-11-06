import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from '~/utils/trpc';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = (props) => {
  const router = useRouter();

  const utils = trpc.useContext();
  const markerGroupsQuery = trpc.markerGroup.list.useQuery();
  const addMarkerGroup = trpc.markerGroup.add.useMutation({
    async onSuccess() {
      await utils.markerGroup.list.invalidate();
    },
  });

  const handleCreateMarkerGroup = async () => {
    const name = prompt('Название коллекции') || 'Название по умолчанию';

    const markerGroup = await addMarkerGroup.mutateAsync({
      name,
    });

    router.push({
      pathname: '/',
      query: {
        group: markerGroup.id,
      },
    });
  };

  return (
    <div className={styles.root}>
      <h2>
        <Link href="/">LocalMap</Link>
      </h2>
      <button onClick={handleCreateMarkerGroup}>Создать коллекцию</button>

      <h3>Список коллекций</h3>

      <ul>
        {markerGroupsQuery.data?.map((markerGroup) => (
          <li key={markerGroup.id}>
            <Link
              href={{
                pathname: '/',
                query: {
                  group: markerGroup.id,
                },
              }}
            >
              {markerGroup.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
