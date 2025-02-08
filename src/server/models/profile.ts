import { DataTypes } from "sequelize";
import { sequelize } from "./db/index";

export const Profile = sequelize.define("Profile", {
  name: DataTypes.STRING,
  bio: DataTypes.STRING,
  imgURL: DataTypes.STRING,
});
