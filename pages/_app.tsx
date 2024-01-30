import "@hazae41/symbol-dispose-polyfill"

import "@/styles/index.css"

import { Console } from "@/libs/console"
import { Errors } from "@/libs/errors/errors"
import { useAsyncUniqueCallback } from "@/libs/react/callback"
import { Catcher, PromiseCatcher } from "@/libs/react/error"
import { ErrorProps } from "@/libs/react/props/error"
import { GlobalPageHeader, PageBody } from "@/libs/ui2/page/header"
import { Page } from "@/libs/ui2/page/page"
import { Base16 } from "@hazae41/base16"
import { Base58 } from "@hazae41/base58"
import { Base64 } from "@hazae41/base64"
import { Base64Url } from "@hazae41/base64url"
import { ChaCha20Poly1305 } from "@hazae41/chacha20poly1305"
import { Ed25519 } from "@hazae41/ed25519"
import { Keccak256 } from "@hazae41/keccak256"
import { Ripemd160 } from "@hazae41/ripemd160"
import { Secp256k1 } from "@hazae41/secp256k1"
import { Sha1 } from "@hazae41/sha1"
import { X25519 } from "@hazae41/x25519"
import type { AppProps } from 'next/app'
import Head from "next/head"
import { useCallback, useEffect } from "react"



export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Brume Wallet</title>
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
    </Head>
    <Component {...pageProps} />
  </>
}
