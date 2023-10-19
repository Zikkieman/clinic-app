"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (
        user.message === "Unauthorized" ||
        user.message === "Something went wrong"
      ) {
        push("/");
        return;
      }
    })();
  }, []);

  return (
    <main>
      {children}
    </main>
  );
}

async function getUser() {
  try {
    const response = await fetch("/api/isAuth");
    const res = await response.json();

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
