import { NextResponse } from "next/server";
import Stripe from "stripe";
let bookedDates: { start: Date; end: Date }[] = [];

export async function POST(request: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    let data = await request.json();
    let priceId = data.priceId;
    let qty = data.qty;
    let start = data.start;
    let end = data.end;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: [
            {
                price: priceId,
                quantity: qty,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000",
    });
    bookedDates.push({ start: new Date(start), end: new Date(end) });
    return NextResponse.json(session.url);
}
