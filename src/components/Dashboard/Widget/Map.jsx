import { control } from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, GeoJSON, useMap } from "react-leaflet";
import "./Map.css";
const GeoJsonLayer = ({ layer }) => {
  const map = useMap();
  const geoJson = useRef();

  useEffect(() => {
    map.fitBounds(geoJson.current.getBounds());
  }, []);

  return <GeoJSON ref={geoJson} data={layer.data} style={{ weight: 1, fill: false, color: "#525252" }} />;
};

const ThematicLayer = ({ layer }) => {
  const map = useMap();
  const geoJson = useRef();

  useEffect(() => {
    map.fitBounds(geoJson.current.getBounds());
  }, []);

  return (
    <GeoJSON
      ref={geoJson}
      data={layer.geoJson}
      onEachFeature={(feature, currentLayer) => {
        const currentValue = layer.data[feature.id];
        const foundLegend = layer.legendSet.find((legend) => currentValue >= legend.min && currentValue <= legend.max);
        const currentColor = foundLegend ? foundLegend.color : "#ffffff";
        currentLayer.on("mouseover", (thisLayer) => {
          currentLayer.bindTooltip(
            `<div class="map-tooltip">${feature.properties.name}: <b>${
              currentValue ? currentValue : "No data"
            }</b></div>`
          );
        });

        currentLayer.setStyle({
          color: "#525252",
          weight: 1,
          fill: true,
          fillOpacity: 1,
          fillColor: currentColor
        });
      }}
    />
  );
};

const ThematicLegendControl = ({ layer }) => {
  return (
    <div className="control-container thematic-legend-container">
      {layer.legendSet.map((legend) => {
        return (
          <div className="thematic-legend-row">
            <div style={{ width: 35, height: 15, backgroundColor: legend.color }}></div>
            <div>
              &nbsp;{legend.min} - {legend.max}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Map = ({ data }) => {
  const generateLayers = () => {
    return data.layers.map((layer) => {
      switch (layer.type) {
        case "boundary":
          return <GeoJsonLayer layer={layer} />;
        case "thematic":
          return <ThematicLayer layer={layer} />;
        default:
          return null;
      }
    });
  };

  const generateControls = () => {
    const controls = [];
    data.layers.forEach((layer) => {
      if (layer.type === "thematic") {
        controls.push(<ThematicLegendControl layer={layer} />);
      }
    });
    return controls;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      {generateControls()}
      {/* <TileLayer
        attribution='&copy; <a href="https://carto.com/about-carto/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png"
      /> */}
      {generateLayers()}
    </MapContainer>
  );
};

export default Map;
