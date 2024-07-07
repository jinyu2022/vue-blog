<template>
  <div class="md">
    <RouterView></RouterView>
  </div>
  
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<style>
@import 'prismjs/themes/prism.css';
.md {
  color: rgb(82, 82, 91);
  line-height: 1.5;
}
.md h1 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 800;
  margin-bottom: 2rem;
}
.md h2 {
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
  font-size: 1.5rem;
  line-height: 2.25rem;
}
.md p {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  text-align: justify;
}
.md pre {
  border-radius: 0.75rem;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
  padding: 1.25rem;
  /* background-color:#ffffff;
  color: #1f2328; */
  line-height: 1.25rem;
}
.md code {
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 1rem;
}
.md ol, .md ul {
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
} 
</style>
