import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
export default function SignInPage() {
    return <div className="min-h-screen	flex justify-center items-center">
        <Button className="bg-gradient-to-br from-cyan-500 to-blue-500" size='xl'
            onClick={() => signIn('google', { callbackUrl: '/invitations' })}
        >
            <FaGoogle className="mr-5" />Sign in with Google
        </Button>
    </div>
}