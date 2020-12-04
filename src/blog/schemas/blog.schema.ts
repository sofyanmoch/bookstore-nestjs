/* eslint-disable prettier/prettier */
// schema digunakan untuk menentukan jenis data yg akan disimpan di databasee
import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  author: String,
  date_posted: String,
});
