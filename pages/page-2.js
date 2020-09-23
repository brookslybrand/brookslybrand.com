import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const SecondPage = () => (
  <>
    <Head>
      <meta title='Page 2' />
    </Head>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link href='/'>
      <a>Go back to the homepage</a>
    </Link>
  </>
)

export default SecondPage
