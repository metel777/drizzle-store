"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Product } from "@/types/product"
import { useState } from "react"

export default function EditForm({
  product,
}: {
  product: Product
}) {
  const [title, setTitle] = useState(product.title)
  const [imageUrl, setImageUrl] = useState(product.imageUrl)
  const [price, setPrice] = useState(product.price)
  const [description, setDescription] = useState(product.description)

  return (
    <main>
      <form
        className="flex flex-col  mx-auto justify-start"
        action="/api/update-product"
        method="post"
      >
        <Input
          placeholder="Enter name of the product"
      className=" bg-white rounded-none active:ring-0"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Enter source of the image"
      className=" bg-white rounded-none active:ring-0"
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Input
          placeholder="Enter price of the product"
      className=" bg-white rounded-none active:ring-0"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value as any)}
        />
         <Input
          placeholder="Enter price of the product"
      className=" bg-white rounded-none active:ring-0"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <Textarea
          placeholder="Enter description of the product"
          className=" bg-white min-h-48"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
        <input type="hidden" name="productId" value={product.id} />
        <Button variant='primary-black' className="rounded-none w-20 mx-auto" type="submit">Save</Button>
      </form>
    </main>
  )
}
