<script setup lang="ts">
import { computed, ref } from 'vue'
import Slider1 from '@/assets/images/popup/slide1.svg'
import Slider2 from '@/assets/images/popup/slide2.png'

const { getMessage } = chrome.i18n
const slideIndex = ref<number>(0)

const slideItems = [
  {
    img: Slider1,
    text: getMessage('popup_slide_1_text'),
    buttonText: getMessage('popup_slide_1_button_text'),
    onClick: handleNext,
  },
  {
    img: Slider2,
    text: getMessage('popup_slide_2_text'),
    buttonText: getMessage('popup_slide_2_button_text'),
    onClick: closePopup,
  },
]

const currentSlide = computed(() => {
  return slideItems[slideIndex.value]
})

function handleNext() {
  slideIndex.value++
}

function closePopup() {
  window.close()
}
</script>

<template>
  <main>
    <img :src="currentSlide.img" alt="logo">
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
    <button @click="currentSlide.onClick">
      {{ currentSlide.buttonText }}
    </button>
    <p class="help">
      {{ getMessage('popup_help_text') }}
      <a
        href="https://github.com/westleft/QR-Reveal/issues"
        target="_blank"
      >{{ getMessage('popup_help_link_text') }}
      </a>
    </p>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500&display=swap&subset=chinese-traditional');

main {
  font-family: "Noto Sans TC";
  background-color: #fff;
  width: 240px;
  padding: 0 24px 24px 24px;
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

img {
  width: 100%;
  object-fit: contain;
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
