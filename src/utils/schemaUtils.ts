import { Schema, Document } from "mongoose";

export function addVirtualIdAndTransform(schema: Schema): void {
  schema.virtual("id").get(function (this: Document) {
    return this._id.toString();
  });

  schema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  });
  schema.set("toObject", {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  });
}
