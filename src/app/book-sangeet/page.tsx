'use client';

import BookSangeet from "./(_component)/formComponent";
import GetSangeet from "./(_component)/GetSangeet";
import { BookSangeetEntity } from "@/core/entities/BookSangeetEntity";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";        // ✅ correct import
import { bookSangeetApiRepository } from "@/services/BookSangeet.api";
import { LoaderOne } from "@/components/ui/loader";
import { userApi } from "@/services/User.api";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState<BookSangeetEntity[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        // ✅ Make sure axios sends cookies (if not already set globally)
        axios.defaults.withCredentials = true;

        const [userData, sangeetData] = await Promise.all([
          userApi.findUser(),              // usually calls /api/me
          bookSangeetApiRepository.get(),  // calls /api/book-sangeet
        ]);

        console.log("User Found:", userData);

        if (sangeetData) {
          setData(sangeetData);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);

        // if backend returns 401 → redirect to login
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const handleFormSuccess = (newData: BookSangeetEntity) => {
    setData((currentData) => [...(currentData || []), newData]);
  };

  const hasData = data && data.length > 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderOne />
      </div>
    );
  }

  return (
    <div>
      {hasData ? (
        <GetSangeet fetchdata={data!} />
      ) : (
        <BookSangeet onSuccess={handleFormSuccess} />
      )}
    </div>
  );
};

export default Page;
