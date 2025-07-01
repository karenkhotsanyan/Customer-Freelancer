import { ICustomer, IUpdateCustomerDto } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const rtkCustomer = createApi({
  reducerPath: "customer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["customer", "custormers"],
  endpoints: (build) => ({
    getCustomers: build.query<ICustomer[], any>({
      query: () => ({
        url: "/customer",
      }),
    }),
    customerById: build.query<ICustomer, number>({
      query: (id: number) => ({
        url: "/customer/" + id,
      }),
    }),
    updateCustomer: build.mutation<
      string,
      { id: number; obj: IUpdateCustomerDto }
    >({
      query: ({ id, obj }: { id: number; obj: IUpdateCustomerDto }) => ({
        url: "/customer/" + id,
        method: "PATCH",
        body: obj,
      }),
    }),
  }),
});
export const {
  useGetCustomersQuery,
  useCustomerByIdQuery,
  useUpdateCustomerMutation,
} = rtkCustomer;
