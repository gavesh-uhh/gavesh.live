import type { PageLoad } from './$types';

const linkMap: Record<string, string> = {
  "colortheme": "https://github.com/olimorris/onedarkpro.nvim",
}

export const load: PageLoad = ({ params }) => {
  return {
    url: linkMap[params.slug]
  };
};
