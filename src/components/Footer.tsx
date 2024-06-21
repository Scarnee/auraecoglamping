export default function Footer() {
    return (
        <div className="flex flex-col bg-[#004557] mt-10">
            <div className="flex flex-row items-center justify-evenly gap-5 w-full p-4">
                <div className="text-center">
                    <h1 className=" text-lg font-bold">Contact</h1>
                    <p>Contact us at info@auraeco.com</p>
                </div>
                <div className="text-center">
                    <h1 className=" text-lg font-bold">Extras</h1>
                    <ul>
                        <li>
                            <a href="faqs">FAQs</a>
                        </li>
                        <li>
                            <a href="terms">Terms of Service</a>
                        </li>
                        <li>
                            <a href="privacy">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1 className=" text-lg font-bold">Social Media</h1>
                    <ul>
                        <li>
                            <a href="https://www.instagram.com/auraecoglamping/">Instagram</a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/profile.php?id=100083468312038">Facebook</a>
                        </li>
                        <li>
                            <a href="https://twitter.com/auraeco">Twitter</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-row items-center justify-evenly gap-5 w-full p-4">
                <p className=" font-bold">&copy; Aura Eco Glamping All rights reserved.</p>
            </div>
            <div className="flex flex-row items-center gap-1  justify-center w-full p-4">
                Made with ❤️ by
                <a href="https://portfolio-jordane-brosset.vercel.app/" target="blank" className=" text-green-500">
                    Jordane Brosset
                </a>
            </div>
        </div>
    );
}
