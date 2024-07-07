<template>
  <el-affix :offset="0">
    <nav class="sticky-navbar" ref="navbar">
      <div style="width: 800px; display: flex; justify-content: space-around">
        <RouterLink to="/">首页</RouterLink>
        <!-- 更多链接 -->
      </div>
    </nav>
  </el-affix>
  <h1 id="title">{{ title }}</h1>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { onBeforeRouteUpdate, RouterLink } from "vue-router";
import { throttle } from "@/utils/index";

const title = ref("");
onBeforeRouteUpdate((to, from) => {
  if (to.meta.title) {
    title.value = to.meta.title as string;
  }
});
const navbar = ref<HTMLElement | null>(null);

/**随着滚动条的滚动，逐渐改变导航栏的透明度 */
const opacityWithScroll = () => {
  const handleScroll = throttle(
    () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (navbar.value) {
        const navbarOpacity = parseFloat(
          navbar.value.style.getPropertyValue("--navbar-opacity")
        );
        // 随着滚动条的滚动，逐渐改变导航栏的透明度，滚动到300px时达到最大不透明度0.3
        navbar.value.style.setProperty(
          "--navbar-opacity",
          Math.min(scrollTop / 1000, 0.3).toString()
        );
      } else {
        navbar.value = document.querySelector(".sticky-navbar") as HTMLElement;
      }
    },
    50,
    false,
    true
  );
  // 监听滚动事件
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
};
opacityWithScroll();
</script>
<style scoped>
.sticky-navbar {
  /* 设置外层父元素的padding为0，不然el-affix会受到padding的影响 */
  /* position: fixed;
  top: 0;
  left: 0;  */
  --navbar-opacity: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, var(--navbar-opacity)); /* 标签栏的背景颜色 */
  color: rgb(255, 255, 255);
  padding: 10px;
  display: flex;
  justify-content: center;
}
#title {
  color: #fff;
  margin-top: 3rem;
  text-align: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  line-height: 1.5;
  font-size: 2.5em;
  text-shadow: 0 .2rem .3rem #1c1f21;
  z-index: -1;
}
@media screen and (max-width: 768px) {
  #title {
    font-size: 1.5em;
  }
  
}
a{
  color: #fff;
  text-decoration: none;
}
a:hover{
  transform: scale(1.1);
}
</style>
