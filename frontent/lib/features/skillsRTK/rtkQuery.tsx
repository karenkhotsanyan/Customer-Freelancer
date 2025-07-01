import {
  ICreateSkillDto,
  IFindJobBySkill,
  IMessage,
  ISkill,
  IUpdateSkillDto,
} from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const rtkSkills = createApi({
  reducerPath: "skills",
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
  tagTypes: ["skill", "skills"],
  endpoints: (build) => ({
    addAdminSkill: build.mutation<string | IMessage, ICreateSkillDto>({
      query: (obj: ICreateSkillDto) => ({
        url: "/skills",
        method: "POST",
        body: obj,
      }),
    }),
    getSkills: build.query<ISkill[], any>({
      query: () => "/skills",
      providesTags: ["skills"],
    }),
    skillFreelancer: build.query<ISkill, number>({
      query: (id: number) => ({
        url: "/skills/" + id,
      }),
    }),
    updateSkillNameADMIN: build.mutation<
      string,
      { id: number; obj: IUpdateSkillDto }
    >({
      query: ({ id, obj }: { id: number; obj: IUpdateSkillDto }) => ({
        url: "/skills/" + id,
        method: "PATCH",
        body: obj,
      }),
      invalidatesTags: ["skills"],
    }),
    deleteSkillADMIN: build.mutation<any, number>({
      query: (id: number) => ({
        url: "/skills/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["skills"],
    }),
    skillFreelancerSkill: build.query<IFindJobBySkill, number>({
      query: (id: number) => ({
        url: "/skills/findJobBySkillId/" + id,
      }),
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useSkillFreelancerSkillQuery,
  useSkillFreelancerQuery,
  useAddAdminSkillMutation,
  useDeleteSkillADMINMutation,
  useUpdateSkillNameADMINMutation,
} = rtkSkills;
