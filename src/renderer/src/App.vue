<script setup lang="ts">
  import pInput from './components/Input.vue'
  import pLoading from './components/Loading.vue'
  import { ref, reactive, toRaw, onMounted, computed } from 'vue'

  const formState = reactive({
    pdfFilePath: '',
    txtFilePath: '',
    outputFilePath: '',
    outputFilename: '',
    x: '0',
    y: '0'
  })

  onMounted(() => {
    window.ipcRenderer.on('dialog', (event, type: keyof typeof formState, result: string[] | undefined) => {
      isDialog.value = false
      if (result) {
        const val = result.shift()
        formState[type] = val ? val : ''
      }
    })
  })

  const disabled = computed(() => {
    return !formState.outputFilename ||
      !formState.outputFilePath ||
      !formState.pdfFilePath ||
      !formState.txtFilePath ||
      !formState.x ||
      !formState.y
  })

  const isDialog = ref(false)

  const loading = ref(false)

  const onClick = (e: MouseEvent, props: any) => {
    if (isDialog.value) return
    let options: any
    switch (props.name) {
      case 'pdfFilePath' : options = { properties: ['openFile'], filters: [{ name:'excel', extensions: ['pdf']}] }
        break
      case 'txtFilePath' : options = { properties: ['openFile'], filters: [{ name:'excel', extensions: ['txt']}] }
        break
      case 'outputFilePath' : options = { properties: ['openDirectory'] }
        break
      default : options = { properties: ['openDirectory'] }
    }

    isDialog.value = true

    window.ipcRenderer.send('dialog', props.name, options)
  }

  const onClickHeader = (methodName: string) => {
    window.ipcRenderer.send('window', methodName)
  }

  const onSubmit = () => {
    if (disabled.value) return
    window.ipcRenderer.send('config', toRaw(formState))
  }
</script>

<template>
  <div class="app">
    <p-loading v-if="loading">加载中...</p-loading>
    <header class="header">
      <div class="header-item">
        <svg class="icon-logo" :class="loading ? 'rotating' : null" aria-hidden="true">
          <use xlink:href="#icon-huaduo"></use>
        </svg>
      </div>
      <div class="header-item">
       <span class="iconfont icon icon-minimize" title="最小化" @click="onClickHeader('minimize')"></span>
       <span class="iconfont icon icon-close" title="关闭" @click="onClickHeader('close')"></span>
      </div>
    </header>
    <div class="form">
      <p-input name="outputFilename" label="文件名"  placeholder="请输入【导出PDF文件名】" v-model="formState.outputFilename" />
      <p-input :disabled="isDialog" name="pdfFilePath" label="PDF文件" placeholder="请选择【待修改PDF文件】" v-model="formState.pdfFilePath" @click="onClick"/>
      <p-input :disabled="isDialog" name="txtFilePath" label="TXT文件" placeholder="请选择【导入文字TXT文件】" v-model="formState.txtFilePath" @click="onClick"/>
      <p-input :disabled="isDialog" name="outputFilePath" label="导出位置" placeholder="请选择【导出PDF文件位置】" v-model="formState.outputFilePath" @click="onClick"/>
      <p-input name="x" label="文字位置x" type="number" placeholder="请输入文字x坐标位置(坐标原点为左上角)" v-model="formState.x"/>
      <p-input name="y" label="文字位置y" type="number" placeholder="请输入文字y坐标位置(坐标原点为左上角)" v-model="formState.y"/>
      <button id="button" :disabled="disabled" @click="onSubmit">开始导出</button>
    </div>
  </div>
</template>

<style scoped>
  .app{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #cf1322;
    border-top: 0;
  }
  .header{
    height: 40px;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    -webkit-app-region: drag;
    background-color: #cf1322;
  }
  .header-item{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .icon-logo{
    height: 28px;
    width: 28px;
    margin-left: 5px;
    -webkit-app-region: no-drag;
  }
  .icon-logo:hover{
    animation: rotate 1.5s linear infinite;
  }
  .icon-2{
    margin-left: 10px;
    color: #f5222d;
    font-size: 28px;
  }
  .icon{
    margin-right: 10px;
    color: #ffffff;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }
  .form{
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 15px;
    padding-right: 25px;
    overflow: auto;
    background: rgba(255,255,255,.95);
  }
  #button{
    height: 35px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #cf1322;
    outline: 0;
    color: #ffffff;
    background: #f5222d;
    cursor: pointer;
    transition: all .3s;
    padding: 0 20px;
  }
  #button:hover{
    background: #cf1322;
  }
  #button:disabled{
    border: 1px solid #ff4d4f;
    background: #ff7875;
    cursor: no-drop;
  }
</style>

<style>
  @import "./assets/iconfont.css";
  html,body,#app{
    width: 100%;
    height: 100%;
  }
  *{
    padding: 0;
    margin: 0;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  .rotating {
    animation: rotate 2s linear infinite;
  }
  @keyframes rotate {
    to {
      transform: rotateZ(360deg);
    }
    from {
      transform: rotateZ(0deg);
    }
  }
  /* 设置滚动条样式 (不支持火狐)*/
  ::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }
  /*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/
  ::-webkit-scrollbar-track {
    width: 6px;
    background-color: #e4e2e3;
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
    display: none;
  }
  /*滚动条的设置*/
  ::-webkit-scrollbar-button{
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e4e2e3;
    background-clip: padding-box;
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
  }
  /* 鼠标移入滚动条 */
  ::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
</style>
