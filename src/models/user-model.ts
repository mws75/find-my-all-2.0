import mongoose from "mongoose";
import {Document} from "mongoose"; 
import {emitWEarning} from "process";


-- Interfaces 
export interface Item {
  name: string,
  location?: string,
  image_url?: string,
}

export interface User{
  name?: string,
  email: string, 
  items: Item[]
}

export interface MongoUser extends User, mongoose.Document{}

export type TUser = User & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const itemSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    location: {type: String}
    image_url: {type: String, default null}
  },
  {timestamps: true}
); 

const userSchema = new mongoose.Schema(
  {
    clerkId: {type: String, required: true, unique: true, index:true},
    name: String
    email: {type: string, required: true, unique: true),
    items: [itemSchema],
  },
  {timestamps: true}
);

export const UserModel = mongoose.model.user || 
  mongose.model<MongoUser>("User", userSchema, "find_all_users");





