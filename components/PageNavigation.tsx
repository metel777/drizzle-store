import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {}
export default function PageNavigation({}: Props) {
  const numbers10 = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <Pagination className="bg-white mt-5 py-2 rounded-sm">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {numbers10.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink href={`/?page=${item}`}>{item}</PaginationLink>
          </PaginationItem>
        ))}
       
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
