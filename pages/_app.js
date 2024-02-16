import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
