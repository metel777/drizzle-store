import { getProductById } from "@/actions/products"
import EditForm from "@/components/reusable/edit-form"

type Props = {
  params: {
    productId: string
  }
}
export default async function EditProductPage({ params }: Props) {
  const res = await getProductById(params.productId)
  const data = res[0]

  return <EditForm product={data} />
}
