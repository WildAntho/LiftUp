import { Pagination } from "@heroui/react";

export default function PaginationBar() {
  return <Pagination isCompact showControls initialPage={1} total={10} />;
}
