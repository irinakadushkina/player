import { getPlaylists } from '@/app/services/playlists';
import { PlaylistsType } from '@/app/types/playlists';
import { PlaylistCard } from './components/playlist-card';
import { Suspense } from 'react';
import { Grid } from '@mui/material';
import MainLoading from '@/app/(main)/loading';

const Playlists = async () => {
    const playlists: PlaylistsType = await getPlaylists();

    // todo: подумать над дизайном
    return (
        <Suspense fallback={<MainLoading/>}>
            <Grid container spacing={2} margin={0}>
                {playlists?.map((item) => <Grid key={item.id}>
                        <PlaylistCard key={item.id} playlist={item} />
                    </Grid>
                )}
            </Grid>
        </Suspense>
    )
}

export default Playlists;
