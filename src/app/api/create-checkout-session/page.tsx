import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { totalPrice, name } = req.body;
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "mxn",
                            product_data: {
                                name: `Booking Slot for ${name}`,
                            },
                            unit_amount: totalPrice, // Amount in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/cancel`,
                metadata: { totalPrice, name },
            });

            res.status(200).json({ id: session.id });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};
