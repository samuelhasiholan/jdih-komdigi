import { ColumnType } from "@/types/table";
import { queryString, vibrate } from "@/utils/general";
import { Http } from "@/utils/http";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  SortDescriptor
} from "@nextui-org/table";
import {
  Modal, 
  ModalContent
} from "@nextui-org/modal";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { ChevronDownIcon, TableIcon } from "../icons";
import { RenderCell } from "./render-cell";
import { FilterType, TableWrapperProps } from "./types";
import { useAppDispatch } from "@/store";
import { motion } from "framer-motion";
import { useAsyncList } from "@react-stately/data";

const TableWrapper = (
  {
    url,
    title,
    module,
    persistFilters = [],
    persistSearch,
    columns,
    infiniteScroll = false,
    onView,
    onUpdate,
    extraActions,
    rawData,
    defaultSortDescriptor,
  }: TableWrapperProps,
  refs: any
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useAppDispatch();

  const [columnsShown, setColumnsShown] = useState<ColumnType[]>([...columns]);
  const [rowsPerPage, setRowsPerPage] = useState(infiniteScroll ? 20 : 10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    defaultSortDescriptor || {
      // column: "createdAt",
      // direction: "descending",
    }
  );
  const [filter, setFilter] = useState<FilterType[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [filterRawData, setFilterRawData] = useState([]);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const fetchData = async () => {
    if (isLoading) return;

    let _url = baseUrl + url;
    let queryParams = queryString({
      page: page,
      pageSize: rowsPerPage || 10,
      ...(persistSearch ? {[persistSearch]: search} : {keyword: search}),
      sort: sortDescriptor.column,
      sortType: sortDescriptor.direction
        ? sortDescriptor.direction === "ascending"
          ? "asc"
          : "desc"
        : undefined,
      ...persistFilters.reduce((acc: any, curr: any) => {
        curr?.multiple
          ? (acc[`filter[${curr.key}][${curr.operator}][]`] = curr.value)
          : (acc[
              `filter[${curr.key}]${curr?.operator ? `[${curr.operator}]` : ""}`
            ] = curr.value);
        return acc;
      }, {}),
      ...filter.reduce((acc: any, curr: any) => {
        curr?.multiple
          ? (acc[`filter[${curr.key}][${curr.operator}][]`] = curr.value)
          : (acc[
              `filter[${curr.key}]${curr?.operator ? `[${curr.operator}]` : ""}`
            ] = curr.value);
        return acc;
      }, {}),
    });

    _url += queryParams;

    // setData([]);

    if (url) {
      setIsLoading(true);
      await new Http()
        .request({ url: _url, method: "get" })
        .then(({ data }) => {
          setData(data.data);
          setTotal(data.total);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          return Promise.reject(err);
        });
    } else if (rawData) {
      setIsLoading(true);
      let begin = page * (rowsPerPage || 10) - (rowsPerPage || 10);
      let end = page * (rowsPerPage || 10);

      if (search) {
        let filterData = [];
        for (var i = 0; i < rawData.length; i++) {
          var subData = Object.values(rawData[i]);
          for (var j = 0; j < subData.length; j++) {
            if (
              String(subData[j]).toLowerCase().includes(search.toLowerCase())
            ) {
              filterData.push(rawData[i]);
              break;
            }
          }
        }
        setData(filterData.slice(begin, end));
        setTotal(filterData.length);
      } else {
        setData(rawData.slice(begin, end));
        setTotal(rawData.length);
      }
      setIsLoading(false);
    }
  };

  const handleFilterAction = ({ key, operator, value }: FilterType) => {
    const _filter = [...filter];
    const index = _filter.findIndex((item) => item.key === key);
    if (!value) {
      _filter.splice(index, 1);
      setFilter(_filter);
      return;
    }
    if (index > -1) {
      _filter[index] = {
        key,
        operator,
        value,
      };
    } else {
      _filter.push({
        key,
        operator,
        value,
      });
    }
    setFilter(_filter);
  };

  const pages = Math.ceil(total / rowsPerPage);

  const onPaginationChange = (page: number) => {
    vibrate();
    setPage(page);
  };

  const colWidth = (id: string) => {
    switch (id) {
      case "no":
        return "50px";
      case "actions":
        return "150px";
      default:
        return "auto";
    }
  };

  useMemo(() => {
    fetchData();
    const contentContainer = document?.getElementById("content-container");
    if (contentContainer) {
      contentContainer?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  useMemo(() => {
    if (page === 1) {
      fetchData();
    } else {
      setPage(1);
    }
  }, [rowsPerPage, filter, search, sortDescriptor, rawData]);

  useImperativeHandle(refs, () => ({
    fetchData,
    search: setSearch,
    filter: handleFilterAction,
    clearFilter: () => setFilter([]),
  }));

  useEffect(() => {
    const _columns = localStorage.getItem(`columns-${module}-${title}`);
    if (_columns) {
      setColumnsShown(JSON.parse(_columns));
    }
  }, []);

  const dropdownColumn = (columns: ColumnType[]) => (
    <TableColumn
      key={"actions"}
      align="end"
      allowsSorting={false}
      style={{
        width: "150px",
        paddingRight: "8px",
      }}
    >
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="float-right">
          <Button isIconOnly variant="light" size="sm">
            <TableIcon size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Select columns"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={columnsShown
            .filter((column) => column?.show)
            .map((column) => column.id)}
          onSelectionChange={(selectedKeys: any) => {
            if (selectedKeys.size === 1) return;
            const newColumnsShown = columns.map((column) => ({
              ...column,
              show: selectedKeys?.has(column.id),
            }));
            setColumnsShown(newColumnsShown);
            localStorage.setItem(
              `columns-${module}-${title}`,
              JSON.stringify(newColumnsShown)
            );
          }}
        >
          {columns
            .filter((column) => column.id !== "actions")
            .map((column, index) => (
              <DropdownItem key={`${column.id}`}>
                {columns?.find((c) => c.id === column.id)?.name}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </TableColumn>
  );

  const bottomContent =
    pages > 0 && !infiniteScroll ? (
      <div className="flex w-full items-center justify-center gap-4">
        <div className="flex gap-4">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={onPaginationChange}
          />
        </div>
      </div>
    ) : null;

  return (
    <div className="[& .nextui-table-container]:shadow-none] w-full">
      <Skeleton isLoaded={!isLoading} className="rounded-lg !bg-transparent mb-1">
        <div className="text-sm">
          <span className="hidden md:inline" style={{ color: "#444444", letterSpacing: "0.15px" }}>Menampilkan</span>{" "}
          {
            data?.length
            ? (page === 1 ? 1 : (page - 1) * rowsPerPage + 1)+" - "+(data?.length + rowsPerPage * (page - 1))+" dari "+total
            : 0
          }
        </div>
      </Skeleton>
      <Table
        // baseRef={scrollerRef}
        hideHeader 
        removeWrapper 
        aria-label="Dynamic Table"
        onSortChange={(e: any) => {
          if (sortDescriptor.column === "") {
            setSortDescriptor(e);
          } else if (sortDescriptor?.direction === "ascending") {
            setSortDescriptor(e);
          } else if (sortDescriptor?.direction === "descending") {
            setSortDescriptor({ column: "", direction: "descending" });
          }
        }}
        sortDescriptor={sortDescriptor}
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        isHeaderSticky
        classNames={{
          wrapper: `p-2 bg-content1/70 ${
            !infiniteScroll && "overflow-y-hidden"
          }`,
          emptyWrapper: "!h-auto",
          base: `${
            infiniteScroll && "max-h-[calc(100dvh-194px)]"
          } shadow-xs rounded-xl`,
          table: `${
            infiniteScroll && "max-h-[calc(100dvh-178px)]"
          } overflow-scroll`,
        }}
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 .75em",
        }}
      >
        <TableHeader columns={columnsShown.filter((c) => c?.show)}>
          {(column) =>
            column.id !== "actions" ? (
              <TableColumn
                key={column.id}
                hideHeader={column.id === "actions"}
                align={
                  ["actions", "no"].includes(column.id)
                    ? "center"
                    : column?.align || "start"
                }
                allowsSorting={column.sortable}
                style={{
                  minWidth: column?.width ? column.width : colWidth(column.id),
                  width: column?.width ? column.width : colWidth(column.id),
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.4 } }}
                  exit={{ opacity: 0 }}
                >
                  {columns?.find((c) => c.id === column.id)?.name}
                </motion.span>
              </TableColumn>
            ) : (
              dropdownColumn(columns)
            )
          }
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          // items={infiniteScroll ? list.items : data}
          items={data}
          // loadingContent={<Spinner className="mt-8" />}
          emptyContent={
            isLoading ? (
              ""
            ) : (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: 200,
                  opacity: 1,
                  transition: { delay: 0.4 },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                className="flex items-center justify-center p-0 overflow-hidden"
              >
                No data found
              </motion.div>
            )
          }
        >
          {data.map((item, index) => (
            <TableRow
              key={`row-${index}`}
              className={`[&>td]:hover:bg-default-50 [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl rounded-md cursor-pointer opacity-0 animate-fadeInScaleIn custom-table-row`}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "forwards",
              }}
              onClick={() => onView && onView(item)}
            >
              {(columnKey) => (
                <TableCell key={columnKey} className="p-0">
                  <div
                    className="px-1"
                  >
                    <div className="p-2">
                      {RenderCell({
                        columns: columns,
                        index: (page - 1) * rowsPerPage + index,
                        item: item,
                        columnKey: columnKey,
                        onView,
                        onUpdate,
                        onDelete: (item) => {
                          setSelectedItem(item);
                          setIsDeleteModalOpen(true);
                        },
                        extraActions,
                      })}
                    </div>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default forwardRef(TableWrapper);
