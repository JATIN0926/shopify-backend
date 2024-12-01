// axios
const axios = require("axios");

//html-to-text
const { htmlToText } = require("html-to-text");

//models
const ShopifyItem = require("../models/ShopifyItems.js");

async function AddProduct(req, res) {
  try {
    const products = await GetProducts();
    console.log("Fetched products:", products);
    console.log("Fetched products variants:", products[0].variants);

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found from Shopify",
      });
    }

    const savedProducts = [];
    const failedProducts = [];

    for (const product of products) {
      console.log("product.product_type", product.product_type);
      try {
        // Create a new product
        const newProduct = new ShopifyItem({
          descriptor: {
            name: product.title,
            symbol: product.images[0]?.src || "default-image-url", // Fallback for missing image
            short_desc: htmlToText(
              product.body_html?.match(/<span>(.*?)<\/span>/)?.[1] ||
                "Short description unavailable",
              { wordwrap: false }
            ),
            long_desc: htmlToText(
              product.body_html || "Long description unavailable",
              { wordwrap: false }
            ),
            code: `1:${product.variants[0].barcode}`,
            images: product.images.map((img) => img.src) || [],
          },
          quantity: {
            maximum: {
              count: product.variants[0]?.inventory_quantity ,
            },
          },
          domain: "ONDC:RET13",
          tax_rate: "", // Hardcoded
          tax_type: "", // Hardcoded
          isParent: true,
          price: {
            currency: "INR", // Default to INR
            value: product.variants[0]?.price , 
            maximum_value: product.variants[0]?.price ,
          },
          category_id: product.product_type,
          brandName: product.vendor, 
          fulfillment_id: 1,
          location_id: "location_placeholder",
          "@ondc/org/returnable": true,
          "@ondc/org/cancellable": true,
          rating: 0,
          totalSold: 0,
          SellerID: "seller_placeholder",
          when: {
            date: new Date().toISOString().split("T")[0],
            time: new Date().toISOString().split("T")[1],
          },
          cityCode: "city_placeholder",
        });

        const savedProduct = await newProduct.save();

        savedProduct.parent_item_id = savedProduct._id;

        const finalSavedProduct = await savedProduct.save();
        savedProducts.push(finalSavedProduct);
      } catch (productError) {
        console.error(
          `Failed to save product ${product.title}:`,
          productError.message
        );
        failedProducts.push({
          product: product.title,
          error: productError.message,
        });
      }
    }

    return res.status(200).json({
      message: "Products processed successfully",
      savedProducts,
      failedProducts,
    });
  } catch (error) {
    console.error("Error in AddProduct:", error.message);
    return res.status(500).json({
      message: "Failed to add products",
      status: "failure",
      error: error.message,
    });
  }
}

async function GetProducts() {
  const shopifyUrl = process.env.shopify_products_url;

  try {
    const response = await axios.get(shopifyUrl);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw new Error("Failed to fetch products from Shopify");
  }
}

exports.AddProduct = AddProduct;
