import { DeletedAt, Model as SequelizeTypescriptModel } from 'sequelize-typescript';

export default abstract class Model<
  TModelAttributes extends object = any,
  TCreationAttributes extends object = TModelAttributes,
> extends SequelizeTypescriptModel<TModelAttributes, TCreationAttributes> {
  // Soft-deletion
  @DeletedAt
  deletedAt: Date | null;
}
