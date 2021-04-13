export type TPlant = {
  name: string;
  lastWatered: number;
  id: number;
};
export type TPlantResponse = {
  result: TPlant[];
};
