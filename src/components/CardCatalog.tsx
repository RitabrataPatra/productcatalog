"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import { toProperTime } from "../../helpers/helpers";
import { Button } from "./ui/button";

interface ItemDetailProps {
  _id: string;
  title: string;
  content: string;
  price: number;
  category: string;
  image: string;
  createdAt: string;
}

const CardCatalog = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const getData = async () => {
    setIsLoading(true);
    const res = await fetch("/api/product");
    if (!res.ok) {
      throw new Error("Failed to fetch data , check client side code");
    }
    const data = await res.json();
    setData(data);
    setIsLoading(false);
    console.log(data);
  };
  useEffect(() => {
    console.log("Fetching Data");
    getData();
    console.log("Data Fetched");
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2Icon className="animate-spin" size={50} />
        </div>
      ) : (
        <section className="flex flex-col gap-4">
          {data.map((item: ItemDetailProps) => (
            <Card
              className="shadow-md flex p-2 items-center justify-between"
              key={item._id}
            >
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt="Product Image"
                  width={200}
                  height={100}
                  className="rounded-lg"
                />
                <div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {item.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-neutral-500">
                    <p>{item.content}</p>
                  </CardContent>
                  <CardFooter className="text-sm text-neutral-400 flex-col flex items-start">
                    <p>₹{item.price}.</p>
                    <p>{toProperTime(item.createdAt)}</p>
                  </CardFooter>
                </div>
              </div>

              <div className="flex flex-col gap-4 mr-4">
                <Button>Update Product</Button>
                <Button variant={"destructive"}>Delete Product</Button>
                <Button variant={"outline"}>Change Image</Button>
              </div>
            </Card>
          ))}
        </section>
      )}
    </>
  );
};

export default CardCatalog;
