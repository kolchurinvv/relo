import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// import fs from "fs";

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    plugins: [vue()],
    server: {
      port: 8080,
      // https: {
      //   cert: fs.readFileSync("_wildcard.joinrelo.com+3.pem"),
      //   key: fs.readFileSync("_wildcard.joinrelo.com+3-key.pem"),
      // },
    },
  };
});
