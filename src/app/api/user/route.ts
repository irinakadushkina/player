import { USER } from "@/mock/user";
import { User } from '@/app/types/user';
import Server from 'next/server';

type ResponseData<T> = {
    code: number;
    status: string;
    data: T;
}

export async function GET(
) {
    // return NextResponse.json({
    //     code: 200,
    //     status: 'success',
    //     data: USER
    // })

    return Server.NextResponse.json({
        code: 200,
        status: 'success',
        data: USER
    })
};
