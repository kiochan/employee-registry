import React from 'react'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
// import { CssBaseline } from '@nextui-org/react';
import { renderStatic } from '../shared/renderer'

class AppDocument extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const page = await ctx.renderPage()
    const { css, ids } = await renderStatic(page.html)
    const initialProps = await NextDocument.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style data-emotion={`css ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }} />
        </React.Fragment>
      ),
    }
  }

  render(): JSX.Element {
    return (
      <Html lang='en'>
        {/* <Head>{CssBaseline.flush()}</Head> */}
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
