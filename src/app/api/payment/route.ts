import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    let data = await request.json();
    let priceId = data.priceId;
    let qty = data.qty;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: qty,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
    });

    return NextResponse.json(session.url);
}