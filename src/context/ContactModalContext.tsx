import { createContext } from "react";

export type ContextType = {
    refetch: () => Promise<unknown>
};

const ContactModalContext = createContext<ContextType>({
    refetch: async () => null
});

export default ContactModalContext;