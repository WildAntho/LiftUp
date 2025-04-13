import { faker } from "@faker-js/faker";
import { createMockUserEntity } from "./userFactory";
import { createMockExerciceEntity } from "./exerciceFactory";

export const createMockTrainingEntity = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  date: faker.date.recent(),
  notes: faker.lorem.sentence(),
  createdByCoach: faker.person.fullName(),
  editable: true,
  validate: false,
  color: "#3B82F6",
  user: createMockUserEntity(),
  exercices: [createMockExerciceEntity(), createMockExerciceEntity()],
  ...overrides,
});
