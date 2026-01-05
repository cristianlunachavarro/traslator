import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../db";

interface HistoryAttributes {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  userId?: string | null;
  guestId?: string | null;
  createdAt?: Date;
}

type HistoryCreationAttributes = Optional<
  HistoryAttributes,
  "id" | "userId" | "guestId"
>;

export class TranslationHistory
  extends Model<HistoryAttributes, HistoryCreationAttributes>
  implements HistoryAttributes
{
  declare id: string;
  declare sourceText: string;
  declare translatedText: string;
  declare sourceLang: string;
  declare targetLang: string;
  declare userId?: string | null;
  declare guestId?: string | null;
}

TranslationHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sourceText: DataTypes.TEXT,
    translatedText: DataTypes.TEXT,
    sourceLang: DataTypes.STRING,
    targetLang: DataTypes.STRING,
    userId: DataTypes.UUID,
    guestId: DataTypes.STRING,
  },
  { sequelize, tableName: "translation_history" }
);
