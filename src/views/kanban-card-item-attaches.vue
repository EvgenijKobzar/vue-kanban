<template>
		<div class="d-flex mt-3 justify-between text-sm" >

			<v-chip v-if="item.commentsAttachesCount"
					size="x-small"
					:color="ColorTheme.getTheme().PRIMARY"
			>
				<v-icon start icon="mdi-paperclip"></v-icon>
				+{{item.commentsAttachesCount}}
			</v-chip>
			<v-chip v-if="item.relationLinksCount"
							size="x-small"
							:color="ColorTheme.getTheme().PRIMARY"
			>
				<v-icon start icon="mdi-link"></v-icon>
				+{{item.relationLinksCount}}
			</v-chip>
		</div>
</template>

<script setup>
import ColorTheme from "../lib/color-theme.js";

defineProps([
	'item',
]);
</script>
