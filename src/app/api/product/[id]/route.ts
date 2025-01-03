import connectMongo from "@/lib/db/dbConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  console.error("API Error:", error.message || error);
  return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
};

export async function DELETE(req: NextRequest) {
  try {
    await connectMongo();

    // Extract the `id` from params
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extract the last segment (the `id`)

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Find and delete the product by ID
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log(product);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    handleError(error);
  }
}


export async function PUT(req: NextRequest){
  
  try {

    await connectMongo();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extract the last segment (the `id`)
    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    console.log(updatedProduct);
    return NextResponse.json(updatedProduct, { status: 200 });

  } catch (error) {
    handleError(error);
    
  }
} 