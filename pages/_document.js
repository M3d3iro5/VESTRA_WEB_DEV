import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#070707" />
      </Head>
      <body className="bg-slate-950 text-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
