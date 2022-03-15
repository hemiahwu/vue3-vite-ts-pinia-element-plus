<template>
  <div class="not-found">
    <img src="../assets/404.gif" alt="error" />
    <button class="goback" @click="$router.push('/')">返回首页</button>
  </div>
</template>


<style scoped>
.not-found {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.not-found img {
  width: 100%;
  height: 100%;
}

.goback {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  background-color: #fff;
  color: #000;
  padding: 10px 30px;
  border-radius: 5px;
  outline: none;
  border: none;
}
</style>