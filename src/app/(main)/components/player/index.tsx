'use client'
import { useUnit } from 'effector-react';

import { $currentTrackId, $playing } from "@/app/store/queue";
import { $currentRadio, $playingRadio } from "@/app/store/radio";

import { BottomPlayer } from "../bottom-player";
import { BottomRadioPlayer } from "../bottom-radio-player";

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