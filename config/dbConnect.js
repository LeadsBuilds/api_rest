import mongoose from "mongoose";

mongoose.connect("connection string")
const db = mongoose.connection;

export default db;