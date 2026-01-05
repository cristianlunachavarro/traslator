import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  Unique
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Optional } from "sequelize";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

@Table({ tableName: "users", timestamps: true })
export class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column(DataType.STRING(36))
  id!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column({ field: "password_hash", type: DataType.STRING })
  passwordHash!: string;
}
