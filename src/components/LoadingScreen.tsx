import { Loader } from "@mantine/core";

const style = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const LoadingScreen: React.FC = () => <div
    style={style}>
    <Loader color="gray" size="xl" />
</div >

export default LoadingScreen;