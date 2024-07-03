import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
export const maxDuration = 60;
export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    const { start, end, lastName, firstName, phone, email, nationality, specialRequirements } = body;
    const bookedDate = await prisma.bookedDate.create({
        data: {
            start: new Date(start),
            end: new Date(end),
            lastName: lastName,
            firstName: firstName,
            phone: phone,
            email: email,
            nationality: nationality,
            specialRequirements: specialRequirements,
        },
    });
    return NextResponse.json(bookedDate, { status: 200 });
}
