import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
});
export async function GET(req: Request) {
    const prices = await stripe.prices.list();

    return NextResponse.json(prices.data);
}
