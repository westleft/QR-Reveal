<script setup lang="ts">
import { computed, ref } from 'vue'
import Slider1 from '@/assets/images/popup/slide1.svg'
import Slider2 from '@/assets/images/popup/slide2.svg'

const slideIndex = ref(0)

const slideItems = [
  {
    img: Slider1,
    text: '在 QR Code 上按下右鍵',
    buttonText: '下一步',
  },
  {
    img: Slider2,
    text: '「偵測 QR Code」查看內容',
    buttonText: '馬上試試！',
  },
]

const currentSlide = computed(() => {
  return slideItems[slideIndex.value]
})

function handleNext() {
  slideIndex.value++
}
</script>

<template>
  <main>
    <div class="image__wrapper">
      <img :src="currentSlide.img" alt="logo" class="logo">
    </div>
    <p class="title">
      {{ currentSlide.text }}
    </p>
    <div class="pagination">
      <div
        v-for="(_, index) in slideItems"
        :key="index"
        class="pagination-item"
        :class="{ active: index === slideIndex }"
        @click="slideIndex = index"
      ></div>
    </div>
    <button @click="handleNext">
      {{ currentSlide.buttonText }}
    </button>
    <p class="help">
      操作有問題？
      <a
        href="https://github.com/yunyoujun/qr-code-detector/issues"
        target="_blank"
      >回報我們
      </a>
    </p>
  </main>
</template>

<style scoped>
main {
  background-color: #fff;
  width: 240px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333333;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 6px;

  .pagination-item {
    width: 8px;
    height: 8px;
    background-color: #B7EAEA;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background-color:  #20CBCA;
      width: 10px;
      height: 10px;
      transition: all 0.3s ease;
    }
  }
}

.image__wrapper {
  width: 184px;
  height: 155px;
  margin-bottom: 26px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.help {
  font-size: 16px;
  color: #777777;
  margin-top: 20px;
  a {
    color: #20CBCA;
    text-decoration: none;
  }
}

button {
  background-color: #5080E1;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
}
</style>
