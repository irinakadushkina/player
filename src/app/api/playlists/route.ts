import { playlists } from "@/mock/playlists";

export async function GET() {
    return Response.json({
        code: 200,
        status: 'success',
        data: playlists // todo: надо перенести все в бд и сделать по-человечески
    })
};
