"use client";
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
export default function NavBar() {
    const [isOverVideo, setIsOverVideo] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector(".navbar");
            const video = document.getElementById("background-video");

            const videoRect = video.getBoundingClientRect();
            const navbarRect = navbar.getBoundingClientRect();

            if (navbarRect.bottom > videoRect.top && navbarRect.top < videoRect.bottom) {
                setIsOverVideo(true);
            } else {
                setIsOverVideo(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Navbar id="navbar" className={`navbar bg-transparent backdrop-blur-lg ${isOverVideo ? "transparent" : "solid"}`}>
            <NavbarBrand>
                <h1 className=" text-white font-bold">Aura Eco Glamping</h1>
            </NavbarBrand>
            <NavbarContent className=" gap-7">
                <NavbarItem>
                    <Link color="foreground" className=" text-white" href="#">
                        Location
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className=" text-white" href="#">
                        Gallery
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className=" text-white" href="#">
                        About us
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Button as={Link} href="#" color="success" variant="bordered">
                        Book Now !
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
