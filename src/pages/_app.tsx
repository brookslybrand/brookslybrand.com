import Link from 'next/link'
import type { AppProps } from 'next/app'
import {
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineYoutube,
} from 'react-icons/ai'

import '../styles/tailwind.css'

type ComponentWithPageLayout = {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}

export default function App({
  Component,
  pageProps,
}: AppProps & ComponentWithPageLayout) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4">
        <nav className="flex flex-row items-center justify-between h-16">
          <Link href="/">
            <a className="text-3xl text-blue-700 hover:text-blue-900">Home</a>
          </Link>
          <div>
            <CustomLink href="/todos">About</CustomLink>
            <CustomLink href="/page-2">Articles</CustomLink>
            <CustomLink href="/using-typescript">Books</CustomLink>
            <CustomLink href="/a-post">Contact</CustomLink>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
      <footer className="flex flex-row justify-between p-4 pt-8">
        <p className="text-lg text-blue-900">
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
      <a className="p-2 text-xl text-green-900 hover:text-blue-800">
        {children}
      </a>
    </Link>
  )
}

function SocialMediaLinks() {
  return (
    <div className="flex flex-row space-x-2">
      <a href="https://twitter.com/BrooksLybrand">
        <AiOutlineTwitter
          className="text-green-900 hover:text-blue-800 fill-current"
          size="1.5rem"
          aria-label="Chat with me on Twitter"
        />
      </a>
      <a
        className="text-green-900 hover:text-blue-800 fill-current"
        href="https://github.com/brookslybrand"
      >
        <AiOutlineGithub size="1.5rem" aria-label="View my GitHub" />
      </a>
      <a
        className="text-green-900 hover:text-blue-800 fill-current"
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
