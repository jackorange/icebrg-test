export const getHttpSettings = () => {
  const token = localStorage.getItem('access_token');
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return settings;
};
