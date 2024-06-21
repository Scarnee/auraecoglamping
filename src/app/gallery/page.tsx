"use client";
import bulkImages from "@/utils/bulkimages";
import Image from "next/image";
import { Masonry } from "react-plock";

export default function Gallery() {
    return (
        <div className=" items-center justify-center flex flex-col">
            <h1 className="title">Gallery</h1>
            <Masonry
                className=" w-4/5 self-center"
                items={bulkImages}
                config={{
                    columns: [1, 2, 3],
                    gap: [24, 12, 6],
                    media: [640, 768, 1024],
                }}
                render={(item, idx) => <Image src={item} alt={item} key={idx} width={500} height={500} className="rounded-lg" />}
            />
        </div>
    );
}
