"use client";
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
export default function NavBar() {
    /*const [isOverVideo, setIsOverVideo] = useState(false);
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
    }, []);*/

    return (
        <Navbar id="navbar" isBordered className="navbar bg-transparent">
            <NavbarContent>
                <NavbarBrand as={Link} href="/">
                    <h1 className=" text-white font-bold">Aura Eco Glamping</h1>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className=" gap-7">
                <NavbarItem>
                    <Link color="foreground" className=" text-white" href="/location">
                        Location
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className=" text-white" href="/gallery">
                        Gallery
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className=" text-white" href="/experiences">
                        Experiences
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className=" text-white" href="/aboutus">
                        About us
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Button as={Link} href="/book" color="success" variant="bordered">
                        Book Now !
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
