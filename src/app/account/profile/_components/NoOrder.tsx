import React from "react";

type props = {
  message: string;
};
const NoOrder = ({ message }: props) => {
  return (
    <div className="flex items-center justify-center flex-col text-center">
      <div className="image-wrapper">
        <img
          src="https://res.cloudinary.com/ddkdvh5ps/image/upload/w_65,h_65/v1684322441/ezt-frontend-client-assets/question_b89zgh.png"
          alt="No Event Found - Eazyticks"
          loading="lazy"
        />
      </div>
      <div className="text-lg">
        Oops! <br />
        {message}
      </div>
    </div>
  );
};

export default NoOrder;
