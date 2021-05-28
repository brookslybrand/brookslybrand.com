import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

export default function App() {
  return (
    <>
      <Head>
        <title>Brooks Lybrand</title>
        <meta title="Brooks Lybrand's home page" />
      </Head>
      <div className="m-auto max-w-prose mt-8 px-4">
        <h1 className="text-4xl md:text-6xl text-green-900">Hi, I'm Brooks</h1>
        <section className="mt-6 text-lg md:text-2xl space-y-2 leading-relaxed text-justify">
          <p>
            I am a Web Developer who specializes in building highly interactive,
            data-rich React applications.
          </p>
          <p>
            I've worked across the entire stack and excel at creating tools that
            seamlessly connect users to data and scientific models that make
            their lives easier and better.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-xl md:text-3xl text-green-900">
            Check out some things I'm working on
          </h2>
          <ul className="text-lg md:text-2xl mt-2 space-y-2 pl-4">
            <ListItemLink href="https://www.youtube.com/channel/UCd93bPmP8vplnkr9Jel_osA">
              React Tips with Brooks Lybrand
            </ListItemLink>
            <ListItemInternalLink href="/page2">Articles</ListItemInternalLink>
            <ListItemLink href="https://github.com/brookslybrand">
              GitHub
            </ListItemLink>
          </ul>
        </section>
      </div>
    </>
  )
}

function ListItemLink({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <li>
      <a
        className={clsx('text-green-900 hover:text-blue-800', className)}
        {...props}
      >
        – {children}
      </a>
    </li>
  )
}

function ListItemInternalLink({
  className,
  href = '',
  children,
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <li>
      <Link href={href}>
        <a
          className={clsx('text-green-900 hover:text-blue-800', className)}
          {...props}
        >
          – {children}
        </a>
      </Link>
    </li>
  )
}
