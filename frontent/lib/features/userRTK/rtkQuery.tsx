import {
  IChangePasswordDto,
  IForgotPassword,
  IResetPassword,
  IUpdateUserDto,
  IUser,
  IUSerSkillsFrelancerId,
  IVerify,
} from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const rtkUser = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user", "users"],
  endpoints: (build) => ({
    getUsers: build.query<IUser[], any>({
      query: () => "/user",
      providesTags: ["users"],
    }),
    updatePassword: build.mutation<IUser, IChangePasswordDto>({
      query: (body: IChangePasswordDto) => ({
        url: "/user/us/changepassword",
        method: "PATCH",
        body,
      }),
    }),
    updateUserData: build.mutation<IUser, { id: number; data: IUpdateUserDto }>(
      {
        query: ({ id, data }) => ({
          url: `/user/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["users"],
      }
    ),
    deleteUser: build.mutation<IUser, any>({
      query: (id: number) => ({
        url: "/user/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    forgotPassword: build.mutation<IUser, IForgotPassword>({
      query: (data: IForgotPassword) => ({
        url: "/user/us/forgotPassword",
        method: "PATCH",
        body: data,
      }),
    }),
    resetPassword: build.mutation<any, { email: string; data: IResetPassword }>(
      {
        query: ({ email, data }: { email: string; data: IResetPassword }) => ({
          url: "/user/us/resetPassword/" + email,
          method: "PATCH",
          body: data,
        }),
      }
    ),
    verify: build.mutation<any, IVerify>({
      query: (obj: IVerify) => ({
        url: "/user/verify",
        method: "POST",
        body: obj,
      }),
    }),
    addUserSkill: build.mutation<any, { skillId: number }>({
      query: (obj: { skillId: number }) => ({
        url: "/user-skills",
        method: "POST",
        body: obj,
      }),
      invalidatesTags: ["users"],
    }),
    userSkillIsFreelancerId: build.query<IUSerSkillsFrelancerId[], any>({
      query: (id: any) => "/user-skills/" + id,
      providesTags: ["users"],
    }),
    deleteUserSkill: build.mutation<any, number>({
      query: (id: number) => ({
        url: "/user-skills/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useUpdatePasswordMutation,
  useUpdateUserDataMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyMutation,
  useAddUserSkillMutation,
  useUserSkillIsFreelancerIdQuery,
  useDeleteUserSkillMutation,
} = rtkUser;
