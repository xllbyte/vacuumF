<template>
  <n-space :vertical="true">
    <n-card title="高温报警" :bordered="false" size="small" class="shadow-sm rounded-16px">
      <n-grid :x-gap="12" :y-gap="8" :cols="3">
        <n-grid-item>
          <n-input-group>
            <n-button type="primary" class="input-head"> 电压 </n-button>
            <n-input v-model:value="settingVoltage" :style="{ width: '80%' }" />
          </n-input-group>
        </n-grid-item>
        <n-grid-item>
          <n-input-group>
            <n-button type="primary" class="input-head"> 实际电压 </n-button>
            <n-input v-model:value="actualVoltage" :style="{ width: '80%' }" />
          </n-input-group>
        </n-grid-item>
        <n-grid-item>
          <n-input-group>
            <n-button type="error" class="input-head"> 重置 </n-button>
          </n-input-group>
        </n-grid-item>
      </n-grid>
      <n-grid
        :item-responsive="true"
        responsive="screen"
        cols="m:2 l:8"
        :x-gap="50"
        :y-gap="80"
        style="margin-top: 20px"
      >
        <n-grid-item v-for="(item, index) in heatArray" :key="index">
          <div
            class="flex-col-center p-12px border-1px border-[#efeff5] dark:border-[#ffffff17] rounded-4px hover:shadow-sm cursor-pointer"
          >
            <n-button class="block-sty">k{{ index + 1 }}</n-button>
            <n-button v-if="item <= 357.5" class="block-sty" type="primary">{{ item }}</n-button>
            <n-button v-if="item > 357.5" class="block-sty" type="error">{{ item }}</n-button>
            <n-button v-if="item <= 357.5" class="block-sty" type="success">OK</n-button>
            <n-button v-if="item > 357.5" class="block-sty" type="error">Error</n-button>
          </div>
        </n-grid-item>
      </n-grid>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { saveJson } from '@/service/api/home';
const heatArray = ref([
  27.06, 26.71, 26.82, 25.18, 25.19, 27.53, 28.23, 28.3, 28.07, 27.04, 26.64, 25.02, 25.91, 26.34, 39.84, 400
]);
defineOptions({ name: 'warningHeat' });
const settingVoltage = ref(24);
const actualVoltage = ref(10);
const count = ref(0);
const props = defineProps({
  warnArray: { default: [] }
});
watch(props, newValue => {
  count.value = 0;
  if (newValue.warnArray) {
    for (let i = 0; i < newValue.warnArray.length; i++) {
      if (newValue.warnArray[i] > 357) {
        count.value += 1;
      }
    }
    heatArray.value = newValue.warnArray;
  }
});
watch(count, newValue => {
  if (newValue) {
    if (Number(newValue) > 0) {
      const Param = {
        result: true,
        dataType: 'boolean',
        name: 'Application.HMI_HomePage.h_xMaxHeartWarning'
      };
      const arr = [];
      arr.push(Param);
      saveJson(arr);
    } else {
      const Param = {
        result: false,
        dataType: 'boolean',
        name: 'Application.HMI_HomePage.h_xMaxHeartWarning'
      };
      const arr = [];
      arr.push(Param);
      saveJson(arr);
    }
  }
});
</script>

<style scoped>
.block-sty {
  width: 100%;
}
.input-head {
  width: 150px;
}
</style>
