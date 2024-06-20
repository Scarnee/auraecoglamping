"use client";
import bulkImages from "@/utils/bulkimages";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image, { StaticImageData } from "next/image";
import React from "react";

type PropType = {
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {bulkImages.map((index) => (
                        <div className="embla__slide" key={index}>
                            <Image src={index} alt={index} width={5000} height={5000} className=" embla__slide__number" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default EmblaCarousel;
