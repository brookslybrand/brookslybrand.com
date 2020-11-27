import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className={globalClassNames}>
        <Head />
        <body className={globalClassNames}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

const globalClassNames =
  'min-h-screen bg-gradient-to-b from-gray-100 to-gray-200'

export default MyDocument
