import Link from "next/link";
import { BsPeopleFill } from "react-icons/bs";
import { FaInbox, FaUserCog } from "react-icons/fa";

export default function NavBar() {
    return <div className="w-full fixed z-10 inset-x-0 top-1">
        <div className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mx-1">
            <div className="grid grid-cols-3 gap-1 h-10 w-full">
                <div className="group h-full">
                    <Link
                        href="/events"
                        className="flex items-center justify-center bg-white rounded-l-lg w-full h-full transition-all ease-in duration-75 group-hover:bg-opacity-0"
                    >
                        <FaInbox className="h-5 w-5 group-hover:text-white" />
                    </Link>
                </div>
                <div className="group h-full">
                    <Link
                        href="/contacts"
                        className="flex items-center justify-center bg-white w-full h-full transition-all ease-in duration-75 group-hover:bg-opacity-0"
                    >
                        <BsPeopleFill className="h-5 w-5 group-hover:text-white" />
                    </Link>
                </div>
                <div className="group h-full">
                    <Link
                        href="/profile"
                        className="flex items-center justify-center bg-white rounded-r-lg w-full h-full transition-all ease-in duration-75 hover:bg-opacity-0"
                    >
                        <FaUserCog className="h-5 w-5 group-hover:text-white" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
}