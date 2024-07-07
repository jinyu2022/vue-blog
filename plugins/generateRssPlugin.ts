import { Plugin } from "vite";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Feed } from "feed";

export function generateRssPlugin(): Plugin {
  return {
    name: "vite-plugin-generate-rss",
    buildStart() {
      const blogDirectory = path.resolve(__dirname, "../src/blog");
      const files = fs.readdirSync(blogDirectory);
      const feed = new Feed({
        title: "Your Blog's Title",
        id: "https://yourblog.com/",
        description: "This is my personal blog",
        link: "https://yourblog.com/",
        copyright: "All rights reserved 2023, Your Name"
      });

      files.forEach((file) => {
        if (path.extname(file) === ".md") {
          const fullPath = path.join(blogDirectory, file);
          const content = fs.readFileSync(fullPath, "utf-8");
          const { data } = matter(content);

          feed.addItem({
            title: data.title,
            link: `https://yourblog.com/${data.url}`,
            description: data.description,
            date: new Date(data.date),
            category: data.tags.map((tag: string) => ({ name: tag }))
          });
        }
      });

      fs.writeFileSync("public/feed.xml", feed.rss2());
    },
  };
}
