<template>
  <div>
    <div style="width: 90%; margin: auto">
      <!-- 排风口 -->
      <div style="position: absolute; left: 220px; top: 310px" class="w-200px h-30px">
        <vacuum-register></vacuum-register>
      </div>
      <div v-if="airFlowOutStatus" style="width: 40px; display: inline-block; margin-left: 5%; margin-bottom: -5px">
        <icon-material-symbols-mode-fan class="text-30px dom-rotate block-center" color="#ACACAC" />
        <div class="outlet"></div>
      </div>
      <div v-if="airFlowOutStatus" style="width: 40px; display: inline-block; position: absolute; right: 9.2%">
        <icon-material-symbols-mode-fan class="text-30px dom-rotate block-center" color="#ACACAC" />
        <div class="outlet"></div>
      </div>
      <div v-if="!airFlowOutStatus" style="width: 40px; display: inline-block; margin-left: 5%; margin-bottom: -5px">
        <icon-material-symbols-mode-fan class="text-30px block-center" color="red" />
        <div class="outlet"></div>
      </div>
      <div v-if="!airFlowOutStatus" style="width: 40px; display: inline-block; position: absolute; right: 9.2%">
        <icon-material-symbols-mode-fan class="text-30px block-center" color="red" />
        <div class="outlet"></div>
      </div>
      <!-- 上炉区视图 -->
      <n-card size="small" class="shadow-sm top-stove" style="width: 90%; margin: auto">
        <div style="width: 100%">
          <div
            v-for="(item, i) in stoves"
            :key="i"
            class="stove-item"
            :style="
              'width:' +
              100 / stoves.length +
              '%;background-color:' +
              (item.name.indexOf('warm') >= 0
                ? '#C1ECC4'
                : item.name.indexOf('hot') >= 0
                ? '#C1ECC4'
                : item.name.indexOf('vacuum') >= 0
                ? '#82B67A'
                : item.name.indexOf('cool') >= 0
                ? '#D2E3FF'
                : '')
            "
          >
            <span class="block-center" style="font-weight: bold; width: 25px; color: gray">
              {{ upperFanArray[i] }}</span
            >
            <icon-material-symbols-mode-fan-outline
              v-if="item.name.indexOf('cool') < 0 && fanStatus === false"
              class="text-30px block-center"
              color="#7C7C7C"
            />
            <icon-material-symbols-mode-fan
              v-if="
                item.name.indexOf('cool') < 0 &&
                fanStatus === true &&
                Math.abs(actualTemperatureArray[i] - settingTemperatureArray[i]) > heatValue &&
                topSwitch[i] === true
              "
              class="text-30px dom-rotate block-center"
              color="#F9CD02"
            />
            <icon-material-symbols-mode-fan
              v-if="
                item.name.indexOf('cool') < 0 &&
                fanStatus === true &&
                Math.abs(actualTemperatureArray[i] - settingTemperatureArray[i]) <= heatValue &&
                topSwitch[i] === true
              "
              class="text-30px dom-rotate block-center"
              color="mediumseagreen"
            />
            <icon-material-symbols-mode-fan
              v-if="item.name.indexOf('cool') < 0 && fanStatus === true && topSwitch[i] === false"
              class="text-30px dom-rotate block-center"
              color="white"
            />
            <icon-mingcute-snow-fill
              v-if="item.name.indexOf('cool') >= 0 && fanStatus === false"
              class="text-30px block-center"
              color="#7C7C7C"
            />
            <icon-mingcute-snow-fill
              v-if="
                item.name.indexOf('cool') >= 0 &&
                fanStatus === true &&
                Math.abs(actualTemperatureArray[i] - settingTemperatureArray[i]) > heatValue &&
                topSwitch[i] === true
              "
              class="text-30px dom-rotate block-center"
              color="#F9CD02"
            />
            <icon-mingcute-snow-fill
              v-if="
                item.name.indexOf('cool') >= 0 &&
                fanStatus === true &&
                Math.abs(actualTemperatureArray[i] - settingTemperatureArray[i]) <= heatValue &&
                topSwitch[i] === true
              "
              class="text-30px dom-rotate block-center"
              color="mediumseagreen"
            />
            <icon-mingcute-snow-fill
              v-if="item.name.indexOf('cool') >= 0 && fanStatus === true && topSwitch[i] === false"
              class="text-30px dom-rotate block-center"
              color="white"
            />
            <n-tag
              v-if="item.name.indexOf('cool') < 0 || item.name == 'cool1'"
              round
              type="info"
              :bordered="false"
              :color="{
                color: '#6792f3',
                textColor: '#f0f5fc',
                borderColor: '#555'
              }"
              class="light-green"
            >
              {{ settingTemperatureArray[i] }}
            </n-tag>
            <div v-if="item.name.indexOf('cool') >= 0 && item.name != 'cool1'" style="height: 28px"></div>
            <n-tag round :bordered="false" class="light-green">
              {{ actualTemperatureArray[i] }}
            </n-tag>
          </div>
        </div>
      </n-card>
      <!-- 下炉区视图 -->
      <tray-position></tray-position>
      <n-card size="small" class="shadow-sm bottom-stove" style="width: 100%; margin: auto">
        <div style="width: 90%; margin: auto">
          <div
            v-for="(item, i) in stoves"
            :key="i"
            class="stove-item"
            :style="
              'width:' +
              100 / stoves.length +
              '%;background-color:' +
              (item.name.indexOf('warm') >= 0
                ? '#C1ECC4'
                : item.name.indexOf('hot') >= 0
                ? '#C1ECC4'
                : item.name.indexOf('vacuum') >= 0
                ? '#82B67A'
                : item.name.indexOf('cool') >= 0
                ? '#D2E3FF'
                : '')
            "
          >
            <div>
              <div>
                <span class="block-center" style="font-weight: bold; width: 25px; color: gray">
                  {{ lowerFanArray[i] }}</span
                >
                <icon-material-symbols-mode-fan-outline
                  v-if="item.name.indexOf('cool') < 0 && fanStatus === false"
                  class="text-30px block-center"
                  color="#7C7C7C"
                />
                <icon-material-symbols-mode-fan
                  v-if="
                    item.name.indexOf('cool') < 0 &&
                    fanStatus === true &&
                    Math.abs(actualTemperatureArrayDown[i] - settingTemperatureArrayDown[i]) > heatValue &&
                    bottomSwitch[i] === true
                  "
                  class="text-30px dom-rotate block-center"
                  color="#F9CD02"
                />
                <icon-material-symbols-mode-fan
                  v-if="
                    item.name.indexOf('cool') < 0 &&
                    fanStatus === true &&
                    Math.abs(actualTemperatureArrayDown[i] - settingTemperatureArrayDown[i]) <= heatValue &&
                    bottomSwitch[i] === true
                  "
                  class="text-30px dom-rotate block-center"
                  color="mediumseagreen"
                />
                <icon-material-symbols-mode-fan
                  v-if="item.name.indexOf('cool') < 0 && fanStatus === true && bottomSwitch[i] === false"
                  class="text-30px dom-rotate block-center"
                  color="white"
                />
                <icon-mingcute-snow-fill
                  v-if="item.name.indexOf('cool') >= 0 && fanStatus === false"
                  class="text-30px block-center"
                  color="#7C7C7C"
                />
                <icon-mingcute-snow-fill
                  v-if="
                    item.name.indexOf('cool') >= 0 &&
                    fanStatus === true &&
                    Math.abs(actualTemperatureArrayDown[i] - settingTemperatureArrayDown[i]) > heatValue &&
                    bottomSwitch[i] === true
                  "
                  class="text-30px dom-rotate block-center"
                  color="#F9CD02"
                />
                <icon-mingcute-snow-fill
                  v-if="
                    item.name.indexOf('cool') >= 0 &&
                    fanStatus === true &&
                    Math.abs(actualTemperatureArrayDown[i] - settingTemperatureArrayDown[i]) <= heatValue &&
                    bottomSwitch[i] === true
                  "
                  class="text-30px dom-rotate block-center"
                  color="mediumseagreen"
                />
                <icon-mingcute-snow-fill
                  v-if="item.name.indexOf('cool') >= 0 && fanStatus === true && bottomSwitch[i] === false"
                  class="text-30px dom-rotate block-center"
                  color="white"
                />
                <n-tag
                  v-if="item.name.indexOf('cool') < 0"
                  round
                  type="info"
                  :bordered="false"
                  :color="{
                    color: '#6792f3',
                    textColor: '#f0f5fc',
                    borderColor: '#555'
                  }"
                  class="light-green"
                >
                  {{ settingTemperatureArrayDown[i] }}
                </n-tag>
                <div v-if="item.name.indexOf('cool') >= 0" style="height: 28px"></div>
                <n-tag round :bordered="false" class="light-green">
                  {{ actualTemperatureArrayDown[i] }}
                </n-tag>
              </div>
              <div v-if="i <= 2" style="margin-top: 30%">
                <icon-material-symbols-mode-fan-outline
                  v-if="absFanState[i] == false"
                  class="text-28px block-center"
                  color="#7C7C7C"
                />
                <icon-material-symbols-mode-fan
                  v-if="absFanState[i] == true"
                  class="text-28px dom-rotate block-center"
                  color="mediumseagreen"
                />
              </div>
              <div v-if="i > 2" style="margin-top: 30%; height: 28px"></div>
            </div>
          </div>
        </div>
      </n-card>
    </div>
    <!-- 尾部状态信息 -->
    <n-grid x-gap="0" :cols="18" style="margin-top: 3%; height: 300px">
      <n-gi span="6">
        <param-list
          :setting-speed="settingSpeed"
          :actual-speed="actualSpeed"
          :setting-support-height="settingSupportHeight"
          :actual-support-height="actualSupportHeight"
          :setting-support-width="settingSupportWidth"
          :actual-support-width="actualSupportWidth"
          :setting-track-width="settingTrackWidth"
          :actual-track-width="actualTrackWidth"
          :setting-o2="settingO2"
          :actual-o2="actualO2"
        >
        </param-list>
      </n-gi>
      <n-gi span="6">
        <opening-animation
          :track-status="trackStatus"
          :vacuum-in-sensor="InSensorvacuum"
          :vacuum-out-sensor="OutSensorvacuum"
          :vacuum-value="vacuumValue"
        />
      </n-gi>
      <n-gi span="6">
        <div>
          <vacuum-animation
            :display-value="vacuumSettingValue"
            :holding-time="holdingTime"
            :during-time="duringTime"
            :reback-time="rebackTime"
            :mode="vacuumMode"
            :vacuum-value="vacuumValue"
            :vacuum-switch="vacuumSwitch"
            :track-status="trackStatus"
            :vacuum-mode="vacuumMode"
            :model3-setting-times="model3SetTimes"
          ></vacuum-animation>
        </div>
      </n-gi>
    </n-grid>
    <!-- 底部工具 -->
    <n-card :bordered="false" size="small" class="shadow-sm rounded-16px" style="margin-top: 60px">
      <n-grid x-gap="12" :cols="8" item-responsive>
        <n-gi span="0 1060:1">
          <n-space style="float: right">
            <n-button strong secondary type="info" class="full-height" @click="changeFile">
              <icon-mdi-file-document-plus class="text-30px" />
            </n-button>
            <n-button strong secondary type="info" class="full-height" @click="getAllFile">
              <icon-jam-files-f class="text-30px" />
            </n-button>
          </n-space>
        </n-gi>
        <n-gi span="3">
          <n-button type="info" dashed class="profile full-height">
            <icon-ic-outline-insert-drive-file class="text-24px" />
            <span style="margin-left: 8px">E:\newFile\{{ currentFile }}.properties</span>
          </n-button>
        </n-gi>
        <n-gi span="4">
          <n-space>
            <n-button type="info" size="large" class="full-height" strong secondary @click="coverShowModal = true">
              <icon-material-symbols-open-in-browser class="text-30px" />
              机盖开启
            </n-button>
            <n-button type="warning" size="large" class="full-height" strong secondary @click="clickHome">
              <icon-system-uicons-reset class="text-30px" />
              原点回归
            </n-button>
            <n-button
              v-if="autoStatus"
              type="info"
              size="large"
              class="full-height"
              strong
              secondary
              @click="clickAuto"
            >
              <icon-system-uicons-reset class="text-30px" />
              自动
            </n-button>
            <n-button
              v-if="!autoStatus"
              type="error"
              size="large"
              class="full-height"
              strong
              secondary
              @click="clickManmual"
            >
              <icon-system-uicons-reset class="text-30px" />
              手动
            </n-button>
            <n-button
              v-if="!wholeStatus"
              type="success"
              size="large"
              class="full-height"
              strong
              secondary
              @click="changeStatus"
            >
              <icon-material-symbols-not-started class="text-30px" />
              启动
            </n-button>
            <n-button
              v-if="wholeStatus"
              type="error"
              size="large"
              class="full-height"
              strong
              secondary
              @click="chickPause"
            >
              <icon-material-symbols-stop-circle-outline class="text-30px" />
              停止
            </n-button>
            <n-button v-if="wholeStatus" type="error" size="large" class="full-height" strong @click="chickES">
              <icon-material-symbols-stop class="text-30px" />
              紧急停止
            </n-button>
          </n-space>
        </n-gi>
      </n-grid>
    </n-card>

    <!-- 回流炉机盖弹出面板 -->
    <n-modal v-model:show="coverShowModal" class="rounded-10px" preset="card" title="机盖开启" style="width: 600px">
      <n-grid x-gap="12" :cols="3">
        <n-gi>
          <n-result description="加热区开盖">
            <template #icon>
              <icon-material-symbols-aod-rounded class="text-85px text-red" />
            </template>
            <template #footer>
              <n-button
                style="width: 60%"
                @mousedown="handleButtonDownHeatUp"
                @mouseup="handleButtonUp"
                @mouseleave="handleButtonUp"
              >
                <icon-material-symbols-arrow-upward class="text-30px" />
              </n-button>
              <n-button
                style="width: 60%"
                @mousedown="handleButtonDownHeatDown"
                @mouseup="handleButtonUp"
                @mouseleave="handleButtonUp"
              >
                <icon-material-symbols-arrow-downward class="text-30px" />
              </n-button>
            </template>
          </n-result>
        </n-gi>
        <n-gi>
          <n-result description="低温区开盖">
            <template #icon>
              <icon-material-symbols-aod-rounded class="text-85px text-blue" />
            </template>
            <template #footer>
              <n-button
                style="width: 60%"
                @mouseenter="handleButtonDownColdUp"
                @mouseup="handleButtonUp"
                @mouseleave="handleButtonUp"
              >
                <icon-material-symbols-arrow-upward class="text-30px" />
              </n-button>
              <n-button
                style="width: 60%"
                @mouseenter="handleButtonDownColdDown"
                @mouseup="handleButtonUp"
                @mouseleave="handleButtonUp"
              >
                <icon-material-symbols-arrow-downward class="text-30px" />
              </n-button>
            </template>
          </n-result>
        </n-gi>
        <n-gi>
          <n-result description="一键开盖">
            <template #icon>
              <icon-material-symbols-waving-hand class="text-85px" />
            </template>
            <template #footer>
              <n-button
                style="width: 60%"
                @mouseenter="handleButtonDown"
                @mouseup="handleButtonUp"
                @mouseleave="handleButtonUp"
              >
                <icon-material-symbols-arrow-upward class="text-30px" />
              </n-button>
              <n-button
                style="width: 60%"
                @mouseenter="handleButtonDownAll"
                @mouseup="handleButtonUp"
                @mouseleave="handleButtonUp"
              >
                <icon-material-symbols-arrow-downward class="text-30px" />
              </n-button>
            </template>
          </n-result>
        </n-gi>
      </n-grid>
    </n-modal>
    <n-modal v-model:show="isModalVisible" class="rounded-10px" preset="card" title="文件保存" style="width: 600px">
      <n-form-item label="文件名">
        <n-input
          v-model:value="filename"
          placeholder="请输入文件名"
          :input-props="{ onClick: () => clickOnSaveFileName() }"
        />
      </n-form-item>
      <template style="display: flex; justify-content: flex-end; align-items: center">
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" style="margin-left: 5%" @click="saveFile">保存</n-button>
      </template>
    </n-modal>
    <n-modal v-model:show="fileVisible" class="rounded-10px" preset="card" title="文件列表" style="width: 800px">
      <n-data-table bordered :columns="columns" :data="fileList" :max-height="300" resizable :scroll-x="600">
      </n-data-table>
    </n-modal>
    <n-modal v-model:show="coverShowModalDown" class="rounded-10px" preset="card" title="请输入" style="width: 800px">
      <n-input v-model:value="filename" type="textarea" placeholder="请输入" />
      <key-board-dashboard
        :ref="filename"
        :keyboard-class="keyboardClass"
        :input="filename"
        :max-length="maxlength"
        @onChange="onChange"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onMounted, onBeforeUnmount, h } from 'vue';
import { NButton, NSpace, useDialog, useMessage } from 'naive-ui';
import VacuumAnimation from '@/views/dashboard/analysis/components/VacuumAnimation.vue';
import { deleteFile, fileParam, fileSave, keepGetting, postJson, queryAllFile, saveJson } from '@/service/api/home';
import { closeSocket, createSocket, guid } from '@/service/api/websocket';
import KeyBoardDashboard from '@/views/dashboard/analysis/components/KeyBoardDashboard.vue';
import ParamList from '@/views/dashboard/analysis/components/ParamList.vue';
import OpeningAnimation from '@/views/dashboard/analysis/components/OpeningAnimation.vue';
import { queryHeatValue, updateHeatParam, updateTimeInterval } from '@/service/api/parm';
import VacuumRegister from '@/layouts/common/GlobalHeader/components/vacuumRegister.vue';
import TrayPosition from '@/views/dashboard/analysis/components/trayPosition.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Stove {
  id: number;
  name: string;
  state: number;
  targetTemp: number;
  actualTemp: number;
}
const dialog = useDialog();
const message = useMessage();
const coverShowModal = ref(false);
const settingTemperatureArray = ref(['100', '50', '60', '80', '100', '50', '60', '80']);
const actualTemperatureArray = ref(['80', '70', '60', '80', '100', '30', '50', '80']);
const settingTemperatureArrayDown = ref(['100', '50', '60', '80', '100', '50', '60', '80']);
const actualTemperatureArrayDown = ref(['100', '50', '60', '80', '60', '20', '60', '80']);
const topSwitch = ref([false, false, false, false, false, false, false, false]);
const bottomSwitch = ref([false, false, false, false, false, false, false, false]);
const upperFanArray = ref(['1', '2', '3', '4', '1', '2', '3', '4']);
const settingSpeed = ref(2.0);
const heatValue = ref(10);
const actualSpeed = ref(3.0);
const actualVacuumSpeed = ref(0);
const speed = ref(0);
const settingO2 = ref(2);
const actualO2 = ref(3);
const settingSupportHeight = ref([0, 0]);
const actualSupportHeight = ref([0, 0]);
const settingSupportWidth = ref([0, 0]);
const actualSupportWidth = ref([0, 0]);
const settingTrackWidth = ref([0, 0]);
const actualTrackWidth = ref([0, 0]);
const machineState = ref(0);
const startButton = ref(false);
const pauseButton = ref(false);
const eStopButton = ref(false);
const airFlowOutStatus = ref(false);
const absTempereture = ref([]);
const absFanState = ref([false, false, false, false, false, false, false, false]);
const tagName = 'dashboardAnalysis';
const uuid = ref('');
const statePV = ref(0);
const duringTime = ref(0);
const holdingTime = ref(0);
const rebackTime = ref(0);
const wholeStatus = ref(false);
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));
const countDown = (second: number) => `启动中：倒计时 ${second} 秒`;
const countDown1 = (second: number) => `停止中：倒计时 ${second} 秒`;
const countDown2 = (second: number) => `急停中：倒计时 ${second} 秒`;
const statusCode = ref(2);
const statusName = ref('');
const isModalVisible = ref(false);
const fileVisible = ref(false);
const filename = ref('');
const currentFile = ref('');
const InSensorEntrance = ref(true);
const InSensorvacuum = ref(true);
const OutSensorvacuum = ref(true);
const OutSensorExport = ref(true);
const startTime = ref(0);
const endTime = ref(0);
const coverShowModalDown = ref(false);
const vacuumMode1SV = ref(0);
const vacuumMode2SV = ref(0);
const vacuumMode3SV = ref(0);
const vacuumMode = ref(0);
const vacuumSettingValue = ref(0);
const maxlength = ref(999);
const vacuumValue = ref(0);
const vacuumSwitch = ref(false);
const trackStatus = ref(false);
const fanStatus = ref(false);
const model3SetTimes = ref(0);
const autoStatus = ref(false);
let timer;
let interval;
let delay;
interface trackObject {
  id: number;
  width: number;
  distanceLeft: number;
}
const trayList = reactive([]);
const vacuumTrayList = reactive([]);
const furnaceAreaLength = ref(454);
const currentDivWidth = ref(0);
const lowerFanArray = ref([1, 1, 1, 1, 1, 1, 1, 1]);
const stoves: Stove[] = reactive([
  {
    id: 1,
    name: 'warm1',
    state: 0,
    targetTemp: 130,
    actualTemp: 130
  },
  {
    id: 2,
    name: 'warm2',
    state: 0,
    targetTemp: 180,
    actualTemp: 197
  },
  {
    id: 3,
    name: 'warm3',
    state: 0,
    targetTemp: 185,
    actualTemp: 191
  },
  {
    id: 4,
    name: 'hot4',
    state: 0,
    targetTemp: 205,
    actualTemp: 168
  },
  {
    id: 5,
    name: 'hot5',
    state: 0,
    targetTemp: 205,
    actualTemp: 168
  },
  {
    id: 5,
    name: 'vacuum1',
    state: 0,
    targetTemp: 205,
    actualTemp: 207
  },
  {
    id: 6,
    name: 'cool1',
    state: 0,
    targetTemp: 205,
    actualTemp: 168
  },
  {
    id: 7,
    name: 'cool2',
    state: 0,
    targetTemp: 205,
    actualTemp: 168
  }
]);
const fileList = ref([]);
const columns = [
  {
    title: '序号',
    key: 'id',
    align: 'center',
    minWidth: '50px'
  },
  {
    title: '文件名',
    key: 'fileName',
    align: 'center',
    minWidth: '200px'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(row) {
      return h(NSpace, null, {
        default: () => [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              color: 'green',
              size: 'small',
              onClick: () => {
                initFileData(row);
              }
            },
            { default: () => '载入文件' }
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              color: 'blue',
              size: 'small',
              onClick: () => {
                handleSuccess(row);
              }
            },
            { default: () => '删除文件' }
          )
        ]
      });
    }
  }
];

watch(startButton, newValue => {
  for (const stove in stoves) {
    if (newValue) {
      stoves[stove].state = 1;
    } else {
      stoves[stove].state = 0;
    }
  }
  console.log(stoves);
});
watch(InSensorEntrance, async newValue => {});
watch(OutSensorExport, newValue => {});
watch(InSensorvacuum, newValue => {
  if (newValue == false) {
    console.log('进真空');
  }
});
watch(OutSensorvacuum, newValue => {
  if (newValue == false) {
    console.log('出真空');
    clearInterval(delay);
  }
  // if (newValue == false) {
  // } else if (newValue == true) {
  //   if (trayList.length > 0) {
  //     const newObj = trayList[0];
  //     trayList.shift();
  //     for (let i = 0; i < trayList.length; i++) {
  //       trayList[i].id = i + 1;
  //     }
  //     vacuumTrayList.push(newObj);
  //     for (let i = 0; i < vacuumTrayList.length; i++) {
  //       vacuumTrayList[i].id = i + 1;
  //     }
  //     updateDataVacuum();
  //   }
  // }
});
// watch(
//   trayList,
//   newValue => {
//     console.log(newValue, 111);
//     setTimeout(() => {
//       updateData();
//     }, 1000);
//   },
//   { deep: true }
// );

function changeStatus() {
  const d = dialog.success({
    title: '警告',
    content: '确定开启炉区吗？',
    positiveText: '确认',
    onPositiveClick: () => {
      d.loading = true;
      return new Promise(resolve => {
        sleep()
          .then(() => {
            d.content = countDown(2);
            return sleep();
          })
          .then(() => {
            d.content = countDown(1);
            return sleep();
          })
          .then(() => {
            // message.success(`设备状态为：${statusName.value}`);
            d.content = countDown(0);
            wholeStatus.value = true;
            startButton.value = true;
            setTimeout(() => {
              resetStatus();
            }, 200);
            const Param = {
              result: startButton.value,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.StartButton_HMI'
            };
            const Param1 = {
              result: false,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.StopButton_HMI'
            };
            const Param2 = {
              result: false,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.EStopButton_HMI'
            };
            const arr = [];
            arr.push(Param);
            arr.push(Param1);
            arr.push(Param2);
            saveJson(arr);
            wholeStatus.value = true;
            setTimeout(() => {
              resetStatus();
            }, 500);
            fanStatus.value = true;
            message.success(`设备状态为：${statusName.value}`);
            // if (statusCode.value == '2') {
            //   message.success('设备启动成功');
            // } else {
            //   message.error('设备启动失败');
            // }
          })
          .then(resolve);
      });
    }
  });
}
function changeStatusName() {
  if (statusCode.value == '0') {
    statusName.value = '手动状态';
  } else if (statusCode.value == '1') {
    statusName.value = '待机状态';
  } else if (statusCode.value == '2') {
    statusName.value = '自动运行状态';
  } else if (statusCode.value == '3') {
    statusName.value = '未回原';
  } else if (statusCode.value == '4') {
    statusName.value = '回原中';
  } else if (statusCode.value == '5') {
    statusName.value = '单步状态';
  } else if (statusCode.value == '6') {
    statusName.value = '暂停状态';
  } else if (statusCode.value == '7') {
    statusName.value = '停机过程中';
  } else if (statusCode.value == '8') {
    statusName.value = '设备报警';
  } else {
    statusName.value = '急停中';
  }
}
async function chickPause() {
  const d = dialog.error({
    title: '警告',
    content: '确定停止吗？',
    positiveText: '确认',
    onPositiveClick: () => {
      d.loading = true;
      return new Promise(resolve => {
        sleep()
          .then(() => {
            d.content = countDown1(2);
            return sleep();
          })
          .then(() => {
            d.content = countDown1(1);
            return sleep();
          })
          .then(() => {
            d.content = countDown1(0);
            pauseButton.value = true;
            const Param = {
              result: false,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.StartButton_HMI'
            };
            const Param1 = {
              result: pauseButton.value,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.StopButton_HMI'
            };
            const Param2 = {
              result: false,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.EStopButton_HMI'
            };
            const arr = [];
            arr.push(Param);
            arr.push(Param1);
            arr.push(Param2);
            saveJson(arr);
            wholeStatus.value = false;
            setTimeout(() => {
              wholeStatus.value = false;
              resetStatus();
            }, 500);
            message.success(`设备状态为：${statusName.value}`);
            fanStatus.value = false;
            // if (statusCode.value == '7') {
            //   message.success('设备停止成功');
            // } else {
            //   message.error('设备停止失败');
            //   wholeStatus.value = false;
            // }
          })
          .then(resolve);
      });
    }
  });
}
async function chickES() {
  const d = dialog.warning({
    title: '警告',
    content: '确定急停吗？',
    positiveText: '确认',
    onPositiveClick: () => {
      d.loading = true;
      return new Promise(resolve => {
        sleep()
          .then(() => {
            d.content = countDown2(2);
            return sleep();
          })
          .then(() => {
            d.content = countDown2(1);
            return sleep();
          })
          .then(() => {
            d.content = countDown2(0);
            wholeStatus.value = false;
            eStopButton.value = true;
            const Param = {
              result: false,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.StartButton_HMI'
            };
            const Param1 = {
              result: false,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.StopButton_HMI'
            };
            const Param2 = {
              result: eStopButton.value,
              dataType: 'boolean',
              name: 'Application.GVL_PLC.EStopButton_HMI'
            };
            const arr = [];
            arr.push(Param);
            arr.push(Param1);
            arr.push(Param2);
            saveJson(arr);
            wholeStatus.value = false;
            fanStatus.value = false;
            message.success(`设备状态为：${statusName.value}`);
            // if (statusCode.value == '9') {
            //   message.success('设备急停成功');
            // } else {
            //   message.error('设备急停失败');
            //   wholeStatus.value = false;
            // }
          })
          .then(resolve);
      });
    }
  });
}
function pushHeat() {
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogFwd[0]'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('开盖中...');
  dialog.success({
    title: '一键开盖启动中',
    content: '停止请按确认',
    positiveText: '确定',
    maskClosable: false,
    onPositiveClick: () => {
      message.success('已经停止');
      const Param3 = {
        result: false,
        dataType: 'boolean',
        name: 'Application.GVL06_Linak.stLinak_i_JogFwd[0]'
      };
      const arr1 = [];
      arr1.push(Param3);
      saveJson(arr1);
    }
  });
}
function downHeat() {
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogRev[0]'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('关盖中...');
  dialog.success({
    title: '一键关盖启动中',
    content: '停止请按确认',
    positiveText: '确定',
    maskClosable: false,
    onPositiveClick: () => {
      message.success('已经停止');
      const Param3 = {
        result: false,
        dataType: 'boolean',
        name: 'Application.GVL06_Linak.stLinak_i_JogRev[0]'
      };
      const arr1 = [];
      arr1.push(Param3);
      saveJson(arr1);
    }
  });
}
function pushCold() {
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogFwd[1]'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('开盖中...');
  dialog.success({
    title: '一键开盖启动中',
    content: '停止请按确认',
    positiveText: '确定',
    maskClosable: false,
    onPositiveClick: () => {
      message.success('已经停止');
      const Param3 = {
        result: false,
        dataType: 'boolean',
        name: 'Application.GVL06_Linak.stLinak_i_JogFwd[1]'
      };
      const arr1 = [];
      arr1.push(Param3);
      saveJson(arr1);
    }
  });
}
function downCold() {
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogRev[1]'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('关盖中...');
  dialog.success({
    title: '一键关盖启动中',
    content: '停止请按确认',
    positiveText: '确定',
    maskClosable: false,
    onPositiveClick: () => {
      message.success('已经停止');
      const Param3 = {
        result: false,
        dataType: 'boolean',
        name: 'Application.GVL06_Linak.stLinak_i_JogRev[1]'
      };
      const arr1 = [];
      arr1.push(Param3);
      saveJson(arr1);
    }
  });
}
onMounted(async () => {
  initHeatParam();
  window.requestAnimationFrame(getWidth);
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
    'Application.HMI_TrackConfig.h_rMiddleSupportHightSV': 'floats',
    'Application.HMI_TrackConfig.h_rMiddleSupportHightPV': 'floats',
    'Application.HMI_TrackConfig.h_rMiddleSupportWidthSV': 'floats',
    'Application.HMI_TrackConfig.h_rMiddleSupportWidthPV': 'floats',
    'Application.HMI_TrackConfig.h_rTrackWidthSV': 'floats',
    'Application.HMI_TrackConfig.h_rTrackWidthPV': 'floats',
    'Application.HMI_HomePage.h_rChainSpeedPV[10]': 'float',
    'Application.HMI_HomePage.h_rChainSpeedSV[0]': 'float',
    'Application.HMI_N2Config.h_rO2_PV[0]': 'float',
    'Application.HMI_N2Config.h_rO2_SV[0]': 'float',
    'Application.GVL_PLC.StartButton_HMI': 'boolean',
    'Application.GVL_PLC.StopButton_HMI': 'boolean',
    'Application.GVL_PLC.MachineState': 'int',
    'Application.GVL_PLC.Manu_Auto_HMI': 'boolean',
    'Application.HMI_HomePage.h_xABSzoneFanState': 'booleans',
    'Application.HMI_HomePage.h_rAbsZoneTempereturePV': 'floats',
    'Application.HMI_HomePage.h_xAirFlowOut': 'boolean',
    'Application.GVL06_Linak.stlinak_o_ClosedOK': 'boolean',
    'Application.HMI_VacuumConfig.h_rVacuumPV': 'float',
    'Application.HMI_CountConfig.h_xInSensorEntrance': 'boolean',
    'Application.HMI_CountConfig.h_xInSensorvacuum': 'boolean',
    'Application.HMI_CountConfig.h_xOutSensorvacuum': 'boolean',
    'Application.HMI_CountConfig.h_xOutSensorExport': 'boolean',
    'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2SV[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3SV[0]': 'float',
    'Application.HMI_VacuumConfig.h_iVacuumMode': 'short',
    'Application.HMI_VacuumConfig.h_rVacuumStatePV': 'float',
    'Application.HMI_VacuumConfig.h_xVacuumValueSwitch': 'boolean',
    'Application.HMI_VacuumConfig.h_xstaxis2_ContinuousMotion': 'boolean',
    'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_UP': 'booleans',
    'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_UP': 'booleans',
    'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_UP': 'booleans',
    'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_UP': 'booleans',
    'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_Down': 'booleans',
    'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_Down': 'booleans',
    'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_Down': 'booleans',
    'Application.HMI_HomePage.h_rChainSpeedPV[12]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3SetTimes': 'short',
    'Application.HMI_VacuumConfig.h_rVacuumMode1HoldingTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode1DuringTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode1RebackTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2HoldingTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2DuringTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode2RebackTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3HoldingTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3DuringTime[0]': 'float',
    'Application.HMI_VacuumConfig.h_rVacuumMode3RebackTime[0]': 'float'
  };
  keepGetting(tagName, param);
});
onBeforeUnmount(() => {
  closeSocket();
});
function updateData() {
  const speedValue = ((speed.value / 10) * currentDivWidth.value) / furnaceAreaLength.value;
  clearInterval(timer);
  timer = setInterval(() => {
    trayList.forEach(data => {
      data.distanceLeft += speedValue;
    });
  }, 1000);
}
function updateDataVacuum() {
  const speedValue = ((actualVacuumSpeed.value / 10) * currentDivWidth.value) / furnaceAreaLength.value;
  clearInterval(timer);
  timer = setInterval(() => {
    trayList.forEach(data => {
      data.distanceLeft += speedValue;
    });
  }, 1000);
}
function getWidth() {
  const trackElement = document.getElementById('trackElement');
  if (trackElement) {
    const divWidth = trackElement.offsetWidth;
    currentDivWidth.value = divWidth;
  } else {
    console.log('Track element not found.');
  }
}
function handleWsMsg(e: any) {
  const data = JSON.parse(e.detail.data.data);
  if (data) {
    const {
      'Application.HMI_TrackConfig.h_rMiddleSupportHightSV': settingSupHeightValue,
      'Application.HMI_TrackConfig.h_rMiddleSupportHightPV': actualSupHeightValue,
      'Application.HMI_TrackConfig.h_rMiddleSupportWidthSV': settingSupWidthValue,
      'Application.HMI_TrackConfig.h_rMiddleSupportWidthPV': actualSupWidthValue,
      'Application.HMI_TrackConfig.h_rTrackWidthSV': settingTrackValue,
      'Application.HMI_TrackConfig.h_rTrackWidthPV': actualTrackValue,
      'Application.HMI_HomePage.h_rChainSpeedPV[10]': SpeedPVValue,
      'Application.HMI_HomePage.h_rChainSpeedSV[0]': SpeedSVValue,
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
      'Application.HMI_HomePage.h_xABSzoneFanState': aBSzoneFanState,
      'Application.HMI_HomePage.h_rAbsZoneTempereturePV': absZoneTempereturePV,
      'Application.HMI_HomePage.h_xAirFlowOut': airFlowOut,
      'Application.HMI_N2Config.h_rO2_PV[0]': actualOxygenContentValue,
      'Application.HMI_N2Config.h_rO2_SV[0]': settingOxygenContentValue,
      'Application.HMI_VacuumConfig.h_rVacuumPV': statePVValue,
      'Application.GVL_PLC.MachineState': machineStateValue,
      'Application.GVL_PLC.Manu_Auto_HMI': autoValue,
      'Application.GVL_PLC.StartButton_HMI': startButtonValue,
      'Application.GVL_PLC.StopButton_HMI': pauseButtonValue,
      'Application.HMI_CountConfig.h_xInSensorEntrance': inSensorEntranceValue,
      'Application.HMI_CountConfig.h_xInSensorvacuum': inSensorvacuumValue,
      'Application.HMI_CountConfig.h_xOutSensorvacuum': outSensorvacuumValue,
      'Application.HMI_CountConfig.h_xOutSensorExport': outSensorExportValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]': VacuumMode1SVValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode2SV[0]': rVacuumMode2SVValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3SV[0]': rVacuumMode3SVValue,
      'Application.HMI_VacuumConfig.h_iVacuumMode': vacuumModeValue,
      'Application.HMI_VacuumConfig.h_rVacuumStatePV': vacuumActualValue,
      'Application.HMI_VacuumConfig.h_xVacuumValueSwitch': vacuumSwitchValue,
      'Application.HMI_VacuumConfig.h_xstaxis2_ContinuousMotion': trackStatusValue,
      'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_UP': preHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_UP': highHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_UP': vacuumHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xColdHeatZoneTempretureOnOffSwitch_UP': coldHeatSwitchUpValue,
      'Application.HMI_HomePage.h_xPreHeatZoneTempretureOnOffSwitch_Down': preHeatSwitchDownValue,
      'Application.HMI_HomePage.h_xHighHeatZoneTempretureOnOffSwitch_Down': highHeatSwitchDownValue,
      'Application.HMI_HomePage.h_xVacuumHeatZoneTempretureOnOffSwitch_Down': vacuumHeatSwitchDownValue,
      'Application.HMI_HomePage.h_rChainSpeedPV[12]': vacuumSpeedValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3SetTimes': model3SetTimesValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1HoldingTime[0]': model1HoldingTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1DuringTime[0]': model1DuringTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode1RebackTime[0]': model1RebackTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode2HoldingTime[0]': model2HoldingTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode2DuringTime[0]': model2DuringTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode2RebackTime[0]': model2RebackTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3HoldingTime[0]': model3HoldingTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3DuringTime[0]': model3DuringTimeValue,
      'Application.HMI_VacuumConfig.h_rVacuumMode3RebackTime[0]': model3RebackTimeValue
    } = data.result;
    if (machineStateValue == '2') {
      wholeStatus.value = true;
      fanStatus.value = true;
    } else {
      wholeStatus.value = false;
      fanStatus.value = false;
    }
    changeStatusName();
    if (model3SetTimesValue) {
      model3SetTimes.value = Number(model3SetTimesValue) * 2;
    }
    vacuumMode.value = vacuumModeValue;
    vacuumMode1SV.value = VacuumMode1SVValue;
    vacuumMode2SV.value = rVacuumMode2SVValue;
    vacuumMode3SV.value = rVacuumMode3SVValue;
    InSensorvacuum.value = inSensorvacuumValue;
    InSensorEntrance.value = inSensorEntranceValue;
    OutSensorvacuum.value = outSensorvacuumValue;
    OutSensorExport.value = outSensorExportValue;
    statusCode.value = machineStateValue;
    machineState.value = machineStateValue;
    startButton.value = startButtonValue;
    pauseButton.value = pauseButtonValue;
    vacuumValue.value = vacuumActualValue;
    vacuumSwitch.value = vacuumSwitchValue;
    trackStatus.value = trackStatusValue;
    if (autoValue) {
      autoStatus.value = autoValue;
    }
    actualVacuumSpeed.value = Math.abs(Number(vacuumSpeedValue));
    // const array = [];
    // console.log(111)
    // if (vacuumSwitch.value != undefined) {
    //   interval = setInterval(() => {
    //     if (vacuumSwitch.value) {
    //       array.push(vacuumValue.value);
    //     } else if (array.length > 0) {
    //       console.log(array, '数组');
    //       clearInterval(interval);
    //     }
    //   }, 1000);
    // }
    if (settingSupHeightValue) {
      settingSupportHeight.value = settingSupHeightValue.slice(0, 2);
    }
    if (actualSupHeightValue) {
      actualSupportHeight.value = actualSupHeightValue.slice(0, 2);
    }
    if (settingSupWidthValue) {
      settingSupportWidth.value = settingSupWidthValue.slice(0, 2);
    }
    if (actualSupWidthValue) {
      actualSupportWidth.value = actualSupWidthValue.slice(0, 2);
    }
    if (settingTrackValue) {
      settingTrackWidth.value = settingTrackValue.slice(0, 2);
    }
    if (actualTrackValue) {
      actualTrackWidth.value = actualTrackValue.slice(0, 2);
    }
    if (SpeedPVValue) {
      actualSpeed.value = convertMmPerSecToMPerMin(SpeedPVValue);
    }
    if (SpeedSVValue) {
      settingSpeed.value = convertMmPerSecToMPerMin(SpeedSVValue);
    }
    speed.value = Math.abs(Number(vacuumSpeedValue));
    if (vacuumModeValue == 1) {
      vacuumSettingValue.value = vacuumMode1SV.value;
      if (model1DuringTimeValue && model1HoldingTimeValue && model1RebackTimeValue) {
        duringTime.value = Number(model1DuringTimeValue) / 1000;
        holdingTime.value = Number(model1HoldingTimeValue) / 1000;
        rebackTime.value = Number(model1RebackTimeValue) / 1000;
      }
    } else if (vacuumModeValue == 2) {
      vacuumSettingValue.value = vacuumMode2SV.value;
      if (model2DuringTimeValue && model2HoldingTimeValue && model2RebackTimeValue) {
        duringTime.value = Number(model2DuringTimeValue) / 1000;
        holdingTime.value = Number(model2HoldingTimeValue) / 1000;
        rebackTime.value = Number(model2RebackTimeValue) / 1000;
      }
    } else if (vacuumModeValue == 3) {
      vacuumSettingValue.value = vacuumMode3SV.value;
      if (model3DuringTimeValue && model3HoldingTimeValue && model3RebackTimeValue) {
        duringTime.value = Number(model3DuringTimeValue) / 1000;
        holdingTime.value = Number(model3HoldingTimeValue) / 1000;
        rebackTime.value = Number(model3RebackTimeValue) / 1000;
      }
    }
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
            .concat(
              settingVacuumArrayValue
                .slice(0, 1)
                .concat(settingBurialArrayValue.slice(0, 1).concat(settingBurialArrayValue.slice(0, 1)))
            )
        );
      settingArray[7] = actualTemperatureArray.value[7];
      settingTemperatureArray.value = settingArray;
    }
    if (actualPreheatArrayValue && actualHighTemperatureArrayValue && actualBurialArrayValue) {
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
            .concat(
              settingVacuumArrayValue
                .slice(0, 1)
                .concat(settingBurialArrayValue.slice(0, 1).concat(settingBurialArrayValue.slice(0, 1)))
            )
        );
      settingArrayDown[7] = actualTemperatureArrayDown.value[7];
      settingTemperatureArrayDown.value = settingArrayDown;
    }
    if (actualPreheatArrayValueDown && actualHighTemperatureArrayValueDown && actualBurialArrayValue) {
      const actualArrayDown = actualPreheatArrayValueDown
        .slice(0, 3)
        .concat(
          actualHighTemperatureArrayValueDown
            .slice(0, 2)
            .concat(actualVacuumArrayValue.slice(0, 1).concat(actualBurialArrayValue.slice(0, 2)))
        );
      actualTemperatureArrayDown.value = actualArrayDown;
    }
    if (preHeatSwitchUpValue && highHeatSwitchUpValue && coldHeatSwitchUpValue) {
      const upSwitchObj = preHeatSwitchUpValue
        .slice(0, 3)
        .concat(
          highHeatSwitchUpValue
            .slice(0, 2)
            .concat(
              vacuumHeatSwitchUpValue
                .slice(0, 1)
                .concat(coldHeatSwitchUpValue.slice(0, 1).concat(coldHeatSwitchUpValue.slice(0, 1)))
            )
        );
      upSwitchObj[7] = true;
      topSwitch.value = upSwitchObj;
    }
    if (preHeatSwitchDownValue && highHeatSwitchDownValue && vacuumHeatSwitchDownValue && coldHeatSwitchUpValue) {
      const downSwitchObj = preHeatSwitchDownValue
        .slice(0, 3)
        .concat(
          highHeatSwitchDownValue
            .slice(0, 2)
            .concat(
              vacuumHeatSwitchDownValue
                .slice(0, 1)
                .concat(coldHeatSwitchUpValue.slice(0, 1).concat(coldHeatSwitchUpValue.slice(0, 1)))
            )
        );
      downSwitchObj[7] = true;
      bottomSwitch.value = downSwitchObj;
    }
    airFlowOutStatus.value = airFlowOut;
    absTempereture.value = absZoneTempereturePV;
    absFanState.value = aBSzoneFanState;
    if (settingOxygenContentValue) {
      const value = Number(settingOxygenContentValue) * 10000;
      settingO2.value = value.toFixed(2);
    }
    if (actualOxygenContentValue) {
      if (Number(actualOxygenContentValue) < 1) {
        const value = Number(actualOxygenContentValue) * 10000;
        actualO2.value = value.toFixed(2);
      } else {
        actualO2.value = `${Number(actualOxygenContentValue).toFixed(2)}%`;
      }
    }
    statePV.value = statePVValue;
    if (upFanArrayValue && upFanArrayValue.length > 0) {
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
  }
}
async function queryStatus() {
  const param = {
    'Application.GVL_PLC.MachineState': 'int'
  };
  const { data } = await postJson(param);
  if (data) {
    const { 'Application.GVL_PLC.MachineState': machineStateValue } = data;
    console.log(machineStateValue, '状态码');
    statusCode.value = machineStateValue;
    machineState.value = machineStateValue;
  }
}
function resetStatus() {
  const Param = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL_PLC.StartButton_HMI'
  };
  const Param1 = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL_PLC.StopButton_HMI'
  };
  const Param2 = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL_PLC.EStopButton_HMI'
  };
  const arr = [];
  arr.push(Param);
  arr.push(Param1);
  arr.push(Param2);
  saveJson(arr);
}
function handleButtonDown() {
  console.log('down');
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogFwdAll'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('开盖中...');
}
function handleButtonDownHeatUp() {
  console.log('down');
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogFwd[0]'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('开盖中...');
}
function handleButtonDownHeatDown() {
  console.log('down');
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogRev[0]'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('合盖中...');
}
function handleButtonDownColdUp() {
  console.log('down');
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogFwd[1]'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('开盖中...');
}
function handleButtonDownColdDown() {
  console.log('down');
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogRev[1]'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('合盖中...');
}
function handleButtonDownAll() {
  console.log('down');
  const Param = {
    result: true,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogRevAll'
  };
  const arr = [];
  arr.push(Param);
  saveJson(arr);
  message.success('合盖中...');
}
function handleButtonUp() {
  console.log('松开');
  const Param = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogFwdAll'
  };
  const Param1 = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogRevAll'
  };
  const Param2 = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogFwd[0]'
  };
  const Param3 = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogFwd[1]'
  };
  const Param4 = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogRev[0]'
  };
  const Param5 = {
    result: false,
    dataType: 'boolean',
    name: 'Application.GVL06_Linak.stLinak_i_JogRev[1]'
  };
  const arr = [];
  arr.push(Param);
  arr.push(Param1);
  arr.push(Param2);
  arr.push(Param3);
  arr.push(Param4);
  arr.push(Param5);
  saveJson(arr);
}
function convertMmPerSecToMPerMin(mmPerSec) {
  const mPerSec = Number(mmPerSec) / 1000;
  const mPerMin = mPerSec * 60;
  return mPerMin.toFixed(2);
}
function closeModal() {
  isModalVisible.value = false;
}
function saveFile() {
  fileSave(filename.value);
  isModalVisible.value = false;
  window.$notification?.success({
    title: '文件保存成功!',
    content: `保存成功!`,
    duration: 3000
  });
}
function changeFile() {
  filename.value = '';
  isModalVisible.value = true;
}
async function initAllFile() {
  console.log('数据');
  const { data } = await queryAllFile();
  console.log(data);
}
async function getAllFile() {
  const { data } = await queryAllFile();
  fileList.value = data;
  fileVisible.value = true;
}
function initFileData(row) {
  dialog.success({
    title: '警告',
    content: '是否载入该文件？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      message.success('载入成功');
      currentFile.value = row.fileName;
      const { data } = await fileParam(row.fileName);
      const Param1 = {
        result: true,
        dataType: 'boolean',
        name: 'Application.HMI_TrackConfig.h_xChangeVelocity'
      };
      const arr = [];
      arr.push(Param1);
      const success = await saveJson(arr);
      setTimeout(() => {
        const Param3 = {
          result: false,
          dataType: 'boolean',
          name: 'Application.HMI_TrackConfig.h_xChangeVelocity'
        };
        const arr1 = [];
        arr1.push(Param3);
        saveJson(arr1);
      }, 500);
      fileVisible.value = false;
    },
    onNegativeClick: () => {
      message.error('取消成功');
    }
  });
}
function handleSuccess(row) {
  dialog.success({
    title: '警告',
    content: '是否删除该配置文件吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const { data } = await deleteFile(row.fileName);
      message.success(data);
      getAllFile();
    },
    onNegativeClick: () => {
      message.error('取消成功');
    }
  });
}
function clickOnSaveFileName() {
  filename.value = '';
  if (coverShowModalDown.value === true) {
    coverShowModalDown.value = false;
  } else {
    coverShowModalDown.value = true;
  }
}
async function initHeatParam() {
  const { data } = await queryHeatValue();
  if (data) {
    heatValue.value = Number(data);
  }
}

const onChange = (e: string) => {
  filename.value = e;
};

function clickHome() {
  dialog.warning({
    title: '警告',
    content: '是否回原？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const Param1 = {
        result: true,
        dataType: 'boolean',
        name: 'Application.GVL_PLC.HomeButton_HMI'
      };
      const arr = [];
      arr.push(Param1);
      const success = await saveJson(arr);
      setTimeout(() => {
        const Param3 = {
          result: false,
          dataType: 'boolean',
          name: 'Application.GVL_PLC.HomeButton_HMI'
        };
        const arr1 = [];
        arr1.push(Param3);
        saveJson(arr1);
      }, 500);
      console.log(success);
      message.success('回原成功');
    },
    onNegativeClick: () => {
      message.error('取消回原');
    }
  });
}
function clickAuto() {
  dialog.warning({
    title: '警告',
    content: '是否切回手动？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const Param1 = {
        result: !autoStatus.value,
        dataType: 'boolean',
        name: 'Application.GVL_PLC.Manu_Auto_HMI'
      };
      const arr = [];
      arr.push(Param1);
      const success = await saveJson(arr);
    },
    onNegativeClick: () => {
      message.error('取消回原');
    }
  });
}
function clickManmual() {
  dialog.warning({
    title: '警告',
    content: '是否切回自动？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const Param1 = {
        result: !autoStatus.value,
        dataType: 'boolean',
        name: 'Application.GVL_PLC.Manu_Auto_HMI'
      };
      const arr = [];
      arr.push(Param1);
      const success = await saveJson(arr);
    },
    onNegativeClick: () => {
      message.error('取消回原');
    }
  });
}
</script>

<style scoped>
.full-height {
  height: 100%;
}
.profile {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
}
.light-green {
  font-size: 12px;
  width: 70%;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
}
.dom-rotate {
  animation: rotate 2s linear infinite;
  width: 70%;
}
@keyframes rotate {
  /* 需要兼容的自行补入噢 */
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.outlet {
  height: 30px;
  background-color: #b8bcb8;
}
.top-stove {
  width: 90%;
  height: 140px;
  margin-left: 3%;
  box-shadow: 4px 4px 15px #909090;
}
.bottom-stove {
  width: 90%;
  height: 210px;
  margin-left: 3%;
  box-shadow: 4px 4px 15px #909090;
}
.stove-item {
  display: inline-block;
}
.block-center {
  display: block;
  margin: auto;
}
.tray {
  height: 30px;
  background-color: #eeeeee;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.tray-item {
  position: absolute;
  top: 0;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
