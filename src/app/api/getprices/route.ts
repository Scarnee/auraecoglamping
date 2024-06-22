import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2024-04-10",
    });
    const prices = await stripe.prices.list();

    return NextResponse.json(prices.data);
}
