<template>
  <div class="modal-skeleton">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
    </div>
  </div>
</template>

<style scoped>
.modal-skeleton {
  width: 480px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: shimmer 5s infinite;
}

.skeleton-image {
  width: 100%;
  height: 180px;
  background: linear-gradient(90deg, #eee 25%, #ddd 37%, #eee 63%);
  background-size: 400% 100%;
  border-radius: 6px;
  animation: shimmer 5s infinite;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-title {
  width: 70%;
  height: 20px;
  background: linear-gradient(90deg, #eee 25%, #ddd 37%, #eee 63%);
  background-size: 400% 100%;
  border-radius: 4px;
  animation: shimmer 5s infinite;
}

.skeleton-text {
  width: 100%;
  height: 14px;
  background: linear-gradient(90deg, #eee 25%, #ddd 37%, #eee 63%);
  background-size: 400% 100%;
  border-radius: 4px;
  animation: shimmer 5s infinite;
}

.skeleton-text.short {
  width: 60%;
}

/* shimmer 動畫 */
@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
