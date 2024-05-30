# The New Create React App

I'm [giving a talk at React Summit in Amsterdam](https://reactsummit.com/#person-brooks-lybrand) in 15 days. I fly out in lass than 2 weeks from today. I'd prefer not to wait until the plane flight or I get to my hotel room to work on the talk.

Plus, I have [a meetup](https://www.meetup.com/remix-austin/events/300867295/) in 1 week, and currently no speaker. I'd be nice to get a practice round in and some feedback before then, but I don't want to coopt my meetup for my own purposes. Mostly need to make sure there's absolutely no one who wants to give a talk before then.

## What's it about

Anyway, the talk. Here's the abstract I submitted:

> Create React App (CRA) was a game changer in garnering React adoption. Prior to the release of CRA, the experience of setting up a React app was more about configuring webpack than it was actually writing React code.
>
> Now that the React docs no longer list CRA as a suggestion on the “Start a New React Project” page, and additionally recommend you pick a React-powered framework, the getting started experience is once again fragmented.
>
> CRA was never meant to be how you built a full-featured React app anyway. It was a starting point, and a really good one. Inevitably many developers (such as myself) used CRA to build websites, and lots of them. However, a lot more goes into building a website than just using a “library for web and native user interfaces” — you need to handle routing, data fetching and mutations, styling, and a whole lot more.
>
> I believe Remix is the best framework available for taking up this mantle. Built on top of React Router, the most widely used routing solution in the React ecosystem, powered by Vite, and now with an option to build pure SPAs (like CRA), Remix is well poised as the best starting point to start React apps of all varieties.
>
> In this talk I plan to show the story of how Remix has evolved into the CRA replacement, how you can easily migrate from a CRA or React Router project, and how Remix will bring you into the future of React.

## What did I promise

There is one big elephant in the room that will immediately need to be addressed. We decided to [merge Remix into React Router](https://remix.run/blog/merging-remix-and-react-router), so that will have to be addressed first. I'm not sure if I should go into many details, or more so give the high-level overview and then link to Ryan's talk and our 2 blog posts.

The React docs [recommend using a framework](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework)

As Ryan pointed out in his talk, [CRA is pretty dead at this point](https://github.com/facebook/create-react-app/commits/main/)

So it looks like I promised the following from my abstract:

- What CRA solved
- Current state of starting a new React project
- Where CRA falls short
- The history of how Remix evolved into the CRA replacement (include the Remix -> React Router merge here?)
- Why React Router + Vite is the best contender to take up this mantel
- Walk through migration paths (not sure if this will be live coding or just high-level)

## What did CRA give us

I want to make it very clear that even though the title of this talk is a little punch, I'm really not digging on CRA at all.

CRA was great! It's how I built many of my early demos and apps for my first job. It was both a playground for learning, as well as a way to quickly bootstrap a React app and start building. I didn't have to worry about configuring webpack, babel plugins, or any of that to get started.

From the CRA home page

**Less to Learn**

> You don't need to learn and configure many build tools. Instant reloads help you focus on development. When it's time to deploy, your bundles are optimized automatically.

I love this, just get going, don't much with a bunch of tooling, and be able to deploy!

No real answers on where to deploy, but that's kind of the world we live in with JS, there are lots of options. With CRA it gave you a Pure SPA, so your deployment had to be on a static server, so kind of limited.

Basically, for Remix, this is actually the piece that is now handled by Vite. What's nice now though is Vite is automatically setup to be plugable and to build on top of. You don't have to eject 😎

**Only One Dependency**

> Your app only needs one build dependency. We test Create React App to make sure that all of its underlying pieces work together seamlessly – no complicated version mismatches.

This one is kind of funny to me, because here are your dependencies:

```json
"dependencies": {
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
```

I think they mean `react-scripts` is your one dependency, and it bundles and keeps it's dependencies up to date. I think it's more like a simplified dependency story. Anyway, I'll need to think more how to address this piece.

For Remix, I think it's more like "one plugin". You're already using Vite, we covered that in the previous one. It replaces the whole webpack + babel story in a more extensible way. Now this Remix plugin gets you a SPA, SSR, RSC (soon), and SSG (soon). All the rendering in one plugin! 🥳

**No Lock-In**

> Under the hood, we use webpack, Babel, ESLint, and other amazing projects to power your app. If you ever want an advanced configuration, you can ”eject” from Create React App and edit their config files directly.

Here they have the ejection story, which I definitely want to talk about more. I guess they're saying you can eject and use whatever you want, which is nice. Lock-in is such a weird concept, because you always "locked-in" to something depending on how you look at it. Or from the other side you're not locked into anything. Are you locked into React with create-react-app? If yes, then you're also locked into webpack.

Anyway, Webpack was the way to do bundling at the time, it's what a lot of people built on top of. It's fine, this is how things go. Vite is winning right now, so to get the full, best React experience, Vite is the easiest way to do it.

You can still use React Router, you're not locked into Vite, but you gotta handle all the stuff the plugin is giving you on it's own.

Okay, so let's map this out

- Less to learn -> Simple setup and getting started experience with lots of stuff already built in
- One dependency -> `react-scripts` -> Remix Vite plugin (some would argue that's 2 dependencies, but then I'd argue that `react-scripts` is way more than 1 dependency)
- No lock-in -> Kind of not true, but the spirit of it is, you don't have to use react-router with Vite, but that's the best way to, and it's very plugable so you can kind of do whatever you want.

Also on the homepage:

- Get started in seconds
- Easy to Maintain

Nice call out on React Router: https://create-react-app.dev/docs/adding-a-router
That doc was added 6 years ago, and that commit was just splitting the advice out from another doc: https://github.com/facebook/create-react-app/commits/main/docusaurus/docs/adding-a-router.md

If it were written now, surely it would have tanstack router, and maybe even wouter. The point isn't that React Router is supreme, it's that it's been around for a freaking long time, and we're still adding features (something that CRA isn't doing)

Might be interesting to add a timeline here of when CRA was started and "ended", when React Router was started and ended, maybe add Vite in there, webpack, things like that

Other things mentioned that might be worth addressing:

- Styles/assets
- Testing
- Back-End (backend?) Integration
- Deployment

Basically it's going to sound like I'm just pitching Vite as the CRA replacement, which I kind of am.

## Starting a new React Project

Too many choices!

- Next.js
- Astro
- CRA (we just talked about this)
- Bling?
- Vite

Do I take the opportunity to make the low-hanging fruit slide where all the choices are on the screen?

Basically, Vite CLI is the new "old CRA", but the problem is we want a new CRA...

## What is CRA (and Vite) missing?

What do the React docs say?

> You can use React without a framework, however we’ve found that most apps and sites eventually build solutions to common problems such as code-splitting, routing, data fetching, and generating HTML. These problems are common to all UI libraries, not just React.

That's why Nuxt, SveltKit, SolidStart, etc. exist. This is kind of not even controversial anymore

So it's more than just finding a "replacement" for CRA, it's finding a _new_ CRA

React Router gives you all this, it gives you versatile deployment options, and it's built on a library that's been around for 10 years.

Need to expand this more
