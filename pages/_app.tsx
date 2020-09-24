import Link from 'next/link'
import type { AppProps } from 'next/app'

import '../styles/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-6xl flex flex-col mx-auto">
      <nav className=" h-16 p-4 flex flex-row items-center justify-end">
        <CustomLink href="/todos">About</CustomLink>
        <CustomLink href="/page-2">Posts</CustomLink>
        <CustomLink href="/using-typescript">Books</CustomLink>
        <CustomLink href="/a-post">Contact</CustomLink>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

type CustomLinkProps = {
  href: string
  children: string
}
function CustomLink({ href, children }: CustomLinkProps) {
  return (
    <Link href={href}>
      <a className="mr-4 text-xl text-gray-800">{children}</a>
    </Link>
  )
}
