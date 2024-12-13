import RoterStern from './tracks/Roter-Stern.mp3';
import Raketen from './tracks/Raketen.mp3';
import Marsch from './tracks/Marsch.mp3';
import { TracksType } from '@/app/types/tracks';

export const tracks: TracksType  = [
    {
        id: '000',
        src: RoterStern,
        title: 'Roter Stern',
        cover: 'https://avatars.yandex.net/get-music-content/6300975/13e0cdd0.a.21992206-1/200x200',
        artists: [ '000' ],
    },
    {
        id: '001',
        src: Raketen,
        title: 'Raketen',
        cover: 'https://avatars.yandex.net/get-music-content/108289/adebfa35.a.5611133-1/200x200',
        artists: [ '000' ],
    },
    {
        id: '002',
        src: Marsch,
        title: 'Marsch',
        cover: 'https://avatars.yandex.net/get-music-content/13449652/7cd59d65.a.33308997-1/200x200',
        artists: [ '000' ],
    },
];
