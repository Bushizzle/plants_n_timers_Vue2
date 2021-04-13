import { AxiosResponse } from 'axios';
import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@@/store/index.ts';

import {
  TPlant,
  TPlantResponse,
} from '@@/types/index.ts';

const mock: TPlantResponse = {
  result: [
    {
      "name": "Item 1",
      "lastWatered": 1616010159838,
      "id": 1
    },
    {
      "name": "Item 2",
      "lastWatered": 1616010178460,
      "id": 2
    }
  ]
}


const fakeRequest = function(delay: number): Promise<any> {
  return new Promise((resolve) => setTimeout(()=>resolve(mock), delay));
}

@Module({
  store,
  name: 'plants',
  namespaced: true,
  dynamic: true,
})
class PlantsModule extends VuexModule {
  public data: TPlant[] = [];

  @Mutation
  public setPlants(data: TPlant[]): void {
    this.data = [ ...data ];
  }

  @Mutation
  public addPlant(connector: TPlant): void {
    this.data = [ ...this.data, connector ];
  }

  @Mutation
  public removePlant(connectorId: number): void {
    this.data = this.data.filter(
      ({ id }: TPlant) => (id !== connectorId)
    );
  }

  @Action({ rawError: true })
  public async load(): Promise<any> {

    fetch('/test').then(res => res.json()).then(data => console.log(data));

    try {
      const { result } = await fakeRequest(1000);
      if (!result) throw new Error();
      console.log(result);

      this.setPlants(result);

    } catch (e) {
      return {
        status: false,
        error: e
      }
    }
  }
}

export default getModule(PlantsModule);
