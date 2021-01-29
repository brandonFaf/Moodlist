export const getAuthParams = (url: string): AuthParams => {
  const [, query] = url.split('?');
  const params = query.split('&');
  return params.reduce(
    (acc, p) => {
      const [key, value] = p.split('=');
      return { ...acc, [key]: value };
    },
    { access_token: '', refresh_token: '', expires_in: 0 }
  );
};
