import { useState } from 'react';
import { tryGetApi } from '../utils/fetch-helpers';

const Debug = (props) => {
  console.info(`BASE_URL: ${process.env.BASE_URL}`);
  console.info(`SHOPIFY_REDIRECT_URL: ${process.env.SHOPIFY_REDIRECT_URL}`);

  const [debug, setDebug] = useState('');

  const handleGetDebug = async (event) => {
    event.preventDefault();
    const debug = await tryGetApi('api/debug');
    console.info('Debug.getInitialProps');
    console.info(debug);
    setDebug(JSON.stringify(debug));
  }

  return (
    <>
      <div>
        <p>via procces.env</p>
        <p>BASE_URL: {process.env.BASE_URL}</p>
        <p>SHOPIFY_REDIRECT_URL: {process.env.SHOPIFY_REDIRECT_URL}</p>
      </div>
      <div>
        <p>via getInitialProps</p>
        <pre>{props.debug}</pre>
      </div>
      <div>
        <p><button onClick={handleGetDebug}>via fetch</button></p>
        <pre>{debug}</pre>
      </div>
    </>
  );
}

Debug.getInitialProps = async () => {
  const debug = await tryGetApi('api/debug');
  console.info('Debug.getInitialProps');
  console.info(debug);
  return { debug: JSON.stringify(debug) };
}

export default Debug