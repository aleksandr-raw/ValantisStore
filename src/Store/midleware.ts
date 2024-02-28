import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { notification } from "antd";

interface ErrorPayload {
  data: any;
}

export const ErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (
      isRejectedWithValue(action) &&
      action.payload &&
      typeof action.payload === "object" &&
      "data" in action.payload
    ) {
      const payloadAction = action as PayloadAction<ErrorPayload>;
      console.error("Error: ", payloadAction.payload.data);
      notification.error({
        message: "Ошибка запроса",
        description: payloadAction.payload.data,
        placement: "bottomRight",
        type: "error",
        duration: 5,
      });
    }
    return next(action);
  };
