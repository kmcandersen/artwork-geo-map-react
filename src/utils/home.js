import { loadModules } from "esri-loader";

export function loadHome(view) {
  return loadModules(["esri/widgets/Home"]).then(([Home]) => {
    const home = new Home({
      view,
    });
    view.ui.add(home, "top-left");
    return view;
  });
}
