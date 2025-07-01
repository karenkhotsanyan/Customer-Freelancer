"use client";

import { useVerifyMutation } from "@/lib/features/userRTK/rtkQuery";
import { useEffect } from "react";

export const Verify = ({
  email,
  emailToken,
}: {
  email: string;
  emailToken: string;
}) => {
  const [verify] = useVerifyMutation();
  useEffect(() => {
    verify({ email, emailToken })
      .then((res) => {
        console.log(res);
      })
      .catch(console.warn);
  }, [email, emailToken]);
  return (
    <div>
      <h1>verify </h1>
    </div>
  );
};
