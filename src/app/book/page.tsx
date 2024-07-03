"use client";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { Button, Calendar, DateValue } from "@nextui-org/react";
import { addDays, differenceInCalendarDays, isWithinInterval, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BookedDate {
    start: string;
    end: string;
}
export const dynamic = "force-dynamic";
const MyComponent = () => {
    const [checkinDate, setCheckinDate] = useState<DateValue>();
    const [checkoutDate, setCheckoutDate] = useState<DateValue>();
    const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);
    const [maxCheckoutDate, setMaxCheckoutDate] = useState<DateValue | undefined>(undefined);
    const router = useRouter();
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

    const isDateDisabled = (date: DateValue) => {
        return bookedDates.some((range) => {
            // Check if the date is within the adjusted interval

            return isWithinInterval(parseISO(date.toString()), {
                start: parseISO(range.start),
                end: parseISO(range.end),
            });
        });
    };
    // Disabling checkout dates
    const isCheckoutDateDisabled = (date: DateValue) => {
        const nextDay = addDays(parseISO(date.toString()), -1);
        return bookedDates.some((range) => {
            return isWithinInterval(nextDay, {
                start: parseISO(range.start),
                end: parseISO(range.end),
            });
        });
    };
    // Setting max checkout date
    useEffect(() => {
        if (checkinDate) {
            const nextBookedDate = bookedDates
                .map((range) => parseISO(range.start))
                .filter((date) => date > parseISO(checkinDate.toString()))
                .sort((a, b) => a.getTime() - b.getTime())[0];

            if (nextBookedDate) {
                const nextDay = addDays(nextBookedDate, 1);
                setMaxCheckoutDate(new CalendarDate(nextDay.getFullYear(), nextDay.getMonth() + 1, nextDay.getDate()));
            } else {
                setMaxCheckoutDate(undefined);
            }
        } else {
            setMaxCheckoutDate(undefined);
        }
    }, [checkinDate, bookedDates]);
    // Handling checkin date change with checkout date reset
    const handleCheckinDateChange = (date: DateValue) => {
        setCheckinDate(date);
        setCheckoutDate(date); // Reset checkout date when checkin date changes
    };
    // Calculate total nights
    const calculateNights = () => {
        if (checkinDate && checkoutDate) {
            const checkin = parseISO(checkinDate.toString());
            const checkout = parseISO(checkoutDate.toString());
            return differenceInCalendarDays(checkout, checkin);
        }
        return 0;
    };

    // Calculate total price
    let price = 2000;
    let totalPrice = price * calculateNights();
    let dateStart = new Date(checkinDate ? checkinDate.toString() : "");
    let dateEnd = new Date(checkoutDate ? checkoutDate.toString() : "");

    // Create all the inputs
    let [name, setName] = useState<string>("");
    let [phoneNumber, setPhoneNumber] = useState<string>("");
    let [email, setEmail] = useState<string>("");
    let [nationality, setNationality] = useState<string>("");
    let [specialRequirements, setSpecialRequirements] = useState<string>("");
    let [lastName, setLastName] = useState<string>("");

    // Handle payment
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
                lastName: lastName,
                firstName: name,
                phone: phoneNumber,
                email: email,
                nationality: nationality,
                specialRequirements: specialRequirements,
            }),
        });
        const data = await response.json();
        console.log(data);
        router.push("/success");
    };
    return (
        <div className="flex flex-col justify-evenly align-middle text-center gap-2 mt-4 mb-4">
            <h1 className="font-bold text-3xl text-center mb-4">Book your stay at Aura Eco Glamping !!!</h1>
            <div className="flex md:flex-row md:justify-evenly flex-col w-2/3 gap-4 self-center">
                <div className="flex flex-col justify-evenly align-middle">
                    <h1 className="text-center">Select Checkin Date</h1>
                    <Calendar defaultValue={null} minValue={today(getLocalTimeZone())} value={checkinDate} onChange={handleCheckinDateChange} isDateUnavailable={isDateDisabled} />
                </div>
                <div className="flex flex-col justify-evenly">
                    <h1 className="text-center">Select Checkout Date</h1>
                    <Calendar
                        defaultValue={null}
                        value={checkoutDate}
                        onChange={setCheckoutDate}
                        isDateUnavailable={isCheckoutDateDisabled}
                        minValue={checkinDate || today(getLocalTimeZone())}
                        maxValue={maxCheckoutDate}
                    />
                </div>
            </div>
            <form className="flex flex-row gap-5 w-2/3 justify-evenly mx-auto p-4 bg-transparent">
                <div className="flex flex-col justify-evenly align-middle w-1/2">
                    <label className="flex flex-col">
                        <div className="text-white">First Name</div>
                        <input
                            className="text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white">Last Name</span>
                        <input
                            className="text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white">Phone Number</span>
                        <input
                            className="text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white">Email</span>
                        <input
                            className="text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white">Nationality</span>
                        <input
                            className="text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            type="text"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white">Special Requirements</span>
                        <textarea
                            className=" text-black mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            rows={3}
                            value={specialRequirements}
                            onChange={(e) => setSpecialRequirements(e.target.value)}></textarea>
                    </label>
                </div>

                <div className="flex flex-col w-1/2 justify-evenly align-middle">
                    <p>Check-In Date : {checkinDate ? checkinDate.toString() : ""} 2:00 PM</p>
                    <p>Check-Out Date : {checkoutDate ? checkoutDate.toString() : ""} 11:00 AM</p>
                    <p>Total Nights : {calculateNights()} Night(s)</p>
                    <p>Total Price : {totalPrice} MXN</p>
                    <Button
                        className="align-middle w-1/2 self-center"
                        type="submit"
                        color="success"
                        isDisabled={!name || !checkinDate || !checkoutDate || !phoneNumber || !email || !lastName || !nationality}
                        onClick={handlePayment}>
                        Book
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MyComponent;
