<template>

  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="d-flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{task.title}}</p>
      <img
        class="w-6 h-6 rounded-full ml-3 "
        src="//pc31.megaplan.ru/hosts/auroralogistic.megaplan.ru/100x100/attach/SdfFileM_File/File/25/afe47c503483e11bae50305bddaa448d.png"
        alt="Avatar"
      >
    </div>
		<div class="d-flex mt-3 justify-between text-sm" v-html="task.subject"></div>
    <div class="d-flex mt-3 justify-between items-center">
      <span class="text-sm text-gray-600">{{task.date}}</span>
      <badge v-if="task.type" :color="badgeColor">{{task.type}}</badge>
    </div>
  </div>

</template>
<script>
import Badge from "./Badge.vue";
export default {
  components: {
    Badge
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    badgeColor() {
      const mappings = {
        Design: "purple",
        "Feature Request": "teal",
        Backend: "blue",
        QA: "green",
        default: "teal"
      };
      return mappings[this.task.type] || mappings.default;
    }
  }
};
</script>

<style scoped>
.bg-white {
	--tw-bg-opacity: 1;
	background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}
.shadow {
	--tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.rounded {
	border-radius: 0.25rem;
}
.px-3 {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
}
.pt-3 {
	padding-top: 0.75rem;
}
.pb-5 {
	padding-bottom: 1.25rem;
}
.border {
	border-width: 1px;
}
.border-white {
	--tw-border-opacity: 1;
	border-color: rgba(255, 255, 255, var(--tw-border-opacity));
}

.text-gray-700 {
	--tw-text-opacity: 1;
	color: rgba(55, 65, 81, var(--tw-text-opacity));
}
.font-semibold {
	font-weight: 600;
}
.font-sans {
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.tracking-wide {
	letter-spacing: 0.025em;
}
.text-sm {
	font-size: 0.875rem;
	line-height: 1.25rem;
}

.mt-3 {
	margin-top: 0.75rem;
}
.justify-between {
	justify-content: space-between;
}
.items-center {
	align-items: center;
}

.text-gray-600 {
	--tw-text-opacity: 1;
	color: rgba(75, 85, 99, var(--tw-text-opacity));
}

.w-6 {
	width: 1.5rem;
}
.h-6 {
	height: 1.5rem;
}
.rounded-full {
	border-radius: 9999px;
}
.ml-3 {
	margin-left: 0.75rem;
}
</style>