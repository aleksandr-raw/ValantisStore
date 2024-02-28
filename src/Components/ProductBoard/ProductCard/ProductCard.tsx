import { Card } from "antd";
import { Product } from "../../../types/types";
import { FC } from "react";

type ProductCardProps = {
  productItem?: Product;
  isLoading: boolean;
};

export const ProductCard: FC<ProductCardProps> = ({
  productItem,
  isLoading,
}) => {
  const { id, brand, price, product } = productItem || {};
  return (
    <Card
      loading={isLoading}
      className={"w-full md:w-[49%]  "}
      title={isLoading ? "Loading..." : product}
      bordered={true}
      hoverable={true}
    >
      <p className="text-start">id: {id}</p>
      <p className="text-xl text-start ">Бренд: {brand || "No name"}</p>
      <p className="w-full text-xl text-end mt-8">Цена: {price} ₽</p>
    </Card>
  );
};
