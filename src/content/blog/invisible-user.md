---
title: "The Invisible User: Optimizing Your Site for Machines-First Discoverability"
description: "Your most important site visitor might not have eyes. Deep dive into llms.txt, JSON-LD, and the future of AI Search Optimization."
pubDate: 2026-02-03
heroImage: "/images/blog/invisible-user.png"
---

**If an AI agent visits your website today, what does it see?**

Does it see a beautifully animated hero section? A majestic parallax scroll? A stunning 4K video background?

No. It sees noise. It sees `<div>` soup. It sees untagged images and unsemantic HTML.

And if it can't understand what it sees, it ignores you.

## The Shift: Machines Talking to Machines

For 20 years, we've optimized websites for human eyeballs (UI/UX) and for Google's crawler (SEO). But Google's crawler was just an indexer - it grabbed keywords and stored them.

The new "users" - ChatGPT, Claude, Gemini, Perplexity - are not indexers. They are *readers*. They are *synthesizers*. They are trying to understand your site so they can answer a user's question without ever sending that user to your URL.

This is the era of **Answer Engine Optimization (AEO)**.

## The "Invisible" Tech Stack

To survive in this new web, you need a secondary tech stack designed exclusively for non-human visitors.

### 1. `llms.txt` / `llm.txt`
Just as `robots.txt` tells crawlers where to go, `llms.txt` tells AI agents what you are. It's a markdown file, living at your root, that strips away the fluff. It says:
*   "This is Steve."
*   "He is a Full Stack Developer."
*   "His rates are X."
*   "Here is his experience."

No design. No CSS. Just pure, clean context. [See mine here](/llms.txt).

### 2. JSON-LD Schema
This is the structured data layer. It forces the LLM to understand relationships.
Instead of hoping the AI figures out that "Steve Gibson" is the "Author" of this "Blog Post," you explicitly declare it in code.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Steve R Gibson",
  "jobTitle": "Technical Marketer"
}
```

### 3. Semantic HTML
Banish the `<div>`. Use `<article>`, `<section>`, `<aside>`, and `<nav>`. These tags give weight and meaning to your content. An LLM pays more attention to text inside an `<h1>` or `<strong>` tag than it does to text inside a generic span.

## The New "Bounce Rate"

In traditional SEO, a "bounce" is bad. In AI SEO, if an agent comes to your site, reads your `llms.txt`, gets the answer, and leaves... **that is a conversion.**

Why? Because that agent now goes back to the human user and says: *"According to Steve Gibson, the best way to handle this is..."*

You become the citation. You become the authority.

## Conclusion

The visual web isn't going anywhere; humans still crave beauty. But the *informational* web is rapidly moving underground, into APIs and plain text files exchanged between servers.

If you aren't optimizing for the Invisible User, you're only visible to half the world.
