import { createEvent, createStore } from "effector";


export const updateCurrentRadio = createEvent<string|undefined>();
export const setPlayingRadio = createEvent<boolean>();

export const $currentRadio = createStore<string>('');
export const $playingRadio = createStore<boolean>(false);

$currentRadio.on(updateCurrentRadio, (_, newId) => newId);
$playingRadio.on(setPlayingRadio, (_, playing) => playing);
