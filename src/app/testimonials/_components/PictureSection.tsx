import React from "react";
import ReturnImage from "@/hooks/ReturnImage";
import { YouTubeEmbed } from "@next/third-parties/google";

interface SchoolData {
  id: number;
  name: string;
  image: string | null;
  data: {
    content: string | null;
    eventCount: string | null;
    attendeesCount: string | null;
    ticketCount: string | null;
    youtubeUrl: string | null;
    type: string | null;
    reverse: boolean;
  };
}

interface Props {
  item: SchoolData;
}

const InfoCard = ({
  image,
  label,
  type,
  count,
}: {
  image: string;
  label: string;
  type: string | null;
  count: string;
}) => (
  <div
    className={`flex items-center md:px-6 px-3 py-3 rounded-md flex-col justify-center flex-grow-1 flex-shrink-0 ${
      type == "primary" ? "bg-white text-black" : "bg-white text-black"
    }`}
  >
    <img src={image} alt={label} className="mx-auto mb-1 h-12" loading="lazy" />
    <p className="text-base md:text-lg">{count}</p>
  </div>
);

const PictureSection: React.FC<Props> = ({ item }) => {
  // console.log(item);
  let sectionType = "";
  if (item?.data?.type === "primary") {
    sectionType = "bg-primary !text-white";
  } else if (item?.data?.type === "secondary") {
    sectionType = "bg-secondary !text-white";
  } else {
    sectionType = "bg-white text-black";
  }
  let headingColor = "";
  if (item?.data?.type === "primary") {
    headingColor = "!text-white";
  } else if (item?.data?.type === "secondary") {
    headingColor = "text-white";
  } else {
    headingColor = "text-black";
  }

  return (
    <section className={`${sectionType} lg:p-4 p-2 lg:py-10 py-5`}>
      <div
        className={`flex ${
          item?.data?.reverse ? "flex-row-reverse" : "flex-row"
        } items-center justify-center max-w-screen-xl mx-auto flex-wrap`}
      >
        <div className="md:basis-1/2 xl:p-12 lg:p-4 p-2 py-6">
          <ReturnImage
            image={item?.image}
            alt={item?.name}
            height="70"
            classes={`w-20`}
          />
          <h2 className={`${headingColor} text-2xl md:text-3xl mb-4 mt-4`}>
            {item?.name}
          </h2>
          <p>{item?.data?.content}</p>
          <div className="mt-4 flex justify-start items-start gap-5 flex-wrap">
            {item?.data?.eventCount && (
              <InfoCard
                image="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084046/ezt-frontend-client-assets/world_ovpevl.png"
                label="events"
                type={item?.data?.type}
                count={item?.data?.eventCount + " events"}
              />
            )}
            {item?.data?.ticketCount && (
              <InfoCard
                image="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084045/ezt-frontend-client-assets/ticket_qg4dp0.png"
                label="tickets"
                type={item?.data?.type}
                count={item?.data?.ticketCount + " tickets"}
              />
            )}
            {item?.data?.attendeesCount && (
              <InfoCard
                image="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1684084055/ezt-frontend-client-assets/bed_h2jrte.png"
                label="attendees"
                type={item?.data?.type}
                count={item?.data?.attendeesCount + " attendees"}
              />
            )}
          </div>
        </div>
        {item?.data?.youtubeUrl && (
          <div className="md:basis-1/2 h-full w-full">
            <YouTubeEmbed
              videoid={`${item?.data?.youtubeUrl}`}
              params="controls=0&autoplay=1&mute=1&loop=1&start=30&end=120"
              style="border-radius: 10px;"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PictureSection;
