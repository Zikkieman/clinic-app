"use client"

import { useState, useEffect } from "react";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // const cookies = parse(document.cookie);
    const cookieStore = cookies();
    const token = cookieStore.get("clinicToken");

    if (token) {
      try {
        const decoded: any = verify(token.value, JWT_SECRET);
        setUser(decoded);
      } catch (error) {
        // Token is invalid, clear cookies and redirect to login
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login");
      }
    } else {
      // No token found, redirect to login
      router.push("/login");
    }
  }, []);

  return user;
}
