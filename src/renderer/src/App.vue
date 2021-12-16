<script setup lang="ts">
  import pInput from './components/Input.vue'
  import { reactive, toRaw, onMounted, computed } from 'vue'
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

  const onClick = (e: MouseEvent, props: any) => {
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
    <header class="header">
      <div>
        <span class="iconfont icon-2" title="PDF指定位置添加文字"></span>
      </div>
     <div>
       <span class="iconfont icon icon-minimize" title="最小化" @click="onClickHeader('minimize')"></span>
       <!--      <span class="iconfont icon icon-maximize" title="最大化"></span>-->
       <!--      <span class="iconfont icon icon-reduction" title="还原"></span>-->
       <span class="iconfont icon icon-close" title="关闭" @click="onClickHeader('close')"></span>
     </div>
    </header>
    <div class="form">
      <p-input name="pdfFilePath" label="PDF文件" placeholder="请选择PDF文件" v-model="formState.pdfFilePath" @click="onClick"/>
      <p-input name="txtFilePath" label="TXT文件" placeholder="请选择TXT文件" v-model="formState.txtFilePath" @click="onClick"/>
      <p-input name="outputFilePath" label="导出位置" placeholder="请选择导出位置" v-model="formState.outputFilePath" @click="onClick"/>
      <p-input name="outputFilename" label="导出文件名"  placeholder="请输入导出文件名" v-model="formState.outputFilename" />
      <p-input name="x" label="文字位置x"  placeholder="请输入文字位置" v-model="formState.x"/>
      <p-input name="y" label="文字位置y"  placeholder="请输入文字位置" v-model="formState.y"/>
      <button id="button" :disabled="disabled" @click="onSubmit">开始导出</button>
    </div>
  </div>
</template>

<style scoped>
  @import "//at.alicdn.com/t/font_3000598_z2hct4xi3ml.css";
  .app{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .header{
    height: 40px;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    -webkit-app-region: drag;
    background-image: linear-gradient(to right, #1890ff 0%, #4689f1 100%);
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
  }
  #button{
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #096dd9;
    outline: 0;
    color: #ffffff;
    background: #1890ff;
    cursor: pointer;
    transition: all .3s;
    padding: 0 20px;
  }
  #button:hover{
    background: #096dd9;
  }
  #button:disabled{
    border: 1px solid #40a9ff;
    background: #69c0ff;
    cursor: no-drop;
  }
</style>

<style>
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
