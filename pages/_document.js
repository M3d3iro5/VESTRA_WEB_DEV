import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#070707" />
        {/* Previne flash de tela preta durante carregamento */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html, body { background-color: #070707; color: #e2e8f0; }
          #__next { display: contents; }
        `,
          }}
        />
      </Head>
      <body className="bg-slate-950 text-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
