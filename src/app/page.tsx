import EmblaCarousel from "@/components/Carousel";
import bulkImages from "@/utils/bulkimages";
import { EmblaOptionsType } from "embla-carousel";

export default function Home() {
    const OPTIONS: EmblaOptionsType = { loop: true };

    const SLIDES = bulkImages;
    return (
        <div>
            <video id="background-video" src={require("../../public/videotest.mp4")} autoPlay loop muted className="w-full  h-screen  top-0 -z-10 object-cover"></video>
            <h1>Hello world</h1>
            <EmblaCarousel options={OPTIONS} />
        </div>
    );
}
