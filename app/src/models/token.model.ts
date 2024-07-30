import { DataTypes } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Scopes, Table } from 'sequelize-typescript';
import Model from './model';
import User from './user.model';

@Scopes(() => ({
  expired: {
    where: {
      expirationAt: {
        $lt: 'CURRENT_TIMESTAMP',
      },
    },
  },
}))
@Table({ tableName: 'tokens' })
export default class Token extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataTypes.STRING,
  })
  token: string;

  @Column({
    type: DataTypes.DATE,
  })
  expirationAt: Date;

  @Column({
    type: DataTypes.ENUM('login', 'password-reset', 'activation'),
  })
  type: string;
}
