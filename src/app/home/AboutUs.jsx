import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Translate from "../../translations/Translate";

const AboutUs = () => {
  return (
    <div className="container" id="about">
      <h1>
        <Translate string={"about-us"} />
      </h1>
      <p>
        <Translate string={"about-us-text-1"} />
        <br />
        <Translate string={"about-us-text-2"} />
        <br />
        <Translate string={"about-us-text-3"} />
      </p>
      <Moves />
    </div>
  );
};

const position = [39.5616104, 3.20025];

const styles = {
  wrapper: {
    height: 400,
    width: "100%",
    margin: "0 auto",
    display: "flex",
  },
  map: {
    flex: 1,
  },
};

const Moves = (props) => {
  return (
    <div style={styles.wrapper}>
      <Map style={styles.map} center={props.center} zoom={props.zoom}>
        <TileLayer url={props.url} />
        <Marker position={position}>
          <Popup>
            <b>Aqui Estamos!</b>
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};

Moves.defaultProps = {
  center: [39.561627, 3.199883],
  zoom: 16,
  url: "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
};

export default AboutUs;
