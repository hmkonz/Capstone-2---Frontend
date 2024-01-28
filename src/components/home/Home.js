import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="Homepage">
      <div className="homepage-container">
        <h1 className="homepage-title">Just Real Food for Dogs and Cats</h1>
        <div
          className="homepage-image"
          style={{
            backgroundImage: "url(/images/healthyfoods2.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            marginLeft: "100px",
            height: "600px",
            width: "100%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Home;
