import React, { FC, useEffect, useMemo } from "react";
import { useGetFieldValueQuery } from "../../../API/api";
import { Form, FormInstance, Input, Select, Spin } from "antd";

type FilterProps = {
  field: string;
  form: FormInstance;
};
export const Filter: FC<FilterProps> = ({ field, form }) => {
  const {
    data: fieldValueData,
    error: fieldValueError,
    isLoading: isFieldValueLoading,
    refetch: refetchFieldValue,
  } = useGetFieldValueQuery({ field }, { skip: field === "product" });

  useEffect(() => {
    if (fieldValueError) {
      refetchFieldValue();
    }
  }, [fieldValueError, refetchFieldValue]);

  const options = useMemo(
    () =>
      fieldValueData?.map((value) => ({
        value,
        label: value === null ? "No name" : value,
      })),
    [fieldValueData],
  );
  if (isFieldValueLoading) {
    return <Spin />;
  }
  return (
    <Form.Item
      className="w-full lg:w-[32%] mb-0"
      rules={[
        {
          validator: (_, value) => {
            if (value || value === null) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error(`Необходимо указать значение для ${field}`),
            );
          },
        },
      ]}
      name={field}
    >
      {field === "product" ? (
        <Input
          placeholder="Введите значение для фильтра"
          onChange={(e) => {
            const newValue = e.target.value.toLowerCase().trim();
            form.setFieldsValue({ [field]: newValue });
          }}
        />
      ) : (
        <Select
          placeholder="Выберите значение для фильтра"
          options={options}
          allowClear
          showSearch
          className={"text-start"}
        />
      )}
    </Form.Item>
  );
};
