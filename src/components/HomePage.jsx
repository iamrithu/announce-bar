import React from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";

export const HomePage = () => {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const click = async () => {
    await fetch("/announcementBar", {
      method: "GET",
    });
  };
  return (
    <div>
      <button onClick={click}>demo</button>
    </div>
  );
};
