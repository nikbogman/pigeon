import { Button } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function PageLayout(props: {
    children: React.ReactNode
}) {
    const { data: sessionData } = useSession();
    const { pathname } = useRouter();
    const username = sessionData && <span>{sessionData.user?.name?.split(" ")[0]}</span>
    const image = <FaUser className="mx-2" />;
    return <>
        <div className="w-full fixed z-10 inset-x-0 top-1">
            <div className="flex items-center justify-between p-2 mx-5 border bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md text-white rounded-lg">
                <p className="flex items-center font-medium">{image}{username}</p>
                <Button color="light"
                    onClick={() => signOut()}
                ><FaSignOutAlt className="mr-2" />Sign Out</Button>
            </div>
        </div>
        {props.children}
        {pathname === '/invitations' ?
            <Link href='/invitations/form'>
                <Button className="fixed z-50 inset-x-0 bottom-1 mx-5 md:w-10 md:bottom-5"
                    gradientDuoTone="cyanToBlue"
                >
                    <FaPlus className="h-5 aspect-square" />
                </Button>
            </Link>
            :
            <Link href='/invitations'>
                <Button className="fixed z-50 inset-x-0 bottom-1 mx-5"
                    gradientDuoTone="cyanToBlue"
                >
                    <FaArrowLeft className="h-5 aspect-square" />
                </Button>
            </Link>
        }
    </>
}