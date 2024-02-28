import { Button, Form, Select, Spin } from "antd";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useGetFieldsQuery } from "../../API/api";
import { Filter } from "./Filter/Filter";
import { FilterValue, ProductIds } from "../../types/types";
import { startPage } from "../../constants/constants";

type FiltersProps = {
  onFilterChange: (newFilterValues: FilterValue) => void;
  onFilterReset: (values: ProductIds | null) => void;
  setCurrentPage: (page: number) => void;
  setIsLoading: (value: boolean) => void;
};

export const FilterPanel: FC<FiltersProps> = ({
  onFilterChange,
  onFilterReset,
  setCurrentPage,
  setIsLoading,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [prevFormValue, setPrevFormValue] = useState<FilterValue | null>(null);

  const [form] = Form.useForm();

  const {
    data: fieldsData,
    error: fieldsError,
    isFetching: isFieldsFetching,
    refetch: refetchFields,
  } = useGetFieldsQuery({});

  const onReset = () => {
    form.resetFields();
    onFilterReset(null);
    setSelectedFilter(null);
  };

  const onFinish = (formValue: FilterValue) => {
    if (JSON.stringify(formValue) !== JSON.stringify(prevFormValue)) {
      setCurrentPage(startPage);
    }
    onFilterChange(formValue);
    setPrevFormValue(formValue);
  };

  const options = useMemo(
    () =>
      fieldsData?.map((value) => ({
        value,
        label: value,
      })),
    [fieldsData],
  );

  useEffect(() => {
    setIsLoading(isFieldsFetching);
  }, [isFieldsFetching, setIsLoading]);

  useEffect(() => {
    if (fieldsError) {
      refetchFields();
    }
  }, [fieldsError, refetchFields]);

  if (isFieldsFetching) {
    return <Spin className={"ml-8 mr-auto p-3"} />;
  }

  return (
    <Form
      name="field"
      onFinish={onFinish}
      className="flex flex-col gap-y-4 lg:flex-row lg:gap-0 justify-between my-4"
      form={form}
    >
      <Select
        placeholder="Выберите нужный фильтр"
        onChange={setSelectedFilter}
        value={selectedFilter}
        className="w-full lg:w-[32%] "
        options={options}
      />
      {selectedFilter && (
        <>
          <Filter field={selectedFilter} form={form} />
          <div className="flex mb-0 justify-between lg:w-[32%]">
            <Form.Item className="mb-0">
              <Button
                type="default"
                htmlType="submit"
                className={"bg-[rgba(165,40,56,0.1)]"}
              >
                Применить фильтр
              </Button>
            </Form.Item>
            <Button type={"text"} htmlType="button" onClick={onReset}>
              Сбросить фильтр
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};
