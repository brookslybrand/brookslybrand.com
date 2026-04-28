---
date: 2026-04-27
published: true
---

# React Miami 2026

I attended [React Miami](https://www.reactmiami.com/) on April 23-24, 2026

I have no big single takeaway, more some observations on the tech industry and the React community

### Organization

React Miami is awesome, and I have so much respect for [Michelle](https://x.com/MichelleBakels), [Rebecca](https://x.com/Beccalytics), and [Gabe](https://x.com/gabegreenberg) at G2I for running it (5 years now, wow!)

React Miami is the kind of conference I look to when defining success and casting vision for [Remix Jam](https://jam.remix.run).

This was Michelle's last year organizing, and there was so much love for her and her sister, Rebecca, as the torch was metaphorically passed. Such down-to-earth people, just building something they want to see in the world and that people love. They deserve all the praise they get.

### How are people feeling about React?

Overall it seems like interest in new React features is at an all time low.

I've definitely heard React Miami described as "an excuse to have a party with fellow devs". Don't get me wrong, it is a very serious conference with very serious sponsors, talks, and speakers. Jobs have been found through this conference, learnings have been learned, and networks expanded. It is an awesome conference.

It also often feels like the least React-y of React conferences. The talks skew React, but plenty are not about React specifically (agentic workflows, TypeScript performance, how to get hired, etc.)

But even talking to people in the hallway, it seems like there's less and less excitement about React features. The "new stuff" feels like the stuff they've been talking about forever: RSC, React Compiler, Async React. Most people expressed a feeling that something was missing when learning about new React features. In the past we'd be excited about the new thing, we couldn't wait for Monday to come (or even on the plane) to install the latest and start experimenting with the new API. But instead, the response was "I guess I'll just have my agent look at it and build something with it."

I think the problem is 2-fold:

1. The advent of agentic coding (see [[#How are people feeling about AI?]])
2. The dichotomy of React

When I say "the dichotomy of React", I am talking about how React is basically 2 projects. You have old, boring React. It's boring, and that's probably good? Especially with agentic workflows, why would I ever try something else, AI already knows how to write Good Enough™ React? This is the popular sentiment.

On the other side, there's basically now 2 Reacts. I don't think this is what Dan meant by [React for Two Computers](https://overreacted.io/react-for-two-computers/), but prophetically it is exactly how using React feels: You use a version of React on your computer, and I use a different version on mine. Side note: we're trying to make React Router provide Every React, Everywhere, All at Once (see my talk whenever it's posted). Even if people are interested in RSC (and that term means way more to a user than it does to a React Core member, so good luck there), different projects have different "flavors", and most projects require a more sophisticated architecture to use it without degrading performance. For many, the potential upside just outweighs the potential downside by a wide margin.

So the React we want to use is boring, and the React we don't want to use is interesting, and there's 2 Reacts, and yet at a React conf we talked about AI orders of magnitude more than we talked about React.

So anyway, interest in React features is at an all time low.

### How are people feeling about AI?

People are scared, annoyed, confused, befuddled, amazed, having a blast, disenfranchised, and completely franchised all at once.

I am now quite convinced that:

- AI is not going to "take everyone's jobs", or at least in 5 years there will be more software engineers, not fewer (this deserves its own writing)
- The narrative that you have to be on X all the time to keep up and if you miss just 2 weeks you're totally behind is incredibly silly. There are people doing amazing shit that don't talk about it on X, and there are people who are in very early stages of AI adoption who fortunately get to skip out on some of the dumber best practices that have come and gone on The Everything App
- Educators have no idea how to communicate and educate now with AI
- People want to learn about new technology, they want their thinking challenged, and they're not getting that very much right now (neither from humans, nor AI)

So basically, don't listen to the AI doomers or utopists, and don't get all your opinions about AI best practices from X. There's a lot of "alpha" out there for software engineers as well as educators. Drop egos, our job is not knowing syntax. If you feel depressed about that, pretty much everyone does, but plenty of people have made it to the other side and are having a blast with AI. On the flip side, AI is not the Everything Technology, it's powerful, but man is it still dumb sometimes. Learn good engineering. Learn good CS. Learn how to think if you haven't learned how to think yet in your career. Thinking is at an all time high.

### React Router

Some people are still confused about React Router and Remix. They think they're the same thing. They think we're going to try to tell people to go from React Router back to Remix. They think React Router is dead. We've left a bad taste in some people's mouths.

I knew all of this, but it was a good reminder to hear people express it again, and express that it's still happening.

I addressed all of these concerns in my talk, but not everyone will see my talk so we'll have to keep addressing it again.

React Router is, in my opinion, the best way to build with React. You can use RSC, you can just use a SPA router, you can build your own framework, or you can use our framework. It has type safety, route modules, a great loader/action paradigm, is built on web primitives, is easy to extend, etc. It's awesome, and we're releasing v8 next month. Breaking changes are pretty minimal, and you can opt into all of them before v8 even comes out thanks to [future flags](https://reactrouter.com/upgrading/future).

We now have [open governance](https://remix.run/blog/rr-governance) and have consequently seen a lot of engagement from the community.

We've surpassed 1m weekly npm downloads in framework mode, with regular ol `react-router` in the 50-55m/week range ([source](https://npmtrends.com/@react-router/dev-vs-react-router)).

React Router is great, we've restructured how we maintain it so that it won't die, which is especially important because we're very focused on building Remix as well.

As for the history of these projects, and why with Remix 3 we're doing something different and not React-based, you can see [our homepage; it explains it](https://remix.run/). If it were up to me I would have used a different name. It wasn't up to me. IMO people make too big of a deal about this. If you don't want to use our stuff because "we're bad at branding", that's fine. It's also a bad reason to pick technology, but it's fine.

Alright, saltiness out of the way, the last reflection is on:

### Remix

A _lot_ of people asked me when Remix is coming (_Very Soon™_). I am so excited and encouraged that people are interested in it and actually want to try it out. However, this is where AI comes in again:

> I'm excited, but I'm not sure why I should care? I'm probably never gonna write it, just look at it, maybe have an agent build with it.

Conversation after conversation helped me clarify that:

- people want to be excited about new technology
- people aren't super sure how to be excited about new technology
- we have to pitch Remix to them in a new way

This will mostly be feedback for my team, and something we'll continue to iterate on, but these are the things I found most effective:

- Remix is smaller: I migrated remix.run from React to Remix and the homepage now downloads 1/3rd the amount of JS
- Agents work with it quite well (skills and a good template are basically all you need)
- It's full-stack, actually full-stack, for real this time. No more middle-stack dropping you off at the database and auth layer to figure it out yourself. No more building around React. We own the whole thing end-to-end so with an agent (or by hand if you want), you can build whatever you want with Remix and you're not required to pull in other deps (you can though if you want, everything works easily with Remix)
- It's just one dependency.

I think the pitch is:

- quick to build with
- scales
- simpler for agents _and_ you to understand
  - hard to prove, but if we're still gonna read a lot of code it is pretty nice to read
- smaller bundles
- full-stack, but modular, use what you want
- built on and for the web, no magic

Still a lot of refining to do, and we're about to go hard on comms. React Miami gave me a _ton_ of great feedback, and I'm thankful to everyone I talked to

### Conclusion?

Like I said, I have no big takeaway. React Miami was a lot of fun, I enjoyed almost every conversation I had. Thanks everyone for all the positive feedback on my talk, I look forward to sharing it out when the recording is up.

I think things are gonna be okay, I think our industry is shifting a lot, but like I said: there's a lot of room for people who like to think.
