---
date: 2026-09-14
published: false
---
# Do Frameworks Matter Anymore?

I'm not trying to be facetious. I want to really consider whether or not, in 2026, in the age of vibe coding, agentic-programming, loop or graph or whatever diagrammatic metaphor-based engineering is most popular, does it matter what web framework you use? More importantly (to me and my particular interests), and at the risk of [Betteridge-ing myself](https://en.wikipedia.org/wiki/Betteridge%27s_law_of_headlines): should we make new frameworks?

React won, so do we ever try anything new?

Is there now just more room for niches? Nobody cares about the implementation details, nobody cares what's in a `.tsx` file, does that open up new opportunities to try something new, or since it doesn't matter does the industry as a whole just decide to use the most stable thing, forever.

Or does React die too? Does everyone just make their own framework? You may not understand your bespoke framework, but your agent does and it wrote it and it probably likes it. You ask the LLM about it's framework and it knows more about it than you know about React's internals, and it's just one step further along the inevitable pathway of merely having [LLMs ship binaries](https://x.com/elonmusk/status/2084304083851034949) instead of human-readable code.

In this time of great disruption we get the opportunity to rethink best practices (or in Remix's case, re-rethink), and [lay everything on the table again](https://youtu.be/2n41YjR5QfU?t=993). That doesn't mean everything stays on the table, it just means we'll take the good, leave the bad, and modify the ugly (a.k.a. the "not-as-useful-in-its-current-form").

## Predicting the Future

One of the most reassuring rules-of-the-universe we are getting a weekly lesson in at this point is: nobody knows the future.

Of course people will still predict the future. We predict for a number of reasons:
1. Being right about the future is fun, it makes you feel smart.
2. Being right about the future, when a lot of people are wrong (or non-predicting), usually gives you the opportunity to make a lot of money.
3. Being right about the future might let you have some say in that future, be it by coining terms, pushing forward ideas or methods applicable in the future, or building a company that becomes a dominate force in that future.

So essentially ego, money, or power, or more likely all 3.

None of this is wrong outright. This isn't an indictment on trying to predict the future. I don't even know if we humans can _really_ help predicting the future if we wanted to. We do it in small ways all the time:
- Looks like it might rain, better bring an umbrella.
- I don't know if there will be much food at this party, better eat a snack now.
- I think I will be happy spending my life with this person, I should marry them.

We are risk-weighing creatures in just about everything we do (welcome to the conversation, behavioral economics). Currently there's an extra dose of risk taking happening right now, because there's a pretty disruptive technology (real suite of technology) we are collectively calling AI. In case you haven't realized, it is impacting a lot of industries (probably most of all Tech), and many companies, governments, and even [religious institutions](https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html#THE_GRANDEUR) are trying to wield and/or shape this tool for their betterment and maybe the betterment of humanity. With that many voices in the conversation, and the disparate views and predictions being made, I think mathematically it must be true that more people's predictions will be wrong than will be right.

So as I am considering and also trying to predict (and make) the future, it's humbling to remember "I could be wrong", and it's encouraging to remember most everyone else will be.

## Imagine

> Imagine there's no React
> It's easy if you try
> No Svelte below us*
> Above us, only bi(nary)
> Imagine all the people
> Prompting for today

\*sorry Svelte for replacing the word "hell" with you, it's not because I perceive a resemblance, I just liked the way it sounded.

So let's return to the argument, and spell it out a bit more. This is the conventional wisdom I am hearing right now:

> Since the models got good (circa Winter 25-26) for agentic programming, I care less and less about the code (and you should too). This is particularly true with any frontend browser code, because it's all largely presentational, therefore if it looks good, it is good.
> 
> That being the case, and given that React is already the most dominant of UI frameworks, with a very popular metaframework Next.js (not to mention some other good choices like React Router and Tanstack Start), there's really no need or value in trying anything else out. Plus, because there is vastly more React code out there in the wild, that means the models are trained more heavily on React, and therefore better (or at least more comfortable) with React. The React singularity has already happened, accept it.

Obviously (I hope) I am now being a bit facetious. The argument is still worth considering, mostly because I see people [cargo culting](TODO: insert my tweet) this opinion and React along with it into their vibe coded apps. There are however some much more serious folks, such as the Cursor team, who do seem to be convinced that in the age of agentic programming [using React is an advantage](source).

I'm tempted to dig into each of these claims:
- You don't need to worry about frontend code
- Models are best with React because of their training data
- Models would be bad with a new framework because of lack of training data

I'm not actually sure the value though, particularly in arguing about React. I have a much bigger issue with the logic, and it stems back to my original question: **Do Frameworks Matter Anymore?**

Here's what I don't get about the argument: why React? Why any framework or UI library at all?

If LLMs have gotten so good at frontend code. If people are caring less and less about the details of their HTML, JavaScript, and CSS, just that it looks and behaves properly, then why even put a layer of abstraction between the LLM and the website? If ever there were a time to embrace Web Components, surely it's now.

React no longer has to be one's personality. Disclaimer: I say this as someone with a YouTube Channel named "React Tips with Brooks Lybrand". Plus, we already have AI labs to make our new personality, so we'll be fine.

Let me pitch the argument differently:

> Since the models got good (circa Winter 25-26) for agentic programming, it's easier than ever to build a beautiful and interactive website without having to worry about what we previously called DX (Developer Experience). My agent doesn't care about things like file-based routing, and why should I bother it with properly setting up a useEffect?
> 
> Plus, models are really well trained on JavaScript, HTML, and CSS (sort of), there's really no need or value to adding any more layers of complexity. 

I think there are some logical leaps and mistakes in that sentiment, but no more than in the first, widely more accepted one.

Either:
- Framework do not matter, in which case you have no reason to use React
- You would likely still be advantaged by using React, in which case Frameworks do matter

## What is the value of a web framework?

Ah the web framework. Where does it start, where does it end? What's it's purpose? Do we even need them at all? After all, what was so bad about JQuery, and has anyone made the argument that we should just let the agent use JQuery since it's well represented in its training data?

I'm old enough to remember the "framework wars" of the 2010s, but just barely. I got the tail end of it really. When I did my evaluations, it was React, Angular, and Vue. Those were the "frameworks" we talked about. Gatsby existed and was way overused. Next.js was pretty cool, but also pretty limited. For the most part, if you were in the React ecosystem, you just used create-react-app (CRA) and _maybe_ you [ejected](https://create-react-app.dev/docs/available-scripts/#npm-run-eject) if you actually had someone on your team who thought SSR was valuable and wanted to set that up.

React was solving a number of problems. Despite what [Mr. Rauch thinks](https://x.com/rauchg/status/2088757738037989755) (and ordinarily, he is pretty much on the money), React didn't "win" because it came with a component library that wraps a great style system and lower-level accessible components and utilities that you can own and morph to your own needs. ShadCN is awesome, don't get me wrong. But even with in the component-library/design system story it's the latest evolution in a long line of successors from Radix, to Reach UI, to Material UI, to Bootstrap and many, many more that I'm skipping, forgetting, or unaware of.

If you ask the React team why React won, or maybe why it's so great, they'd likely say "composition". I find it very difficult to encapsulate exactly what made React so special, but I think this is a big part of it. I didn't really understand what this meant for the early part of my career and React usage. I just knew that:
- React was really easy to plug into an existing site
- React had a really nice way to encapsulate logic and markup into contained and sometimes reusable components
- React had a robust and constantly growing ecosystem of libraries that helped fill in additional pieces I needed: routing, styling, head/meta tag management, etc.

I would learn later that React also provided server-side rendering (SSR) out the gate, making it look and feel a good bit like PHP with it's html-in-your-scripting-language sort of experience. Setting this up was a bit more involved, especially for folks like myself who were more frontend-focused. This lead to the rise of the "backend-for-frontend engineer" and the meta-frameworks like Next.js and Remix (the old one, [sorry](https://remix.run/remix-history)).

This long but brief diversion of why React was good hardly does justice to the full history, and it certainly doesn't scratch the surface of other web frameworks and what made them unique. Despite React's predominance, plenty of other frameworks and meta-frameworks get millions of weekly downloads and are loved by many a developer. It also completely glosses over the popularity of non-JavaScript based frameworks such as Laravel and Ruby on Rails.

It's difficult for me to answer the question: "what is the value of a web framework?" without considering why React was valuable to me (CUT, MOVE?). React made it easier to build dynamic websites without ending up with spaghetti code, and spaghetti code was bad because long term it was costly to change and maintain.

I think the value-add of a framework is pretty simple: **frameworks provide abstractions, structure, and constraints for building your website**. This isn't even really a unique property of frameworks, this is true for all libraries, modules, classes, and functions. Code is a series of abstractions that express meaning and intent to computers and anything else for which that code is valuable. Previously that was humans, and so we cared a lot about things like variable names. These days the level of detail we care about is shifting and resettling. Maybe we're on some infinite curve and we'll care less and less about the trees until we don't even care about the forest. Personally, I'm doubtful, but I could definitely be wrong.

## Everyone uses a framework

Alright, the jig is up, I'm being _a little_ facetious when I ask "Do frameworks matter anymore?"

I recall at React Conf 2024 during a [Q&A with the Core Team](https://www.youtube.com/watch?v=lyqMfofOpu8), [Ricky Hanlon](https://x.com/rickyfm) made this point:

> You're either using a framework, or building a framework, and building a framework is really hard

This wasn't the first time I'd heard this. In fact, at a prior job as an engineer on the web platform team of at a [Texas Grocery store](https://www.heb.com/), we ran into the same thing. We had built our own meta-framework around React to handle server-side rendering for initial requests, then hydrate the whole document and hand off routing to the client using React Router (v5?).

While we did have a cute name for this little layer of meta-framework we made (`exo` I believe, and no one could agree why it was called that), most engineers didn't think of it as us using a framework. I blame that mostly on a combination of lack of features and lack of marketing (why would we market an internal framework?). Nevertheless, we still built our own framework, and it came with a lot of maintenance cost and burden, plus very few engineers actually understood how it worked, making it a pretty decent-sized liability.

Long story short, they started the process of moving off of this home-grown meta-framework and switching to Next.js. I didn't get to see the transition through because this was around the time I went to work with the Remix team at Shopify (of course we joked that it was this decision that drove me away).

This anecdote is pretty squarely right before agentic programming would git gud. Assuming you're starting a greenfield project right now, and assuming it's not just for demonstration purposes or a 1-off presentational website, I think Ricky's statement is both more right than ever, and a little bit wrong.

Let's start with the wrong: "building a framework is really hard". It's really not anymore. I mean it depends what you want. If you want a good, robust, bug-free, secure, full-stack framework it usually takes more than a couple of prompts to really flesh out. And then when you start using it you may find that LLMs can't really make it work for all the things you ask it do, so they just quietly build hacks around your framework, and depending on how you're building this framework those hacks end up becoming part of the framework. Avoiding bolting on hacky work-arounds and deciding on good, robust, and extensible abstractions does require a bit of work and iteration, even with frontier models in my experience.

However, building a framework, not even a shitty one, an okay one, is not really hard. I know this because if you don't use a framework and you start building a website with an LLM, it will build a framework for you. The LLM might not have the feature breadth or definitely not marketing dollars or ambition to sell you on it being a framework, but it's still a framework. Just like LLMs make functions, and classes, and all the typical abstractions we made when we programmed by hand. Just because you're looking at it less, doesn't mean the Agent isn't fundamentally doing the exact same thing we're doing. I don't even care to call it slop, it's progressive feature adding with no cleanup, that's how I built all of my first projects. This is nothing new, the biggest thing that's changed is speed.

Agents can now build your website faster. It can look up information and ideas faster. It can create a mess faster. We were capable of all of these things before, this is absolutely not a "humans > AI at programming" take. I'm just trying to make the point that you are either using an explicit framework, or an implicit one. If you don't think it matters at all, then [to my earlier point](#imagine), why even use React?

If you do somehow, for some reason think it's better that an LLM use a framework like React or a meta-framework like Next.js, my guess is because you would prefer the LLM to use something battle-tested, well abstracted, and with good documentation. You probably also like that it sets up guardrails for the Agent, it avoids reinventing the wheel where the current wheel gets you where you want to go. You may have other reasons, but here are mine:

## What I want (and don't want) in a framework

These days, I am much more interested in the "shape" of code (something abstractions and structure helps with tremendously) and as constraining my Agent (tests, linting, skills, scalable patterns to replicate). There are many things that used to be important to me when I was the one more directly typing the characters of the code, things generally labeled Developer Experience (DX). Some of that stuff is still helpful to me, some of it is no longer very helpful to me (but is to the Agent), and some of it doesn't seem to be helpful to either of us.

Take _Hot Module Reloading_ for example (HMR). HMR allows me to make changes to a website and immediately see updates in my browser without having to refresh the screen. When this works reliably, it is incredibly helpful, especially when tweaking the design of something that involves a user flow (like error messages on a form, accordions that start out collapsed, absolute positioning of a decorative element). This isn't a make-it-or-break-it feature, but I have found that even with working with Agents (maybe especially since working with them), when I am working on complex user interaction and really trying to dial in the design, HMR is very helpful.

Take _TypeScript_. TypeScript used to be super valuable to me because it created constraints. My JavaScript now had to be typed (and C# devs rejoiced, so I'm told). Additionally, it made it much easier to discover the fields and methods available in an object, because I could just hover or `command+.` on said object and see what was available. TypeScript was a big part of creating the built-in documentation that helped make me productive while I was in the code. These days I pretty much don't care at all about discovering specific methods on an object, and the type constraints don't directly help me. However, I and many other still seem to find that for complex applications (not just 1-shot vibed stuff you'll throw away), having the constraints of types really dials in the LLMs ability to iterate on code without accidentally breaking everything. Plus, as far as I can tell, having access to the LSP seems to help it with discovery when encountering a function, object, or module it's not deeply familiar with (so any legacy code or code the agent before it generated).

Take _`useEffect`_ for example. I know it's kind of the poster-child for a shitting on React, and I know the React Team has [supplied new APIs](https://react.dev/reference/react/useEffectEvent) that are supposed to help with it's shortcomings. The thing is though, I was a `useEffect` wizard when I was personally slinging the React (at least I felt like I was). I didn't mind `useEffect` so much, I trusted myself with it. It was a dependable, quirky, and very powerful hook that I felt comfortable wielding, primarily because I felt confident I knew when not to use it. With LLMs, I find `useEffect` to be worse than quirky, and no matter how smart the model I don't feel comfortable at all with them wielding that abstraction. In fact, development on Grok Bot apparently [bans useEffect](https://x.com/poteto/status/2089227731305464150) outright.

I want a framework ~~with a short skirt and a long jacket~~ that provides abstractions, structure, and constraints for building a website.

I find that if an abstraction doesn't exist, an LLM will make it. Sometimes that doesn't really matter, sometimes it's just a 1-off abstraction. Sometimes it does matter though, sometimes an abstraction is built around an actual web primitive (Navigation API for client navigations). Sometimes an abstraction plays well with other abstraction (using fetch and Request/Response model across the router). Sometimes an abstraction encapsulates behavior that's very hard to get right consistently and bug free the first time (React's Server Components if you like em, Remix's Frame if you don't).

I've already talked about how I still like to see the shape of code. Maybe [Mr. Musk](https://x.com/elonmusk/status/2094242307511853196) is right and we're just accelerating to a superhuman level of coding, and me trying to understand the code will actually be a drag. For now, I find I get the best results when I work with the Agent, create a good core architecture for it to build off of, and continually refine where we're creating difficult to follow code (not even for me, for the agents; I notice when they get confused).

And finally constraints. I want it to be so clear how to do the right thing the right way. I want escape-hatches to be possible, but generally unnecessary and always obvious to me and the machine when they're taken. I want testing and tooling that checks the agent's work built into the framework. I want good docs available immediately, in my `node_modules` preferably so the agent isn't constantly wasting time scraping the internet and potentially bringing in bad advice.

## So do frameworks matter anymore?

UNFINISHED
- talk about how I've been reflecting on this, soul-searching, conviction that it still matters even if it's not where the full force of the industry is
- talking about the shifting of hype cycles, and that's okay
- talk about what I'm committing to

I have been writing this blog post for [3 weeks at this point](https://x.com/BrooksLybrand/status/2092273347060969474). I've spent the last 3 years of my career working on open-source web frameworks. I like this work, and I'd like this to be what I work on for the indefinite future. Answering the question "do frameworks matter anymore" is incredibly important to me, because more than I love working on frameworks, I hate the idea of working on something that just doesn't matter.

Through writing this piece and multiple conversations with peers in the industries, I feel pretty confident about a few things:
- AI is absolutely reshaping how software is made, both individually and at scale.
- Until proven otherwise, different people and approaches yield varying degrees of quality when it comes to results.
- No one actually knows the long-term impact AI will have on the software development, let alone the world.
- AI is currently where the full focus of the industry is.

I think **Framework Wars** of ~2013-2019. followed by the sequel **Framework Wars: The Rise of the Meta-Frameworks** ~2020-2024 are over. Clearly by putting that date of 2024, I believe they've been over for a little bit. People can stop being fatigued by JavaScript, and thank goodness because we all know [we're fatigued by the AI hype/doomer cycle](https://www.youtube.com/watch?v=iPUn1Fnfn0k).

I entered and grew up in this industry as web frameworks, and particularly React, were seemingly taking over a large swath of the industry (I recall people shipping React to both the terminal and to fridges, no judgement, just nostalgia). Because these are the fires that forged me, this is easiest lens through which I can make some sense of how large communities of individuals, professionals, and appreciators of their craft respond a dominating market force that is incredibly cool and valuable while simultaneously sucks all the air out of the room for any other conversation.

So I've accepted, or am accepting, that the people do not year from the framework they way they used to, and in many ways that's probably a really good thing. It got a little crazy there for a second, and I of course was very bought in.

To me it's like asking "does transportation matter anymore" because everyone is saying "cars are here, horse-drawn carriages are out."

While true, traditional programming is going through a resolution, but until agents are no longer programming, I find this nearly-a-cliché-heuristic still quite valuable: if it was good for humans, it's probably good for AI.

