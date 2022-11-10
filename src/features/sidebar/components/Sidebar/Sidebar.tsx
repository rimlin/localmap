import { useStore } from '@nanostores/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { mapStateStore } from '~/features/map';
import { GroupQueryParams, useQueryParams } from '~/features/router';
import { Button } from '~/ui-kit';
import { trpc } from '~/utils/trpc';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = (props) => {
  const router = useRouter();
  const mapState = useStore(mapStateStore);
  const { group } = useQueryParams<GroupQueryParams>();

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

  useEffect(() => {
    mapStateStore.set('idle');
  }, [router.asPath]);

  return (
    <div className={styles.root}>
      <button onClick={handleCreateMarkerGroup}>+</button>

      {/* <h2>
        <Link href="/">LocalMap</Link>
      </h2>
      <button onClick={handleCreateMarkerGroup}>Создать коллекцию</button>

      {group !== undefined &&
        (mapState === 'idle' ? (
          <Button onClick={() => mapStateStore.set('insertMarker')}>
            Вставить маркер
          </Button>
        ) : (
          <button onClick={() => mapStateStore.set('idle')}>
            Отменить вставку
          </button>
        ))}

      <Button as={Link} href={'/'}>
        Главная
      </Button>*/}

      {/* <h3>Список коллекций</h3>

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
      </ul> */}
    </div>
  );
};
