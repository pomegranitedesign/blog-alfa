import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import * as snippet from '@segment/snippet'
import { ServerStyleSheets } from '@material-ui/core/styles';

const isProduction = process.env.NODE_ENV === 'production' && process.env.STAGING !== '1'

class MyDocument extends Document {
  renderSnippet = () => {
    const opts = {
      apiKey: isProduction ? 'W4l3ha1hLmfKDTzSVzJiPZYw9THNzX0w' : 'ZZ6b0orYyj9cDH2bHd3Zsxvzb3WpvVZw',
      page: true
    }
    return snippet.min(opts)
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }}/>
          <meta name="google-site-verification" content="q8lqoUNDwK5DAljRpE3_ug1McB4TTaSPzWv8400ULgg"/>
          <meta name="author" content="Artem Milinchuk"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
export default MyDocument
