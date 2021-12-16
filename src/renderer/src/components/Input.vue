<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps({
    label: { type: String, default: 'label' },
    placeholder: { type: String, default: '' },
    modelValue: { default: '' },
    name: { type: String, default: 'name' },
    clearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'text' }
  })

  const emit = defineEmits(['focus', 'input', 'blur', 'change', 'update:modelValue', 'click'])

  const style = computed(() => {
    let s = { borderBottomColor: '#d9d9d9' }
    switch (props.modelValue) {
      case null : s = { borderBottomColor: '#d9d9d9' }
        break
      case undefined :
      case "" : s = { borderBottomColor: '#f5222d' }
        break
      default : s = { borderBottomColor: '#7cb305' }
    }

    return s
  })

    const showClose = computed(() => {
      return !!props.modelValue
    })

  const onClick = (e: MouseEvent) => {
    emit('click', e, props)
  }
  const onFocus = (e: MouseEvent) => {
    emit('focus', (e.target as HTMLInputElement).value, e, props)
  }
  const onChange = (e: MouseEvent) => {
    emit('change', (e.target as HTMLInputElement).value)
  }
  const onBlur = (e: MouseEvent) => {
    emit('blur', (e.target as HTMLInputElement).value)
  }
  const onInput = (e: MouseEvent) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
    emit('input', props)
  }
  const onClear = (e: MouseEvent) => {
    emit('update:modelValue', '')
  }
</script>

<template>
  <label :for="name">
    <span class="label-txt">{{label}}</span>
    <input
      :type="type"
      :disabled='disabled'
      :id="name"
      :style="style"
      :placeholder="placeholder"
      :value="modelValue"
      @focus="onFocus"
      @change="onChange"
      @blur="onBlur"
      @input="onInput"
      @click.self="onClick"
    />
    <span :class="showClose ? null : 'hidden'" class="iconfont icon-close close" @click.self="onClear"></span>
  </label>
</template>

<style scoped>
  label{
    width: 100%;
    font-size: 16px;
    color: #595959;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }
  .label-txt{
    display: inline-block;
    width: 65px;
    text-align: right;
    margin-right: 10px;
    font-size: 13px;
    flex-shrink: 0;
    color: #262626;
  }
  input{
    flex: 1;
    background: transparent;
    outline: 0;
    border: 0;
    border-bottom: 1px solid #d9d9d9;
    height: 28px;
    box-sizing: border-box;
    padding: 5px;
    transition: all .3s;
    font-size: 14px;
    color: #000;
    font-weight: 600;
  }
  input:focus{
    border-bottom-color: #f5222d;
    color: #595959;
  }
  .close{
    position: relative;
    left: -22px;
    padding: 5px;
    cursor: pointer;
    z-index: 20;
    font-size: 12px;
    transition: all .3s;
  }
  .hidden{
    opacity: 0;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
