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
import { ChevronDownIcon, PlayIcon, TableIcon } from "@/components/icons";
import { RenderCell } from "./render-cell";
import { FilterType, TableWrapperProps } from "./types";
import { useAppDispatch } from "@/store";
import { motion } from "framer-motion";
import { useAsyncList } from "@react-stately/data";
import { Image } from "@nextui-org/image";

const TableWrapper = (
  {
    url,
    title,
    module,
    persistFilters = [],
    persistSearch,
    columns,
    infiniteScroll = false,
    rawData,
    rawLoading,
    defaultSortDescriptor,
    onClick = (id: number) => {},
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
      <Skeleton
          isLoaded={!rawLoading}
          className="inline-block rounded-lg !bg-transparent mb-1"
      >
          <div className="text-sm inline-block">
              <span style={{ color: '#444444', letterSpacing: '0.15px' }}>
                  Menampilkan
              </span>{' '}
              {data?.length
                  ? (page === 1 ? 1 : (page - 1) * rowsPerPage + 1) +
                    ' - ' +
                    total +
                    ' dari ' +
                    total
                  : 0}
          </div>
      </Skeleton>
      
      {
        isLoading 
        ? ""
        : data
          ? <div className="grid grid-cols-3 gap-4 mt-3 mb-4">
              {
                data.map((value, index) => (
                  <Button 
                    className="flex flex-col block-card text-small gap-0" 
                    key={index}
                    onClick={() => onClick(value.id)}
                  >
                    {
                      value.views &&
                      <div className="video-card-date"><PlayIcon /><span className="ml-2">{value.views}</span></div>
                    }
                    <Image
                      alt="produk"
                      className="object-cover w-full"
                      src={value.thumbnail || value.previewPath}
                      radius="none"
                      removeWrapper
                    />
                    <div className="block-card-body">
                      <p className="font-bold text-primary">{value.judul}</p>
                    </div>
                  </Button>
                ))
              }
            </div>
          : "No data found"
      }
    </div>
  );
};

export default forwardRef(TableWrapper);
