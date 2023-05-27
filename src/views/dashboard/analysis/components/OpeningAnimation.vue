<template>
  <n-card :bordered="false" style="width: 100%">
    <div class="w-full h-50px">
      <div class="flex-col-center p-3px">
        <div class="display: flex justify-content: space-between">
          <icon-cib-discover v-if="trackStatus" class="text-25px text-green" style="margin-top: 5px" />
          <icon-cib-discover v-if="!trackStatus" class="text-25px text-gray-300" style="margin-top: 5px" />
          <span class="py-8px text-16px" style="margin-left: 10px; margin-right: 10px">真空轨道</span>
          <icon-cib-discover v-if="trackStatus" class="text-25px text-green" style="margin-top: 5px" />
          <icon-cib-discover v-if="!trackStatus" class="text-25px text-gray-300" style="margin-top: 5px" />
        </div>
      </div>
    </div>
    <div class="w-full h-30px">
      <div class="flex-col-center p-1px">
        <div class="display: flex justify-content: space-between">
          <span class="text-16px">真空值 {{ vacuumValue }} mbar</span>
        </div>
      </div>
    </div>
    <div class="w-full h-300px">
      <div>
        <n-grid :item-responsive="true" :x-gap="16">
          <n-grid-item span="0:4 640:5 1024:4">
            <div v-if="!vacuumInSensor" style="height: 100%">
              <div class="flex-col-center light-style">
                <icon-cib-discover class="text-20px text-green" />
              </div>
            </div>
            <div v-if="vacuumInSensor" style="height: 100%">
              <div class="flex-col-center light-style">
                <icon-cib-discover class="text-20px text-gray-300" />
              </div>
            </div>
          </n-grid-item>
          <n-grid-item span="0:16 640:16 1024:16">
            <div style="height: 100%">
              <div
                v-if="animationNum === 1"
                id="style-switcher"
                style="width: 100%; height: 60px; background-color: yellow; border-radius: 8px 8px 1px 1px"
              ></div>
              <div
                v-if="animationNum === 0"
                style="width: 100%; height: 60px; background-color: #afa6a6ff; border-radius: 8px 8px 1px 1px"
              ></div>
              <div
                v-if="animationNum === 2"
                :style="{
                  backgroundColor: `#afa6a6ff`,
                  width: `100%`,
                  height: `210px`,
                  border: `2px white solid`,
                  borderRadius: `8px 8px 8px 8px`
                }"
              >
                <div class="progress-bar1" :style="{ height: progress + '%', borderRadius: '8px 8px 8px 8px' }"></div>
              </div>
              <div v-if="animationNum === 3" class="box-with-lid">
                <div class="box-body">
                  <div
                    class="progress-bar1"
                    :style="{ height: decreaseProgress + '%', borderRadius: '8px 8px 8px 8px' }"
                  ></div>
                </div>
                <div class="box-lid">
                  <div
                    class="progress-bar1"
                    :style="{ height: decreaseProgressTop + '%', borderRadius: '8px 8px 0px 0px' }"
                  ></div>
                </div>
              </div>
              <transition name="box">
                <dov v-if="isOpened" style="width: 100%; height: 36px" class="box">
                  <div style="height: 32px">
                    <br />
                  </div>
                  <div style="height: 20px">
                    <n-progress
                      height="20px"
                      type="line"
                      :percentage="percent"
                      :indicator-placement="'inside'"
                      color="green"
                      processing
                      :border-radius="0"
                      :fill-border-radius="0"
                    />
                  </div>
                </dov>
              </transition>
              <div
                v-if="animationNum === 0"
                style="width: 100%; height: 150px; background-color: #afa6a6ff; border-radius: 1px 1px 8px 8px"
              ></div>
              <div
                v-if="animationNum === 1"
                style="width: 100%; height: 150px; background-color: #afa6a6ff; border-radius: 1px 1px 8px 8px"
              ></div>
            </div>
          </n-grid-item>
          <n-grid-item span="0:4 640:4 1024:4">
            <div v-if="!vacuumOutSensor" style="height: 100%">
              <div class="flex-col-center light-style">
                <icon-cib-discover class="text-20px text-green" />
              </div>
            </div>
            <div v-if="vacuumOutSensor" style="height: 100%">
              <div class="flex-col-center light-style">
                <icon-cib-discover class="text-20px text-gray-300" />
              </div>
            </div>
          </n-grid-item>
        </n-grid>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue';
const trackStatus = ref(false);
const vacuumInSensor = ref(true);
const vacuumOutSensor = ref(true);
const props = defineProps({
  trackStatus: { default: false },
  vacuumInSensor: { default: true },
  vacuumOutSensor: { default: true },
  vacuumValue: { default: 0 }
});
defineOptions({ name: 'VacuumAnimation' });
const isOpened = ref(true);
const percent = ref(0);
const progress = ref(0);
const decreaseProgress = ref(100);
const decreaseProgressTop = ref(100);
const animationNum = ref(0);
const vacuumValue = ref(0);
onMounted(async () => {
  // const timer = setInterval(() => {
  //   // eslint-disable-next-line no-plusplus
  //   percent.value++;
  //   if (percent.value === 99) {
  //     clearInterval(timer);
  //     percent.value = 100;
  //     isOpened.value = false;
  //     animationNum.value = 1;
  //     setTimeout(() => {
  //       let timer1;
  //       let timer2;
  //
  //       const updateProgress = () => {
  //         if (progress.value < 100) {
  //           progress.value += 5;
  //         }
  //         animationNum.value = 2;
  //         if (progress.value >= 100) {
  //           animationNum.value = 3;
  //           clearInterval(timer1);
  //           timer2 = setInterval(() => {
  //             if (decreaseProgress.value > 0) {
  //               decreaseProgress.value -= 5;
  //             } else {
  //               clearInterval(timer2);
  //             }
  //           }, 500);
  //         }
  //       };
  //
  //       timer1 = setInterval(updateProgress, 300);
  //     }, 2000);
  //   }
  // }, 50);
});
watch(props, newValue => {
  trackStatus.value = newValue.trackStatus;
  vacuumInSensor.value = newValue.vacuumInSensor;
  vacuumOutSensor.value = newValue.vacuumOutSensor;
  vacuumValue.value = Number(props.vacuumValue).toFixed(1);
});
watch(decreaseProgress, newValue => {
  if (newValue <= 0) {
    let timer2;
    timer2 = setInterval(() => {
      if (decreaseProgressTop.value > 0) {
        decreaseProgressTop.value -= 20;
      } else {
        clearInterval(timer2);
      }
    }, 500);
  }
});
watch(vacuumInSensor, newValue => {
  if (newValue == false) {
    console.log('动画开始');
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
});
watch(vacuumOutSensor, newValue => {
  if (vacuumOutSensor.value == false) {
    console.log('动画结束');
    animationNum.value = 0;
    isOpened.value = true;
    percent.value = 0;
    console.log(animationNum.value, '状态');
  }
});
</script>

<style scoped>
.light-style {
  margin-top: 105px;
}
.container {
  width: 200px;
  margin: 0 auto;
  text-align: center;
}

.box {
  width: 100%;
  height: 5%;
  background-color: red;
  transform: scale(1, 1) translateY(0);
  transition: all 0.5s ease-in-out;
}

.progress-bar1 {
  width: 100%;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #b5f0ca;
  transition: width 0.5s ease-in-out;
}
.box-with-lid {
  background-color: #afa6a6ff;
  width: 100%;
  height: 210px;
  border: 2px white solid;
  border-radius: 8px;
  position: relative;
}

.box-body {
  height: 206px;
  border-radius: 8px 8px 8px 8px;
}

.progress-bar {
  background-color: mediumseagreen;
  width: 100%;
}

.box-lid {
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #afa6a6ff;
  border: 2px white solid;
  border-radius: 8px 8px 0 0;
}
</style>
