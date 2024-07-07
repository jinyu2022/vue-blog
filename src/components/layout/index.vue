<template>
  <el-container>
    <el-header
      class="header"
      style="padding: 0; height: 50vh; position: relative"
    >
      <ImageCarousel class="carousel" />
      <Waves
        style="position: absolute; bottom: -0.6875rem; width: 100%;"
      />
      <Header />
    </el-header>
    <div
      style="
        padding: 20px;
        background-color: #ffffff; /* 设置背景颜色，防止格子背景出现间隙 */
        background-image: linear-gradient(to right, #f0f0f0 1px, transparent 1px),
          linear-gradient(to bottom, #f0f0f0 1px, transparent 1px);
        background-size: 10px 10px;
      "
    >
      <el-container class="inner-container">
        <el-main>
          <RouterView />
        </el-main>
        <el-aside width="200px" class="aside">
          <Aside />
        </el-aside>
      </el-container>
    </div>

    <el-footer class="footer">
      <Footer />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import Footer from "./Footer.vue";
import ImageCarousel from "../ImageCarousel.vue";
import Waves from "../icons/Waves.vue";
</script>

<style scoped>
.carousel {
  overflow: hidden;
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 50vh;
}
.inner-container {
  max-width: 964px;
  margin: 0 auto;
}
.aside{
  padding-top: 1.25rem;
}
@media screen and (max-width: 768px) {
  .aside {
    display: none;
  }
  
}
.footer {
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
  color: #666;
  height: auto;
}
</style>
