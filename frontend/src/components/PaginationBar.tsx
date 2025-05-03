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
      disableCursorAnimation
      showControls
      size="sm"
      classNames={{
        prev: "bg-none",
      }}
      initialPage={1}
      page={page}
      onChange={setPage}
      total={total}
    />
  );
}
