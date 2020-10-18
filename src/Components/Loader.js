import React from "react";

export const Loader = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2 offset-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};