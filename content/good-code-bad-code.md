---
date: 2026-08-24
published: false
---
# Good Code, Bad Code

Image there are 2 versions of the same piece of software, let's say a website. Imagine they both do what you expect. They have the words and images you want on them, when you click on things, things happen as expected. They are only different in implementation. The underlying code itself is differently. How would you pick between these 2 different websites?

If they're truly not different, ceteris paribus, then it doesn't matter, does it?

But how can two things be outwardly equal, yet inwardly distinct? How can this be true for a website?

I website might include JavaScript, probably CSS, definitely HTML, and for our purpose that's all we care about.

Let's consider HTML. Browsers are quite forgiving, you can send broken HTML (COULD USE AN EXAMPLE) and browsers will often fix it up for you. So the output is the same, but the input is different? So which should you prefer? A broken clock is right twice a day, so for those two times a day should we not care which clock we look at? To even know when the broken clock is right, you need to compare it to the correct, time-attuned clock, and then you will know when the broken clock is right. The broken clock by itself is quite useless. The broken HTML is only unbroken because the browser knows what correct HMTL is and conforms the mess into something useable. Same output, different inputs, but it doesn't cost much to just do it right.

Then there's the matter of semantic HTML, sometimes admittedly taken a bit too far. The idea is nice though, but just switching from one tag, say a `<div>` to another, say an `<aside>`, because you want to [represent a portion of a document whose content is only indirectly related to the document's main content.](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside), you're communicating some intent which a browser, someone else's parser or css, or a screen reader (FACT CHECK) might pick up on.