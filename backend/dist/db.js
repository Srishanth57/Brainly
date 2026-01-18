import mongoose from "mongoose";
const Schema = mongoose.Schema;
// User Schema
const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
});
// //Tag
// const tagSchema = new mongoose.Schema({
//   title: { type: String, required: true, unique: true },
// });
//Content Schema
const contentType = ["Website", "Youtube", "X", "Notion"];
const Content = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentType, required: true },
    title: { type: String, required: true },
    // tags: { type: Schema.ObjectId, ref: "Tag" },
    userId: { type: Schema.ObjectId, ref: "User", required: true },
});
//Link
const Link = new Schema({
    hash: { type: String, required: true },
    userId: { type: Schema.ObjectId, ref: "User", required: true },
});
// export const Tag = mongoose.model("Tag", tagSchema);
export const LinkModel = mongoose.model("Link", Link);
export const UserModel = mongoose.model("User", User);
export const ContentModel = mongoose.model("Content", Content);
//# sourceMappingURL=db.js.map