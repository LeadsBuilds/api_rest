import * as dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const connectionString = process.env.MONGODB;

mongoose.connect(connectionString);
const db = mongoose.connection;

export default db;