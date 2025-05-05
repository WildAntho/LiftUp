import { faker } from "@faker-js/faker/.";
import { IntensityFormat, RepFormat, WeightFormat } from "../InputType/exerciceType";

export const createMockExerciceInput = () => ({
  title: faker.lorem.words(2),
  serie: faker.number.int({ min: 1, max: 6 }),
  rep: faker.number.int({ min: 5, max: 20 }),
  intensity: faker.number.int({ min: 1, max: 10 }),
  weight: faker.number.int({ min: 0, max: 100 }),
  notes: faker.lorem.sentence(),
  intensityFormat: IntensityFormat.RPE,
  weightFormat: WeightFormat.KG,
  repFormat: RepFormat.STANDARD,
  training: {
    id: faker.string.uuid(),
  },
});

export const createMockExerciceEntity = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(2),
  serie: faker.number.int({ min: 1, max: 6 }),
  rep: faker.number.int({ min: 5, max: 20 }),
  intensity: faker.number.int({ min: 1, max: 10 }),
  weight: faker.number.int({ min: 0, max: 100 }),
  notes: faker.lorem.sentence(),
  training: {
    id: faker.string.uuid(),
  },
  ...overrides,
});
