"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import CategroyEvents from "./CategroyEvents";
import { getOrganizer } from "@/helpers/businessRequests";
import { scrollToTop } from "@/helpers/generals";
import PageError from "@/components/PageError";
import Filter from "@/app/categories/[slug]/_components/Filter";
import NoEvent from "@/components/NoEvent";
import SectionLoader from "@/components/SectionLoader";
import { OrganizerObj, OrgEventCategory } from "@/lib/types";
import CalenderTabs from "./CalenderTabs";

type props = {
  organizer: OrganizerObj | null;
};

const IndexOrganizerPage = ({ organizer }: props) => {
  const urlParams = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchparams = useSearchParams();
  const [theFlag, setTheFlag] = useState(false);
  const [categories, setCategories] = useState<OrgEventCategory[] | null>(null);
  const [profile, setprofile] = useState<OrganizerObj | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sort, setSort] = useState("Date-Low");
  const orgId = searchparams?.get("orgId") || urlParams?.orgId;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchparams?.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchparams]
  );

  const handleSortChange = async (value: any) => {
    setSort(value);
    router.push(pathname + "?" + createQueryString("OrderBy", value));
  };

  const getData = async function () {
    try {
      setIsloading(true);
      const { data: response } = await getOrganizer(orgId, sort);
      //console.log(response)
      if (response && response?.succeeded) {
        const { data } = response;
        const { categories, ...rest } = data;
        setCategories(categories);
        setprofile(rest);
        setIsloading(false);
      } else {
        setIsError(true);
        setIsloading(false);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (theFlag) {
      getData();
    }
    if (organizer) {
      const { categories } = organizer;
      //console.log("categories", categories);
      setCategories(categories);
      setprofile(organizer);
      setIsloading(false);
    } else {
      setIsError(true);
      setIsloading(false);
    }
    scrollToTop();
    setTheFlag(true);
  }, [sort]);
  //console.log(organizer);
  return (
    <div className="py-4">
      {isLoading ? (
        <SectionLoader />
      ) : isError ? (
        <PageError />
      ) : (
        <>
          {categories && categories?.length > 0 ? (
            <>
              {profile?.calendars && <CalenderTabs calenders={profile?.calendars}/>}
              <Filter count={0} handleChange={handleSortChange} sort={sort} />
              {categories?.map((category, index) => {
                return <CategroyEvents category={category} key={index} />;
              })}
            </>
          ) : (
            <NoEvent />
          )}
        </>
      )}
    </div>
  );
};

export default IndexOrganizerPage;
