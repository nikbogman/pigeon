import NavBar from "../NavBar"

export default function PageLayout(props: {
    children: React.ReactNode
}) {
    return <>
        <NavBar />
        {props.children}
    </>
}