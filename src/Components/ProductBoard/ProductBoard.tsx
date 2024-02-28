import { Pagination } from "antd";
import { useFilterQuery, useGetAllIdsQuery } from "../../API/api";
import React, { useEffect, useState } from "react";
import { FilterValue, ProductIds } from "../../types/types";
import { FilterPanel } from "../Filters/FilterPanel";
import { itemsPerPage, startPage } from "../../constants/constants";
import { ProductsList } from "./ProductsList/ProductsList";
import { scrollToTop } from "../../utils/utils";

export const ProductBoard = () => {
  const [currentPage, setCurrentPage] = useState(startPage);
  const [filterValues, setFilterValues] = useState<FilterValue | null>(null);
  const [filteredProductIds, setFilteredProductIds] =
    useState<ProductIds | null>(null);
  const [uniqueProductIds, setUniqueProductIds] = useState<ProductIds>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: allProductsData,
    error: allProductIdsError,
    refetch: refetchAllProducts,
  } = useGetAllIdsQuery({});

  const {
    data: filteredData,
    error: filteredDataError,
    refetch: refetchFilteredData,
  } = useFilterQuery(filterValues, { skip: !filterValues });

  useEffect(() => {
    if (allProductsData) {
      setUniqueProductIds(allProductsData);
    }
    if (filteredProductIds) {
      setUniqueProductIds(filteredProductIds);
    }
  }, [allProductsData, filteredProductIds]);

  useEffect(() => {
    if (filteredData) {
      setFilteredProductIds(filteredData);
    }
  }, [filteredData]);

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  useEffect(() => {
    if (allProductIdsError) {
      refetchAllProducts();
    }
    if (filteredDataError) {
      refetchFilteredData();
    }
  }, [
    allProductIdsError,
    filteredDataError,
    refetchAllProducts,
    refetchFilteredData,
  ]);

  return (
    <section className={"h-full flex flex-col max-w-[1200px] mx-auto "}>
      <FilterPanel
        onFilterChange={setFilterValues}
        onFilterReset={setFilteredProductIds}
        setCurrentPage={setCurrentPage}
        setIsLoading={setIsLoading}
      />
      <h1 className={"text-2xl  self-center"}>Список товаров</h1>
      <ProductsList
        currentPage={currentPage}
        uniqueProductIds={uniqueProductIds}
        filteredProductIds={filteredProductIds}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <Pagination
        className={"p-6 mt-auto self-center"}
        current={currentPage}
        onChange={setCurrentPage}
        total={uniqueProductIds?.length || 0}
        pageSize={itemsPerPage}
        showSizeChanger={false}
      />
    </section>
  );
};
