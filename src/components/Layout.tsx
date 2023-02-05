import { Button } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowLeft, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";

type TProps = {
    children: React.ReactNode
}
export default function Layout({ children }: TProps) {
    const { data: sessionData } = useSession();
    const { pathname } = useRouter();
    const username = sessionData && <span>{sessionData.user?.name?.split(" ")[0]}</span>

    const isInvitationsPage = pathname === '/invitations';
    const iconStyle = "h-5 aspect-square";
    const icon = isInvitationsPage ? <FaPlus className={iconStyle} /> : <FaArrowLeft className={iconStyle} />
    return <>
        <div className="fixed z-10 inset-x-0 top-0 w-full">
            <div className="flex justify-between border bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-lg shadow-md p-2 mx-5 mt-2 items-center">
                <p className="flex items-center font-medium"><FaUser className="ml-2 mr-2" />{username}</p>
                <Button color="light"
                    onClick={() => signOut()}
                ><FaSignOutAlt className="mr-2" />Sign Out</Button>
            </div>
        </div>
        {children}
        <Link href={isInvitationsPage ? '/invitations/form' : '/invitations'}>
            <Button className="fixed z-50 inset-x-0 bottom-2 mx-5"
                gradientDuoTone="cyanToBlue"
            >{icon}</Button>
        </Link>
    </>
}