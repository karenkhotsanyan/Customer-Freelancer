import { ICreateUserDto, ILogin, ITokenMessage, IUser } from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const rtkAuth = createApi({
  reducerPath: "auth",
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
  tagTypes: ["currentUser"],
  endpoints: (build) => ({
    login: build.mutation<ITokenMessage, ILogin>({
      query: (obj: ILogin) => ({
        url: "/auth/login",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["currentUser"],
    }),
    register: build.mutation<IUser, ICreateUserDto>({
      query: (obj: ICreateUserDto) => ({
        url: "/register",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["currentUser"],
    }),
    profile: build.query<IUser, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      transformResponse: (response: { user: IUser }) => response.user,
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        console.log(meta, baseQueryReturnValue, arg);
        return true;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProfileQuery } = rtkAuth;
