---
date: 2026-05-13
published: true
description: I think I'm getting worse at coding.
ogImage: /images/stop-using-claude.md/old-man-yells-at-claude.png
---

# Stop Using CLAUDE.md

There are basically no rules right now when it comes to producing code with LLMs.

There are principles, general trends, repeatable patterns, anecdotal findings, and some "standards" like [`AGENTS.md`](https://agents.md/) and [`Agent Skills`](https://agentskills.io/).

If you actually read those linked websites, you'll find a lot of words that essentially say these "standards" are:
- Markdown files (mostly)
- Markdown files that (most) "agentic harnesses" automatically look for

Usually, `AGENTS.md` gets loaded into the context window every time. Agent Skills (`.agents/`) have metadata that is loaded into the context window every time, and the model can load the full context when it "thinks" the added context would be useful (progressive disclosure).

It's really not much more complicated than that, but because everyone wants to think _they've figured this whole agentic-coding thing out_, the discourse makes it seem more involved.

`CLAUDE.md` (and its friend `.claude/`), however, are dumb.

As far as I can tell, every major tool (Codex, pi, Cursor, you name it) will use `AGENTS.md` and `.agents/` if it finds it. Claude Code does not. Not to let these other tools off the hook, they also have dumb directories like `.codex` and `.cursor` and whatnot, but they _respect_ the "agent" terminology. **Claude does not**.

So inevitably, what ends up happening, is something like this:

![A React Router CLAUDE.md file pointing Claude Code to AGENTS.md and agent skills](/images/stop-using-claude.md/react-router-claude-md.webp)

I'm picking on a project I work on, that has a `CLAUDE.md` file that is a glorified `AGENTS.md`, telling the Claudinator to go look up the canonical `AGENTS.md` file and `.agents/` directory.

This is dumb, but a necessary dumb, it seems, because everyone is doing it.

![Michael Jordan saying stop it](/images/stop-using-claude.md/michael-jordan-stop-it.gif)

It's time to stop it. I don't mean for your personal projects, or for apps. I mean for project templates, or open source work where you're just adding it because you're worried some Claude Code user will have a bad time when their precious file is found missing.

Right now, in the Remix 3 template (still in beta), [we just have `AGENTS.md` and `./agents`](https://github.com/remix-run/remix/tree/e1d20c0348a010a94233d213bf1df17a699c7544/template). We could very easily include a symlink `CLAUDE.md` or a minimal one like in the React Router repo, but that's dumb. If someone checking out Remix is a Claude Code user, surely they're AI-pilled enough to burn $0.001 getting Claude to change things so it can keep using it's special, bespoke, pointlessly branded filename.

We already have a ridiculous proliferation of config files. Every. Damn. Tool. Needs. One.

![A long Next.js config file](/images/stop-using-claude.md/next-js-config.webp)

Why does Claude get to be so special here? We live in a time where no tool is sacred, [no lab is king](https://x.com/DavidKPiano/status/2053855389738017128), and every harness deserves its own branded version of the exact same thing everything else is using.

We don't have to play into this game. We don't have to stroke the ego of the linear algebra pushers.

> Be the change you want to see in the world
> -Gandhi

-Brooks
