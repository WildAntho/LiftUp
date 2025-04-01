import { Pagination } from "@heroui/react";

type PaginationBarProps = {
  page: number;
  setPage: (count: number) => void;
  total: number;
};

export default function PaginationBar({
  page,
  setPage,
  total,
}: PaginationBarProps) {
  return (
    <Pagination
      isCompact
      showControls
      initialPage={1}
      page={page}
      onChange={setPage}
      total={total}
    />
  );
}
