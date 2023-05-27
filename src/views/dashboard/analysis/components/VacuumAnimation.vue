<template>
  <n-card :bordered="false" style="height: 100%">
    <div class="w-full h-288px">
      <div style="height: 250px">
        <n-card :bordered="false" class="rounded-1px shadow-sm">
          <div id="chart-container" class="h-210px w-490px"></div>
        </n-card>
      </div>
      <div style="margin-top: 12px; height: 14px">
        <n-grid :item-responsive="true" :x-gap="16">
          <n-grid-item span="0:6 640:6 1024:6">
            <div style="height: 100%">
              <span class="py-2px text-18px" style="padding-left: 2px">真空</span>
              <n-button type="primary" size="tiny" style="width: 30px">{{ statePV }}</n-button>
              <span class="py-2px text-18px" style="padding-left: 2px">mbar</span>
            </div>
          </n-grid-item>
          <n-grid-item span="0:6 640:6 1024:6">
            <div style="height: 100%">
              <span class="py-2px text-18px" style="padding-left: 2px">真空</span>
              <n-button type="primary" size="tiny" style="width: 30px">{{ duringTime }}</n-button>
              <span class="py-2px text-18px" style="padding-left: 2px">秒</span>
            </div>
          </n-grid-item>
          <n-grid-item span="0:6 640:6 1024:6">
            <div style="height: 100%">
              <span class="py-2px text-18px" style="padding-left: 2px">保持</span>
              <n-button type="primary" size="tiny" style="width: 30px">{{ holdingTime }}</n-button>
              <span class="py-2px text-18px" style="padding-left: 2px">秒</span>
            </div>
          </n-grid-item>
          <n-grid-item span="0:6 640:6 1024:6">
            <div style="height: 100%">
              <span class="py-2px text-18px" style="padding-left: 2px">回压</span>
              <n-button type="primary" size="tiny" style="width: 30px">{{ rebackTime }}</n-button>
              <span class="py-2px text-18px" style="padding-left: 2px">秒</span>
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { defineProps, onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue';
import * as echarts from 'echarts/core';
import type {
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption
} from 'echarts/components';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import type { LineSeriesOption } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { clear } from 'winston';
import { useEcharts } from '@/composables';
import type { ECOption } from '@/composables';
import { saveJson } from '@/service/api/home';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

defineOptions({ name: 'VacuumAnimation' });
const isOpened = ref(true);
const percent = ref(0);
const progress = ref(0);
let intervalId;
let intervalId2;
let intervalId3;
let intervalId4;
let intervalVacuum;
let vacuumMode2;
let vacuumMode3;
const decreaseProgress = ref(100);
const animationNum = ref(0);
const statePV = ref(0);
const finalStatePV = ref('');
const duringTime = ref(0);
const finalDuringTime = ref('');
const holdingTime = ref(0);
const finalHoldingTime = ref('');
const rebackTime = ref(0);
const finalRebackTime = ref('');
const coverShowModal = ref(false);
const coverShowModalDuring = ref(false);
const coverShowModalHolding = ref(false);
const coverShowModalReback = ref(false);
const modelValue = ref(0);
const maxlength = ref(999);
const minValue = ref(0);
const maxValue = ref(0);
const tagName = 'VacuumAnimation';
const vacuumValue = ref(0);
const vacuumSwitch = ref(false);
const vacuumMode = ref(0);
const startTime = ref(0);
const endTime = ref(0);
const model3Times = ref(0);
const isActive = ref(false);
const numbers = ref([]);
const model2Number = ref([]);
const model3Number = ref([]);
const countNum = ref(0);
const countModel3Num = ref(0);
const uuid = ref('');
let dom = null;
const lineOptions = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  title: {
    text: '真空曲线'
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: '1%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30'
    ]
  },
  yAxis: {
    type: 'value',
    max: 1500
  },
  series: [
    {
      name: 'Vacuum',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#fff'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ]
}) as Ref<ECOption>;
const { domRef: lineRef } = useEcharts(lineOptions);
const props = defineProps({
  displayValue: {
    default: 0
  },
  duringTime: { default: 0 },
  holdingTime: { default: 0 },
  rebackTime: { default: 0 },
  mode: { default: 0 },
  vacuumValue: { default: 0 },
  vacuumSwitch: { default: false },
  trackStatus: { default: false },
  vacuumMode: { default: 0 },
  model3SettingTimes: { default: 0 }
});
onMounted(async () => {
  // console.log(111111111);
  // startAddingNumbers();
  dom = document.getElementById('chart-container');
  const myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    title: {
      text: '真空曲线'
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '1%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30'
      ]
    },
    yAxis: {
      type: 'value',
      max: 1024
    },
    series: [
      {
        name: 'Vacuum',
        type: 'line',
        smooth: true,
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.25,
                color: '#fff'
              },
              {
                offset: 1,
                color: '#fff'
              }
            ]
          }
        },
        emphasis: {
          focus: 'series'
        },
        data: [0]
      }
    ]
  };

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);

  intervalId = setTimeout(() => {
    const echartsDatas = [0];
    const echartsDatas1 = [];
    const option2 = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30'
        ]
      },
      series: [
        {
          data: echartsDatas,
          type: 'line'
        }
      ]
    };
    myChart.setOption(option2);
    // console.info(echartsDatas);
  }, 100);
});
onUnmounted(() => {
  clearInterval(intervalId);
});
function clickContainer() {
  isOpened.value = !isOpened.value;
  animationNum.value = 0;
  percent.value = 0;
  decreaseProgress.value = 100;
  progress.value = 0;
  const timer = setInterval(() => {
    // eslint-disable-next-line no-plusplus
    percent.value++;
    if (percent.value === 99) {
      clearInterval(timer);
      percent.value = 100;
      isOpened.value = false;
      animationNum.value = 1;
      setTimeout(() => {
        let timer1;
        let timer2;

        const updateProgress = () => {
          if (progress.value < 100) {
            progress.value += 5;
          }
          animationNum.value = 2;
          if (progress.value >= 100) {
            animationNum.value = 3;
            clearInterval(timer1);
            timer2 = setInterval(() => {
              if (decreaseProgress.value > 0) {
                decreaseProgress.value -= 5;
              } else {
                clearInterval(timer2);
              }
            }, 500);
          }
        };

        timer1 = setInterval(updateProgress, 300);
      }, 2000);
    }
  }, 50);
}
function clickOn() {
  if (coverShowModal.value === true) {
    coverShowModal.value = false;
  } else {
    coverShowModal.value = true;
  }
  finalStatePV.value = '';
  minValue.value = 1;
  maxValue.value = 999;
}
function clickOnDuring() {
  if (coverShowModalDuring.value === true) {
    coverShowModalDuring.value = false;
  } else {
    coverShowModalDuring.value = true;
  }
  finalDuringTime.value = '';
  minValue.value = 5;
  maxValue.value = 99;
}
function clickOnHolding() {
  if (coverShowModalHolding.value === true) {
    coverShowModalHolding.value = false;
  } else {
    coverShowModalHolding.value = true;
  }
  finalHoldingTime.value = '';
  minValue.value = 5;
  maxValue.value = 99;
}
function clickOnReback() {
  if (coverShowModalReback.value === true) {
    coverShowModalReback.value = false;
  } else {
    coverShowModalReback.value = true;
  }
  finalRebackTime.value = '';
  minValue.value = 5;
  maxValue.value = 99;
}
function onChange(e) {
  finalStatePV.value = e;
}
function onChangeDuring(e) {
  finalDuringTime.value = e;
}
function onChangeHolding(e) {
  finalHoldingTime.value = e;
}
function onChangeReback(e) {
  finalRebackTime.value = e;
}
async function handleKeyPress() {
  if (Number(finalStatePV.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalStatePV.value) > Number(maxValue.value)) {
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
    if (modelValue.value == 1) {
      const Param = {
        result: finalStatePV.value,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode1SV[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (modelValue.value == 2) {
      const Param = {
        result: finalStatePV.value,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode2SV[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    } else if (modelValue.value == 3) {
      const Param = {
        result: finalStatePV.value,
        dataType: 'float',
        name: 'Application.HMI_VacuumConfig.h_rVacuumMode3SV[0]'
      };
      const arr = [];
      arr.push(Param);
      const success = await saveJson(arr);
      console.log(success);
    }
  }
}
async function onKeyPressReback() {
  if (Number(finalRebackTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalRebackTime.value) > Number(maxValue.value)) {
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
      result: finalRebackTime.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumRebackTime'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPressHolding() {
  if (Number(finalHoldingTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalHoldingTime.value) > Number(maxValue.value)) {
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
      result: finalHoldingTime.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumHoldingTime'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
async function onKeyPressDuring() {
  if (Number(finalDuringTime.value) < Number(minValue.value)) {
    window.$notification?.error({
      title: '保存失败',
      content: `小于设定最小值!`,
      duration: 3000
    });
  } else if (Number(finalDuringTime.value) > Number(maxValue.value)) {
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
      result: finalDuringTime.value,
      dataType: 'float',
      name: 'Application.HMI_VacuumConfig.h_rVacuumDuringTime'
    };
    const arr = [];
    arr.push(Param);
    const success = await saveJson(arr);
    console.log(success);
  }
}
watchEffect(() => {
  statePV.value = props.displayValue;
  duringTime.value = props.duringTime;
  holdingTime.value = props.holdingTime;
  rebackTime.value = props.rebackTime;
  modelValue.value = props.mode;
  vacuumValue.value = Number(props.vacuumValue).toFixed(1);
  vacuumMode.value = props.vacuumMode;
  model3Times.value = props.model3SettingTimes;
  vacuumSwitch.value = props.vacuumSwitch;
});
watch(vacuumSwitch, (newValue, oldValue) => {
  if (vacuumMode.value == 1) {
    if (newValue && !oldValue) {
      isActive.value = true;
      numbers.value = [];

      dom = document.getElementById('chart-container');
      const myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        title: {
          text: '真空曲线'
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30'
          ]
        },
        yAxis: {
          type: 'value',
          max: 1024
        },
        series: [
          {
            name: 'Vacuum',
            type: 'line',
            smooth: true,
            stack: 'Total',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.25,
                    color: '#fff'
                  },
                  {
                    offset: 1,
                    color: '#fff'
                  }
                ]
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [0]
          }
        ]
      };

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }

      window.addEventListener('resize', myChart.resize);

      intervalVacuum = setInterval(() => {
        numbers.value.push(props.vacuumValue);
        console.log('Adding a number:', numbers.value);

        intervalId2 = setTimeout(() => {
          const echartsDatas = [];
          const echartsDatas1 = [];
          for (let i = 0; i < 30; i++) {
            if (numbers.value.length >= i + 1) {
              echartsDatas[i] = Number(numbers.value[i]).toFixed(1);
            }
          }
          const option2 = {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30'
              ]
            },
            series: [
              {
                data: echartsDatas,
                type: 'line'
              }
            ]
          };
          myChart.setOption(option2);
        }, 1000);
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalVacuum);
        clearInterval(intervalId2);
        console.log('Final array:', numbers.value);
      }, 30000);
    }
  } else if (vacuumMode.value == 2) {
    countNum.value += 1;
  } else if (vacuumMode.value == 3) {
    countModel3Num.value += 1;
  }
});
watch(countNum, (newValue, oldValue) => {
  if (newValue === 1) {
    model2Number.value = [];
    dom = document.getElementById('chart-container');
    const myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      title: {
        text: '真空曲线'
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30'
        ]
      },
      yAxis: {
        type: 'value',
        max: 1024
      },
      series: [
        {
          name: 'Vacuum',
          type: 'line',
          smooth: true,
          stack: 'Total',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0.25,
                  color: '#fff'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ]
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: [0]
        }
      ]
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
    vacuumMode2 = setInterval(() => {
      model2Number.value.push(vacuumValue.value);
      console.log(model2Number.value, '数组');
      intervalId3 = setTimeout(() => {
        const echartsDatas = [];
        for (let i = 0; i < 40; i++) {
          if (model2Number.value.length >= i + 1) {
            echartsDatas[i] = Number(model2Number.value[i]).toFixed(1);
          }
        }
        const option2 = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30',
              '31',
              '32',
              '33',
              '34',
              '35',
              '36',
              '37',
              '38',
              '39'
            ]
          },
          series: [
            {
              data: echartsDatas,
              type: 'line'
            }
          ]
        };
        myChart.setOption(option2);
      }, 1000);
    }, 1000);

    setTimeout(() => {
      clearInterval(vacuumMode2);
      clearInterval(intervalId3);
      countNum.value = 0;
    }, 40000);
  }
});
watch(countModel3Num, (newValue, oldValue) => {
  if (newValue === 1) {
    model3Number.value = [];
    dom = document.getElementById('chart-container');
    const myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      title: {
        text: '真空曲线'
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30'
        ]
      },
      yAxis: {
        type: 'value',
        max: 1024
      },
      series: [
        {
          name: 'Vacuum',
          type: 'line',
          smooth: true,
          stack: 'Total',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0.25,
                  color: '#fff'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ]
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: [0]
        }
      ]
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
    vacuumMode3 = setInterval(() => {
      model3Number.value.push(vacuumValue.value);
      intervalId4 = setTimeout(() => {
        const echartsDatas = [];
        for (let i = 0; i < 75; i++) {
          if (model3Number.value.length >= i + 1) {
            echartsDatas[i] = Number(model3Number.value[i]).toFixed(1);
          }
        }
        const option2 = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30',
              '31',
              '32',
              '33',
              '34',
              '35',
              '36',
              '37',
              '38',
              '39',
              '40',
              '41',
              '42',
              '43',
              '44',
              '45',
              '46',
              '47',
              '48',
              '49',
              '50',
              '51',
              '52',
              '53',
              '54',
              '55',
              '56',
              '57',
              '58',
              '59',
              '60',
              '61',
              '62',
              '63',
              '64',
              '65',
              '66',
              '67',
              '68',
              '69',
              '70',
              '71',
              '72',
              '73',
              '74',
              '75'
            ]
          },
          series: [
            {
              data: echartsDatas,
              type: 'line'
            }
          ]
        };
        myChart.setOption(option2);
      }, 1000);
    }, 1000);

    setTimeout(() => {
      clearInterval(vacuumMode3);
      clearInterval(intervalId4);
      countModel3Num.value = 0;
    }, 75000);
  }
});
</script>

<style scoped>
.light-style {
  margin-top: 130px;
}
.container {
  width: 200px;
  margin: 0 auto;
  text-align: center;
}

.box {
  width: 100%;
  height: 36px;
  background-color: red;
  transform: scale(1, 1) translateY(0);
  transition: all 0.5s ease-in-out;
}

.progress-bar {
  width: 100%;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #b5f0ca;
  transition: width 0.5s ease-in-out;
}
</style>
