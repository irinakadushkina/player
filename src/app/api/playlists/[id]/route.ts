import { playlists } from "@/mock/playlists";

export async function GET(request: Request, { params } : { params: { id: string }}) {
    return Response.json({
        code: 200,
        status: 'success',
        data: playlists.find(item => item.id === params.id) // todo: надо перенести все в бд и сделать по-человечески
    })
};
