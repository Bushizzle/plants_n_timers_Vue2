<template>
  <div>main</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PlantsModule from '@@/store/modules/plants';

import { TPlant } from '@@/types';

@Component
export default class MainLayout extends Vue {}
</script>
