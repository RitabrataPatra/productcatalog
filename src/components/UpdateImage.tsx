// import { handleError } from "@/app/api/product/route";
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
import React from "react";
// import { useParams } from "next/navigation";

export default function UpdateImage({ id }: { id: string }) {
//   const { id } = useParams(); // Get productId from dynamic route
  const [input, setInput] = React.useState({ image: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const handleSubmit =  async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setIsLoading(true);
        const response = await fetch(`/api/product/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });
        console.log("response", response);

        if (response.ok) {
            const data = await response.json();
            console.log("Product created successfully:", data);
            // Reset form data if needed
            setInput({
                image: "",
            });
        } else {
            console.error("Error creating product:", response.statusText);
        }
    } catch (error) {
       console.error(error);
    }
    finally {
        setIsLoading(false);
        setModal(false);
        window.location.reload();
    }
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Image</DialogTitle>
          <DialogDescription>
            Put the URL of the image you want to change to, then click save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-4 items-center justify-start">
              <Label htmlFor="image" className="text-center col-span-1">
                Image URL
              </Label>
              <Input
                id="image"
                value={input.image}
                className="col-span-3"
                onChange={(e) => setInput({ image: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
