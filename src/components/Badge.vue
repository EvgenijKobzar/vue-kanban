<template>
  <div
    class="px-3 h-6 rounded-full text-xs font-semibold d-flex items-center"
    :class="`bg-${color}-100 text-${color}-700`"
  >
    <span class="w-2 h-2 rounded-full mr-1" :class="`bg-${color}-400`"></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "teal"
    }
  }
};
</script>

<style scoped>
.font-semibold {
	font-weight: 600;
}
.px-3 {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
}
.h-6 {
	height: 1.5rem;
}
.rounded-full {
	border-radius: 9999px;
}
.text-xs {
	font-size: 0.75rem;
	line-height: 1rem;
}
.items-center {
	align-items: center;
}
.w-2 {
	width: 0.5rem;
}
.h-2 {
	height: 0.5rem;
}
.mr-1 {
	margin-right: 0.25rem;
}
</style>
