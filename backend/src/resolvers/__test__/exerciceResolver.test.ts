import { Exercice } from "../../entities/exercice";
import { ExerciceType } from "../../entities/exerciceType";
import { Training } from "../../entities/training";
import {
  createMockExerciceInput,
} from "../../factory/exerciceFactory";
import { createMockExerciceTypeEntity } from "../../factory/exerciceTypeFactory";
import { ExerciceResolver } from "../exerciceResolver";

jest.mock("../../entities/exercice");
jest.mock("../../entities/training");
jest.mock("../../entities/exerciceType");

describe("ExerciceResolver", () => {
  let exerciceResolver: ExerciceResolver;
  let mockExercice: Exercice
  const data = createMockExerciceInput();
  beforeEach(() => {
    exerciceResolver = new ExerciceResolver();
    mockExercice = new Exercice();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getExercices", () => {
    it("should return exercices for a training", async () => {
      const mockExercices = [{ id: "1" }, { id: "2" }] as Exercice[];
      (Exercice.find as jest.Mock).mockResolvedValue(mockExercices);

      const result = await exerciceResolver.getExercices("training-id");
      expect(Exercice.find).toHaveBeenCalledWith({
        where: { training: { id: "training-id" } },
        relations: { training: true, type: true },
      });
      expect(result).toEqual(mockExercices);
    });
  });

  describe("updateExercice", () => {
    it("should update and return the exercice", async () => {
      mockExercice.id = "1";
      (Exercice.findOneBy as jest.Mock).mockResolvedValue(mockExercice);
      const mockType = createMockExerciceTypeEntity();
      (ExerciceType.findOneBy as jest.Mock).mockResolvedValue(mockType);
      (Exercice.save as jest.Mock).mockResolvedValue(mockExercice);

      const result = await exerciceResolver.updateExercice("1", data);
      expect(result.title).toBe(data.title);
      expect(mockExercice.save).toHaveBeenCalled();
    });

    it("should throw if exercice not found", async () => {
      (Exercice.findOneBy as jest.Mock).mockResolvedValue(null);

      await expect(
        exerciceResolver.updateExercice("999", data)
      ).rejects.toThrow("Aucun exercice pour cet id");
    });
  });

  describe("deleteExercice", () => {
    it("should delete the exercice", async () => {
      mockExercice.remove = jest.fn().mockResolvedValue(null);
      (Exercice.findOneBy as jest.Mock).mockResolvedValue(mockExercice);

      const result = await exerciceResolver.deleteExercice("1");
      expect(mockExercice.remove).toHaveBeenCalled();
      expect(result).toBe(JSON.stringify("L'exercice a bien été supprimé"));
    });

    it("should throw if exercice not found", async () => {
      (Exercice.findOneBy as jest.Mock).mockResolvedValue(null);

      await expect(exerciceResolver.deleteExercice("404")).rejects.toThrow(
        "Aucun exercice pour cet id"
      );
    });
  });

  describe("addExercice", () => {
    it("should create and return a new exercice", async () => {
      const mockTraining = new Training();
      mockTraining.exercices = [];
      mockTraining.save = jest.fn().mockResolvedValue(mockTraining);

      (Training.findOne as jest.Mock).mockResolvedValue(mockTraining);

      const mockType = createMockExerciceTypeEntity();
      (ExerciceType.findOneBy as jest.Mock).mockResolvedValue(mockType);

      const mockExercice = new Exercice();
      mockExercice.save = jest.fn().mockResolvedValue(mockExercice);
      jest.spyOn(Exercice.prototype, "save").mockResolvedValue(mockExercice);

      const data = createMockExerciceInput();

      const result = await exerciceResolver.addExercice("training-id", data);
      expect(result.title).toBe(data.title);
      expect(mockTraining.exercices?.length).toBe(1);
    });

    it("should throw if training not found", async () => {
      (Training.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        exerciceResolver.addExercice("bad-id", {} as any)
      ).rejects.toThrow("Aucune entraînement correspond à cet id");
    });
  });
});
