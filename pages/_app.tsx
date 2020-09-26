import Link from 'next/link'
import type { AppProps } from 'next/app'
import {
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineYoutube,
} from 'react-icons/ai'

import '../styles/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-6xl p-4 flex flex-col mx-auto">
      <nav className="h-16 flex flex-row items-center justify-between">
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
      <footer className="mt-4 flex flex-row justify-between">
        <p className="text-lg text-blue-800">
          Brooks Lybrand © {new Date().getFullYear()}
        </p>

        <SocialMediaLinks />
      </footer>
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

function SocialMediaLinks() {
  return (
    <div className="flex flex-row space-x-2">
      <a target="_blank" href="https://twitter.com/BrooksLybrand">
        <AiOutlineTwitter size="1.5rem" aria-label="Chat with me on Twitter" />
      </a>
      <a target="_blank" href="https://github.com/brookslybrand">
        <AiOutlineGithub size="1.5rem" aria-label="View my GitHub" />
      </a>
      <a
        target="_blank"
        href="https://www.youtube.com/channel/UCd93bPmP8vplnkr9Jel_osA"
      >
        <AiOutlineYoutube
          size="1.5rem"
          aria-label="Checkout my YouTube channel"
        />
      </a>
    </div>
  )
}
