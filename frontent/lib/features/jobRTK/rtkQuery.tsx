import {
  ICreateJobDto,
  ICreateJobSkillDto,
  ICreateJobUserDto,
  IJob,
  IJobUser,
  IStatus,
  IUpdateJobDto,
} from "@/type/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const rtkJob = createApi({
  reducerPath: "job",
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
  tagTypes: ["job", "jobs"],
  endpoints: (build) => ({
    getAllJobs: build.query<IJob[], any>({
      query: () => "/jobs",
      providesTags: ["jobs"],
    }),
    addJob: build.mutation<IJob, ICreateJobDto>({
      query: (obj: ICreateJobDto) => ({
        url: "/jobs",
        method: "POST",
        body: obj,
      }),
    }),
    getJobById: build.query<IJob, number>({
      query: (id: number) => ({
        url: "/jobs/" + id,
        providesTags: ["jobs"],
      }),
    }),
    updateJob: build.mutation<string | {}, { id: number; data: IUpdateJobDto }>(
      {
        query: ({ id, data }: { id: number; data: IUpdateJobDto }) => ({
          url: "/jobs/" + id,
          method: "PATCH",
          body: data,
        }),
      }
    ),
    deleteJob: build.mutation<any, number>({
      query: (id: number) => ({
        url: "/jobs/" + id,
        method: "DELETE",
      }),
    }),
    // 3 hat bac
    findJobsByCustomerId: build.query<
      IJob[],
      { id: number | undefined; status?: IStatus }
    >({
      query: ({ id, status }: { id: number | undefined; status?: IStatus }) => {
        if (id) {
          return {
            url:
              "/jobs/findJobsByCustomerId/" +
              id +
              (status ? "?status=" + status : ""),
          };
        } else {
          return {
            url: "/jobs/findJobsByCustomerId/0",
          };
        }
      },
    }),
    //job skill
    addJobSkill: build.mutation<any, ICreateJobSkillDto>({
      query: (obj: ICreateJobSkillDto) => ({
        url: "/job-skill",
        method: "POST",
        body: obj,
      }),
    }),
    deleteJobSkil: build.mutation<any, number>({
      query: (id: number) => ({
        url: "/job-skill/" + id,
        method: "DELETE",
      }),
    }),
    jobUserHayt: build.mutation<any, ICreateJobUserDto>({
      query: (obj: ICreateJobUserDto) => ({
        url: "/job-user",
        method: "POST",
        body: obj,
      }),
    }),
    jobUserFindByJobId: build.query<IJobUser[], number>({
      query: (id: number) => ({
        url: "/job-user/findByJobId/" + id,
      }),
    }),
    deleteFreelancerHayt: build.mutation<any, number>({
      query: (id: number) => ({
        url: "/job-user/" + id,
        method: "DELETE",
      }),
    }),
    saveFreelancerHayt: build.mutation<
      any,
      { jobId: number; freelancerId: number }
    >({
      query: ({
        jobId,
        freelancerId,
      }: {
        jobId: number;
        freelancerId: number;
      }) => ({
        url: `/jobs/saveFreelancer/${jobId}/${freelancerId}`,
        method: "PATCH",
      }),
    }),
    findJobByFreelanceerId: build.query<IJob[], { id: any; status?: string }>({
      query: ({ id, status }: { status?: string; id: any }) => ({
        url:
          "/jobs/findJobsByFreelancerId/" +
          (id ? id : 0) +
          (status ? "?status=" + status : ""),
      }),
    }),
  }),
});
export const {
  useGetAllJobsQuery,
  useAddJobMutation,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useFindJobsByCustomerIdQuery,
  useAddJobSkillMutation,
  useDeleteJobSkilMutation,
  useJobUserHaytMutation,
  useJobUserFindByJobIdQuery,
  useDeleteFreelancerHaytMutation,
  useSaveFreelancerHaytMutation,
  useFindJobByFreelanceerIdQuery,
} = rtkJob;
