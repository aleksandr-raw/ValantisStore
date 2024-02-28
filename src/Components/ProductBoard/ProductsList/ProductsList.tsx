import { ProductCard } from "../ProductCard/ProductCard";
import React, { FC, useEffect, useMemo } from "react";
import { useGetItemsQuery } from "../../../API/api";
import { itemsPerPage } from "../../../constants/constants";

type ProductsListProps = {
  uniqueProductIds: string[] | null;
  currentPage: number;
  filteredProductIds: string[] | null;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
};

export const ProductsList: FC<ProductsListProps> = ({
  uniqueProductIds,
  filteredProductIds,
  currentPage,
  setIsLoading,
  isLoading,
}) => {
  const productIdsForCurrentPage = uniqueProductIds?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const {
    data: products,
    error: getProductsError,
    refetch: refetchProducts,
    isFetching: isFetchingProducts,
  } = useGetItemsQuery(
    { ids: productIdsForCurrentPage },
    { skip: !filteredProductIds && !productIdsForCurrentPage },
  );

  useEffect(() => {
    setIsLoading(isFetchingProducts);
  }, [isFetchingProducts, setIsLoading]);

  useEffect(() => {
    if (getProductsError) {
      refetchProducts();
    }
  }, [getProductsError, refetchProducts]);

  const loadingCards = useMemo(() => new Array(itemsPerPage).fill(null), []);

  return (
    <div className={"flex flex-wrap w-full gap-y-4 justify-between mt-4"}>
      {isLoading
        ? loadingCards.map((_, index) => (
            <ProductCard key={index} isLoading={isLoading} />
          ))
        : products?.map((product) => (
            <ProductCard
              key={product.id}
              productItem={product}
              isLoading={isLoading}
            />
          ))}
    </div>
  );
};
