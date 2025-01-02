import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CardCatalog = () => {
  return (

      <Card className="shadow-md    ">
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
      </Card>

  );
};

export default CardCatalog;
