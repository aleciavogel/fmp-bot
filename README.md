# `fmp-bot`

![Screenshot of the app in action displaying the bot answering various financial questions about Peloton, Apple, and Tesla](./_docs/preview.png)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, use the Doppler CLI to login. You may use `.env.example` as a template
for the secrets you'll need.

Then, install dependencies with your favorite package manager and run the project
with one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Assignment
Use Open AI’s API alongside [FMP’s financial data API](https://site.financialmodelingprep.com/developer/docs) to answer
prompts such as “Summarize Apple’s latest  earnings call” or “What was Tesla’s revenue for Q2 2023". When answering
questions pulling transcripts please make sure to summarize the transcript from FMP.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

I first attempted to use the OpenAI Assistant API, thinking that the function calling feature would be useful for
this project. However, calling the FMP endpoint to retrieve an earnings call transcript was causing the assistant
to experience rate limiting issues (I was 10k TPM over the limit with just that one call due to all the tools 
and functions in the context). Also, no matter what I did, it seemed that the assistant would hallucinate values,
even when given the correct information and explicitly told to just read from it.

Because of the rate limiting issues, I decided to try and group the endpoints into combined handlers and define
a param for `type`. While this did reduce my token usage a bit, it wasn't enough to stop encountering errors with
the transcript endpoint or reduce hallucination, no matter the prompt I engineered.

I consulted a friend who works in Data Science and he pointed me towards LangChain. Within an instant, all my problems
went away. However, after defining and redefining all 200+ FMP endpoints several times over the weekend (at one point, 
even moving to Python in a TurboRepo with a FastAPI backend just to try something out), I ran a teensy bit out of steam.
So, I don't have handlers for every single FMP endpoint, but I do have the ones that I think I are most useful for
the purpose of this project.

Lastly, anytime a tool is called with a `symbol` param, I encode the symbol into the streamed message output so 
that I can load a chart showing the stock price over time. If I were to give myself more time, 
I would probably add a button to give users the option of hiding the chart or show different periods of time (week, 
month, 1 year, etc). I would also add a line to show how much the stock price has changed since the first datapoint
along with some labels at the top to show the current price and percentage change.

The app is deployed on Vercel at [https://fmp-bot.vercel.app/](https://fmp-bot.vercel.app/).
