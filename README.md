<h1 align="center"">
    <img src="./public/logo.svg"/>
</h1>

This is an ai music website developed based on [Next.js](https://nextjs.org/). It uses [Suno AI](https://suno.com/) to generate music.

## Demo

We have deployed an example website on Vercel, so you can see how it runs: [ai-song.vercel.app](https://ai-song.vercel.app)

> The example site may not be able to generate music, the reason may be that the cookie is out of date, you can deploy and update the SUNO_COOKIE environment variable by yourself. If the suno api is still abnormal after updating the cookie, you can refer to [suno-api](https://github.com/gcui-art/suno-api) to fix it first.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSprheany%2Fai-song&env=SUNO_COOKIE&project-name=ai-song&repository-name=ai-song)

## Run locally

1. obtain the cookie of your [Suno AI](https://suno.com) account

   Locate the request that contains the keyword "client?\_clerk_js_version". Navigate to the Cookie section, hover your mouse over it, and copy the value of the Cookie.

1. clone project

   ```bash
   git clone https://github.com/Sprheany/ai-song.git
   ```

1. install dependencies

   ```bash
   cd ai-song
   npm install
   ```

1. init database

   create your database and run `npm run db:push` to create tables, then run `npm run db:seed` to crawl data from Suno API

   > Suno API is crawled through the official website, it may not work in the future.

1. set env variables

   put `.env` under `ai-song` root dir with values list below

   ```
   SUNO_COOKIE=

   POSTGRES_PRISMA_URL=
   POSTGRES_URL_NON_POOLING=

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   NEXT_PUBLIC_URL=

   LEMONSQUEEZY_API_KEY=
   LEMONSQUEEZY_STORE_ID=
   LEMONSQUEEZY_PRODUCT_ID=
   LEMONSQUEEZY_WEBHOOK_SECRET=
   ```

   SUNO_COOKIE is the cookie value you obtained in the first step

1. run

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Thanks

- [Suno AI](https://suno.com)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Clerk](https://clerk.com)
- [Lemonsqueezy](https://www.lemonsqueezy.com)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/orm)
- [suno-api](https://github.com/gcui-art/suno-api)
