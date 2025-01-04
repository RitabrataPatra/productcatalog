import connectMongo from "@/lib/db/dbConnect";
import Product from "@/lib/models/Product";

import { NextRequest, NextResponse } from "next/server";

// Utility function for error handling

// eslint-disable-next-line @typescript-eslint/no-explicit-any
 const handleError = (error: any) => {
    console.error("API Error:", error.message || error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  };
export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    // Extract query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || ""; // Extract the search query

    if (page < 1 || limit < 1) {
      return NextResponse.json({ error: "Invalid page or limit" }, { status: 400 });
    }

    // Calculate pagination values
    const skip = (page - 1) * limit;

    //build search filter
    const searchFilter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } }, // Case-insensitive search in title
            { content: { $regex: search, $options: "i" } }, // Case-insensitive search in content
          ],
        }
      : {};

    // Fetch paginated data
    const [products, totalItems] = await Promise.all([
      Product.find(searchFilter).sort({ createdAt: -1 }).skip(skip).limit(limit), // Sorted by newest first
      Product.countDocuments(searchFilter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json(
      {
        items : products,
        totalItems,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
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

