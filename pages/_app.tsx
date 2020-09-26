import Link from 'next/link'
import type { AppProps } from 'next/app'

import '../styles/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-6xl p-4 flex flex-col mx-auto">
      <nav className="h-16  flex flex-row items-center justify-between">
        <Link href="/">
          <a className="text-3xl text-blue-800">Home</a>
        </Link>
        <div>
          <CustomLink href="/todos">About</CustomLink>
          <CustomLink href="/page-2">Posts</CustomLink>
          <CustomLink href="/using-typescript">Books</CustomLink>
          <CustomLink href="/a-post">Contact</CustomLink>
        </div>
      </nav>
      <main className="mt-4">
        <Component {...pageProps} />
      </main>
      <footer className="mt-4">This is my footer</footer>
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
