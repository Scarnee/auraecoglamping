"use client";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Button, Checkbox, DateValue, RangeCalendar } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { headers } from "next/headers";
import React, { FormEvent, use, useEffect, useState } from "react";
import axios from "axios";
import { start } from "repl";
import { isWithinInterval, parseISO } from "date-fns";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Book: React.FC = () => {
    const [prices, setPrices] = useState<any[]>([]);
    const [bookedDates, setBookedDates] = useState<any[]>([]);
    const fetchPrices = async () => {
        const res = await fetch("/api/getprices");
        const data = await res.json();
        setPrices(data);
        console.log(data);
    };
    const fetchBookedDates = async () => {
        const res = await fetch("/api/booked-dates");
        const data = await res.json();
        setBookedDates(data.bookedDates);
        console.log(data);
    };
    const isDateDisabled = (date: DateValue) => {
        return bookedDates.some((range) =>
            isWithinInterval(parseISO(date.toString()), {
                start: parseISO(range.start),
                end: parseISO(range.end),
            })
        );
    };

    useEffect(() => {
        fetchPrices();
        fetchBookedDates();
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
                priceId: prices[0].id,
                qty: nights,
                start: dateStart.toISOString(),
                end: dateEnd.toISOString(),
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
                <RangeCalendar aria-label="Date (Controlled)" value={value} onChange={setValue} isDateUnavailable={isDateDisabled} />
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
            <p>Check-In Date : {dateStart.toLocaleDateString("es-mx", { timeZone: "UTC" })} 2:00 PM</p>
            <p>Check-Out Date : {dateEnd.toLocaleDateString("es-MX", { timeZone: "UTC" })} 11:00 AM</p>
            <p>{nights} night(s)</p>
            <p>{totalPrice} MXN</p>

            <Button type="submit" color="success" isDisabled={!name || !dateStart || !dateEnd} onClick={handlePayment}>
                Book
            </Button>
        </div>
    );
};

export default Book;
