import { Button } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft, FaPlus, FaUser } from "react-icons/fa";

interface IProps {
    children: React.ReactNode
}
export default function ({ children }: IProps) {
    const { data: sessionData } = useSession();
    const { pathname } = useRouter();
    const username = sessionData && <span>{sessionData.user?.name?.split(" ")[0]}</span>

    return <>
        <div className="fixed z-10 inset-x-0 top-0 w-full">
            <div className="flex justify-between bg-gradient-to-r from-purple-500 to-blue-500 text-white border border-transparent rounded-lg shadow-md p-2 mx-5 mt-2 items-center">
                <p className="flex items-center font-medium"><FaUser className="ml-2 mr-2" />{username}</p>
                <Button color="light"
                    onClick={() => signOut()}
                >Sign Out</Button>
            </div>
        </div>
        {children}
        <Link href={pathname === '/' ? '/form' : '/'}>
            <Button className="fixed z-50 inset-x-0 bottom-2 mx-5 text-white bg-gradient-to-r from-purple-500 to-blue-500"
            >{pathname === '/' ? <FaPlus className="w-5 h-5" /> : <FaArrowLeft className="w-5 h-5" />}</Button>
        </Link>
    </>
}