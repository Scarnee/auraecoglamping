import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Adjust the import based on your actual file structure
import { NextResponse } from "next/server";

/*const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        try {
            const bookedDates = await prisma.bookedDate.findMany();
            console.log("Booked dates fetched:", bookedDates); // Log the response for debugging
            res.status(200).json(bookedDates);
        } catch (error) {
            console.error("Error fetching booked dates:", error);
            res.status(500).json({ error: "Error fetching booked dates" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;*/

export async function GET(request: Request) {
    const bookedDates = await prisma.bookedDate.findMany();
    return NextResponse.json(bookedDates, { status: 200 });
}
