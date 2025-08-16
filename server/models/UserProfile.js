// Sequelize model for UserProfile
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const UserProfile = sequelize.define("UserProfile", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  about: {
    type: DataTypes.TEXT,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.STRING,
  },
  followerCount: {
    type: DataTypes.TEXT,
    defaultValue: 0,
  },
  connectionCount: {
    type: DataTypes.TEXT,
    defaultValue: 0,
  },
});

export default UserProfile;
