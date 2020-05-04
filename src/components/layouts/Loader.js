import React from 'react';
import Loader from 'react-loader-spinner'

export default function loader() {
  return (
    <>
      <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Loader
          type="Circles"
          color="#f09a24"
          height={100}
          width={100}
          timeout={500} //3 secs
        />
     </div>
    </>
  );
}