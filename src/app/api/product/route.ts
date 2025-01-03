import connectMongo from "@/lib/db/dbConnect";
import Product from "@/lib/models/Product";

import { NextRequest, NextResponse } from "next/server";

// Utility function for error handling

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any) => {
    console.error("API Error:", error.message || error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  };
export async function GET(){
    try {
      await connectMongo();
      const products = await Product.find();
    console.log(products);
    return NextResponse.json(products , {status: 200});  
    } catch (error) {
      return handleError(error);
    }
    
}

export async function POST(req: NextRequest){
    try {
      await connectMongo();
      const body = await req.json();
      const product = await Product.create(body);
      console.log("productPOST");
      return NextResponse.json(product, {status: 201});
    } catch (error) {
        return handleError(error);
    }
}

