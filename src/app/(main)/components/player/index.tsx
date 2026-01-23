'use client'
import { $currentTrackId, $playing } from "@/app/store/queue";
import { $currentRadio, $playingRadio } from "@/app/store/radio";
import { BottomRadioPlayer } from "../bottom-radio-player";
import { BottomPlayer } from "../bottom-player";
import { useUnit } from 'effector-react';

export const Player = () => {
    const currentRadio = useUnit($currentRadio);
    const isRadioPlaying = useUnit($playingRadio);
    const currentTrackId = useUnit($currentTrackId);
    const isTrackPlaying = useUnit($playing)



    return (
        <>
            <BottomRadioPlayer hide={!currentRadio || isTrackPlaying} />
            <BottomPlayer hide={!currentTrackId || isRadioPlaying} />
        </>
    )
}