import App from 'next/app'

const mApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

mApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}

export default mApp