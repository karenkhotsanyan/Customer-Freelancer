import { Verify } from "../components/Verify";

export default function VerifyPage({searchParams}:any) {

// console.log(searchParams.email);
// console.log(searchParams.emailToken);
  return (
    <>
      <Verify email={searchParams.email} emailToken={searchParams.emailToken} />
    </>
  );
}
