import React from "react";
import route from "./style/routes.css";

const Loading = ({ isLoading }) => {
  if (isLoading) {
    return (
      <section className="loading">
        <div className="loading__spinner"></div>
      </section>
    );
  }
};

export default Loading;
