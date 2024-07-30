import bcrypt from 'bcrypt';
import { DataTypes, Model as SequelizeModel, Optional } from 'sequelize';
import { BeforeBulkDestroy, BeforeDestroy, Column, DefaultScope, HasMany, Scopes, Table } from 'sequelize-typescript';
import Model from './model';
import Token from './token.model';

export interface UserAttributes {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  primaryLanguage?: 'sk' | 'en';
  status?: 'active' | 'inactive';
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
  password: string;
}

@DefaultScope(() => ({ attributes: { exclude: ['password'] } }))
@Scopes(() => ({
  withoutPassword: {
    attributes: {
      exclude: ['password'],
    },
  },
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
  active: {
    where: {
      status: 'active',
    },
  },
}))
@Table({ tableName: 'users' })
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @HasMany(() => Token)
  tokens: Token[];

  @Column({
    type: DataTypes.STRING,
  })
  email: string;

  @Column({
    type: DataTypes.ENUM('inactive', 'active'),
  })
  status: string;

  @Column({
    type: DataTypes.STRING,
  })
  firstName: string;

  @Column({
    type: DataTypes.STRING,
  })
  lastName: string;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  isAdmin: boolean;

  @Column
  get password(): string {
    return (<SequelizeModel>this).getDataValue('password');
  }

  set password(value: string) {
    const hash = bcrypt.hashSync(value ?? '', 10);
    (<SequelizeModel>this).setDataValue('password', hash);
  }

  public verifyPassword(password: string): boolean {
    const passwordHash: string = (<SequelizeModel>this).getDataValue('password');
    return !!password && !!passwordHash && bcrypt.compareSync(password, passwordHash);
  }

  @BeforeDestroy
  static async beforeDestroyHook(instance: User): Promise<void> {
    await Token.destroy({ where: { userId: instance.id }, force: true });
  }

  @BeforeBulkDestroy
  static async beforeBulkDestroyHook(options: any): Promise<void> {
    const users = await User.findAll({ where: options.where, attributes: ['id'] });
    const ids = users.map(user => user.id);

    await Token.destroy({ where: { userId: ids }, force: true });
  }
}
