import { useUnit } from 'effector-react';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

import { $currentRadio, $playingRadio, setPlayingRadio, updateCurrentRadio } from '@/app/store/radio';

import { findRadioStation } from '../helpers/radio-helper';

export const useRadio = () => {
    const currentRadioId = useUnit($currentRadio);
    const isPlaying = useUnit($playingRadio);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState<number>(10);
    const [mute, setMute] = useState<boolean>(false);
    const currentRadio = findRadioStation(currentRadioId);
    const isReady = useRef(false);

    // Инициализация аудио
    useEffect(() => {
        audioRef.current = new Audio();

        audioRef.current.onplay = () => setPlayingRadio(true);
        audioRef.current.onpause = () => setPlayingRadio(false);
        audioRef.current.onerror = (e) => {
            console.error('Ошибка аудио:', e);
            setPlayingRadio(false);
        };

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    const changeStation = (station: string) => {
        const { streamUrl } = findRadioStation(station);
        if (audioRef.current) {
            audioRef.current.src = streamUrl;
            updateCurrentRadio(station);

            audioRef.current.play().catch((err) => {
                console.warn('Автовоспроизведение заблокировано:', err);
            });
        }
    };

    const play = () => {
        if (audioRef.current && currentRadioId) {
            audioRef.current.play().catch(console.error);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    //Изменение громкости звука
    const handleChangeVolume = useCallback((_: Event, value: number | number[]) => {
        const volume = Array.isArray(value) ? value[0] : value;
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
            setVolume(volume);
        }
    }, [audioRef.current]);

    const handleMute = useCallback(() => {
        setMute(state => {
            if (audioRef.current) {
                audioRef.current.muted = !state;
                return !state;
            }
            else return state;
        });
    }, [audioRef.current]);


    //Эффект на проигрывание/остановку трека
    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        }
        else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    //Эффект на остановку при размонтировании
    useEffect(() => {
        return () => {
            if (!audioRef.current) return;
            setPlayingRadio(false);
            audioRef.current.pause();
        };
    }, []);

    //Эффект на изменение текущей станции
    useEffect(() => {
        if (!audioRef.current) return;

        audioRef.current.pause();

        audioRef.current = new Audio(currentRadio?.streamUrl);
        audioRef.current.volume = volume / 100;

        if (isReady.current && currentRadioId) {
            audioRef.current.play();
            setPlayingRadio(true);
        } else {
            isReady.current = true;
        }
    }, [currentRadioId]);

    const data = useMemo(() => ({
        pause,
        play,
        changeStation,
        currentRadio,
        isPlaying,
        volume,
        handleMute,
        handleChangeVolume,
        mute
    }), [
        pause,
        play,
        changeStation,
        currentRadio,
        isPlaying,
        handleMute,
        handleChangeVolume,
        mute
    ])

    return data;

}