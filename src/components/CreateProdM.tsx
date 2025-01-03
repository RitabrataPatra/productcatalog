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
import { PlusCircleIcon } from "lucide-react";
import React from "react";

const inputs = [
  "title",
  "description",
  "content",
  "footer",
  "price",
  "category",
];

export function CreateProdM() {
  const [formData, setFormData] = React.useState<Record<string, string>>(
    inputs.reduce((acc, input) => {
      acc[input] = ""; // Initialize all inputs with empty strings
      return acc;
    }, {} as Record<string, string>)
  );

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>, field : string) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <span>
            <PlusCircleIcon />
          </span>
          <p>Create New Product</p>
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
              <div
                className="grid grid-cols-4 items-center gap-4"
                key={field}
              >
                <Label htmlFor={field} className="text-right">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  value={formData[field]}
                  className="col-span-3"
                  type="text"
                  onChange={(e) => handleChange(e, field)}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
