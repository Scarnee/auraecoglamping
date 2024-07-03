import ExperienceCard from "../../components/ExperienceCard";

export default function Experiences() {
    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="title">Experiences</h1>
            <h2 className="text-lg">Our glamping include on demand experiences</h2>
            <ExperienceCard
                expTitle="Wedding Proposal"
                expDescription="Enjoy romantic accommodations, gourmet dining, personalized experiences, and seamless planning for the perfect proposal. Book now to make your moment truly special."
                url="/img/wedding.jpg"
                isReverse={true}
            />
            <ExperienceCard
                expTitle="Bachelorette Party"
                expDescription="Welcome to Aura Eco Glamping, where we elevate bachelorette parties with luxurious glamping in stunning natural settings. Enjoy lavish accommodations, gourmet dining, personalized activities, and seamless planning for an unforgettable celebration. Book now to create cherished memories in style. "
                url="/img/bachelor.jpg"
                isReverse={false}
            />
            <ExperienceCard
                expTitle="Birthday"
                expDescription=" Enjoy elegant accommodations, gourmet dining, personalized activities, and seamless planning for an unforgettable birthday. Book now to make your celebration truly special. "
                url="/img/birthday.jpg"
                isReverse={true}
            />
            <ExperienceCard
                expTitle="Movie Night"
                expDescription=" Experience the magic of watching a movie under the stars at our luxurious glamping site. Enjoy cozy seating, gourmet snacks, and the beauty of nature as your backdrop. Relax and unwind with your favorite film in a serene outdoor setting. Book now for an unforgettable cinematic adventure. "
                url="/img/movie.jpg"
                isReverse={false}
            />
            <ExperienceCard
                expTitle="Pet Friendly"
                expDescription="Bring your furry companion to our luxurious glamping site for an unforgettable adventure. Enjoy cozy accommodations, pet-friendly amenities, and scenic trails perfect for exploring together. Relax by the campfire under starry skies, creating cherished memories with your pet. Book now for a bonding experience amidst nature's beauty. "
                url="/img/pet.jpg"
                isReverse={true}
            />
        </div>
    );
}
