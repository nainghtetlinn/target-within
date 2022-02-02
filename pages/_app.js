import '../styles/globals.css';
import Provider from '../context';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
