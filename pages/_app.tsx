import "@/styles/index.css"
import type { AppProps } from 'next/app'
import Head from "next/head"



export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>HardMed</title>
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
    </Head>
    <Component {...pageProps} />
  </>
}
