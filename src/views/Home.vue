<template>
  <el-space direction="vertical" fill>
    <ArticlePreview
      v-for="post in blogMetaInfo"
      @click="router.push(post.name)"
      :post="post"
      style="cursor: pointer;"
    />
  </el-space>
</template>
<script setup>
import { useRouter } from "vue-router";
import ArticlePreview from "@/components/ArticlePreview.vue";

const router = useRouter();
// 访问所有路由定义
const allRoutes = router.options.routes;
// 找到 name 为 'blog' 的路由信息
const blogRoute = allRoutes[0].children.find((route) => route.name === "blog");
// 提取 blogRoute.children 中所有的 meta 信息
const blogMetaInfo = blogRoute?.children?.map((child) => ({
  name: child.name,
  ...child.meta,
})).reverse();
</script>
