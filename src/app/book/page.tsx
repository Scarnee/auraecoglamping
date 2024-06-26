"use client";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Button, DateValue, RangeCalendar } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { addDays, isWithinInterval, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface BookedDate {
    start: string;
    end: string;
}

const Book: React.FC = () => {
    const [prices, setPrices] = useState<any[]>([]);
    const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
    const router = useRouter();
    // Getting all the prices from the Stripe API
    const fetchPrices = async () => {
        const res = await fetch("/api/getprices");
        const data = await res.json();
        setPrices(data);
        console.log(data);
    };
    // Getting all the booked dates from the database
    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
                const res = await fetch("/api/booked-dates", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Failed to fetch booked dates:", errorData);
                    return;
                }

                const data = await res.json();
                console.log(data);
                setBookedDates(data);
            } catch (error) {
                console.error("Error fetching booked dates:", error);
            }
        };

        fetchBookedDates();
    }, []);

    // Check if the date is disabled or not
    const isDateDisabled = (date: DateValue) => {
        return bookedDates.some((range) => {
            // Parse the range start date
            const rangeStartDate = parseISO(range.start);

            // Add one day to the range start date
            const rangeStartDatePlusOneDay = addDays(rangeStartDate, 1);

            // Check if the date is within the adjusted interval
            return isWithinInterval(parseISO(date.toString()), {
                start: parseISO(range.start),
                end: parseISO(range.end),
            });
        });
    };
    // Fetch the prices and booked dates on component mount
    useEffect(() => {
        fetchPrices();
    }, []);
    // State for the name input
    const [name, setName] = useState<string>("");
    let [value, setValue] = React.useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()),
    });
    let dateStart = new Date(value.start.toString());
    let dateEnd = new Date(value.end.toString());
    let nights = (dateEnd.getTime() - dateStart.getTime()) / (24 * 60 * 60 * 1000);
    let price = 2000;
    let totalPrice = price * nights;

    /*const handlePayment = async (e: any) => {
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
    };*/

    const handlePayment = async (e: any) => {
        e.preventDefault();
        const response = await fetch("/api/book-dates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                start: dateStart.toISOString(),
                end: dateEnd.toISOString(),
            }),
        });
        const data = await response.json();
        console.log(data);

        router.push("/success");
    };

    return (
        <div>
            <h1>Book Slot </h1>

            <label>
                Name:
                <input className=" text-black" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div>
                <RangeCalendar hideDisabledDates minValue={today(getLocalTimeZone())} aria-label="Date (Controlled)" value={value} onChange={setValue} isDateUnavailable={isDateDisabled} />
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
