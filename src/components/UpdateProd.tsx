"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpCircleIcon, LoaderIcon } from "lucide-react";
import React from "react";
import { Textarea } from "./ui/textarea";
import { ItemDetailProps } from "./CardCatalog";

const inputs = ["title", "content", "price", "category", "image"];

export function UpdateProd({ item }: { item: ItemDetailProps }) {
  const [modal, setModal] = React.useState(false);
  const [formData, setFormData] = React.useState<Record<string, string>>(() =>
    inputs.reduce((acc, field) => {
      acc[field] = item[field as keyof ItemDetailProps]?.toString() || ""; // Ensure all fields are strings
      return acc;
    }, {} as Record<string, string>)
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/product/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Product updated successfully");
        setModal(false);
        window.location.reload(); // Reloads the page to reflect the changes
      } else {
        console.error("Error updating product:", await response.text());
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button>
          <ArrowUpCircleIcon />
          <span>Update Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Update the fields below and save your changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            {inputs.map((field) => (
              <div className="grid grid-cols-4 items-center gap-4" key={field}>
                <Label htmlFor={field} className="text-right">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                {field === "content" ? (
                  <Textarea
                    id={field}
                    value={formData[field]}
                    className="col-span-3 h-20"
                    onChange={(e) => handleChange(e, field)}
                    placeholder={`Enter product ${field}...`}
                    required
                  />
                ) : (
                  <Input
                    id={field}
                    type={field === "price" ? "number" : "text"}
                    value={formData[field]}
                    placeholder={`Enter product ${field}...`}
                    className="col-span-3"
                    onChange={(e) => handleChange(e, field)}
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoaderIcon className="animate-spin" size={20} />
                  <span className="ml-2">Saving changes...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
