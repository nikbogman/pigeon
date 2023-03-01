import { Button } from "@mantine/core";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SignInPage() {
    return <div className="min-h-screen	flex justify-center items-center">
        <Button
            variant="gradient"
            leftIcon={<FaGoogle className="mr-5" />}
            gradient={{ from: 'cyan', to: 'blue' }}
            size="xl"
            radius="md"
            onClick={() => signIn('google', { callbackUrl: '/contacts' })}
        >
            Sign in with Google
        </Button>
    </div>
}