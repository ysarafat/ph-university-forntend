import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  status: number;
  data: {
    message: string;
    success: boolean;
    stack: string;
  };
};
export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
export type TResponse<T> = {
  meta?: TMeta;
  data?: T;
  error?: TError;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
