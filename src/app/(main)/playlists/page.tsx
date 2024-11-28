import { getPlaylists } from '@/app/services/playlists';
import { PlaylistsType } from '@/app/types/playlists';
import { PlaylistCard } from './components/playlist-card';

const Playlists = async () => {
    const playlists: PlaylistsType = await getPlaylists();

    // todo: подумать над дизайном
    return (
        <div>
            {playlists?.map((item) => <PlaylistCard key={item.id} playlist={item} />)}
        </div>
    )
}

export default Playlists;
