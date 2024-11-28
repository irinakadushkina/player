import { getPlaylists } from '@/app/services/playlists';
import { PlaylistsType } from '@/app/types/playlists';
import { PlaylistCard } from './components/playlist-card';
import { Suspense } from 'react';

const Playlists = async () => {
    const playlists: PlaylistsType = await getPlaylists();

    // todo: подумать над дизайном
    return (
        <Suspense fallback={<>Loading...</>}>
            <div>
                {playlists?.map((item) => <PlaylistCard key={item.id} playlist={item} />)}
            </div>
        </Suspense>
    )
}

export default Playlists;
