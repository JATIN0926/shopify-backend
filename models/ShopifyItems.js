const mongoose = require("mongoose");

const ShopifyItemSchema = new mongoose.Schema(
  {
    descriptor: {
      name: {
        type: String,
        required: true,
      },
      symbol: {
        type: String,
        required: true,
      },
      short_desc: {
        type: String,
        required: true,
      },
      long_desc: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        default: "",
      },
      images: {
        type: [String],
        default: [],
      },
    },
    quantity: {
      maximum: {
        count: {
          type: Number,
          required: true,
        },
      },
    },
    parent_item_id: {
      type: mongoose.Types.ObjectId,
      ref: "ShopifyItem",
    },
    domain: {
      type: String,
      required: true,
    },
    tax_rate: {
      type: String,
      default: "",
    },
    tax_type: {
      type: String,
      default: "",
    },
    price: {
      currency: {
        type: String,
        default: "INR",
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      maximum_value: {
        type: Number,
        required: true,
      },
    },
    category_id: {
      type: String,
      //   required: true,
    },
    brandName: {
      type: String,
      default: "",
    },
    fulfillment_id: {
      type: Number,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    isParent: {
      type: Boolean,
      default: false,
    },
    variants: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    location_id: {
      type: String,
      required: true,
    },
    "@ondc/org/returnable": {
      type: Boolean,
      default: false,
    },
    "@ondc/org/cancellable": {
      type: Boolean,
      default: false,
    },
    "@ondc/org/return_window": {
      type: String,
      default: "",
    },
    "@ondc/org/seller_pickup_return": {
      type: Boolean,
      default: false,
    },
    "@ondc/org/time_to_ship": {
      type: String,
      default: "",
    },
    "@ondc/org/available_on_cod": {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    SellerID: {
      //   type: mongoose.Types.ObjectId,
      type: String,
      //   ref: "users",
      required: true,
    },
    when: {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    cityCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const ShopifyItemList = new mongoose.model("ShopifyItem", ShopifyItemSchema);

module.exports = ShopifyItemList;
