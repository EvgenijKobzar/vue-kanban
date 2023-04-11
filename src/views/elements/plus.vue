<template>
	<v-container>
		<v-row align="center" justify="center">
			<v-hover>
				<template v-slot:default="{ isHovering, props }">
					<v-btn
							size="small" v-bind="props"
							:color="isHovering ? ColorTheme.getTheme().PRIMARY : undefined"
							variant="flat" density="compact"
							icon="mdi-plus"
							@click="create"
					></v-btn>
				</template>
			</v-hover>
		</v-row>
	</v-container>
</template>
<script setup>
import ColorTheme from "../../lib/color-theme.js";

function create()
{
	window.open('https://auroralogistic.megaplan.ru/task/filter/all', '_blank');
}
</script>