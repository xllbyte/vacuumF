<template>
  <div>
    <n-space>
      <div v-for="(stoveItem, i) in stoveConfigList" :key="i">
        <!-- 顶部炉温配置 -->
        <n-card
          :title="stoveItem.name"
          class="rounded-16px shadow-sm stove-panel"
          :start-color="['#ec4786', '#b955a4']"
        >
          <n-space vertical>
            <n-input-group>
              <n-button size="small">
                <icon-mingcute-fan-fill class="text-24px text-green" />
              </n-button>
              <n-input v-model:value="upperFanArray[i]" size="small" :input-props="{ onClick: () => clickOnTop(i) }">
                <template #suffix></template>
              </n-input>
            </n-input-group>
            <n-input-group>
              <n-button type="primary" size="small">
                <icon-ep-set-up class="text-24px" />
              </n-button>
              <n-input
                v-model:value="settingTemperatureArray[i]"
                size="small"
                :input-props="{ onClick: () => clickOn(i) }"
              >
                <template #suffix> ℃ </template>
              </n-input>
            </n-input-group>
            <n-input-group>
              <n-button size="small">
                <icon-ep-set-up class="text-24px" />
              </n-button>
              <n-input v-model:value="actualTemperatureArray[i]" size="small">
                <template #suffix> ℃ </template>
              </n-input>
            </n-input-group>
            <!-- 温度对比 -->
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-switch
                  v-model:value="topSwitch[i]"
                  :round="false"
                  style="margin-top: 35px"
                  @update-value="changeTopSwitch(i)"
                />
              </n-gi>
              <n-gi span="3">
                <div style="transform: rotate(270deg); margin-left: 20px">
                  <n-progress
                    type="line"
                    status="info"
                    :percentage="getHeatProgress(settingTemperatureArray[i])"
                    :show-indicator="false"
                    :height="20"
                    style="width: 90px; margin-top: 25px"
                  />
                  <n-progress
                    type="line"
                    color="darkseagreen"
                    :percentage="getHeatProgress(actualTemperatureArray[i])"
                    :show-indicator="false"
                    :height="20"
                    style="width: 90px; margin-top: 20px"
                  />
                </div>
              </n-gi>
            </n-grid>
          </n-space>
        </n-card>
        <!-- 底部炉温配置 -->
        <n-card v-if="i <= 6" class="rounded-16px shadow-sm stove-panel">
          <n-space vertical>
            <!-- 温度对比 -->
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-switch
                  v-model:value="bottomSwitch[i]"
                  :round="false"
                  style="margin-top: 25px"
                  @update-value="changeBottomSwitch(i)"
                />
              </n-gi>
              <n-gi span="3">
                <div style="transform: rotate(270deg); margin-left: 20px">
                  <n-progress
                    type="line"
                    status="info"
                    :percentage="getHeatProgress(settingTemperatureArrayDown[i])"
                    :show-indicator="false"
                    :height="20"
                    style="width: 90px; margin-top: 15px"
                  />
                  <n-progress
                    type="line"
                    color="darkseagreen"
                    :percentage="getHeatProgress(actualTemperatureArrayDown[i])"
                    :show-indicator="false"
                    :height="20"
                    style="width: 90px; margin-top: 20px"
                  />
                </div>
              </n-gi>
            </n-grid>
            <n-input-group style="margin-top: 10px">
              <n-button size="small">
                <icon-mingcute-fan-fill class="text-24px text-green" />
              </n-button>
              <n-input v-model:value="lowerFanArray[i]" size="small" :input-props="{ onClick: () => clickOnBottom(i) }">
                <template #suffix></template>
              </n-input>
            </n-input-group>
            <n-input-group>
              <n-button type="primary" size="small">
                <icon-ep-set-up class="text-24px" />
              </n-button>
              <n-input
                v-model:value="settingTemperatureArrayDown[i]"
                size="small"
                :input-props="{ onClick: () => clickOnDown(i) }"
              >
                <template #suffix> ℃ </template>
              </n-input>
            </n-input-group>
            <n-input-group>
              <n-button size="small">
                <icon-ep-set-up class="text-24px" />
              </n-button>
              <n-input v-model:value="actualTemperatureArrayDown[i]" size="small">
                <template #suffix> ℃ </template>
              </n-input>
            </n-input-group>
            <n-gradient-text type="info" size="20" style="width: 40px; margin-left: 32%"> 底部 </n-gradient-text>
          </n-space>
        </n-card>
      </div>
      <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalStoveItemValue" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalStoveItemValue"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalStoveItemValue"
          :max-length="maxlength"
          @onChange="onChange"
          @onKeyPress="onKeyPress"
        />
      </n-modal>
      <n-modal v-model:show="coverShowModalDown" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalStoveItemValueDown" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalStoveItemValueDown"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalStoveItemValueDown"
          :max-length="maxlength"
          @onChange="onChangeDown"
          @onKeyPress="onKeyPressDown"
        />
      </n-modal>
      <n-modal v-model:show="topShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalTopFanValue" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalTopFanValue"
          :min-value="1"
          :max-value="5"
          :keyboard-class="keyboardClass"
          :input="finalTopFanValue"
          :max-length="maxlength"
          @onChange="onChangeTopFan"
          @onKeyPress="handleKeyPressTopFan"
        />
      </n-modal>
      <n-modal v-model:show="bottomShowModal" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalBottomFanValue" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalBottomFanValue"
          :min-value="1"
          :max-value="5"
          :keyboard-class="keyboardClass"
          :input="finalBottomFanValue"
          :max-length="maxlength"
          @onChange="onChangeBottomFan"
          @onKeyPress="handleKeyPressBottomFan"
        />
      </n-modal>
      <n-modal v-model:show="comShow5" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue5" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue5"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue5"
          :max-length="maxlength"
          @onChange="onChangeCom5"
          @onKeyPress="onKeyPressDownCom5"
        />
      </n-modal>
      <n-modal v-model:show="comShow6" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue6" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue6"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue6"
          :max-length="maxlength"
          @onChange="onChangeCom6"
          @onKeyPress="onKeyPressDownCom6"
        />
      </n-modal>
      <n-modal v-model:show="comShow7" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue7" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue7"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue7"
          :max-length="maxlength"
          @onChange="onChangeCom7"
          @onKeyPress="onKeyPressDownCom7"
        />
      </n-modal>
      <n-modal v-model:show="comShow0" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue0" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue0"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue0"
          :max-length="maxlength"
          @onChange="onChangeCom0"
          @onKeyPress="onKeyPressDownCom0"
        />
      </n-modal>
      <n-modal v-model:show="comShow1" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue1" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue1"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue1"
          :max-length="maxlength"
          @onChange="onChangeCom1"
          @onKeyPress="onKeyPressDownCom1"
        />
      </n-modal>
      <n-modal v-model:show="comShow2" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue2" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue2"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue2"
          :max-length="maxlength"
          @onChange="onChangeCom2"
          @onKeyPress="onKeyPressDownCom2"
        />
      </n-modal>
      <n-modal v-model:show="comShow8" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue8" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue8"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue8"
          :max-length="maxlength"
          @onChange="onChangeCom8"
          @onKeyPress="onKeyPressDownCom8"
        />
      </n-modal>
      <n-modal v-model:show="comShow9" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue9" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue9"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue9"
          :max-length="maxlength"
          @onChange="onChangeCom9"
          @onKeyPress="onKeyPressDownCom9"
        />
      </n-modal>
      <n-modal v-model:show="comShow3" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue3" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue3"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue3"
          :max-length="maxlength"
          @onChange="onChangeCom3"
          @onKeyPress="onKeyPressDownCom3"
        />
      </n-modal>
      <n-modal v-model:show="comShow4" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue4" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue4"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue4"
          :max-length="maxlength"
          @onChange="onChangeCom4"
          @onKeyPress="onKeyPressDownCom4"
        />
      </n-modal>
      <n-modal v-model:show="comShow10" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
        <n-input v-model:value="finalCompensateValue10" type="textarea" placeholder="请输入" />
        <key-board-heat
          :ref="finalCompensateValue10"
          :min-value="minTemperature"
          :max-value="maxTemperature"
          :keyboard-class="keyboardClass"
          :input="finalCompensateValue10"
          :max-length="maxlength"
          @onChange="onChangeCom10"
          @onKeyPress="onKeyPressDownCom10"
        />
      </n-modal>
    </n-space>
    <div class="p-10px">
      <n-button type="error" size="large" @click="chickOnWarning">超温报警</n-button>
      <n-button type="primary" size="large" style="margin-left: 10px" @click="chickOnFan">风机转速</n-button>
      <n-button type="primary" size="large" style="margin-left: 10px" @click="chickOnTem">温度补偿</n-button>
    </div>
    <n-modal v-model:show="showModalWarning" class="rounded-10px" preset="card" style="width: 1200px">
      <warning-heat :warn-array="warningArray"></warning-heat>
    </n-modal>
    <n-modal v-model:show="showModalFan" class="rounded-10px" preset="card" style="width: 1200px" title="风机转速">
      <div>
        <n-grid :x-gap="12" :y-gap="8" :cols="5">
          <n-grid-item>
            <n-card class="shadow-sm rounded-16px single-card flex-y-center">
              <n-tag :bordered="false" type="info" style="margin-top: 40%">预热上</n-tag>
              <n-divider />
              <n-switch
                v-model:value="preSwitchUp"
                size="large"
                style="margin-left: 25%"
                @update-value="changeSwitchPreUp"
              />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="shadow-sm rounded-16px single-card flex-y-center">
              <n-tag :bordered="false" type="info" style="margin-top: 40%">预热下</n-tag>
              <n-divider />
              <n-switch
                v-model:value="preSwitchDown"
                size="large"
                style="margin-left: 25%"
                @update-value="changeSwitchPreDown"
              />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="shadow-sm rounded-16px single-card flex-y-center">
              <n-tag :bordered="false" type="info" style="margin-top: 40%">高温上</n-tag>
              <n-divider />
              <n-switch
                v-model:value="highSwitchUp"
                size="large"
                style="margin-left: 25%"
                @update-value="changeSwitchHighUp"
              />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="shadow-sm rounded-16px single-card flex-y-center">
              <n-tag :bordered="false" type="info" style="margin-top: 40%">冷却上</n-tag>
              <n-divider />
              <n-switch
                v-model:value="coldSwitchUp"
                size="large"
                style="margin-left: 25%"
                @update-value="changeSwitchColdUp"
              />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card class="shadow-sm rounded-16px single-card flex-y-center">
              <n-tag :bordered="false" type="info" style="margin-top: 40%">冷却下</n-tag>
              <n-divider />
              <n-switch
                v-model:value="coldSwitchDown"
                size="large"
                style="margin-left: 25%"
                @update-value="changeSwitchColdDown"
              />
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>
    </n-modal>
    <n-modal v-model:show="showModalTem" class="rounded-10px" preset="card" style="width: 1200px" title="温度补偿">
      <div class="p-3px py-45px">
        <n-grid x-gap="12" :cols="2">
          <n-gi>
            <n-input-group>
              <n-button type="info" strong secondary class="input-group-head">预热上第一区</n-button>
              <n-input
                v-model:value="compensateValue5"
                :input-props="{ onClick: () => clickPreOne() }"
                :style="{ width: '33%' }"
              />
              <n-input-group-label>度</n-input-group-label>
            </n-input-group>
            <n-input-group style="margin-top: 15px">
              <n-button type="info" strong secondary class="input-group-head">预热上第二区</n-button>
              <n-input
                v-model:value="compensateValue6"
                :input-props="{ onClick: () => clickPreTwo() }"
                :style="{ width: '33%' }"
              />
              <n-input-group-label>度</n-input-group-label>
            </n-input-group>
            <n-input-group style="margin-top: 15px">
              <n-button type="info" strong secondary class="input-group-head">预热上第三区</n-button>
              <n-input
                v-model:value="compensateValue7"
                :input-props="{ onClick: () => clickPreThree() }"
                :style="{ width: '33%' }"
              />
              <n-input-group-label>度</n-input-group-label>
            </n-input-group>

            <n-input-group style="margin-top: 15px">
              <n-button type="info" strong secondary class="input-group-head">预热下第一区</n-button>
              <n-input
                v-model:value="compensateValue0"
                :input-props="{ onClick: () => clickPreFour() }"
                :style="{ width: '33%' }"
              />
              <n-input-group-label>度</n-input-group-label>
            </n-input-group>
            <n-input-group style="margin-top: 15px">
              <n-button type="info" strong secondary class="input-group-head">预热下第二区</n-button>
              <n-input
                v-model:value="compensateValue1"
                :input-props="{ onClick: () => clickPreFive() }"
                :style="{ width: '33%' }"
              />
              <n-input-group-label>度</n-input-group-label>
            </n-input-group>
            <n-input-group style="margin-top: 15px">
              <n-button type="info" strong secondary class="input-group-head">预热下第三区</n-button>
              <n-input
                v-model:value="compensateValue2"
                :input-props="{ onClick: () => clickPreSix() }"
                :style="{ width: '33%' }"
              />
              <n-input-group-label>度</n-input-group-label>
            </n-input-group>
          </n-gi>
          <n-gi>
            <div>
              <n-input-group>
                <n-button type="info" strong secondary class="input-group-head">高温上第一区</n-button>
                <n-input
                  v-model:value="compensateValue8"
                  :input-props="{ onClick: () => clickPreSeven() }"
                  :style="{ width: '33%' }"
                />
                <n-input-group-label>度</n-input-group-label>
              </n-input-group>
              <n-input-group style="margin-top: 15px">
                <n-button type="info" strong secondary class="input-group-head">高温上第二区</n-button>
                <n-input
                  v-model:value="compensateValue9"
                  :input-props="{ onClick: () => clickPreEight() }"
                  :style="{ width: '33%' }"
                />
                <n-input-group-label>度</n-input-group-label>
              </n-input-group>
              <n-input-group style="margin-top: 15px">
                <n-button type="info" strong secondary class="input-group-head">高温下第一区</n-button>
                <n-input
                  v-model:value="compensateValue3"
                  :input-props="{ onClick: () => clickPreNine() }"
                  :style="{ width: '33%' }"
                />
                <n-input-group-label>度</n-input-group-label>
              </n-input-group>
              <n-input-group style="margin-top: 15px">
                <n-button type="info" strong secondary class="input-group-head">高温下第二区</n-button>
                <n-input
                  v-model:value="compensateValue4"
                  :input-props="{ onClick: () => clickPreTen() }"
                  :style="{ width: '33%' }"
                />
                <n-input-group-label>度</n-input-group-label>
              </n-input-group>
              <n-input-group style="margin-top: 15px">
                <n-button type="info" strong secondary class="input-group-head">真空区</n-button>
                <n-input
                  v-model:value="compensateValue10"
                  :input-props="{ onClick: () => clickPreEle() }"
                  :style="{ width: '33%' }"
                />
                <n-input-group-label>度</n-input-group-label>
              </n-input-group>
            </div>
          </n-gi>
        </n-grid>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { keepGetting, saveJson } from '@/service/api/home';
import KeyBoardHeat from '@/views/heat/homepage/components/KeyBoardHeat.vue';
import { StoveHeatParamConfig } from '@/enum/heat';
import { closeSocket, createSocket, guid } from '@/service/api/websocket';
import WarningHeat from '@/views/heat/warning/warningHeat.vue';
const maxlength = ref(999);
const coverShowModal = ref(false);
const coverShowModalDown = ref(false);
const topShowModal = ref(false);
const bottomShowModal = ref(false);
const showModalWarning = ref(false);
const showModalFan = ref(false);
const showModalTem = ref(false);
const stoveItemValue = ref('');
const finalStoveItemValue = ref('');
const stoveItemValueDown = ref('');
const finalStoveItemValueDown = ref('');
const topFanValue = ref('');
const finalTopFanValue = ref('');
const bottomFanValue = ref('');
const finalBottomFanValue = ref('');
const settingTemperatureArray = ref([]);
const actualTemperatureArray = ref([]);
const settingTemperatureArrayDown = ref([]);
const actualTemperatureArrayDown = ref([]);
const upperFanArray = ref([]);
const lowerFanArray = ref([]);
const currentIndex = ref(0);
const topCurrentIndex = ref(0);
const bottomCurrentIndex = ref(0);
const topSwitch = ref([]);
const bottomSwitch = ref([]);
const tagName = 'heatHomepage';
const uuid = ref('');
const warningArray = ref([0, 0]);
const minTemperature = ref(20);
const maxTemperature = ref(0);
const preSwitchUp = ref(false);
const preSwitchDown = ref(false);
const highSwitchUp = ref(false);
const coldSwitchUp = ref(false);
const coldSwitchDown = ref(false);
const compensateValue0 = ref('0');
const compensateValue1 = ref('0');
const compensateValue2 = ref('0');
const compensateValue3 = ref('0');
const compensateValue4 = ref('0');
const compensateValue5 = ref('0');
const compensateValue6 = ref('0');
const compensateValue7 = ref('0');
const compensateValue8 = ref('0');
const compensateValue9 = ref('0');
const compensateValue10 = ref('0');
const comShow0 = ref(false);
const comShow1 = ref(false);
const comShow2 = ref(false);
const comShow3 = ref(false);
const comShow4 = ref(false);
const comShow5 = ref(false);
const comShow6 = ref(false);
const comShow7 = ref(false);
const comShow8 = ref(false);
const comShow9 = ref(false);
const comShow10 = ref(false);
const finalCompensateValue0 = ref('0');
const finalCompensateValue1 = ref('0');
const finalCompensateValue2 = ref('0');
const finalCompensateValue3 = ref('0');
const finalCompensateValue4 = ref('0');
const finalCompensateValue5 = ref('0');
const finalCompensateValue6 = ref('0');
const finalCompensateValue7 = ref('0');
const finalCompensateValue8 = ref('0');
const finalCompensateValue9 = ref('0');
const finalCompensateValue10 = ref('0');
interface StoveHeatConfig {
  name: string;
  topLevel: string;
  topTargetTemp: number;
  topActualTemp: number;
  topState: boolean;
  bottomLevel: string;
  bottomTargetTemp: number;
  bottomActualTemp: number;
  bottomState: boolean;
}
interface HeatParam {
  result: [];
  dataType: keyof typeof StoveHeatParamConfig;
  name: string;
}
const heatParam: HeatParam[] = [
  {
    result: [],
    dataType: StoveHeatParamConfig['Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_UP'],
    name: 'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_UP'
  }
];

const options = [
  {
    label: 'Level 1',
    value: 'Level 1'
  },
  {
    label: 'Level 2',
    value: 'Level 2'
  },
  {
    label: 'Level 3',
    value: 'Level 3'
  }
];

const stoveConfigList: StoveHeatConfig[] = reactive([
  {
    name: '预热1',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '预热2',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '预热3',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '高温1',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '高温2',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '真空',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  },
  {
    name: '冷却区',
    topLevel: 'Level 3',
    topTargetTemp: 160,
    topActualTemp: 79,
    topState: true,
    bottomLevel: 'Level 3',
    bottomTargetTemp: 160,
    bottomActualTemp: 86,
    bottomState: true
  }
]);
onMounted(async () => {
  uuid.value = guid(tagName);
  createSocket(uuid.value);
  window.addEventListener('onmessageWS', handleWsMsg);
  const param = {
    'Application.HMI_HomePage.h_iFanSpeedLevel_UP': 'floats',
    'Application.HMI_HomePage.h_iFanSpeedLevel_Down': 'floats',
    'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_UP': 'floats',
    'Application.HMI_HomePage.h_rPreHeatZoneTempreturePV_UP': 'floats',
    'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_UP': 'floats',
    'Application.HMI_HomePage.h_rHighHeatZoneTempreturePV_UP': 'floats',
    'Application.HMI_HomePage.h_rVacuumHeatZoneTempretureSV_UP': 'floats',
    'Application.HMI_HomePage.h_rVacuumHeatZoneTempreturePV_UP': 'floats',
    'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_UP': 'floats',
    'Application.HMI_HomePage.h_rColdHeatZoneTempreturePV_UP': 'floats',
    'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_DOWN': 'floats',
    'Application.HMI_HomePage.h_rPreHeatZoneTempreturePV_DOWN': 'floats',
    'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_DOWN': 'floats',
    'Application.HMI_HomePage.h_rHighHeatZoneTempreturePV_DOWN': 'floats',
    'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_DOWN': 'floats',
    'Application.HMI_HomePage.h_rColdHeatZoneTempreturePV_DOWN': 'floats',
    'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_UP': 'booleans',
    'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_UP': 'booleans',
    'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_UP': 'booleans',
    'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_UP': 'booleans',
    'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_Down': 'booleans',
    'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_Down': 'booleans',
    'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_Down': 'booleans',
    'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_Down': 'booleans',
    'Application.HMI_VacuumConfig.h_DAM_PT': 'floats',
    'Application.HMI_HomePage.h_xPreHeatZoneFanOnOffSwitch_Down[0]': 'boolean',
    'Application.HMI_HomePage.h_xPreHeatZoneFanOnOffSwitch_UP[0]': 'boolean',
    'Application.HMI_HomePage.h_xHighHeatZoneFanOnOffSwitch_UP[0]': 'boolean',
    'Application.HMI_HomePage.h_xColdHeatZoneFanOnOffSwitch_Down[0]': 'boolean',
    'Application.HMI_HomePage.h_xColdHeatZoneFanOnOffSwitch_UP[0]': 'boolean',
    'Application.HMI_HomePage.h_rHeatcompensateValue[0]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[1]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[2]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[3]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[4]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[5]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[6]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[7]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[8]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[9]': 'float',
    'Application.HMI_HomePage.h_rHeatcompensateValue[10]': 'float'
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
      'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_UP': settingPreheatArrayValue,
      'Application.HMI_HomePage.h_rPreHeatZoneTempreturePV_UP': actualPreheatArrayValue,
      'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_UP': settingHighTemperatureArrayValue,
      'Application.HMI_HomePage.h_rHighHeatZoneTempreturePV_UP': actualHighTemperatureArrayValue,
      'Application.HMI_HomePage.h_rVacuumHeatZoneTempretureSV_UP': settingVacuumArrayValue,
      'Application.HMI_HomePage.h_rVacuumHeatZoneTempreturePV_UP': actualVacuumArrayValue,
      'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_UP': settingBurialArrayValue,
      'Application.HMI_HomePage.h_rColdHeatZoneTempreturePV_UP': actualBurialArrayValue,
      'Application.HMI_HomePage.h_iFanSpeedLevel_UP': upFanArrayValue,
      'Application.HMI_HomePage.h_iFanSpeedLevel_Down': downFanArrayValue,
      'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_DOWN': settingPreheatArrayValueDown,
      'Application.HMI_HomePage.h_rPreHeatZoneTempreturePV_DOWN': actualPreheatArrayValueDown,
      'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_DOWN': settingHighTemperatureArrayValueDown,
      'Application.HMI_HomePage.h_rHighHeatZoneTempreturePV_DOWN': actualHighTemperatureArrayValueDown,
      'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_DOWN': settingBurialArrayValueDown,
      'Application.HMI_HomePage.h_rColdHeatZoneTempreturePV_DOWN': actualBurialArrayValuetsDown,
      'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_UP': preHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_UP': highHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_UP': vacuumHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_UP': coldHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_Down': preHeatSwitchDownValue,
      'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_Down': highHeatSwitchDownValue,
      'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_Down': vacuumHeatSwitchDownValue,
      'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_Down': coldHeatSwitchDownValue,
      'Application.HMI_VacuumConfig.h_DAM_PT': damValue,
      'Application.HMI_HomePage.h_xPreHeatZoneFanOnOffSwitch_Down[0]': fanSwitchPreDown,
      'Application.HMI_HomePage.h_xPreHeatZoneFanOnOffSwitch_UP[0]': fanSwitchPreUp,
      'Application.HMI_HomePage.h_xHighHeatZoneFanOnOffSwitch_UP[0]': fanSwitchHighUp,
      'Application.HMI_HomePage.h_xColdHeatZoneFanOnOffSwitch_Down[0]': fanSwitchColdDown,
      'Application.HMI_HomePage.h_xColdHeatZoneFanOnOffSwitch_UP[0]': fanSwitchColdUp,
      'Application.HMI_HomePage.h_rHeatcompensateValue[0]': v0,
      'Application.HMI_HomePage.h_rHeatcompensateValue[1]': v1,
      'Application.HMI_HomePage.h_rHeatcompensateValue[2]': v2,
      'Application.HMI_HomePage.h_rHeatcompensateValue[3]': v3,
      'Application.HMI_HomePage.h_rHeatcompensateValue[4]': v4,
      'Application.HMI_HomePage.h_rHeatcompensateValue[5]': v5,
      'Application.HMI_HomePage.h_rHeatcompensateValue[6]': v6,
      'Application.HMI_HomePage.h_rHeatcompensateValue[7]': v7,
      'Application.HMI_HomePage.h_rHeatcompensateValue[8]': v8,
      'Application.HMI_HomePage.h_rHeatcompensateValue[9]': v9,
      'Application.HMI_HomePage.h_rHeatcompensateValue[10]': v10
    } = data.result;
    compensateValue0.value = v0;
    compensateValue1.value = v1;
    compensateValue2.value = v2;
    compensateValue3.value = v3;
    compensateValue4.value = v4;
    compensateValue5.value = v5;
    compensateValue6.value = v6;
    compensateValue7.value = v7;
    compensateValue8.value = v8;
    compensateValue9.value = v9;
    compensateValue10.value = v10;
    preSwitchUp.value = fanSwitchPreUp;
    preSwitchDown.value = fanSwitchPreDown;
    highSwitchUp.value = fanSwitchHighUp;
    coldSwitchUp.value = fanSwitchColdUp;
    coldSwitchDown.value = fanSwitchColdDown;
    if (
      settingPreheatArrayValue &&
      settingHighTemperatureArrayValue &&
      settingVacuumArrayValue &&
      settingBurialArrayValue
    ) {
      const settingArray = settingPreheatArrayValue
        .slice(0, 3)
        .concat(
          settingHighTemperatureArrayValue
            .slice(0, 2)
            .concat(settingVacuumArrayValue.slice(0, 1).concat(settingBurialArrayValue.slice(0, 2)))
        );
      settingTemperatureArray.value = settingArray;
    }
    if (
      actualPreheatArrayValue &&
      actualHighTemperatureArrayValue &&
      actualVacuumArrayValue &&
      actualBurialArrayValue
    ) {
      const actualArray = actualPreheatArrayValue
        .slice(0, 3)
        .concat(
          actualHighTemperatureArrayValue
            .slice(0, 2)
            .concat(actualVacuumArrayValue.slice(0, 1).concat(actualBurialArrayValue.slice(0, 2)))
        );
      actualTemperatureArray.value = actualArray;
    }
    if (
      settingPreheatArrayValueDown &&
      settingHighTemperatureArrayValueDown &&
      settingVacuumArrayValue &&
      settingBurialArrayValueDown
    ) {
      const settingArrayDown = settingPreheatArrayValueDown
        .slice(0, 3)
        .concat(
          settingHighTemperatureArrayValueDown
            .slice(0, 2)
            .concat(settingVacuumArrayValue.slice(0, 1).concat(settingBurialArrayValue.slice(0, 1)))
        );
      settingTemperatureArrayDown.value = settingArrayDown;
    }
    if (
      actualPreheatArrayValueDown &&
      actualHighTemperatureArrayValueDown &&
      actualVacuumArrayValue &&
      actualBurialArrayValuetsDown
    ) {
      const actualArrayDown = actualPreheatArrayValueDown
        .slice(0, 3)
        .concat(
          actualHighTemperatureArrayValueDown
            .slice(0, 2)
            .concat(actualVacuumArrayValue.slice(0, 1).concat(actualBurialArrayValue.slice(0, 2)))
        );
      actualTemperatureArrayDown.value = actualArrayDown;
    }
    if (preHeatSwitchUpValue && highHeatSwitchUpValue && vacuumHeatSwitchUpValue && coldHeatSwitchUpValue) {
      const upSwitchObj = preHeatSwitchUpValue
        .slice(0, 3)
        .concat(
          highHeatSwitchUpValue
            .slice(0, 2)
            .concat(vacuumHeatSwitchUpValue.slice(0, 1).concat(coldHeatSwitchUpValue.slice(0, 2)))
        );
      topSwitch.value = upSwitchObj;
    }
    if (preHeatSwitchDownValue && highHeatSwitchDownValue && vacuumHeatSwitchDownValue && coldHeatSwitchDownValue) {
      const downSwitchObj = preHeatSwitchDownValue
        .slice(0, 3)
        .concat(
          highHeatSwitchDownValue
            .slice(0, 2)
            .concat(vacuumHeatSwitchDownValue.slice(0, 1).concat(coldHeatSwitchDownValue.slice(0, 2)))
        );
      bottomSwitch.value = downSwitchObj;
    }
    if (upFanArrayValue) {
      const topArrOne = upFanArrayValue[0];
      const topArrTwo = upFanArrayValue[1];
      const topArrThree = upFanArrayValue[2];
      const topObj = [];
      topObj.push(topArrOne);
      topObj.push(topArrOne);
      topObj.push(topArrOne);
      topObj.push(topArrTwo);
      topObj.push(topArrTwo);
      topObj.push(topArrTwo);
      topObj.push(topArrThree);
      topObj.push(topArrThree);
      upperFanArray.value = topObj;
    }
    if (downFanArrayValue) {
      const bottomArrOne = downFanArrayValue[0];
      const bottomArrTwo = downFanArrayValue[1];
      const bottomObj = [];
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrOne);
      bottomObj.push(bottomArrTwo);
      bottomObj.push(bottomArrTwo);
      lowerFanArray.value = bottomObj;
    }
    if (damValue) {
      warningArray.value = damValue;
    }
  }
}

function getHeatProgress(heatValue: number) {
  return (heatValue / 350) * 100;
}

function clickOn(value) {
  currentIndex.value = value;
  stoveItemValue.value = settingTemperatureArray.value[currentIndex.value];
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
  } else {
    coverShowModal.value = true;
  }
  if (value >= 0 && value <= 2) {
    maxTemperature.value = 300;
  } else if (value >= 3 && value <= 4) {
    maxTemperature.value = 350;
  } else if (value == 5) {
    maxTemperature.value = 350;
  } else {
    maxTemperature.value = 120;
    minTemperature.value = 40;
  }
  finalStoveItemValue.value = '';
}

function clickOnDown(value) {
  currentIndex.value = value;
  stoveItemValueDown.value = settingTemperatureArrayDown.value[currentIndex.value];
  if (coverShowModalDown.value === true) {
    coverShowModalDown.value = false;
  } else {
    coverShowModalDown.value = true;
  }
  if (value >= 0 && value <= 2) {
    maxTemperature.value = 300;
  } else if (value >= 3 && value <= 4) {
    maxTemperature.value = 350;
  } else if (value == 5) {
    maxTemperature.value = 350;
  } else {
    maxTemperature.value = 120;
    minTemperature.value = 40;
  }
  finalStoveItemValueDown.value = '';
}

function clickOnTop(value) {
  topCurrentIndex.value = value;
  finalTopFanValue.value = '';
  topFanValue.value = upperFanArray.value[topCurrentIndex.value];
  if (topShowModal.value === true) {
    topShowModal.value = false;
  } else {
    topShowModal.value = true;
  }
}

function clickOnBottom(value) {
  bottomCurrentIndex.value = value;
  bottomFanValue.value = lowerFanArray.value[bottomCurrentIndex.value];
  if (bottomShowModal.value === true) {
    bottomShowModal.value = false;
  } else {
    bottomShowModal.value = true;
  }
  finalBottomFanValue.value = '';
}

const onChange = (e: string) => {
  finalStoveItemValue.value = e;
};

const onChangeDown = (e: string) => {
  finalStoveItemValueDown.value = e;
};
const onChangeCom5 = (e: string) => {
  finalCompensateValue5.value = e;
};
const onChangeCom6 = (e: string) => {
  finalCompensateValue6.value = e;
};
const onChangeCom0 = (e: string) => {
  finalCompensateValue0.value = e;
};
const onChangeCom1 = (e: string) => {
  finalCompensateValue1.value = e;
};
const onChangeCom2 = (e: string) => {
  finalCompensateValue2.value = e;
};
const onChangeCom8 = (e: string) => {
  finalCompensateValue8.value = e;
};
const onChangeCom7 = (e: string) => {
  finalCompensateValue7.value = e;
};
const onChangeCom9 = (e: string) => {
  finalCompensateValue9.value = e;
};
const onChangeCom3 = (e: string) => {
  finalCompensateValue3.value = e;
};
const onChangeCom4 = (e: string) => {
  finalCompensateValue4.value = e;
};
const onChangeCom10 = (e: string) => {
  finalCompensateValue10.value = e;
};
const onChangeTopFan = (e: string) => {
  finalTopFanValue.value = e;
};

const onChangeBottomFan = (e: string) => {
  finalBottomFanValue.value = e;
};

async function onKeyPress() {
  if (Number(finalStoveItemValue.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalStoveItemValue.value) > Number(maxTemperature.value)) {
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
    const index = currentIndex.value;
    settingTemperatureArray.value[index] = finalStoveItemValue.value;
    if (index >= 0 && index <= 2) {
      const Param = {
        result: settingTemperatureArray.value.slice(0, 3),
        dataType: 'floats',
        name: 'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_UP'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (index > 2 && index <= 4) {
      const Param = {
        result: settingTemperatureArray.value.slice(3, 5),
        dataType: 'floats',
        name: 'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_UP'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (index > 4 && index <= 5) {
      const Param = {
        result: settingTemperatureArray.value.slice(5, 6),
        dataType: 'floats',
        name: 'Application.HMI_HomePage.h_rVacuumHeatZoneTempretureSV_UP'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else {
      const Param = {
        result: settingTemperatureArray.value.slice(6, 8),
        dataType: 'floats',
        name: 'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_UP'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
async function onKeyPressDown() {
  if (Number(finalStoveItemValueDown.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalStoveItemValueDown.value) > Number(maxTemperature.value)) {
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
    const index = currentIndex.value;
    settingTemperatureArrayDown.value[currentIndex.value] = finalStoveItemValueDown.value;
    if (index >= 0 && index <= 2) {
      const Param = {
        result: settingTemperatureArrayDown.value.slice(0, 3),
        dataType: 'floats',
        name: 'Application.HMI_HomePage.h_rPreHeatZoneTempretureSV_DOWN'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (index > 2 && index <= 4) {
      const Param = {
        result: settingTemperatureArrayDown.value.slice(3, 5),
        dataType: 'floats',
        name: 'Application.HMI_HomePage.h_rHighHeatZoneTempretureSV_DOWN'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (index > 4 && index <= 5) {
      const Param = {
        result: settingTemperatureArrayDown.value.slice(5, 6),
        dataType: 'floats',
        name: 'Application.HMI_HomePage.h_rVacuumHeatZoneTempretureSV_UP'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else {
      const Param = {
        result: settingTemperatureArrayDown.value.slice(6, 8),
        dataType: 'floats',
        name: 'Application.HMI_HomePage.h_rColdHeatZoneTempretureSV_DOWN'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
async function onKeyPressDownCom5() {
  if (Number(finalCompensateValue5.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue5.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue5.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[5]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom6() {
  if (Number(finalCompensateValue6.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue6.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue6.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[6]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom7() {
  if (Number(finalCompensateValue7.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue7.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue7.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[7]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom0() {
  if (Number(finalCompensateValue0.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue0.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue0.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[0]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom1() {
  if (Number(finalCompensateValue1.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue1.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue1.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[1]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom2() {
  if (Number(finalCompensateValue2.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue2.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue2.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[2]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom8() {
  if (Number(finalCompensateValue8.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue8.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue8.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[8]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom9() {
  if (Number(finalCompensateValue9.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue9.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue9.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[9]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom3() {
  if (Number(finalCompensateValue3.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue3.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue3.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[3]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom4() {
  if (Number(finalCompensateValue4.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue4.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue4.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[4]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
async function onKeyPressDownCom10() {
  if (Number(finalCompensateValue10.value) < Number(minTemperature.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalCompensateValue10.value) > Number(maxTemperature.value)) {
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
      result: finalCompensateValue10.value,
      dataType: 'float',
      name: 'Application.HMI_HomePage.h_rHeatcompensateValue[10]'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
  }
}
function changeBottomSwitch(value) {
  if (value >= 0 && value <= 2) {
    const Param = {
      result: bottomSwitch.value.slice(0, 3),
      dataType: 'booleans',
      name: 'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_Down'
    };
    const arr = [];
    arr.push(Param);
    saveJson(arr);
  } else if (value > 2 && value <= 4) {
    const Param = {
      result: bottomSwitch.value.slice(3, 5),
      dataType: 'booleans',
      name: 'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_Down'
    };
    const arr = [];
    arr.push(Param);
    saveJson(arr);
  } else if (value > 4 && value <= 5) {
    const Param = {
      result: bottomSwitch.value.slice(5, 6),
      dataType: 'booleans',
      name: 'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_Down'
    };
    const arr = [];
    arr.push(Param);
    saveJson(arr);
  } else {
    const Param = {
      result: bottomSwitch.value.slice(6, 8),
      dataType: 'booleans',
      name: 'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_Down'
    };
    const arr = [];
    arr.push(Param);
    saveJson(arr);
  }
}
function changeTopSwitch(value) {
  if (value >= 0 && value <= 2) {
    const Param = {
      result: topSwitch.value.slice(0, 3),
      dataType: 'booleans',
      name: 'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_UP'
    };
    const arr = [];
    arr.push(Param);
    saveJson(arr);
  } else if (value > 2 && value <= 4) {
    const Param = {
      result: topSwitch.value.slice(3, 5),
      dataType: 'booleans',
      name: 'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_UP'
    };
    const arr = [];
    arr.push(Param);
    saveJson(arr);
  } else if (value > 4 && value <= 5) {
    const Param = {
      result: topSwitch.value.slice(5, 6),
      dataType: 'booleans',
      name: 'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_UP'
    };
    const arr = [];
    arr.push(Param);
    saveJson(arr);
  } else {
    const Param = {
      result: topSwitch.value.slice(6, 8),
      dataType: 'booleans',
      name: 'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_UP'
    };
    const arr = [];
    arr.push(Param);
    saveJson(arr);
  }
}
async function handleKeyPressTopFan() {
  if (Number(finalTopFanValue.value) < 1) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalTopFanValue.value) > 5) {
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
    upperFanArray.value[topCurrentIndex.value] = finalTopFanValue.value;
    const index = topCurrentIndex.value;
    if (index >= 0 && index <= 2) {
      const Param = {
        result: Number(finalTopFanValue.value).toFixed(1),
        dataType: 'float',
        name: 'Application.HMI_HomePage.h_iFanSpeedLevel_UP[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (index >= 3 && index <= 5) {
      const Param = {
        result: Number(finalTopFanValue.value).toFixed(1),
        dataType: 'float',
        name: 'Application.HMI_HomePage.h_iFanSpeedLevel_UP[1]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else {
      const Param = {
        result: Number(finalTopFanValue.value).toFixed(1),
        dataType: 'float',
        name: 'Application.HMI_HomePage.h_iFanSpeedLevel_UP[2]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
async function handleKeyPressBottomFan() {
  if (Number(finalBottomFanValue.value) < 1) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalBottomFanValue.value) > 5) {
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
    lowerFanArray.value[bottomCurrentIndex.value] = finalBottomFanValue.value;
    const index = bottomCurrentIndex.value;
    if (index >= 0 && index <= 5) {
      const Param = {
        result: Number(finalBottomFanValue.value).toFixed(1),
        dataType: 'float',
        name: 'Application.HMI_HomePage.h_iFanSpeedLevel_Down[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else {
      const Param = {
        result: Number(finalBottomFanValue.value).toFixed(1),
        dataType: 'float',
        name: 'Application.HMI_HomePage.h_iFanSpeedLevel_Down[1]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
function chickOnWarning() {
  if (showModalWarning.value === true) {
    showModalWarning.value = false;
  } else {
    showModalWarning.value = true;
  }
}
function chickOnFan() {
  if (showModalFan.value === true) {
    showModalFan.value = false;
  } else {
    showModalFan.value = true;
  }
}
function chickOnTem() {
  if (showModalTem.value === true) {
    showModalTem.value = false;
  } else {
    showModalTem.value = true;
  }
}
async function changeSwitchPreUp() {
  const Param = {
    result: preSwitchUp.value,
    dataType: 'boolean',
    name: 'Application.HMI_HomePage.h_xPreHeatZoneFanOnOffSwitch_UP[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeSwitchPreDown() {
  const Param = {
    result: preSwitchDown.value,
    dataType: 'boolean',
    name: 'Application.HMI_HomePage.h_xPreHeatZoneFanOnOffSwitch_Down[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeSwitchHighUp() {
  const Param = {
    result: highSwitchUp.value,
    dataType: 'boolean',
    name: 'Application.HMI_HomePage.h_xHighHeatZoneFanOnOffSwitch_UP[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeSwitchColdUp() {
  const Param = {
    result: coldSwitchUp.value,
    dataType: 'boolean',
    name: 'Application.HMI_HomePage.h_xColdHeatZoneFanOnOffSwitch_UP[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
async function changeSwitchColdDown() {
  const Param = {
    result: coldSwitchDown.value,
    dataType: 'boolean',
    name: 'Application.HMI_HomePage.h_xColdHeatZoneFanOnOffSwitch_Down[0]'
  };
  const arr = [];
  arr.push(Param);
  const success = await saveJson(arr);
  console.log(success);
}
function clickPreOne() {
  if (comShow5.value === true) {
    comShow5.value = false;
  } else {
    comShow5.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue5.value = '';
}
function clickPreTwo() {
  if (comShow6.value === true) {
    comShow6.value = false;
  } else {
    comShow6.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue6.value = '';
}
function clickPreThree() {
  if (comShow7.value === true) {
    comShow7.value = false;
  } else {
    comShow7.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue7.value = '';
}
function clickPreFour() {
  if (comShow0.value === true) {
    comShow0.value = false;
  } else {
    comShow0.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue0.value = '';
}
function clickPreFive() {
  if (comShow1.value === true) {
    comShow1.value = false;
  } else {
    comShow1.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue1.value = '';
}
function clickPreSix() {
  if (comShow2.value === true) {
    comShow2.value = false;
  } else {
    comShow2.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue2.value = '';
}
function clickPreSeven() {
  if (comShow8.value === true) {
    comShow8.value = false;
  } else {
    comShow8.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue8.value = '';
}
function clickPreEight() {
  if (comShow9.value === true) {
    comShow9.value = false;
  } else {
    comShow9.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue9.value = '';
}
function clickPreNine() {
  if (comShow3.value === true) {
    comShow3.value = false;
  } else {
    comShow3.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue3.value = '';
}
function clickPreTen() {
  if (comShow4.value === true) {
    comShow4.value = false;
  } else {
    comShow4.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue4.value = '';
}
function clickPreEle() {
  if (comShow10.value === true) {
    comShow10.value = false;
  } else {
    comShow10.value = true;
  }
  minTemperature.value = 0.1;
  maxTemperature.value = 99;
  finalCompensateValue10.value = '';
}
</script>

<style scoped>
.stove-panel {
  width: 200px;
  height: 340px;
}
.input-group-head {
  width: 120px;
}
</style>
