import "@/styles/globals.css";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

interface Props extends AppProps {
  session: Session;
}

export default function App({ Component, pageProps, session }: Props) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
