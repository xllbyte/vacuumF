<template>
  <div>
    <n-card title="N2" class="shadow-sm rounded-16px parent-box">
      <n-grid :x-gap="12" :y-gap="8" :cols="3">
        <n-grid-item>
          <n-card class="shadow-sm rounded-16px single-card flex-y-center">
            <n-tag :bordered="false" type="info" style="margin-top: 40%">氮气启用状态</n-tag>
            <n-divider />
            <n-switch
              v-model:value="switchStatus"
              size="large"
              style="margin-left: 25%"
              @update-value="changeValveSwitch"
            />
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card class="shadow-sm rounded-16px single-card">
            <n-space vertical style="margin-top: 10%">
              <n-input-group>
                <n-button type="primary" class="input-head"> 设定值 </n-button>
                <n-input v-model:value="res1" :style="{ width: '80%' }" :input-props="{ onclick: clickOn }" />
              </n-input-group>
              <br />
              <n-input-group>
                <n-button type="primary" class="input-head"> 报警上限 </n-button>
                <n-input v-model:value="res2" :style="{ width: '80%' }" :input-props="{ onclick: clickOn1 }" />
              </n-input-group>
              <br />
              <n-input-group>
                <n-button type="primary" class="input-head"> 报警下限 </n-button>
                <n-input v-model:value="res3" :style="{ width: '80%' }" :input-props="{ onclick: clickOn2 }" />
              </n-input-group>
            </n-space>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card class="shadow-sm rounded-16px single-card"> </n-card>
        </n-grid-item>
      </n-grid>
    </n-card>
    <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalSettingValue" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalSettingValue"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalSettingValue"
        :max-length="maxlength"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModal1" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalMax" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalMax"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalMax"
        :max-length="maxlength"
        @onChange="onChange1"
        @onKeyPress="onKeyPress1"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModal2" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalMin" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalMin"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalMin"
        :max-length="maxlength"
        @onChange="onChange2"
        @onKeyPress="onKeyPress2"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { keepGetting, postJson, saveJson } from '@/service/api/home';
import { closeSocket, createSocket, guid } from '@/service/api/websocket';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';

const res1 = ref('0');
const res2 = ref('0');
const res3 = ref('0');
const finalSettingValue = ref('');
const finalMin = ref('');
const finalMax = ref('');
const coverShowModal = ref(false);
const coverShowModal1 = ref(false);
const coverShowModal2 = ref(false);
const switchStatus = ref(true);
const maxlength = ref(999);
const value = ref('');
const value1 = ref('');
const value2 = ref('');
const tagName = 'profileNitrogen';
const uuid = ref('');
const minValue = ref(0);
const maxValue = ref(0);
function clickOn() {
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
    console.log(coverShowModal.value);
  } else {
    coverShowModal.value = true;
    console.log(coverShowModal.value);
  }
  minValue.value = 10;
  maxValue.value = 2000;
  value.value = '';
}
function clickOn1() {
  if (coverShowModal1.value === true) {
    coverShowModal1.value = false;
    console.log(coverShowModal1.value);
  } else {
    coverShowModal1.value = true;
    console.log(coverShowModal1.value);
  }
  minValue.value = 20;
  maxValue.value = 9999;
  value1.value = '';
}
function clickOn2() {
  if (coverShowModal2.value === true) {
    coverShowModal2.value = false;
    console.log(coverShowModal2.value);
  } else {
    coverShowModal2.value = true;
    console.log(coverShowModal2.value);
  }
  minValue.value = 0;
  maxValue.value = 2000;
  value2.value = '';
}
async function onKeyPress() {
  if (Number(finalSettingValue.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalSettingValue.value) > Number(maxValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `大于设定最大值!`,
      duration: 3000
    });
  } else {
    window.$notification?.success({
      title: '保存成功',
      content: `保存成功!`,
      duration: 3000
    });
    const Param = {
      result: finalSettingValue.value,
      dataType: 'float',
      name: 'Application.HMI_N2Config.h_rN2_SV[1]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function onChange(e) {
  console.log('输入的数据', e);
  value.value = e;
  finalSettingValue.value = e;
}
async function onKeyPress1() {
  if (Number(finalMax.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalMax.value) > Number(maxValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `大于设定最大值!`,
      duration: 3000
    });
  } else {
    window.$notification?.success({
      title: '保存成功',
      content: `保存成功!`,
      duration: 3000
    });
    const Param = {
      result: finalMax.value,
      dataType: 'float',
      name: 'Application.HMI_N2Config.h_rN2_MaxLimit[1]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function onChange1(e) {
  console.log('输入的数据', e);
  value1.value = e;
  finalMax.value = e;
}
async function onKeyPress2() {
  if (Number(finalMin.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalMin.value) > Number(maxValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `大于设定最大值!`,
      duration: 3000
    });
  } else {
    window.$notification?.success({
      title: '保存成功',
      content: `保存成功!`,
      duration: 3000
    });
    const Param = {
      result: finalMin.value,
      dataType: 'float',
      name: 'Application.HMI_N2Config.h_rN2_MinLimit[1]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function onChange2(e) {
  console.log('输入的数据', e);
  value2.value = e;
  finalMin.value = e;
}
onMounted(async () => {
  uuid.value = guid(tagName);
  createSocket(uuid.value);
  window.addEventListener('onmessageWS', handleWsMsg);
  const param = {
    'Application.HMI_N2Config.h_xN2EnableSwitch[0]': 'boolean',
    'Application.HMI_N2Config.h_xN2valveSwitch[0]': 'boolean',
    'Application.HMI_N2Config.h_rN2_SV': 'floats',
    'Application.HMI_N2Config.h_rN2_PV': 'floats',
    'Application.HMI_N2Config.h_rN2_MaxLimit': 'floats',
    'Application.HMI_N2Config.h_rN2_MinLimit': 'floats'
  };
  keepGetting(tagName, param);
});

onBeforeUnmount(() => {
  closeSocket();
});

// 处理服务端websocket发送过来的消息
function handleWsMsg(e: any) {
  const data = JSON.parse(e.detail.data.data);
  if (data) {
    const {
      'Application.HMI_N2Config.h_xN2EnableSwitch[0]': enableSwitchValue,
      'Application.HMI_N2Config.h_rN2_SV': sValue,
      'Application.HMI_N2Config.h_rN2_MaxLimit': maxLimitValue,
      'Application.HMI_N2Config.h_rN2_MinLimit': minLimitValue
    } = data.result;
    if (sValue) {
      res1.value = sValue[1];
    }
    if (maxLimitValue) {
      res2.value = maxLimitValue[1];
    }
    if (minLimitValue) {
      res3.value = minLimitValue[1];
    }
    switchStatus.value = enableSwitchValue;
  }
}
async function changeValveSwitch() {
  const Param = {
    result: switchStatus.value,
    dataType: 'boolean',
    name: 'Application.HMI_N2Config.h_xN2EnableSwitch[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
</script>

<style scoped>
.parent-box {
  width: 80%;
  height: 400px;
  margin: 5% auto;
}
.single-card {
  height: 300px;
}
.input-head {
  width: 90px;
}
</style>
