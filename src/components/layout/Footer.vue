<template>
  <div>
    <p>本站已持续运行{{ daysUntilToday(2024,1,1) }}天</p>
    <p>©2024 - {{ new Date().getFullYear() }} By jinyu</p>
  </div>
</template>
<script setup lang="ts">

/**
 * 计算输入的日期距离今天的天数
 * @param year - 年份
 * @param month - 月份
 * @param day - 日期
 * @returns 距离今天的天数，如果输入的日期是未来的日期，则返回负数
 */
const daysUntilToday = (year: number, month: number, day: number) => {
  // 创建一个Date对象，代表输入的日期
  const inputDate = new Date(year, month - 1, day); // 注意月份是从0开始计数的
  // 获取今天的日期
  const today = new Date();
  // 计算两个日期之间的毫秒差
  const differenceInMilliseconds = today.getTime() - inputDate.getTime();
  // 将毫秒差转换为天数（1000毫秒 = 1秒，60秒 = 1分钟，60分钟 = 1小时，24小时 = 1天）
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  // 返回距离今天的天数（如果输入的日期是未来的日期，则返回负数）
  return Math.floor(differenceInDays);
}
</script>
