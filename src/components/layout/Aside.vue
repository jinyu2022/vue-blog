<template>
  <el-card class="box-card">
    <img width="100%" height="120" class="image" src="https://www.tmetu.cn/usr/themes/Xc/assets/img/aside_author_image.jpg" alt="博主栏壁纸">
    <div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div>
  </el-card>
  <el-card header="站点公告">
    <div class="text item">公告内容</div>
  </el-card>
</template>
<style scoped>
.box-card {
  position:relative;
  padding-top: 120px;
  margin-bottom: 20px;
}
.image {
  position: absolute;
    top: 0;
    left: 0;
}
</style>