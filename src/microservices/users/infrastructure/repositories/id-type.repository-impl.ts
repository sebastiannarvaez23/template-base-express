import { IdTypeRepository } from "../../domain/repositories/id-type.repository";
import { IdTypeModel } from "../models/id-type.model";

export class IdTypeRepositoryImpl implements IdTypeRepository {
  async getList(): Promise<IdTypeModel[]> {
    try {
      return await IdTypeModel.findAll({
        order: [['createdAt', 'desc']]
      });
    } catch (e) {
      console.debug(e);
      throw e;
    }
  }

  async add(idType: IdTypeModel): Promise<IdTypeModel> {
    try {
      return await IdTypeModel.create(idType);
    } catch (e) {
      console.debug(e);
      throw e;
    }
  }

  async edit(id: string, idType: IdTypeModel): Promise<IdTypeModel[]> {
    try {
      const [rowAfect, editedIdType ] = await IdTypeModel.update(idType, {
        where: {
          id: id,
        },
        returning: true,
      });

      return editedIdType;
    } catch (e) {
      console.debug(e);
      throw e;
    }
  }
}
