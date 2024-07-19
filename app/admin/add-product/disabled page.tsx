import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AddNewProductPage() {


  return (
    <main>
      <form
        className="flex flex-col mx-auto max-w-[400px] "
        action="/api/add-product"
        method="post"
      >
        <Input
          name="title"
          placeholder="Enter name of the product"
          type="text"
        />
        <Input
          name="imageUrl"
          placeholder="Enter source of the image"
          type="text"
        />
        <Input
          name="price"
          placeholder="Enter price of the product"
          type="number"
        />
        <Textarea
          placeholder="Enter description of the product"
          className=" bg-white min-h-48"
          name="description"
        />
        <Button className="h-full mt-5" type="submit">
          Add product
        </Button>
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
