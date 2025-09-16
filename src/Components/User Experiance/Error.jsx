import React from "react";
import "./Error.css";

const ErrorNotification = ({ error }) => {
  let userFriendlyMessage = "Something went wrong. Please try again later.";

  switch (error.status) {
    case 401:
      userFriendlyMessage =
        "We couldn’t access the data due to a permissions issue. Please try again later.";
      break;
    case 404:
      userFriendlyMessage =
        "We couldn’t find any information matching your search. Please check your search terms and try again.";
      break;
    case 500:
      userFriendlyMessage =
        "There was a problem on our end. Please refresh the page or try again later.";
      break;
    default:
      userFriendlyMessage =
        "There was a problem loading the data. Please refresh the page or try again.";
  }

  return (
    <div className="error-notification" role="alert">
      <h2>Oops! Something went wrong.</h2>
      <p>{userFriendlyMessage}</p>
      <p>Please try again</p>
    </div>
  );
};

export default ErrorNotification;
