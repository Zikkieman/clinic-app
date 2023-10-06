"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (user.message === "Unauthorized" || user.message === "Something went wrong") {
        push("/");
        return;
      }

      // if the error did not happen, if everything is alright
      // setIsSuccess(true);
    })();
  }, [push]);

  // if (!isSuccess) {
  //   return <p>Loading...</p>;
  // }

  return (
    <main>
      {children}
    </main>
  );
}

async function getUser() {
  try {
    const response = await fetch("/api/isAuth");
    const res = await response.json()
console.log(res)
    return {
      user: res as any,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: error as any,
    };
  }
}
