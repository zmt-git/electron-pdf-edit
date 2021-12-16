<script setup lang="ts">

</script>

<template>
  <teleport to="body">
    <div class="loading">
<!--      <svg class="iconfont icon icon-loading"></svg>-->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-loading"></use>
      </svg>
      <span class="tit"><slot></slot></span>
    </div>

  </teleport>
</template>

<style scoped>
  .loading{
    z-index: 3000;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: no-drop;
    color: white;
  }
  .icon{
    width: 26px;
    height: 26px;
    font-size: 26px;
    animation: rotate 1s linear infinite;
  }
  .tit{
    margin-top: 20px;
    font-size: 12px;
  }
</style>
