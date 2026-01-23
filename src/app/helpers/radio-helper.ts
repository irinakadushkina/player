import { RadioStation } from "@/app/types/radio";

export const stations: RadioStation[] = [
    {
        id: 'europaplus',
        name: 'Европа Плюс',
        image: 'https://upload.wikimedia.org/wikipedia/ru/thumb/8/8f/EuropaPlus.png/960px-EuropaPlus.png?20240407041747',
        streamUrl: 'https://europaplus.hostingradio.ru:8014/europaplus320',
    },
    {
        id: 'retrofm',
        name: 'Ретро ФМ',
        image: 'https://upload.wikimedia.org/wikipedia/ru/c/cb/RetroFM.png?20170314152557',
        streamUrl: 'https://retro.hostingradio.ru:8014/retro320.mp3',
    },
    {
        id: 'rusradio',
        name: 'Русское Радио',
        image: 'https://upload.wikimedia.org/wikipedia/ru/0/03/Русское_радио.png?20180221033706',
        streamUrl: 'https://rusradio.hostingradio.ru/rusradio96.aacp',
    },
    {
        id: 'nashe',
        name: 'Наше Радио',
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/76/НАШЕ_РАДИО.jpg',
        streamUrl: 'https://nashe1.hostingradio.ru/nashe-256',
    },
];

export const findRadioStation = (station: string): RadioStation => {
    const stationInfo = stations.find(track => track.id === station);

    return stationInfo as RadioStation;
}
