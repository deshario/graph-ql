import App, { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo';
import { RecoilRoot } from 'recoil'

const mApp = ({ Component, pageProps } : AppProps) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </RecoilRoot>
    </>
  )
}

mApp.getInitialProps = async (appContext:AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}

export default mApp