import { createApp } from "./app";
import { renderToString } from "vue/server-renderer";

export async function render(url: string) {
  const { app, router } = createApp();
  router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await renderToString(app, ctx);
  return html;
}
