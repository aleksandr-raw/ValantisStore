import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";
import { Product, ProductIds, Products } from "../types/types";

const API_URL = "http://api.valantis.store:40000";

const createAuthString = (password: string) => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return CryptoJS.MD5(`${password}_${timestamp}`).toString();
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("X-Auth", createAuthString("Valantis"));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllIds: builder.query({
      query: () => ({
        url: "/",
        method: "POST",
        body: {
          action: "get_ids",
        },
      }),
      transformResponse: (response: { result: ProductIds }) =>
        Array.from(new Set(response.result)),
    }),
    getItems: builder.query({
      query: (params) => ({
        url: "/",
        method: "POST",
        body: {
          action: "get_items",
          params,
        },
      }),
      transformResponse: (response: { result: Products }) => {
        const uniqueItems = response.result.reduce(
          (acc: Products, current: Product) => {
            const isDuplicate = acc.find((item) => item.id === current.id);
            if (!isDuplicate) {
              return [...acc, current];
            } else {
              return acc;
            }
          },
          [],
        );
        return uniqueItems;
      },
    }),
    getFields: builder.query({
      query: () => ({
        url: "/",
        method: "POST",
        body: {
          action: "get_fields",
        },
      }),
      transformResponse: (response: { result: string[] }) => response.result,
    }),
    getFieldValue: builder.query({
      query: (params) => ({
        url: "/",
        method: "POST",
        body: {
          action: "get_fields",
          params,
        },
      }),
      transformResponse: (response: { result: (string | number)[] }) =>
        Array.from(new Set(response.result)).sort((a: any, b: any) => {
          if (typeof a === "number" && typeof b === "number") {
            return a - b;
          }
          if (typeof a === "string" && typeof b === "string") {
            return a.localeCompare(b);
          } else {
            return 0;
          }
        }),
    }),
    filter: builder.query({
      query: (params) => ({
        url: "/",
        method: "POST",
        body: {
          action: "filter",
          params,
        },
      }),
      transformResponse: (response: { result: ProductIds }) =>
        Array.from(new Set(response.result)),
    }),
  }),
});

export const {
  useGetAllIdsQuery,
  useGetItemsQuery,
  useGetFieldsQuery,
  useGetFieldValueQuery,
  useFilterQuery,
} = api;
