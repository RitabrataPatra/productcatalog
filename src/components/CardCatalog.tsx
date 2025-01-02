import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const CardCatalog = () => {
  return (

      <Card className="shadow-md flex items-center">
        <Image src={"https://picsum.photos/200/300?grayscale"} alt="Product Image" width={200} height={100} className="m-2 rounded-lg"/>
        <div>
        <CardHeader>
          <CardTitle>Product Title</CardTitle>
          <CardDescription className="text-xs">Product Category</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-neutral-500">
          <p>Product Content</p>
        </CardContent>
        <CardFooter className="text-sm text-neutral-400">
          <p>Product Footer Details like createdAt etc..</p>
        </CardFooter>
        </div>
       
      </Card>

  );
};

export default CardCatalog;
