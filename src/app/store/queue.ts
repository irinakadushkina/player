import { createEvent, createStore, createEffect } from "effector";
import { findTrack } from "../helpers/track-helpers";
import { history as mockedHistory} from "@/mock/playlists";

export const updateCurrentId = createEvent<string>();
export const setPlaying = createEvent<boolean>();
export const updateQueue = createEvent<string[]>();
export const addTrackToQueue = createEvent<string>();
export const addTrackToHistory = createEvent<string>();

export const $currentTrackId = createStore<string>('');
export const $playing = createStore<boolean>(false);
export const $queue = createStore<string[]>([]);
export const $history = createStore<string[]>(mockedHistory.tracks);

$currentTrackId.on(updateCurrentId, (_, newId) => newId);
$playing.on(setPlaying, (_, playing) => playing);
$queue.on(updateQueue, (_, list) => list);
$queue.on(addTrackToQueue, (list, track) => ([...list, track]));
$queue.on(addTrackToHistory, (list, track) => ([...list, track]));

export const fetchTrackByIdFx = createEffect((id: string) => findTrack(id));
