import type { NextApiRequest, NextApiResponse } from 'next';
import { USER } from "@/mock/user";
import { User } from '@/app/types/user';

type ResponseData<T> = {
    code: number;
    status: string;
    data: T
}

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData<User>>
) {
    // return NextResponse.json({
    //     code: 200,
    //     status: 'success',
    //     data: USER
    // })

    res.status(200).json({
        code: 200,
        status: 'success',
        data: USER
    })
};
