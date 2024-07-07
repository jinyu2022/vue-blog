<template>
  <div ref="carouselRef">
    <img
      v-for="(image, index) in visibleImages"
      :key="index"
      :src="image"
      class="image"
      :style="imageStyle(index)"
      @animationiteration.once="addImg(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, } from "vue";
import img1 from "@/assets/75961171_p0_master1200.jpg";
import img2 from "@/assets/83914344_p0_master1200.jpg";
import img3 from "@/assets/101243336_p0_master1200.jpg";
import img4 from "@/assets/101361771_p0_master1200.jpg";
import img5 from "@/assets/101372892_p0_master1200.jpg";
const carouselRef = ref<HTMLElement | null>(null);
const images = [
  img1,img2,img3,img4,img5
  // 添加更多图片路径
];
const currentIndex = ref(1);
const visibleImages = computed(() => images.slice(0, currentIndex.value + 1));
const imageStyle = (index: number) => {
  return {
    "animation-name": "fadeAnimation",
    "animation-duration": `${totalDuration}s`,
    "animation-timing-function": "linear",
    "animation-iteration-count": "infinite",
    "animation-delay": `${
      index === 0 ? index * 6 + 6 - totalDuration : 12 - totalDuration
    }s`,
  };
};

/** 添加图片 */
const addImg = (index: number) => {
  if (index >= images.length - 2) {
    // 当到达图片数组末尾时，清除监听器
    console.log("清除监听器", new Date().toLocaleTimeString());
  } else {
    currentIndex.value++;
    console.log("添加新图片", new Date().toLocaleTimeString());
  }
};
// 计算动画的总时长
const totalDuration = 6 * images.length;
// 计算关键帧的百分数
const fadeEnterFromPercentage = ((totalDuration - 7) / totalDuration) * 100;
const fadeEnterToPercentage = ((totalDuration - 6) / totalDuration) * 100;
const fadeLeaveFromPercentage = ((totalDuration - 1) / totalDuration) * 100;
const fadeLeaveToPercentage = (totalDuration / totalDuration) * 100;
const keyframes = `
  @keyframes fadeAnimation {
      0% { opacity: 0; }
      ${fadeEnterFromPercentage}% { opacity: 0; }
      ${fadeEnterToPercentage}% { opacity: 1; transform: scale(1);}
      ${fadeLeaveFromPercentage}% { opacity: 1; transform: scale(1.1);}
      ${fadeLeaveToPercentage}% { opacity: 0; transform: scale(1.1);}
      100% { opacity: 0; }
  }`;

// 将关键帧添加到样式中
const style = document.createElement("style");
style.innerHTML = keyframes;
document.getElementsByTagName("head")[0].appendChild(style);
</script>

<style scoped>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
