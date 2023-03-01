import ContactModalContext from "../context/ContactModalContext";

const ContactContextProvider: React.FC<{
    refetch: () => Promise<unknown>
    children: React.ReactNode
}> = (props) => <ContactModalContext.Provider value={{ refetch: props.refetch }}>
    {props.children}
</ContactModalContext.Provider>

export default ContactContextProvider;