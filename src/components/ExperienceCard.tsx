import Image from "next/image";

interface ExperienceCardProps {
    expTitle: string;
    expDescription: string;
    url: string;
    isReverse?: boolean;
}

export default function ExperienceCard(props: ExperienceCardProps) {
    const { expTitle, expDescription, url, isReverse } = props;
    return (
        <div className={` flex w-4/5 rounded-lg p-4 bg-[#004557] gap-4 shadow-md h-[250px] ${isReverse === true ? "flex-row-reverse" : "flex-row"}`}>
            <div className=" flex flex-col w-3/4">
                <h1 className=" font-bold text-2xl text-center">{expTitle}</h1>
                <h2 className="text-lg">{expDescription}</h2>
            </div>
            <div className="w-1/4 h-full relative">
                <Image src={url} alt="Experience" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
        </div>
    );
}
