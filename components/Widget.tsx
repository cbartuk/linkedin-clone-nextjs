"use client";

import React, { useEffect, useState } from "react";

function Widget() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(true);
  }, []);

  return (
    <div className="ml-6 h-[790px] max-h-[790px]">
      {iframeLoaded ? (
        <iframe
          src="https://www.linkedin.com/embed/feed/update/urn:li:share:7017854790265155584"
          title="Embedded post"
          className="w-fit 2xl:min-w-[400px] h-full"
        />
      ) : (
        <p>
          LinkedIn content cannot be displayed. Please check your browser
          settings.
        </p>
      )}
    </div>
  );
}

export default Widget;
