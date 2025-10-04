import RoterStern from './tracks/Roter-Stern.mp3';
import Raketen from './tracks/Raketen.mp3';
import Marsch from './tracks/Marsch.mp3';
import TheRedBaron from './tracks/The-Red-Baron.mp3';
import TheNights from './tracks/Avicii-The-Nights.mp3';
import Un_Mondo_Magico from './tracks/Skar_Manfree_DJ_Matrix_feat_Marvin_-_Un_Mondo_Magico.mp3';
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
    {
        id: '003',
        src: TheRedBaron,
        title: 'The Red Baron',
        cover: 'https://avatars.yandex.net/get-music-content/99892/d255c320.a.7284080-1/200x200',
        artists: [ '001' ],
    },
    {
        id: '004',
        src: Un_Mondo_Magico,
        title: 'Un Mondo Magica',
        cover: 'https://avatars.yandex.net/get-music-content/6214856/fb30c045.a.14453009-3/200x200',
        artists: [ '002', '004', '005' ],
    },
    {
        id: '005',
        src: TheNights,
        title: 'The Night',
        cover: 'https://avatars.yandex.net/get-music-content/34131/76c7bc3a.a.2379205-1/200x200',
        artists: [ '003' ],
    },
];
