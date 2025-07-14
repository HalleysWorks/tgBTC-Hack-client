const fetch = require('node-fetch');

exports.handler = async function (event) {
  const url =
    'https://bridge.tonhubapi.com/bridge' +
    event.path.replace('/.netlify/functions/bridge-proxy', '');
  const response = await fetch(url, {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
  });
  const body = await response.text();
  return {
    statusCode: response.status,
    headers: {
      'Access-Control-Allow-Origin': '*', // or your domain
      ...response.headers.raw(),
    },
    body,
  };
};
