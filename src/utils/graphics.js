import { loadModules } from "esri-loader";

export function setGraphics(arr) {
  return loadModules(["esri/Graphic"]).then(([Graphic]) => {
    // create an array of graphics based on the req results
    let graphics = [];
    let graphic;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].latitude && arr[i].longitude) {
        graphic = new Graphic({
          geometry: {
            type: "point",
            latitude: arr[i].latitude,
            longitude: arr[i].longitude,
          },
          attributes: arr[i],
        });
        graphics.push(graphic);
      }
    }
    // view.ui.add(home, "top-left");
    return graphics;
  });
}
