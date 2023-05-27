<template>
  <div>
    <n-card title="N2" class="shadow-sm rounded-16px parent-box">
      <div>
        <n-grid :x-gap="12" :y-gap="8" :cols="3">
          <n-grid-item>
            <n-card class="shadow-sm rounded-16px single-card flex-y-center">
              <n-tag :bordered="false" type="info" style="margin-top: 40%">氮气启用状态</n-tag>
              <n-divider />
              <n-switch
                v-model:value="enableActive"
                size="large"
                style="margin-left: 25%"
                @update-value="changeEnableSwitch"
              />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="shadow-sm rounded-16px single-card"></n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="shadow-sm rounded-16px single-card">
              <n-space vertical style="margin-top: 10%">
                <span>智能阀控制</span>
                <n-switch v-model:value="intellectActive" size="large" @update-value="changeIntellectSwitch" />
              </n-space>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
      <div>
        <n-card class="shadow-sm rounded-16px" style="margin-top: 10px">
          <div>
            <n-grid :x-gap="12" :y-gap="8" :cols="3">
              <n-grid-item>
                <div class="flex-col-center">
                  <span>设定值</span>
                </div>
                <div style="margin-top: 5%">
                  <n-button type="primary" strong secondary style="width: 40%; margin-left: 30%" @click="clickOn">{{
                    settingValue
                  }}</n-button>
                  <span style="margin-left: 5px">ppm</span>
                </div>
                <div style="margin-top: 5%" class="flex-col-center">
                  <p>氧气</p>
                </div>
                <div class="flex-col-center">
                  <n-button type="tertiary" style="width: 40%" strong secondary>{{ actualNValue }}</n-button>
                </div>
              </n-grid-item>
              <n-grid-item>
                <n-select v-model:value="value1" size="medium" :options="options" style="width: 80%"> </n-select>
                <div>
                  <n-input-group style="margin-top: 10%">
                    <n-button type="primary" class="input-head"> 警报上线 </n-button>
                    <n-input
                      v-model:value="alarmOnline"
                      :style="{ width: '40%' }"
                      :input-props="{ onclick: clickOn1 }"
                    ></n-input>
                  </n-input-group>
                </div>
                <div>
                  <n-input-group style="margin-top: 10%">
                    <n-button type="primary" class="input-head"> 警报下线 </n-button>
                    <n-input
                      v-model:value="alarmOffline"
                      :style="{ width: '40%' }"
                      :input-props="{ onclick: clickOn2 }"
                    ></n-input>
                  </n-input-group>
                </div>
              </n-grid-item>
              <n-grid-item>
                <div class="flex-y-center">
                  <n-space vertical>
                    <span>氮气进气阀</span>
                    <n-switch v-model:value="valveActive" size="large" @update-value="changeValveSwitch" />
                    <span>报警功能启用状态</span>
                    <n-switch v-model:value="statusActive" size="large" @update-value="changeStatusSwitch" />
                  </n-space>
                </div>
              </n-grid-item>
            </n-grid>
          </div>
        </n-card>
      </div>
    </n-card>
    <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalValue" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalValue"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalValue"
        :max-length="maxlength"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModal1" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalAlarmOnline" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalAlarmOnline"
        :keyboard-class="keyboardClass"
        :input="finalAlarmOnline"
        :max-length="maxlength"
        :min-value="minValue"
        :max-value="maxValue"
        @onChange="onChange1"
        @onKeyPress="onKeyPress1"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModal2" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalAlarmOffline" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalAlarmOffline"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalAlarmOffline"
        :max-length="maxlength"
        @onChange="onChange2"
        @onKeyPress="onKeyPress2"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { keepGetting, postJson, saveJson } from '@/service/api/home';
import { closeSocket, createSocket, guid } from '@/service/api/websocket';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
const active = ref(true);
const enableActive = ref(true);
const valveActive = ref(true);
const intellectActive = ref(true);
const statusActive = ref(true);
const settingValue = ref('0');
const finalValue = ref('');
const oxygenValue = ref('0');
const actualNValue = ref('0');
const coverShowModal = ref(false);
const coverShowModal1 = ref(false);
const coverShowModal2 = ref(false);
const alarmOnline = ref('0');
const finalAlarmOnline = ref('');
const alarmOffline = ref('0');
const finalAlarmOffline = ref('');
const sValueArray = ref([]);
const pValueArray = ref([]);
const maxLimitValueArray = ref([]);
const minLimitValueArray = ref([]);
const value1 = ref(3);
const maxlength = ref(999);
const minValue = ref(0);
const maxValue = ref(0);
const tagName = 'nitrogenNavigation';
const uuid = ref('');
const options = [
  {
    label: '预热区',
    value: 1
  },
  {
    label: '高温区第一区',
    value: 2
  },
  {
    label: '高温区第四区',
    value: 3
  },
  {
    label: '冷却区',
    value: 4
  }
];
function clickOn() {
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
  } else {
    coverShowModal.value = true;
  }
  finalValue.value = '';
  minValue.value = 10;
  maxValue.value = 2000;
}

async function onKeyPress() {
  if (Number(finalValue.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalValue.value) > Number(maxValue.value)) {
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
      result: Number(finalValue.value) / 10000,
      dataType: 'float',
      name: `Application.HMI_N2Config.h_rO2_SV[0]`
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
function onChange(e) {
  finalValue.value = e;
}

async function onKeyPress1() {
  if (Number(finalAlarmOnline.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalAlarmOnline.value) > Number(maxValue.value)) {
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
      result: finalAlarmOnline.value,
      dataType: 'float',
      name: `Application.HMI_N2Config.h_rN2_MaxLimit[${value1.value - 1}]`
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
function onChange1(e) {
  finalAlarmOnline.value = e;
}

async function onKeyPress2() {
  if (Number(finalAlarmOffline.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalAlarmOffline.value) > Number(maxValue.value)) {
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
      result: finalAlarmOffline.value,
      dataType: 'float',
      name: `Application.HMI_N2Config.h_rN2_MinLimit[${value1.value - 1}]`
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
function onChange2(e) {
  finalAlarmOffline.value = e;
}

function clickOn1() {
  if (coverShowModal1.value === true) {
    coverShowModal1.value = false;
  } else {
    coverShowModal1.value = true;
  }
  finalAlarmOnline.value = '';
  minValue.value = 20;
  maxValue.value = 9999;
}

function clickOn2() {
  if (coverShowModal2.value === true) {
    coverShowModal2.value = false;
  } else {
    coverShowModal2.value = true;
  }
  finalAlarmOffline.value = '';
  minValue.value = 0;
  maxValue.value = 2000;
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
    'Application.HMI_N2Config.h_rN2_MinLimit': 'floats',
    'Application.HMI_N2Config.h_xAutoValveControlSwitch': 'boolean',
    'Application.HMI_N2Config.h_xN2_AlarmEnableSwitch': 'boolean',
    'Application.HMI_N2Config.h_rO2_PV[0]': 'float',
    'Application.HMI_N2Config.h_rO2_SV[0]': 'float'
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
      'Application.HMI_N2Config.h_xN2valveSwitch[0]': valveSwitchValue,
      'Application.HMI_N2Config.h_rN2_SV': sValue,
      'Application.HMI_N2Config.h_rN2_PV': pValue,
      'Application.HMI_N2Config.h_rN2_MaxLimit': maxLimitValue,
      'Application.HMI_N2Config.h_rN2_MinLimit': minLimitValue,
      'Application.HMI_N2Config.h_xAutoValveControlSwitch': autoValveControlSwitchValue,
      'Application.HMI_N2Config.h_xN2_AlarmEnableSwitch': alarmEnableSwitchValue,
      'Application.HMI_N2Config.h_rO2_PV[0]': NValue,
      'Application.HMI_N2Config.h_rO2_SV[0]': NSettingValue
    } = data.result;
    sValueArray.value = sValue;
    pValueArray.value = pValue;
    if (NValue) {
      if (Number(NValue) < 1) {
        const value = Number(NValue) * 10000;
        actualNValue.value = value.toFixed(2);
      } else {
        actualNValue.value = `${Number(NValue).toFixed(2)}%`;
      }
    }
    maxLimitValueArray.value = maxLimitValue;
    minLimitValueArray.value = minLimitValue;
    if (NSettingValue) {
      const value = Number(NSettingValue) * 10000;
      settingValue.value = value.toFixed(2);
    }
    if (pValue) {
      oxygenValue.value = pValue[value1.value - 1];
    }
    if (maxLimitValue) {
      alarmOnline.value = maxLimitValue[value1.value - 1];
    }
    if (minLimitValue) {
      alarmOffline.value = minLimitValue[value1.value - 1];
    }
    enableActive.value = enableSwitchValue;
    valveActive.value = valveSwitchValue;
    intellectActive.value = autoValveControlSwitchValue;
    statusActive.value = alarmEnableSwitchValue;
  }
}
async function changeEnableSwitch() {
  const Param = {
    result: enableActive.value,
    dataType: 'boolean',
    name: 'Application.HMI_N2Config.h_xN2EnableSwitch[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}

async function changeValveSwitch() {
  const Param = {
    result: valveActive.value,
    dataType: 'boolean',
    name: 'Application.HMI_N2Config.h_xN2valveSwitch[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeStatusSwitch() {
  const Param = {
    result: statusActive.value,
    dataType: 'boolean',
    name: 'Application.HMI_N2Config.h_xN2_AlarmEnableSwitch'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}

async function changeIntellectSwitch() {
  const Param = {
    result: intellectActive.value,
    dataType: 'boolean',
    name: 'Application.HMI_N2Config.h_xAutoValveControlSwitch'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
watch(value1, newValue => {
  alarmOnline.value = maxLimitValueArray.value[newValue - 1];
  alarmOffline.value = minLimitValueArray.value[newValue - 1];
});
</script>

<style scoped>
.parent-box {
  width: 80%;
  height: 700px;
  margin: 1% auto;
}
.single-card {
  height: 300px;
}
.input-head {
  width: 90px;
}
</style>
