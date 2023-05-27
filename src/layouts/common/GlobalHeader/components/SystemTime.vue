<template>
  <hover-container tooltip-content="时间" class="w-200px h-full">
    <p id="datetime"></p>
  </hover-container>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';

defineOptions({ name: 'SystemTime' });

let timerId: number;

onMounted(() => {
  timerId = setInterval(updateDateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});

function updateDateTime() {
  // 获取当前时间
  const now = new Date();

  // 定义星期数组
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  // 格式化日期
  const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now
    .getDate()
    .toString()
    .padStart(2, '0')}`;

  // 格式化时间
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;

  // 获取当前星期
  const weekdayStr = weekdays[now.getDay()];

  // 更新页面元素
  document.getElementById('datetime').innerHTML = `${dateStr} ${weekdayStr} ${timeStr}`;
}
</script>

<style scoped></style>
