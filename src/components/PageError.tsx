import React from "react";
import Link from "next/link";
type props = {
  message?: string;
  error?: any;
};
function PageError({ message, error }: props) {
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center flex-col py-6 px-3"
      data-section="error"
    >
      <div className="flex items-center justify-center flex-col text-center">
        <div className="img-wrap">
          <img
            src="https://res.cloudinary.com/ddkdvh5ps/image/upload/h_300/v1682947863/ezt-frontend-client-assets/error-message_bdb0gr.png"
            alt="404 Page Banner - Eazyticks"
            loading="lazy"
          />
        </div>
        <div className="content">
          <h2 className="mb-5 h3">
            An Error occours
            <br />
            Please Try Again later.
          </h2>
          {message && (
            <p
              className="mb-3 text-lg text-red-500"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          <Link href="/" className="btn btn--primary max-w-[300px] mx-auto">
            Back to Home
          </Link>
        </div>
      </div>
      {error && (
        <script
          type="application/json"
          id="error-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(error),
          }}
        />
      )}
    </div>
  );
}

export default PageError;
