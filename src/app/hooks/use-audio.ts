import { useUnit } from 'effector-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { $currentTrackId, updateCurrentId, fetchTrackByIdFx, setPlaying, $playing, $queue, addTrackToHistory, $playingType } from '../store/queue';
import { TrackType } from '../types/tracks';

export const useAudio = () => {
  const currentId = useUnit($currentTrackId);
  const list = useUnit($queue);
  const isPlaying = useUnit($playing);
  const playingType = useUnit($playingType);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(10);
  const [mute, setMute] = useState<boolean>(false);
  const [track, setTrack] = useState<TrackType>();
  const trackLoading = useUnit(fetchTrackByIdFx.pending);
  const trackIndex = list.findIndex(item => item === currentId);

  const { src, cover, title, artists, id } = track || {};

  const audio = useRef<null | HTMLAudioElement>(typeof Audio !== "undefined" ? new Audio("") : null);
  const isReady = useRef(false);
  const { duration } = audio.current || {};

  // Рефы для визуализатора
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);

  const [frequencyData, setFrequencyData] = useState<Uint8Array>(new Uint8Array(128));

  // Инициализация AudioContext (вызывается один раз при первом клике)
  const initVisualizer = useCallback(() => {
    if (audioCtxRef.current || !audio.current) return;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    // Привязываем существующий audio.current к графу Web Audio API
    const source = ctx.createMediaElementSource(audio.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    sourceRef.current = source;
  }, []);

  const startVisualizer = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const tick = () => {
      analyser.getByteFrequencyData(dataArray);
      setFrequencyData(new Uint8Array(dataArray));
      rafRef.current = requestAnimationFrame(tick);
    };

    if (rafRef.current === null) {
      tick();
    }
  }, []);

  const stopVisualizer = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setFrequencyData(new Uint8Array(128));
  }, []);

  //Предыдущий трек
  const handlePrevTrack = useCallback(() => {
    setCurrentTime(0);
    audio.current?.pause();

    if (trackIndex - 1 < 0) {
      if (playingType === 'repeat') updateCurrentId(list[list.length - 1]);
    } else {
      updateCurrentId(list[trackIndex - 1]);
    }
  }, [list, trackIndex, playingType]);

  //Следующий трек
  const handleNextTrack = useCallback(() => {
    setCurrentTime(0);
    audio.current?.pause();

    if (trackIndex < list.length - 1) {
      updateCurrentId(list[trackIndex + 1]);
    } else if (playingType === 'repeat') {
      updateCurrentId(list[0]);
    }
  }, [list, trackIndex, playingType]);

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
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
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
      stopVisualizer();
      
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, [stopVisualizer]);

  //Эффект на изменение текущего трека
  useEffect(() => {
    if (!audio.current) return;

    audio.current.pause();

    if (src) {
      audio.current.src = src;
      audio.current.load();
    }
    setCurrentTime(0);
    audio.current.volume = volume / 100;

    if (isReady.current && id) {
      audio.current.play();
      setPlaying(true);
    } else {
      isReady.current = true;
    }
  }, [id, src, volume]);

  //Эффект на проигрывание/остановку трека
  useEffect(() => {
    if (isPlaying) {
      initVisualizer();
      audio.current?.play();
      startVisualizer();
    }
    else {
      audio.current?.pause();
      stopVisualizer();
    }
  }, [isPlaying, startVisualizer, stopVisualizer]);

  //Эффект на отслеживание воспроизведения ( для остановки/запуска извне (расширения, мак) )
  useEffect(() => {
    setPlaying(!audio.current?.paused)
  }, [audio.current?.paused]);

  // Эффект с привязкой событий на изменение времени и окончание трека
  useEffect(() => {
    if (audio.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      audio.current.ontimeupdate = (e) => setCurrentTime(e.target?.currentTime || 0);
      audio.current.onended = () => {
        if (id) addTrackToHistory(id);
        if (playingType !== 'repeat_one') handleNextTrack();
        else {
          setCurrentTime(0);
          audio.current?.play();
          updateCurrentId(list[trackIndex]);
        }
      }
    }
  }, [handleNextTrack, id, list, playingType, trackIndex]);

  const data = useMemo(() => ({
    handleNextTrack,
    handlePrevTrack,
    handleScrub,
    handleScrubEnd,
    handlePlayButtonClick,
    handleChangeVolume,
    handleMute,
    trackLoading,
    frequencyData,
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
    frequencyData,
    id, src, cover, title, artists, duration, volume, mute, currentTime, isPlaying
  ])

  return data;
};
