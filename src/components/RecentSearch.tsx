"use client";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import React from "react";
import { IoTrendingUpSharp } from "react-icons/io5";
import { MdRestore } from "react-icons/md";
type props = {
  history: string[] | null;
  terms: string[] | null;
};
const RecentSearch = ({ history, terms }: props) => {
  const { toggleSearchDrawer, searchDrawer } = useTheme();
  const router = useRouter();

  const handleFollowSearch = (value: any) => {
    router.push("/browse-events?q=" + value);
    toggleSearchDrawer(!searchDrawer);
  };
  if ((!history || history?.length == 0) && (!terms || terms.length == 0))
    return <></>;
  return (
    <>
      <div className="basis-full md:basis-4/12">
        <div className="card shadow-md p-3 border rounded">
          <h2 className="text-lg md:text-2xl mb-4">
            Recent and popular searches
          </h2>
          {history &&
            history?.map((item: any, i: any) => {
              return (
                <div
                  className="flex items-center justify-start gap-2 mb-2"
                  key={i}
                >
                  <div className="card-text">
                    <MdRestore className="icon icon-arrow-cling fill-primary text-primary" />
                  </div>
                  <div
                    className="card-text cursor-pointer w-full"
                    onClick={() => handleFollowSearch(item)}
                  >
                    {item}
                  </div>
                </div>
              );
            })}
          {terms?.map((item: any, i: any) => {
            return (
              <div
                className="flex items-center justify-start gap-2 mb-2"
                key={i}
              >
                <div className="card-text">
                  <IoTrendingUpSharp className="icon icon-arrow-cling  fill-primary text-primary" />
                </div>
                <div
                  className="card-text cursor-pointer w-full"
                  onClick={() => handleFollowSearch(item)}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecentSearch;
