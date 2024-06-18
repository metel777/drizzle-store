import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AddNewProductPage() {
  return (
    <main>
      <form className="flex flex-col mx-auto " action="/api/add-product" method="post">
        <ProductFormInput name="title" ph="Enter name of the product" type="text" />
        <ProductFormInput name="imageUrl" ph="Enter source of the image" type="text" />
        <ProductFormInput name="price" ph="Enter price of the product" type="number" />
        <ProductFormInput
          name="description"
          ph="Enter description of the product"
          type="text"
        />
        {/*  
        <Textarea
          placeholder="Enter description of the product"
          className=" bg-white min-h-48"
          name="description"
        /> */}
        <Button className="h-full rounded-none"  type="submit">Add product</Button>
      </form>
    </main>
  )
}

function ProductFormInput({
  ph,
  type,
  name,
}: {
  ph: string
  type: string
  name: string
}) {
  return (
    <Input
      placeholder={ph}
      className=" bg-white rounded-none active:ring-0"
      type={type}
      name={name}
    />
  )
}
