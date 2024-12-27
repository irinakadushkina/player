import { createEvent, createStore } from "effector";

export const updateCurrentId = createEvent<string>();

export const $currentTrackId = createStore<string>('');

$currentTrackId.on(updateCurrentId, (_, newId) => newId);
