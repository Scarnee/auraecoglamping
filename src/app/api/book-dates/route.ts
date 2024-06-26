import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    const { start, end } = body;
    const bookedDate = await prisma.bookedDate.create({
        data: {
            start: new Date(start),
            end: new Date(end),
        },
    });
    return NextResponse.json(bookedDate, { status: 200 });
}
