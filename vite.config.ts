import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import matter from "gray-matter";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import VueRouter from "unplugin-vue-router/vite";
import Markdown from "unplugin-vue-markdown/vite";
import prism from 'markdown-it-prism';

import { generateRssPlugin } from './plugins/generateRssPlugin'; // 更新为插件的实际路径

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    generateRssPlugin(),
    VueRouter({
      routesFolder: [{ src: "src/blog", path: "blog/", }],
      extensions: [".vue", ".md"],
      extendRoute(route) {
        if (route.component?.endsWith('.md')) {
          const fullPath = path.resolve(__dirname, route.component);
          if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const { data } = matter(content);
            route.meta = { ...route.meta, ...data };
          }
        }
      },
      dts: "./typed-router.d.ts",
    }),
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      markdownItOptions: {
        html: true,
        script: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        // 使用 prismjs 插件
        md.use(prism);
      },
    }),

    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
