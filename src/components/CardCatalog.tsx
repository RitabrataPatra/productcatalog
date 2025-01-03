"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { toProperTime } from "../../helpers/helpers";
import { Button } from "./ui/button";
import UpdateImage from "./UpdateImage";
import { UpdateProd } from "./UpdateProd";

export interface ItemDetailProps {
  _id: string;
  title: string;
  content: string;
  price: number;
  category: string;
  image: string;
  createdAt: string;
}

const CardCatalog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ItemDetailProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3; // Adjust the number of items per page

  const getData = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/product?page=${page}&limit=${itemsPerPage}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data, check client-side code");
      }
      const result = await res.json();
      setData(result.items); // Assuming `items` is the paginated data array
      setTotalPages(result.totalPages); // Assuming `totalPages` is provided by the API
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!userConfirmed) return;

    try {
      setIsLoading(true);
      const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete the product.");
      }
      setData((prevData) =>
        prevData.filter((item: ItemDetailProps) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while trying to delete the product.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2Icon className="animate-spin" size={50} />
        </div>
      ) : (
        <section className="flex flex-col gap-4">
          {data.map((item) => (
            <Card
              className="shadow-md flex p-2 items-center justify-between"
              key={item._id}
            >
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="rounded-lg"
                  style={{
                    height: "200px",
                    width: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority
                />
                <div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {item.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-neutral-500">
                    <p className="line-clamp-1">{item.content}</p>
                  </CardContent>
                  <CardFooter className="text-sm text-neutral-400 flex-col flex items-start">
                    <p>₹{item.price}.</p>
                    <p>{toProperTime(item.createdAt)}</p>
                  </CardFooter>
                </div>
              </div>

              <div className=" flex-col gap-4 mr-4 md:flex hidden">
                <UpdateProd item={item} />
                <Button
                  variant={"destructive"}
                  onClick={() => deleteData(item._id)}
                >
                  <Trash2Icon />
                  Delete Product
                </Button>
                <UpdateImage id={item._id} image={item.image} />
              </div>
            </Card>
          ))}
          <div className="flex justify-between mt-4 items-center">
            <Button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm text-neutral-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default CardCatalog;
