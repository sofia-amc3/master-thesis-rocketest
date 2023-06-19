This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project was deployed using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) and can be visited [here](https://master-thesis-rocketest.vercel.app/).

## How to Run the Rocketest Application

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Note that to run this project on your local environment you have to enter the credentials on `.env.local` file. `EXAMPLE.env.local` is an example of how this file should look like.

## How to Run the External API

To use the external API on 'Find Testers' page of Rocketest, you must create a new terminal on its root folder (`master-thesis-rocketest\rocketest\externalApi`) and run it like this:

```bash
npm start
```

If you want to test any request, you can open [http://localhost:8080/api/simulatingFacebook/getUsers](http://localhost:8080/api/simulatingFacebook/getUsers) or [http://localhost:8080/api/simulatingLinkedIn/getUsers](http://localhost:8080/api/simulatingLinkedIn/getUsers) with your browser and check the response.

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/).
