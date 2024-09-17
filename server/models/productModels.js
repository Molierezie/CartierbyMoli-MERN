import mongoose from "mongoose";


// we use ObjectId for retrieve a specific ID from another collection
// the type will be the the ObjectId and the ref will be the specific collection / schema

const { ObjectId } = mongoose.Schema.Types;


// we create a reviewSchema then we add this schema in the productSchema
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
      user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);


const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: "categories", required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);
export default Product;