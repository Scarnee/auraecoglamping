"use client";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Button, Checkbox, RangeCalendar } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { headers } from "next/headers";
import React, { FormEvent, use, useEffect, useState } from "react";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Book: React.FC = () => {
    const [prices, setPrices] = useState<any[]>([]);

    const fetchPrices = async () => {
        const res = await fetch("/api/getprices");
        const data = await res.json();
        setPrices(data);
        console.log(data);
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    const [name, setName] = useState<string>("");
    let [value, setValue] = React.useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
    });
    let dateStart = new Date(value.start.toString());
    let dateEnd = new Date(value.end.toString());
    let nights = (dateEnd.getTime() - dateStart.getTime()) / (24 * 60 * 60 * 1000);
    let price = 2000;
    let totalPrice = price * nights;

    const handlePayment = async (e: any) => {
        e.preventDefault();
        const { data } = await axios.post(
            "/api/payment",
            {
                priceId: totalPrice,
                qty: nights,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        window.location.assign(data);
    };

    return (
        <div>
            <h1>Book Slot </h1>

            <label>
                Name:
                <input className=" text-black" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div>
                <RangeCalendar aria-label="Date (Controlled)" value={value} onChange={setValue} />
            </div>

            {prices.map((price) => (
                <div key={price.id}>
                    <p className=" text-white">1 night</p>
                    <p className=" text-white">
                        {(price.unit_amount / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: "MXN",
                        })}
                    </p>
                </div>
            ))}

            <p>{nights} night(s)</p>
            <p>{totalPrice} MXN</p>

            <Button type="submit" color="success" isDisabled={!name || !dateStart || !dateEnd} onClick={handlePayment}>
                Book
            </Button>
        </div>
    );
};

export default Book;
