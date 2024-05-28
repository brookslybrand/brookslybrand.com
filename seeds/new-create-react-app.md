# The New Create React App

I'm [giving a talk at React Summit in Amsterdam](https://reactsummit.com/#person-brooks-lybrand) in 18 days. I fly out in 2 weeks from today. I'd prefer not to wait until the plane flight or I get to my hotel room to work on the talk.

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
