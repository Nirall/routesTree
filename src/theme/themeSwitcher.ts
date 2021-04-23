import { vkTheme, whatsupTheme, GitlabTheme } from './themes';

const themeSwitcher = (nodesCount: number) => {
  const quantity = Number.isFinite(nodesCount) ? nodesCount : 0;
  let entries = Object.entries(vkTheme);
  if (quantity === 1) entries = Object.entries(whatsupTheme);
  if (quantity > 1) entries = Object.entries(GitlabTheme);
  entries.forEach((entry: [string, string]) => {
    document.documentElement.style.setProperty(entry[0], entry[1])
  });
}

export {themeSwitcher};
