<template>
  <article>
    <el-card shadow="hover">
      <dl>
        <!-- <dt>发布于</dt> -->
        <dd>
          <time :datetime="post.date" style="font-style: italic">{{
            post.date
          }}</time>
        </dd>
      </dl>
      <div>
        <div style="margin-bottom: 0.75rem;">
          <h2 style="margin-bottom: 0.875rem">
            {{ post.title }}
          </h2>
          <el-space wrap>
            <el-tag type="info" v-for="tag in post.tags" :key="tag">
              {{ tag }}
            </el-tag>
          </el-space>
        </div>
        <div>
          {{ post.description }}
        </div>
      </div>
    </el-card>
  </article>
</template>
<script setup lang="ts">
interface Post {
  date: string;
  title: string;
  tags: string[];
  description: string;
}
const props = defineProps<{ post: Post }>();
const post = props.post;
</script>
