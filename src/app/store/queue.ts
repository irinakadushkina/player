import { tracks } from "@/mock/tracks";
import { createEvent, createStore, createEffect } from "effector";

export const updateCurrentId = createEvent<string>();
export const setPlaying = createEvent<boolean>();
export const updateQueue = createEvent<string[]>();

export const $currentTrackId = createStore<string>('');
export const $playing = createStore<boolean>(false);
export const $queue = createStore<string[]>([]);

$currentTrackId.on(updateCurrentId, (_, newId) => newId);
$playing.on(setPlaying, (_, playing) => playing);
$queue.on(updateQueue, (_, list) => list);

export const fetchTrackByIdFx = createEffect((id: string) => {
    return tracks.find(item => item.id === id);
  });
