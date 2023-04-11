<template>
			<v-badge v-if="item.unreadCommentsCount"
					:color="ColorTheme.getTheme().ALERT"
					text-color="white"
					:content="item.unreadCommentsCount"
					inline
			></v-badge>
			<v-badge v-else-if="item.commentsCount"
					color="grey-lighten-1"
					text-color="white"
					:content="item.commentsCount"
					inline
			></v-badge>
</template>

<script setup>
import ColorTheme from "../lib/color-theme.js";

defineProps([
	'item',
]);
</script>