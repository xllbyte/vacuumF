<template>
  <n-card :bordered="false" style="width: 100%">
    <div class="w-full h-288px">
      <n-grid x-gap="12" :cols="3">
        <n-gi>
          <div>
            <n-tag class="light-big" style="margin-top: 12%"> 链速 </n-tag>
            <n-tag class="light-big"> m/min </n-tag>
            <n-tag type="info" class="light-big"> {{ settingSpeed }}</n-tag>
            <n-tag type="success" class="light-big"> {{ actualSpeed }} </n-tag>
          </div>
        </n-gi>
        <n-gi> </n-gi>
        <n-gi>
          <div>
            <n-tag class="light-big" style="margin-top: 12%"> 含氧量 </n-tag>
            <n-tag class="light-big"> ppm </n-tag>
            <n-tag type="info" class="light-big"> {{ settingO2 }} </n-tag>
            <n-tag type="success" class="light-big"> {{ actualO2 }} </n-tag>
          </div>
        </n-gi>
      </n-grid>
      <div style="margin-top: 10px">
        <n-space vertical class="flex-center">
          <n-switch
            v-model:value="trackType"
            :rail-style="railStyle"
            style="margin: auto"
            @update-value="changeValveSwitch"
          >
            <template #checked> 二轨 </template>
            <template #unchecked> 一轨 </template>
          </n-switch>
        </n-space>
      </div>
      <n-grid x-gap="12" :cols="3">
        <n-gi>
          <div>
            <n-tag class="light-green" style="margin-top: 12%"> 轨道宽度 </n-tag>
            <n-tag class="light-green"> mm </n-tag>
            <n-tag type="info" class="light-green"> {{ settingTrackWidth[index] }}</n-tag>
            <n-tag type="success" class="light-green"> {{ actualTrackWidth[index] }} </n-tag>
          </div>
        </n-gi>
        <n-gi>
          <div>
            <n-tag class="light-green" style="margin-top: 12%"> 中间支撑宽度 </n-tag>
            <n-tag class="light-green"> mm </n-tag>
            <n-tag type="info" class="light-green"> {{ settingSupportWidth[index] }} </n-tag>
            <n-tag type="success" class="light-green"> {{ actualSupportWidth[index] }} </n-tag>
          </div>
        </n-gi>
        <n-gi>
          <div>
            <n-tag class="light-green" style="margin-top: 12%"> 中间支撑高度 </n-tag>
            <n-tag class="light-green"> mm </n-tag>
            <n-tag type="info" class="light-green"> {{ settingSupportHeight[index] }}</n-tag>
            <n-tag type="success" class="light-green"> {{ actualSupportHeight[index] }} </n-tag>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

defineOptions({ name: 'ParamList' });
const settingSpeed = ref(0);
const actualSpeed = ref(0);
const settingSupportHeight = ref([0, 0]);
const actualSupportHeight = ref([0, 0]);
const settingSupportWidth = ref([0, 0]);
const actualSupportWidth = ref([0, 0]);
const settingTrackWidth = ref([0, 0]);
const actualTrackWidth = ref([0, 0]);
const index = ref(0);
const trackType = ref(false);
const settingO2 = ref(0);
const actualO2 = ref(0);
const props = defineProps({
  settingSpeed: {
    default: 0
  },
  actualSpeed: { default: 0 },
  settingSupportHeight: { default: [] },
  actualSupportHeight: { default: [] },
  settingSupportWidth: { default: [] },
  actualSupportWidth: { default: [] },
  settingTrackWidth: { default: [] },
  actualTrackWidth: { default: [] },
  settingO2: { default: 0 },
  actualO2: { default: 0 }
});
function changeValveSwitch() {
  if (trackType.value) {
    index.value = 1;
  } else {
    index.value = 0;
  }
}
watch(props, newValue => {
  settingSpeed.value = newValue.settingSpeed;
  actualSpeed.value = newValue.actualSpeed;
  settingSupportHeight.value = newValue.settingSupportHeight;
  actualSupportHeight.value = newValue.actualSupportHeight;
  settingSupportWidth.value = newValue.settingSupportWidth;
  actualSupportWidth.value = newValue.actualSupportWidth;
  settingTrackWidth.value = newValue.settingTrackWidth;
  actualTrackWidth.value = newValue.actualTrackWidth;
  settingO2.value = newValue.settingO2;
  actualO2.value = newValue.actualO2;
});
</script>

<style scoped>
.light-green {
  font-size: 12px;
  width: 70%;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
}
.light-big {
  font-size: 14px;
  width: 80%;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
}
</style>
