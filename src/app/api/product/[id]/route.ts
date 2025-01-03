import connectMongo from "@/lib/db/dbConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../route";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();

    // Extract the `id` from params
    const { id } = params;

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
