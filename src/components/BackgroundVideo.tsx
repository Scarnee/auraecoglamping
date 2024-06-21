import { Button } from "@nextui-org/react";
import Link from "next/link";
export default function BackgroundVideo() {
    return (
        <div className=" overflow-auto h-screen">
            <video id="background-video" src={require("../../public/videotest.mp4")} autoPlay loop muted className="w-full  h-screen  top-0 -z-10 object-cover"></video>
            <div className="content ">
                <h1 className=" text-4xl font-bold">Aura Eco Glamping</h1>
                <p className=" text-lg">Located in Chiapas, Mexico</p>
                <Button as={Link} href="#" color="success" size="lg" variant="solid" className=" text-white">
                    Book Now !
                </Button>
            </div>
        </div>
    );
}
