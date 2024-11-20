import { dev } from '$app/environment';

export const load = ({ url }: any) => {
  const { pathname } = url;
  return {
    pathname
  };
};
