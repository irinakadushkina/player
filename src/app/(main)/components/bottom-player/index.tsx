'use client'
import { Box, Button, Slider, Typography, useMediaQuery } from '@mui/material';
import { useUnit } from 'effector-react';
import React, { useCallback, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import { TbRepeat, TbRepeatOff, TbRepeatOnce } from "react-icons/tb";

import { useAudio } from '@/app/hooks/use-audio';
import { $currentTrackId, $playingType, changePlayingType } from '@/app/store/queue';

import { TrackLine } from '../track-line';

import styles from './index.module.scss';

export const BottomPlayer = ({ hide }:{ hide: boolean}) => {
    const mobile = useMediaQuery('(max-width: 700px)');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); // Нужен для получения размера родителя
    const { track: { cover, title, artists, isPlaying, duration, progress, volume, mute }, frequencyData, handlePlayButtonClick, handlePrevTrack, handleNextTrack, handleScrub, handleScrubEnd, handleChangeVolume, handleMute } = useAudio();
    const currentTrackId = useUnit($currentTrackId);
    const playingType = useUnit($playingType);

    const changePlayingTypeHandler = () => {
        switch (playingType) {
            case 'repeat': return changePlayingType('repeat_one');
            case 'repeat_one': return changePlayingType('line');
            case 'line': return changePlayingType('repeat')
        }
    }

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const container = containerRef.current;
        if (!container) return;

        // 1. Получаем реальные размеры
        const width = container.clientWidth;
        const height = container.clientHeight;

        // 2. Синхронизируем атрибуты канваса с CSS (чтобы не было мыльности)
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Внутренняя область для рисования
        const drawWidth = canvas.width - 8; // минус слева и справа
        const drawHeight = canvas.height - 8; // минус сверху и снизу

        const startX = 4;
        const baseY = canvas.height - 4; // Рисуем от нижней границы (минус отступ)

        if (drawWidth <= 0 || drawHeight <= 0) return; // Защита от слишком маленьких контейнеров

        const barCount = frequencyData.length;
        // Ширина одного столбика внутри нашей зоны
        const barWidth = drawWidth / barCount;

        for (let i = 0; i < barCount; i++) {
            // Масштабируем высоту: максимум = drawHeight (чтобы не вылезало вверх)
            const barHeight = (frequencyData[i] / 255) * drawHeight;

            const x = startX + (i * barWidth);
            const y = baseY - barHeight;

            ctx.fillStyle = `rgb(115 115 115 / 0.5)`;

            // Рисуем столбик.
            // barWidth - 2: оставляем маленький зазор между столбиками, чтобы они не сливались
            ctx.fillRect(x, y, barWidth - 2, barHeight);
        }
    }, [frequencyData]);

    // Цикл анимации
    useEffect(() => {
        let rafId: number;

        const animate = () => {
            draw();
            rafId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(rafId);
    }, [draw]);

    // Обработка ресайза окна (чтобы канвас пересчитал размеры)
    useEffect(() => {
        const handleResize = () => draw();
        window.addEventListener('resize', handleResize);
        // Первый прогон сразу после монтирования
        draw();

        return () => window.removeEventListener('resize', handleResize);
    }, [draw]);

    if (hide) return null;

    return (
        <Box className={styles.box} justifyContent={currentTrackId && !mobile ? 'space-between' : 'center'}>
            <div className={styles.visual} ref={containerRef}>
                <canvas ref={canvasRef} />
            </div>
            {currentTrackId && <Box display="flex" alignItems="center" width={mobile ? '75%' : '33%'}>
                <img className={styles.trackCover} src={cover} />
                <Box display='flex' flexDirection='column'>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{title}</Typography>
                    <Typography sx={{ opacity: .5, fontSize: '14px' }}>{artists?.join(', ')}</Typography>
                </Box>
            </Box>
            }
            <Box display="flex" width="33%" flexDirection='column'>
                <Box display="flex" justifyContent={currentTrackId && mobile ? 'flex-end' : 'center'} marginBottom={currentTrackId && !mobile ? '6px' : 0}>
                    {currentTrackId && !mobile && (
                        <Button sx={{ padding: '8px' }} onClick={handlePrevTrack}>
                            <FaAngleDoubleLeft size={20} />
                        </Button>
                    )
                    }
                    <Button sx={{ padding: '8px' }} onClick={handlePlayButtonClick}>
                        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </Button>
                    {currentTrackId && !mobile && (
                        <Button sx={{ padding: '8px' }} onClick={handleNextTrack}>
                            <FaAngleDoubleRight size={20} />
                        </Button>
                    )
                    }
                </Box>
                {currentTrackId && !mobile && <TrackLine duration={duration || 0} progress={progress} onScrub={handleScrub} onScrubEnd={handleScrubEnd} />}
            </Box>
            {
                currentTrackId && !mobile && (
                    <Box display="flex" alignItems="center" justifyContent="flex-end" paddingRight="24px" width="33%" gap="12px">
                        <Box onClick={changePlayingTypeHandler} display="flex" alignItems="center">
                            {
                                (playingType === 'repeat' && <TbRepeat size={20} />) ||
                                (playingType === 'repeat_one' && <TbRepeatOnce size={20} />) ||
                                (playingType === 'line' && <TbRepeatOff size={20} />)
                            }
                        </Box>
                        <Box display="flex" alignItems="center" gap="16px">
                            {volume >= 50 && !mute && <FaVolumeHigh onClick={handleMute} />}
                            {volume < 50 && volume > 0 && !mute && <FaVolumeLow onClick={handleMute} />}
                            {(volume === 0 || mute) && <FaVolumeXmark onClick={handleMute} />}
                            <Slider aria-label="volume" value={volume} onChange={handleChangeVolume} sx={{ width: '100px' }} />
                        </Box>
                    </Box>
                )
            }
        </Box>
    )
};
