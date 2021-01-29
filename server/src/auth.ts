const { URLSearchParams } = require('url');
import logger from './utils/logger';
const querystring = require('querystring');
const express = require('express');
const {
  client_id,
  client_secret,
  redirect_uri,
  expoRedirect
} = require('../config/keys');
logger.log(expoRedirect);
const generateRandomString = length => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const router = express.Router();

router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  const scope =
    'user-read-private user-read-email playlist-read-private playlist-read-collaborative';
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state
    })}`
  );
});

router.get('/callback', async (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state === null || state !== storedState) {
    res.redirect(
      `/?${querystring.stringify({
        error: 'state_mismatch'
      })}`
    );
  } else {
    res.clearCookie(stateKey);
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('redirect_uri', redirect_uri);
    params.append('grant_type', 'authorization_code');
    const authOptions = {
      method: 'POST',
      body: params,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${client_id}:${client_secret}`
        ).toString('base64')}`
      }
    };
    const tokenRes = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
    );
    console.log('tokenRes:', tokenRes);

    if (tokenRes.status === 200) {
      const body = await tokenRes.json();
      console.log(JSON.stringify(body));
      const { access_token, refresh_token, expires_in } = body;
      // global.super_access_token = access_token;

      console.log('expoRedirect:', expoRedirect);
      const redirect = `${expoRedirect}?${querystring.stringify({
        access_token,
        refresh_token,
        expires_in
      })}`;
      res
        .cookie('access_token', access_token)
        .cookie('refresh_token', refresh_token)
        .redirect(redirect);
      const options = {
        headers: { Authorization: `Bearer ${access_token}` }
      };

      // use the access token to access the Spotify Web API
      const meRes = await fetch('https://api.spotify.com/v1/me', options);
      const { id, display_name } = await meRes.json();
    } else {
      res.redirect(
        `/#?${querystring.stringify({
          error: 'invalid_token'
        })}`
      );
    }
  }
});

router.get('/refresh_token', async (req, res) => {
  // requesting access token from refresh token
  const { token } = req.query;
  const authOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString('base64')}`
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: token
    },
    json: true
  };
  const result = await fetch(
    'https://accounts.spotify.com/api/token',
    authOptions
  ).catch(e => {
    console.log('e:', e);
    throw e;
  });
  const data = await result.json();
  const { access_token, refresh_token, expires_in } = data;
  res.send({ access_token, refresh_token, expires_in });
});

export default router;
