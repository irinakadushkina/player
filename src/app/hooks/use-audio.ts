import { useUnit } from 'effector-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { $currentTrackId, updateCurrentId, fetchTrackByIdFx, setPlaying, $playing, $queue, addTrackToHistory } from '../store/queue';
import { TrackType } from '../types/tracks';
// import { $currentTrackId, $playing, $queue, fetchTrackByIdFx, setPlaying, updateCurrentId } from '../store/queue';

export const useAudio = () => {
  const currentId = useUnit($currentTrackId);
  const list = useUnit($queue);
  const isPlaying = useUnit($playing);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(10);
  const [mute, setMute] = useState<boolean>(false);
  const [track, setTrack] = useState<TrackType>();
  const trackLoading = useUnit(fetchTrackByIdFx.pending);

  const { src, cover, title, artists, id } = track || {};

  const audio = useRef<null | HTMLAudioElement>(typeof Audio !== "undefined" ? new Audio("") : null);
  const isReady = useRef(false);
  const { duration } = audio.current || {};

  //Предыдущий трек
  const handlePrevTrack = useCallback(() => {
    setCurrentTime(0);
    audio.current?.pause();
    const trackIndex = list.findIndex(item => item === currentId);

    if (trackIndex - 1 < 0) {
        updateCurrentId(list[list.length - 1]);
    } else {
        updateCurrentId(list[trackIndex - 1]);
    }
  }, [list, currentId]);

  //Следующий трек
  const handleNextTrack = useCallback(() => {
    setCurrentTime(0);
    audio.current?.pause();
    const trackIndex = list.findIndex(item => item === currentId);
    if (trackIndex < list.length - 1) {
        updateCurrentId(list[trackIndex + 1]);
    } else {
        updateCurrentId(list[0]);
    }
  }, [currentId, list]);

  //Начало сдвига трека
  const handleScrub = useCallback((value: number) => {
    if (!audio.current) return;
    audio.current.currentTime = value;
    setCurrentTime(audio.current.currentTime);
  }, []);

  //Конец сдвига трека
  const handleScrubEnd = () => {
    if (!isPlaying) {
      setPlaying(true);
    }
  };

  //Воспроизвести/остановить трек
  const handlePlayButtonClick = () => {
    setPlaying(!isPlaying);
  }

  //Изменение громкости звука
  const handleChangeVolume = useCallback((_: Event, value: number | number[]) => {
    const volume = Array.isArray(value) ? value[0] : value;
    if (audio.current) {
      audio.current.volume = volume / 100;
      setVolume(volume);
    }
  }, [audio.current]);

  const handleMute = useCallback(() => {
      setMute(state => {
        if (audio.current) {
          audio.current.muted = !state;
          return !state;
        }
        else return state;
      });
  }, [audio.current]);

  const getTrackById = useCallback(async () => {
    const track = await fetchTrackByIdFx(currentId);
    setTrack(track);
  }, [currentId]);

  useEffect(() => {
    getTrackById();
  }, [getTrackById]);

  //Эффект на остановку при размонтировании
  useEffect(() => { 
    return () => {
      if (!audio.current) return;
      setPlaying(false);
      audio.current.pause();
    };
  }, []);

  //Эффект на изменение текущего трека
  useEffect(() => {
    if (!audio.current) return;

    audio.current.pause();

    audio.current = new Audio(src);
    setCurrentTime(audio.current.currentTime);
    audio.current.volume = volume / 100;

    if (isReady.current && id) {
      audio.current.play();
      setPlaying(true);
    } else {
      isReady.current = true;
    }
  }, [id]);

  //Эффект на проигрывание/остановку трека
  useEffect(() => {
    if (isPlaying) {
      audio.current?.play();
    }
    else {
      audio.current?.pause();
    }
  }, [isPlaying]);

  //Эффект на отслеживание воспроизведения ( для остановки/запуска извне (расширения, мак) )
  useEffect(() => {
    setPlaying(!audio.current?.paused)
  }, [audio.current?.paused]);

  // Эффект с привязкой событий на изменение времени и окончание трека
  useEffect(() => {
    if(audio.current) {
      // @ts-ignore
      audio.current.ontimeupdate = (e) => setCurrentTime(e.target?.currentTime || 0);
      audio.current.onended = () => {
        if (id) addTrackToHistory(id);
        handleNextTrack();
      };
    }
  }, [audio.current, handleNextTrack]);

  const data = useMemo(() => ({
    handleNextTrack,
    handlePrevTrack,
    handleScrub,
    handleScrubEnd,
    handlePlayButtonClick,
    handleChangeVolume,
    handleMute,
    trackLoading,
    track: { id, src, cover, title, artists, duration, volume, mute, progress: currentTime, isPlaying },
  }), [
    handleNextTrack,
    handlePrevTrack,
    handleScrub,
    handleScrubEnd,
    handlePlayButtonClick,
    handleChangeVolume,
    handleMute,
    trackLoading,
    id, src, cover, title, artists, duration, volume, mute, currentTime, isPlaying
  ])

  return data;
};
