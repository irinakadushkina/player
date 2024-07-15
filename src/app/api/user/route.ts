import type { NextApiResponse } from 'next';
import { USER } from "@/mock/user";
import { User } from '@/app/types/user';

type ResponseData<T> = {
    code: number;
    status: string;
    data: T;
}

export async function GET(
    req: Request,
    res: NextApiResponse<ResponseData<User>>
) {
    // return NextResponse.json({
    //     code: 200,
    //     status: 'success',
    //     data: USER
    // })

    res.json({
        code: 200,
        status: 'success',
        data: USER
    })
};
