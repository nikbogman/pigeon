import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import { useMediaQuery } from "@mantine/hooks";

const appendCache = createEmotionCache({ key: 'mantine', prepend: false });


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const matches = useMediaQuery('(max-width: 40em)');
  if (!matches) return <>
    Ooop. Sorry but currently we dont support desktop view.
  </>
  return <>
    <SessionProvider session={session}>
      <MantineProvider
        emotionCache={appendCache}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  </>
};

export default api.withTRPC(MyApp);
