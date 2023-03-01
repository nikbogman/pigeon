import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import { createEmotionCache, MantineProvider } from "@mantine/core";

import "../styles/globals.css";

const appendCache = createEmotionCache({ key: 'mantine', prepend: false });


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => <>
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
  </>;

export default api.withTRPC(MyApp);
