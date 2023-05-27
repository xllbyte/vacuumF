<template>
  <div id="trackElement" class="tray">
    <div v-if="trayList.length > 0">
      <div v-for="(item, index) in trayList" :key="index">
        <div
          :style="
            'top:' +
            3 +
            'px;left:' +
            (item.distanceLeft / sumLength) * 100 +
            '%;border: 1px solid white;border-radius: 50%;font-weight: 10;position: absolute'
          "
        >
          <n-button
            :style="
              'width:' +
              (item.length / 1000 / sumLength) * currentDivWidth +
              'px;' +
              'background: rgba(0, 255, 0, 0.6); height: 22px'
            "
          >
            {{ item.id }}</n-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { queryAllProduct, queryStoveLength } from '@/service/api/parm';

defineOptions({ name: 'vacuumRegister' });

let timer: number;
const trayList = ref([]);
const currentDivWidth = ref(0);
const sumLength = ref(0);
onMounted(async () => {
  const { data } = await queryStoveLength();
  // 更新页面元素
  if (data) {
    sumLength.value = Number(data.length2);
  }
  window.requestAnimationFrame(getWidth);
  timer = setInterval(updateRegister, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

async function updateRegister() {
  const { data } = await queryAllProduct();
  // 更新页面元素
  if (data) {
    trayList.value = data;
    console.log(trayList);
  }
}
function getWidth() {
  const trackElement = document.getElementById('trackElement');
  if (trackElement) {
    const divWidth = trackElement.offsetWidth;
    currentDivWidth.value = divWidth;
  } else {
    console.log('Track element not found.');
  }
  console.log(currentDivWidth.value);
}
</script>

<style scoped>
.tray {
  height: 30px;
  background-color: #eeeeee;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}
</style>
