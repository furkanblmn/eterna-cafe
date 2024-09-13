<template>
  <button :disabled="loading" :type="type" :class="['form-control', buttonClass]">
    <div v-if="loading" class="spinner-grow spinner-grow-sm" role="status">
      <span class="visually-hidden">Yükleniyor</span>
    </div>
    <slot v-if="!loading" />
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    type: {
      type: String,
      default: 'button'
    },
    buttonClass: {
      type: String,
      default: ''
    }
  }
}
</script>
