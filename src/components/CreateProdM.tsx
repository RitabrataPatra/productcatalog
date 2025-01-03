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
import { LoaderIcon, PlusCircleIcon } from "lucide-react";
import React from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

const inputs = [
  "title",
  "content",
  "price",
  "category",
  "image"
];

export function CreateProdM() {
  const router = useRouter();
  const[modal , setModal] = React.useState(false);
  const [formData, setFormData] = React.useState<Record<string, string>>(
    inputs.reduce((acc, input) => {
      acc[input] = ""; // Initialize all inputs with empty strings
      return acc;
    }, {} as Record<string, string>)
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product created successfully:", data);
        // Reset form data if needed
        setFormData(
          inputs.reduce((acc, input) => {
            acc[input] = "";
            return acc;
          }, {} as Record<string, string>)
        );
      } else {
        console.error("Error creating product:", response.statusText);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      
      setIsLoading(false);
      setModal(false);
      router.push("/"); // Redirect to home page
    }
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon />
          <span className="ml-2">Create New Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Make sure to fill out all the fields.
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
                    placeholder="Product content goes here..."
                    required
                  />
                ) : (
                  <Input
                    id={field}
                    value={formData[field]}
                    placeholder={`Product ${field} here...`}
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
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
