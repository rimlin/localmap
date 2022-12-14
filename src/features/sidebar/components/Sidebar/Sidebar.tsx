import { PlacesGroup } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';
import { useModalState } from '~/features/modal';
import { CreatePlacesGroup } from '~/features/placesGroup';
import { useTranslation } from '~/infrastructure/i18n';
import styles from './Sidebar.module.scss';

export const Sidebar: React.FC = () => {
  const router = useRouter();
  // const mapState = useStore(mapStateStore);
  // const { group } = useQueryParams<GroupQueryParams>();

  // const utils = trpc.useContext();
  // const markerGroupsQuery = trpc.markerGroup.list.useQuery();
  // const addMarkerGroup = trpc.markerGroup.add.useMutation({
  //   async onSuccess() {
  //     await utils.markerGroup.list.invalidate();
  //   },
  // });

  const { t, i18n } = useTranslation();
  const createPlacesGroupState = useModalState();

  const onCreatedPlacesGroup = (dto: PlacesGroup) => {
    createPlacesGroupState.close();
    router.push({
      pathname: '/',
      query: {
        group: dto.id,
      },
    });
  };

  console.log(i18n.language);

  // useEffect(() => {
  //   mapStateStore.set('idle');
  // }, [router.asPath]);

  return (
    <div className={styles.root}>
      <button onClick={createPlacesGroupState.open}>
        {t('sidebar.createPlacesList')}
      </button>

      {createPlacesGroupState.isOpen && (
        <CreatePlacesGroup
          onCreated={onCreatedPlacesGroup}
          onCancel={createPlacesGroupState.close}
        />
      )}

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
