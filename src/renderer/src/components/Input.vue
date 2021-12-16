<script setup lang="ts">
const props = defineProps({
  label: { type: String, default: 'label' },
  placeholder: { type: String, default: '' },
  modelValue: { default: '' },
  name: { type: String, default: 'name' },
})
const emit = defineEmits(['focus', 'input', 'blur', 'change', 'update:modelValue', 'click'])
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
</script>

<template>
  <label :for="name" @click="onClick">
    <span class="label-txt">{{label}}</span>
    <input
      :id="name"
      :placeholder="placeholder"
      :value="modelValue"
      @focus="onFocus"
      @change="onChange"
      @blur="onBlur"
      @input="onInput"
    />
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
  }
  input{
    flex: 1;
    background: transparent;
    outline: 0;
    border: 1px solid #d9d9d9;
    height: 28px;
    box-sizing: border-box;
    padding: 5px;
    transition: all .3s;
    font-size: 14px;
    color: #595959;
  }
  input:focus{
    border-color: transparent;
    box-shadow: 0 0 1px 1px #1890ff;
    color: #595959;
  }
</style>
