import {
  Viewer,
  XKTLoaderPlugin,
  DistanceMeasurementsPlugin,
  StoreyViewsPlugin,
} from "@xeokit/xeokit-sdk";

const viewer = new Viewer({
  canvasId: "xeokit_canvas",
  transparent: true,
  dtxEnabled: true,
  pickSurfacePrecisionEnabled: true,
});

viewer.scene.camera.eye = [1, 1.38, -129.06444239626097];
viewer.scene.camera.look = [4.09, 0.5, -26.76];
viewer.scene.camera.up = [0.06, 0.96, 0.16];

const xktLoader = new XKTLoaderPlugin(viewer);
const distanceMeasurements = new DistanceMeasurementsPlugin(viewer);

const storeyViewsPlugin = new StoreyViewsPlugin(viewer);

const sceneModel = xktLoader.load({
  id: "myModel",
  src: "/model.xkt",
  // saoEnabled: true,
  edges: false,
  // dtxEnabled: true
});
const measurmentButton = document.getElementById("measurements");
const storey = storeyViewsPlugin
console.log(storey);
measurmentButton?.addEventListener("click", () => {
  if (distanceMeasurements.control.active) {
    distanceMeasurements.control.deactivate();
    return null;
  }
  distanceMeasurements.control.activate();
});
const pickResult = viewer.scene.pick({
  canvasPos: [200, 200],
  pickSurface: true, // <<---------- Do surface picking
  pickSurfacePrecision: true, // <<--- Use precise surface picking
});
