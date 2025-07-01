export interface ILogin {
  username: string;
  password: string;
}
export interface ITokenMessage {
  access_token: string;
  role: number;
}
export enum UserRole {
  ADMIN,
  CUSTOMER,
  FREELANCER,
}
export enum IStatus {
  START,
  PROCESS,
  FINISHED,
}
export interface IUser {
  id: number;
  name: string;
  surname: string;
  emailToken: string;
  role: UserRole;
  isVerified: boolean;
  code: number;
  email: string;
  customer: ICustomer;
  freelancer:IFreelancer
}

export interface ICreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  profession: string;
  role: UserRole;
  salary?: number;
  description?: string;
}
export interface IVerify {
  email: string;
  emailToken: string;
}

export interface IChangePasswordDto {
  currentPassword: string;
  password: string;
  confirmationPassword: string;
}

export interface IUpdateUserDto {
  name?: string;
  surname?: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  code: number;
  password: string;
  confirm_password: string;
}

export interface IUpdateCustomerDto {
  description: string;
}

export interface IUpdateFreelancerDto {
  salary: number;
  profession: string;
}

export interface ICreateSkillDto {
  name: string;
}

export interface IUpdateSkillDto {
  name?: string;
}

export interface ICreateUserSkillDto {
  skillId: number;
}

export interface ICreateJobDto {
  title: string;
  description: string;
  price: number;
  skills: string[];
}

export interface IUpdateJobDto {
  title: string;
  description: string;
  price: number;
}

export interface IUpdateJobStatus {
  status: number;
}

export interface ICreateJobSkillDto {
  skillId: number;
  jobId: number;
}

export interface ICreateJobUserDto {
  jobId: number;
}

export interface ICreateFeedbackDto {
  rate: number;
  text: string;
}
export interface IMessage {
  error: string;
}
export interface IFreelancer {
  id: number;
  userId: number;
  salary: number;
  profession: string;
  user:IUser
}
export interface ISkill {
  id: number;
  name: string;
  freelancer: IFreelancer[];
}
export interface IFindJobBySkill {
  id: number;
  name: string;
  jobs: [];
}
export interface IJob {
  id: number;
  title: string;
  description?: string;
  price?: number;
  customerId?: number;
  freelancerId?: null;
  status?: number;
  rate?: null;
  text?: string;
  jobSkills: IJobSkill[];
  freelancer:IFreelancer
}
export interface ICustomer {
  id: number;
  userId: number;
  description: string;
  user: IUser;
  jobs: IJob[];
}
export interface ISkillandSalary {
  skills: string;
  minSalary: number;
  maxSalary: number;
}
export interface IJobSkill {
  id: number;
  jobId: number;
  skill: ISkill;
  skillId: number;
}
export interface IJobUser{
  id:number
  freelancerId:number
  jobId:number
  freelancer:IFreelancer

}
export interface ISaveFReelancer{
  jobId:number
  freelanerId:number
}
export interface IUSerSkillsFrelancerId{
  id:number,
  skillId:number
  freelancerId:number
  skill:ISkill
}