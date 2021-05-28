import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function App() {
  return (
    <>
      <Head>
        <meta title="Brooks Lybrand's home page" />
      </Head>
      <h1>This is my website</h1>
      <p role="alert">
        <span role="img" aria-label="">
          🚧
        </span>{' '}
        Warning: This site is under construction is consequentially horrible{' '}
        <span role="img" aria-label="">
          🚧
        </span>
      </p>
      <Link href="/todos">
        <a>I've got some things I want to work on here</a>
      </Link>
      <p>There is nothing here. Why are you here?</p>
      <p>Checkout some pages I didn't make:</p>
      <Link href="/page-2">
        <a>Go to page 2</a>
      </Link>{' '}
      <br />
      <Link href="/using-typescript">
        <a>Go to "Using TypeScript"</a>
      </Link>
      <p style={{ marginTop: '2rem' }}>I did make this, it's very nice</p>
      <Link href="/a-post">
        <a>Check it out</a>
      </Link>
    </>
  )
}
