import GenericDAO from "./GenericDAO";

export default class GenericDAOImp<Model> implements GenericDAO<Model> {
  findAll(): Promise<Model[]> {
    throw new Error("Method not implemented.");
  }
  findById(): Promise<Model> {
    throw new Error("Method not implemented.");
  }
  create(data: unknown): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(data: unknown): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}