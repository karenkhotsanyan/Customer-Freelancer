import {
  IFreelancer,
  ISkillandSalary,
  IUpdateFreelancerDto,
} from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const rtkFreelancer = createApi({
  reducerPath: "freelancer",
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
  tagTypes: ["freelancer", "freelancers"],
  endpoints: (build) => ({
    getFreelancers: build.query<IFreelancer[], any>({
      query: () => "/freelancer",
    }),
    getFreelancerById: build.query<IFreelancer, number>({
      query: (id: number) => ({
        url: "/freelancer/" + id,
      }),
    }),

    updateFreelancerData: build.mutation<
      string,
      { id: number; obj: IUpdateFreelancerDto }
    >({
      query: ({ id, obj }: { id: number; obj: IUpdateFreelancerDto }) => ({
        url: "/freelancer/" + id,
        method: "PATCH",
        body: obj,
      }),
    }),
    searchSkillMinMaxSalary: build.query<[], ISkillandSalary>({
      query: (obj: ISkillandSalary) => ({
        url: "/freelancer/find/freelancerBySkillAndSalary",
        body: obj,
      }),
    }),
  }),
});
export const {
  useGetFreelancersQuery,
  useSearchSkillMinMaxSalaryQuery,
  useGetFreelancerByIdQuery,
  useUpdateFreelancerDataMutation,
} = rtkFreelancer;
