import { USER } from "@/mock/user";

export async function GET(
) {
    return Response.json({
        code: 200,
        status: 'success',
        data: USER // todo: надо перенести все в бд и сделать по-человечески
    })
};
