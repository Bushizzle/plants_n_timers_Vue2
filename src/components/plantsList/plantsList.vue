<template>
  <div>
    <h3>plants</h3>
    <ul>
      <li
          v-for="plant in plantsList"
          :key="plant.id"
          @click="remove(plant.id)"
      >
        {{plant.name}}
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PlantsModule from '@@/store/modules/plants';

import { TPlant } from '@@/types';

@Component
export default class PlantsList extends Vue {
  get plantsList(): TPlant[] {
    return PlantsModule.data;
  }
  remove(id: number) {
    PlantsModule.removePlant(id);
  }
  mounted() {
    PlantsModule.load();
  }
}
</script>
