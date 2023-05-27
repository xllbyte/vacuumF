<template>
  <div>
    <n-card class="shadow-sm rounded-16px parent-box">
      <n-grid x-gap="12" :cols="4">
        <n-gi>
          <n-card class="shadow-sm rounded-16px single-card flex-y-center">
            <n-tag :bordered="false" type="info" style="margin-top: 40%">真空启用状态</n-tag>
            <n-divider />
            <n-switch
              v-model:value="mainSwitch"
              size="large"
              style="margin-left: 25%"
              @update-value="changeValveSwitch"
            />
            <n-space vertical style="margin-top: 50px">
              <n-select v-model:value="vacuumMode" :options="options" />
            </n-space>
          </n-card>
        </n-gi>
        <n-gi span="3">
          <n-card class="single-card">
            <div v-if="vacuumMode === 1">
              <n-grid :x-gap="50" :y-gap="50" :cols="3" style="margin-top: 5%">
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head"> 真空设定值 </n-button>
                    <n-input
                      v-model:value="VacuumPressureValue"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickOn3 }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head"> 保持真空时间 </n-button>
                    <n-input
                      v-model:value="VacuumHoldingTime"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickOn1 }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head"> 抽真空时间 </n-button>
                    <n-input
                      v-model:value="VacuumPumpingTime"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickOn }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head"> 充气回压时间 </n-button>
                    <n-input
                      v-model:value="InflationBackPressureTime"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickOn2 }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head"> 产品长度值 </n-button>
                    <n-input
                      v-model:value="productLength"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickOn4 }"
                    />
                  </n-input-group>
                </n-gi>
              </n-grid>
            </div>
            <div v-if="vacuumMode === 2">
              <div v-for="(item, i) in vacuumModel2s" :key="i">
                <n-grid :x-gap="50" :y-gap="10" :cols="4" style="margin-top: 2%">
                  <n-gi>
                    <n-input-group>
                      <n-button type="primary" class="input-head"> 真空设定值 </n-button>
                      <n-input
                        v-model:value="vacuumMode2SV[i]"
                        :style="{ width: '80%' }"
                        :input-props="{ onClick: () => clickOnModel2SV(i) }"
                      />
                    </n-input-group>
                  </n-gi>
                  <n-gi>
                    <n-input-group>
                      <n-button type="primary" class="input-head"> 保持真空时间 </n-button>
                      <n-input
                        v-model:value="vacuumMode2HoldingTime[i]"
                        :style="{ width: '80%' }"
                        :input-props="{ onClick: () => clickOnModel2Holding(i) }"
                      />
                    </n-input-group>
                  </n-gi>
                  <n-gi>
                    <n-input-group>
                      <n-button type="primary" class="input-head">抽到时间 </n-button>
                      <n-input
                        v-model:value="vacuumMode2DuringTime[i]"
                        :style="{ width: '80%' }"
                        :input-props="{ onClick: () => clickOnModel2During(i) }"
                      />
                    </n-input-group>
                  </n-gi>
                  <n-gi v-if="i == 0">
                    <n-input-group>
                      <n-button type="primary" class="input-head">回压时间 </n-button>
                      <n-input
                        v-model:value="vacuumMode2RebackTime[i]"
                        :style="{ width: '80%' }"
                        :input-props="{ onClick: () => clickOnModel2Reback(i) }"
                      />
                    </n-input-group>
                  </n-gi>
                </n-grid>
              </div>
            </div>
            <div v-if="vacuumMode === 3">
              <n-grid :x-gap="50" :y-gap="50" :cols="3" style="margin-top: 5%">
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head-large">重复次数设定</n-button>
                    <n-input
                      v-model:value="vacuumMode3SetTimes"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickSetTimes }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head-large">第一次真空设定值</n-button>
                    <n-input
                      v-model:value="vacuumMode3SV[0]"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickModelSVOne }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head-large">第二次真空设定值</n-button>
                    <n-input
                      v-model:value="vacuumMode3SV[1]"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickModelSVTwo }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head-large"> 真空保持时间 </n-button>
                    <n-input
                      v-model:value="vacuumMode3HoldingTime"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickModel3Holding }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head-large"> 抽到真空时间 </n-button>
                    <n-input
                      v-model:value="vacuumMode3DuringTime"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickOnModel3During }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi>
                  <n-input-group>
                    <n-button type="primary" class="input-head-large"> 回压规定时间 </n-button>
                    <n-input
                      v-model:value="vacuumMode3RebackTime"
                      :style="{ width: '80%' }"
                      :input-props="{ onclick: clickOnModel3Reback }"
                    />
                  </n-input-group>
                </n-gi>
                <n-gi></n-gi>
              </n-grid>
            </div>
          </n-card>
        </n-gi>
      </n-grid>
    </n-card>
    <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumPumpingTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumPumpingTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuumPumpingTime"
        :max-length="maxlength"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModal1" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumHoldingTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumHoldingTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuumHoldingTime"
        :max-length="maxlength"
        @onChange="onChange1"
        @onKeyPress="onKeyPress1"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModal2" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalInflationBackPressureTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalInflationBackPressureTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalInflationBackPressureTime"
        :max-length="maxlength"
        @onChange="onChange2"
        @onKeyPress="onKeyPress2"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModal3" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalVacuumPressureValue" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalVacuumPressureValue"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalVacuumPressureValue"
        :max-length="maxlength"
        @onChange="onChange3"
        @onKeyPress="onKeyPress3"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModal4" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalProductLength" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalProductLength"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalProductLength"
        :max-length="maxlength"
        @onChange="onChange4"
        @onKeyPress="onKeyPress4"
      />
    </n-modal>
    <n-modal v-model:show="coverShowModalMol2SV" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="finalModel2SV" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel2SV"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel2SV"
        :max-length="maxlength"
        @onChange="onChange5"
        @onKeyPress="onKeyPress5"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol2HoldingTime"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel2HoldingTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel2HoldingTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel2HoldingTime"
        :max-length="maxlength"
        @onChange="onChange6"
        @onKeyPress="onKeyPress6"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol2DuringTime"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel2DuringTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel2DuringTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel2DuringTime"
        :max-length="maxlength"
        @onChange="onChange7"
        @onKeyPress="onKeyPress7"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol2RebackTime"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel2RebackTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel2RebackTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel2RebackTime"
        :max-length="maxlength"
        @onChange="onChange8"
        @onKeyPress="onKeyPress8"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol3SetTimes"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel3SetTimes" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel3SetTimes"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel3SetTimes"
        :max-length="maxlength"
        @onChange="onChange9"
        @onKeyPress="onKeyPress9"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol3SetValueOne"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel3SettingValueOne" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel3SettingValueOne"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel3SettingValueOne"
        :max-length="maxlength"
        @onChange="onChange10"
        @onKeyPress="onKeyPress10"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol3SetValueTwo"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel3SettingValueTwo" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel3SettingValueTwo"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel3SettingValueTwo"
        :max-length="maxlength"
        @onChange="onChange11"
        @onKeyPress="onKeyPress11"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol3HoldingTime"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel3HoldingTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel3HoldingTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel3HoldingTime"
        :max-length="maxlength"
        @onChange="onChange12"
        @onKeyPress="onKeyPress12"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol3DuringTime"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel3DuringTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel3DuringTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel3DuringTime"
        :max-length="maxlength"
        @onChange="onChange13"
        @onKeyPress="onKeyPress13"
      />
    </n-modal>
    <n-modal
      v-model:show="coverShowModalMol3RebackTime"
      class="rounded-10px"
      preset="card"
      title="请输入"
      style="width: 800px"
    >
      <n-input v-model:value="finalModel3RebackTime" type="textarea" placeholder="请输入" />
      <key-board-heat
        :ref="finalModel3RebackTime"
        :min-value="minValue"
        :max-value="maxValue"
        :keyboard-class="keyboardClass"
        :input="finalModel3RebackTime"
        :max-length="maxlength"
        @onChange="onChange14"
        @onKeyPress="onKeyPress14"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { keepGetting, saveJson } from '@/service/api/home';
import { closeSocket, createSocket, guid } from '@/service/api/websocket';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
const mainSwitch = ref(true);
const coverShowModal = ref(false);
const coverShowModal1 = ref(false);
const coverShowModal2 = ref(false);
const coverShowModal3 = ref(false);
const coverShowModal4 = ref(false);
const coverShowModalMol2SV = ref(false);
const coverShowModalMol2HoldingTime = ref(false);
const coverShowModalMol2DuringTime = ref(false);
const coverShowModalMol2RebackTime = ref(false);
const coverShowModalMol3SetTimes = ref(false);
const coverShowModalMol3SetValueOne = ref(false);
const coverShowModalMol3SetValueTwo = ref(false);
const coverShowModalMol3HoldingTime = ref(false);
const coverShowModalMol3DuringTime = ref(false);
const coverShowModalMol3RebackTime = ref(false);
const VacuumPumpingTime = ref('23');
const finalVacuumPumpingTime = ref('');
const VacuumHoldingTime = ref('23');
const finalVacuumHoldingTime = ref('');
const InflationBackPressureTime = ref('23');
const finalInflationBackPressureTime = ref('');
const VacuumPressureValue = ref('23');
const finalVacuumPressureValue = ref('');
const productLength = ref('0');
const finalProductLength = ref('');
const finalModel2SV = ref('');
const finalModel2HoldingTime = ref('');
const finalModel2DuringTime = ref('');
const finalModel2RebackTime = ref('');
const finalModel3SetTimes = ref('');
const finalModel3SettingValueOne = ref('');
const finalModel3SettingValueTwo = ref('');
const finalModel3HoldingTime = ref('');
const finalModel3DuringTime = ref('');
const finalModel3RebackTime = ref('');
const vacuumMode3SetTimes = ref(0);
const vacuumMode3SV = ref([]);
const vacuumMode3HoldingTime = ref('');
const vacuumMode3DuringTime = ref('');
const vacuumMode3RebackTime = ref('');
const maxlength = ref(999);
const vacuumMode = ref(0);
const tagName = 'profileVacuum';
const uuid = ref('');
const minValue = ref(0);
const maxValue = ref(0);
const vacuumMode2HoldingTime = ref([0, 0, 0, 0]);
const vacuumMode2SV = ref([0, 0, 0, 0]);
const vacuumMode2DuringTime = ref([0, 0, 0, 0]);
const vacuumMode2RebackTime = ref([0, 0, 0, 0]);
const currentIndex = ref(0);
const showStatus = ref(0);
interface vacuumModel2 {
  id: number;
  name: string;
}
const vacuumModel2s: vacuumModel2[] = reactive([
  {
    id: 1,
    name: 'num1'
  },
  {
    id: 2,
    name: 'num2'
  },
  {
    id: 3,
    name: 'num3'
  }
]);
function clickOn() {
  console.log(11);
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
  } else {
    coverShowModal.value = true;
  }
  minValue.value = 5;
  maxValue.value = 99;
  finalVacuumPumpingTime.value = '';
}
function clickOn1() {
  if (coverShowModal1.value === true) {
    coverShowModal1.value = false;
  } else {
    coverShowModal1.value = true;
  }
  minValue.value = 5;
  maxValue.value = 99;
  finalVacuumHoldingTime.value = '';
}
function clickOn2() {
  if (coverShowModal2.value === true) {
    coverShowModal2.value = false;
  } else {
    coverShowModal2.value = true;
  }
  minValue.value = 5;
  maxValue.value = 99;
  finalInflationBackPressureTime.value = '';
}
function clickOn3() {
  if (coverShowModal3.value === true) {
    coverShowModal3.value = false;
  } else {
    coverShowModal3.value = true;
  }
  minValue.value = 2;
  maxValue.value = 1000;
  finalVacuumPressureValue.value = '';
}
function clickOn4() {
  if (coverShowModal4.value === true) {
    coverShowModal4.value = false;
  } else {
    coverShowModal4.value = true;
  }
  minValue.value = 100;
  maxValue.value = 320;
  finalProductLength.value = '';
}
function clickOnModel2SV(index) {
  currentIndex.value = index;
  if (coverShowModalMol2SV.value === true) {
    coverShowModalMol2SV.value = false;
  } else {
    coverShowModalMol2SV.value = true;
  }
  minValue.value = 2;
  maxValue.value = 1000;
  finalModel2SV.value = '';
}
function clickOnModel2Holding(index) {
  currentIndex.value = index;
  if (coverShowModalMol2HoldingTime.value === true) {
    coverShowModalMol2HoldingTime.value = false;
  } else {
    coverShowModalMol2HoldingTime.value = true;
  }
  minValue.value = 1;
  maxValue.value = 99;
  finalModel2HoldingTime.value = '';
}
function clickOnModel2During(index) {
  currentIndex.value = index;
  if (coverShowModalMol2DuringTime.value === true) {
    coverShowModalMol2DuringTime.value = false;
  } else {
    coverShowModalMol2DuringTime.value = true;
  }
  minValue.value = 1;
  maxValue.value = 99;
  finalModel2DuringTime.value = '';
}
function clickOnModel2Reback(index) {
  currentIndex.value = 0;
  if (coverShowModalMol2RebackTime.value === true) {
    coverShowModalMol2RebackTime.value = false;
  } else {
    coverShowModalMol2RebackTime.value = true;
  }
  minValue.value = 1;
  maxValue.value = 99;
  finalModel2RebackTime.value = '';
}
function clickSetTimes() {
  if (coverShowModalMol3SetTimes.value === true) {
    coverShowModalMol3SetTimes.value = false;
  } else {
    coverShowModalMol3SetTimes.value = true;
  }
  minValue.value = 1;
  maxValue.value = 5;
  finalModel3SetTimes.value = '';
}
function clickModelSVOne() {
  if (coverShowModalMol3SetValueOne.value === true) {
    coverShowModalMol3SetValueOne.value = false;
  } else {
    coverShowModalMol3SetValueOne.value = true;
  }
  minValue.value = 2;
  maxValue.value = 1000;
  finalModel3SettingValueOne.value = '';
}
function clickModelSVTwo() {
  if (coverShowModalMol3SetValueTwo.value === true) {
    coverShowModalMol3SetValueTwo.value = false;
  } else {
    coverShowModalMol3SetValueTwo.value = true;
  }
  minValue.value = 2;
  maxValue.value = 1000;
  finalModel3SettingValueTwo.value = '';
}
function clickModel3Holding() {
  if (coverShowModalMol3HoldingTime.value === true) {
    coverShowModalMol3HoldingTime.value = false;
  } else {
    coverShowModalMol3HoldingTime.value = true;
  }
  minValue.value = 1;
  maxValue.value = 99;
  finalModel3HoldingTime.value = '';
}
function clickOnModel3During() {
  if (coverShowModalMol3DuringTime.value === true) {
    coverShowModalMol3DuringTime.value = false;
  } else {
    coverShowModalMol3DuringTime.value = true;
  }
  minValue.value = 1;
  maxValue.value = 99;
  finalModel3DuringTime.value = '';
}
function clickOnModel3Reback() {
  if (coverShowModalMol3RebackTime.value === true) {
    coverShowModalMol3RebackTime.value = false;
  } else {
    coverShowModalMol3RebackTime.value = true;
  }
  minValue.value = 1;
  maxValue.value = 99;
  finalModel3RebackTime.value = '';
}
async function onKeyPress() {
  if (Number(finalVacuumPumpingTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumPumpingTime.value) > Number(maxValue.value)) {
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
      result: Number(finalVacuumPumpingTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode1DuringTime[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function onChange(e) {
  finalVacuumPumpingTime.value = e;
}
async function onKeyPress1() {
  if (Number(finalVacuumHoldingTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumHoldingTime.value) > Number(maxValue.value)) {
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
      result: Number(finalVacuumHoldingTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode1HoldingTime[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function onChange1(e) {
  finalVacuumHoldingTime.value = e;
}
async function onKeyPress2() {
  if (Number(finalInflationBackPressureTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalInflationBackPressureTime.value) > Number(maxValue.value)) {
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
      result: Number(finalInflationBackPressureTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode1RebackTime[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function onChange2(e) {
  finalInflationBackPressureTime.value = e;
}
async function onKeyPress3() {
  if (Number(finalVacuumPressureValue.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalVacuumPressureValue.value) > Number(maxValue.value)) {
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
      result: finalVacuumPressureValue.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function onChange3(e) {
  finalVacuumPressureValue.value = e;
}
async function onKeyPress4() {
  if (Number(finalProductLength.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalProductLength.value) > Number(maxValue.value)) {
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
      result: finalProductLength.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rProductLengthSetting'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress5() {
  if (Number(finalModel2SV.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel2SV.value) > Number(maxValue.value)) {
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
      result: finalModel2SV.value,
      dataType: 'float',
      name: `Application.HMI_VacuumConfig.h_rVacuumMode2SV` + `[${currentIndex.value}]`
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress6() {
  if (Number(finalModel2HoldingTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel2HoldingTime.value) > Number(maxValue.value)) {
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
      result: Number(finalModel2HoldingTime.value) * 1000,
      dataType: 'float',
      name: `Application.HMI_VacuumConfig.h_rVacuumMode2HoldingTime` + `[${currentIndex.value}]`
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress7() {
  if (Number(finalModel2DuringTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel2DuringTime.value) > Number(maxValue.value)) {
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
      result: Number(finalModel2DuringTime.value) * 1000,
      dataType: 'float',
      name: `Application.HMI_VacuumConfig.h_rVacuumMode2DuringTime` + `[${currentIndex.value}]`
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress8() {
  if (Number(finalModel2RebackTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel2RebackTime.value) > Number(maxValue.value)) {
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
      result: Number(finalModel2RebackTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode2RebackTime[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress9() {
  if (Number(finalModel3SetTimes.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel3SetTimes.value) > Number(maxValue.value)) {
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
      result: finalModel3SetTimes.value,
      dataType: 'short',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode3SetTimes'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress10() {
  if (Number(finalModel3SettingValueOne.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel3SettingValueOne.value) > Number(maxValue.value)) {
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
      result: finalModel3SettingValueOne.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode3SV[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress11() {
  if (finalModel3SettingValueTwo.value > vacuumMode3SV.value[0]) {
    if (Number(finalModel3SettingValueTwo.value) < Number(minValue.value)) {
      window.$notification?.error({
        title: '保存失败',
        content: `小于设定最小值!`,
        duration: 3000
      });
    } else if (Number(finalModel3SettingValueTwo.value) > Number(maxValue.value)) {
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
        result: finalModel3SettingValueTwo.value,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode3SV[1]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  } else {
    window.$notification?.error({
      title: '保存失败',
      content: `第二次设定值需要大于第一次设定值`,
      duration: 3000
    });
  }
}
async function onKeyPress12() {
  if (Number(finalModel3HoldingTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel3HoldingTime.value) > Number(maxValue.value)) {
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
      result: Number(finalModel3HoldingTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode3HoldingTime[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress13() {
  if (Number(finalModel3DuringTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel3DuringTime.value) > Number(maxValue.value)) {
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
      result: Number(finalModel3DuringTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode3DuringTime[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPress14() {
  if (Number(finalModel3RebackTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalModel3RebackTime.value) > Number(maxValue.value)) {
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
      result: Number(finalModel3RebackTime.value) * 1000,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumMode3RebackTime[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
function onChange4(e) {
  finalProductLength.value = e;
}
function onChange5(e) {
  finalModel2SV.value = e;
}
function onChange6(e) {
  finalModel2HoldingTime.value = e;
}
function onChange7(e) {
  finalModel2DuringTime.value = e;
}
function onChange8(e) {
  finalModel2RebackTime.value = e;
}
function onChange9(e) {
  finalModel3SetTimes.value = e;
}
function onChange10(e) {
  finalModel3SettingValueOne.value = e;
}
function onChange11(e) {
  finalModel3SettingValueTwo.value = e;
}
function onChange12(e) {
  finalModel3HoldingTime.value = e;
}
function onChange13(e) {
  finalModel3DuringTime.value = e;
}
function onChange14(e) {
  finalModel3RebackTime.value = e;
}
const options = [
  {
    label: '请选择抽真空的模式',
    value: 0,
    disabled: true
  },
  {
    label: '一步真空模式',
    value: 1
  },
  {
    label: '分布真空模式',
    value: 2
  },
  {
    label: '重复真空模式',
    value: 3
  }
];
onMounted(async () => {
  uuid.value = guid(tagName);
  createSocket(uuid.value);
  window.addEventListener('onmessageWS', handleWsMsg);
  const param = {
    'Application.HMI_VacuumConfig.h_xVacuumMainSwitch': 'boolean',
    'Application.HMI_VacuumConfig.h_rBoardInVacuumZoneTime': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumPV': 'float',
    'Application.HMI_VacuumConfig.h_rProductLengthSetting': 'float',
    'Application.HMI_VacuumConfig.h_iVacuumMode': 'short',
    'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode1HoldingTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode1DuringTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode1RebackTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2HoldingTime': 'floats',
    'Application.HMI_VacuumConfig.h_rVacuumMode2SV': 'floats',
    'Application.HMI_VacuumConfig.h_rVacuumMode2DuringTime': 'floats',
    'Application.HMI_VacuumConfig.h_rVacuumMode2RebackTime': 'floats',
    'Application.HMI_VacuumConfig.h_rVacuumMode3SetTimes': 'short',
    'Application.HMI_VacuumConfig.h_rVacuumMode3SV': 'floats',
    'Application.HMI_VacuumConfig.h_rVacuumMode3HoldingTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3DuringTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3RebackTime[0]': 'float'
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
      'Application.HMI_VacuumConfig.h_xVacuumMainSwitch': mainSwitchValue,
      'Application.HMI_VacuumConfig.h_rBoardInVacuumZoneTime': vacuumZoneTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumPV': sValue,
      'Application.HMI_VacuumConfig.h_rProductLengthSetting': lengthSettingValue,
      'Application.HMI_VacuumConfig.h_iVacuumMode': vacuumModeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]': vacuumMode1SVValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1HoldingTime[0]': vacuumMode1HoldingTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1DuringTime[0]': vacuumMode1DuringTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1RebackTime[0]': vacuumMode1RebackTime,
      'Application.HMI_VacuumConfig.h_rVacuumMode2HoldingTime': vacuumMode2HoldingTimeArray,
      'Application.HMI_VacuumConfig.h_rVacuumMode2SV': vacuumMode2SVArray,
      'Application.HMI_VacuumConfig.h_rVacuumMode2DuringTime': vacuumMode2DuringTimeArray,
      'Application.HMI_VacuumConfig.h_rVacuumMode2RebackTime': vacuumMode2RebackTimeArray,
      'Application.HMI_VacuumConfig.h_rVacuumMode3SetTimes': vacuumMode3SetTimesValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3SV': vacuumMode3SVArray,
      'Application.HMI_VacuumConfig.h_rVacuumMode3HoldingTime[0]': vacuumMode3HoldingTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3DuringTime[0]': vacuumMode3DuringTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3RebackTime[0]': vacuumMode3RebackTimeValue
    } = data.result;
    mainSwitch.value = mainSwitchValue;
    VacuumPressureValue.value = vacuumMode1SVValue;
    if (vacuumMode1DuringTimeValue && vacuumMode1HoldingTimeValue && vacuumMode1RebackTime) {
      VacuumPumpingTime.value = Number(vacuumMode1DuringTimeValue) / 1000;
      VacuumHoldingTime.value = Number(vacuumMode1HoldingTimeValue) / 1000;
      InflationBackPressureTime.value = Number(vacuumMode1RebackTime) / 1000;
    }
    productLength.value = lengthSettingValue;
    vacuumMode.value = vacuumModeValue;
    vacuumMode3SetTimes.value = vacuumMode3SetTimesValue;
    vacuumMode3SV.value = vacuumMode3SVArray;
    if (vacuumMode3HoldingTimeValue && vacuumMode3DuringTimeValue && vacuumMode3RebackTimeValue) {
      vacuumMode3HoldingTime.value = Number(vacuumMode3HoldingTimeValue) / 1000;
      vacuumMode3DuringTime.value = Number(vacuumMode3DuringTimeValue) / 1000;
      vacuumMode3RebackTime.value = Number(vacuumMode3RebackTimeValue) / 1000;
    }
    if (vacuumMode2SVArray && vacuumMode2HoldingTimeArray && vacuumMode2DuringTimeArray && vacuumMode2RebackTimeArray) {
      vacuumMode2SV.value = vacuumMode2SVArray;
      vacuumMode2HoldingTime.value = vacuumMode2HoldingTimeArray;
      vacuumMode2DuringTime.value = vacuumMode2DuringTimeArray;
      vacuumMode2RebackTime.value = vacuumMode2RebackTimeArray;
    }
    for (let i = 0; i < vacuumMode2HoldingTime.value.length; i++) {
      vacuumMode2HoldingTime.value[i] = Number(vacuumMode2HoldingTime.value[i]) / 1000;
    }
    for (let i = 0; i < vacuumMode2DuringTime.value.length; i++) {
      vacuumMode2DuringTime.value[i] = Number(vacuumMode2DuringTime.value[i]) / 1000;
    }
    for (let i = 0; i < vacuumMode2RebackTime.value.length; i++) {
      vacuumMode2RebackTime.value[i] = Number(vacuumMode2RebackTime.value[i]) / 1000;
    }
  }
}
async function changeValveSwitch() {
  const Param = {
    result: mainSwitch.value,
    dataType: 'boolean',
    name: 'Application.HMI_VacuumConfig.h_xVacuumMainSwitch'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
watch(vacuumMode, newValue => {
  console.log(newValue);
  const Param = {
    result: newValue,
    dataType: 'short',
    name: 'Application.HMI_VacuumConfig.h_iVacuumMode'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
});
</script>

<style scoped>
.parent-box {
  width: 90%;
  height: 800px;
  margin: 1% auto;
}
.single-card {
  height: 700px;
}
.input-head {
  width: 110px;
}
.input-head-large {
  width: 130px;
}
</style>
