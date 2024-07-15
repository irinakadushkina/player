import { USER } from "@/mock/user";
import { User } from '@/app/types/user';

type ResponseData<T> = {
    code: number;
    status: string;
    data: T;
}

export async function GET(
) {
    return Response.json({
        code: 200,
        status: 'success',
        data: USER
    })
};
