import prisma from "../../../lib/prisma"; // Adjust the import based on your actual file structure
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const bookedDates = await prisma.bookedDate.findMany();
    return NextResponse.json(bookedDates, { status: 200 });
}
