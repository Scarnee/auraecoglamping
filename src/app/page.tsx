import EmblaCarousel from "@/components/Carousel";

import BackgroundVideo from "@/components/BackgroundVideo";
import { EmblaOptionsType } from "embla-carousel";

export default function Home() {
    const OPTIONS: EmblaOptionsType = { loop: true };

    return (
        <div className="flex  flex-col gap-5">
            <BackgroundVideo />
            <h1 className="title">Gallery</h1>
            <EmblaCarousel options={OPTIONS} />
            <h1 className="title">Experiences</h1>
            <p>We organize special </p>
        </div>
    );
}
