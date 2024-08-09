import * as OBC from "openbim-components";
import * as THREE from "three";

const viewer = new OBC.Components();
viewer.onInitialized.add(() => {});

const sceneComponent = new OBC.SimpleScene(viewer);
viewer.scene = sceneComponent;
const scene = sceneComponent.get();
const ambientLight = new THREE.AmbientLight(0xe6e7e4, 1);
const directionalLight = new THREE.DirectionalLight(0xf9f9f9, 0.75);
directionalLight.position.set(10, 50, 10);
scene.add(ambientLight, directionalLight);
scene.background = new THREE.Color("#202932");

const viewerContainer = document.getElementById("app") as HTMLDivElement;

const rendererComponent = new OBC.PostproductionRenderer(
  viewer,
  viewerContainer
);
viewer.renderer = rendererComponent;

const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer);
viewer.camera = cameraComponent;

const raycasterComponent = new OBC.SimpleRaycaster(viewer);
viewer.raycaster = raycasterComponent;

viewer.init();
rendererComponent.postproduction.enabled = true;

new OBC.SimpleGrid(viewer, new THREE.Color(0x666666));

const ifcLoader = new OBC.FragmentIfcLoader(viewer);

const highlighter = new OBC.FragmentHighlighter(viewer);
highlighter.setup();

const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer);
// console.log(toolbar);

const button = new OBC.Button(viewer, {
  tooltip: "open iframe",
  iconURL:
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
  name: "iframe",
});
button.visible = true;
button.active = true;
// button.setCustomIcon(
// );
var span = document.getElementsByClassName("close")[0] as HTMLSpanElement;
span.onclick = function () {
  modal!.style.display = "none";
};
const modal = document.getElementById("myModal");
button.onClick.add(() => {
  if (modal!.style.display === "block") {
    modal!.style.display = "none";
    return;
  }
  modal!.style.display = "block";
});
window.onclick = function (event) {
  if (event.target === modal) {
    modal!.style.display = "none"; // Non-null assertion
  }
};
ifcLoader.onIfcLoaded.add(async (model) => {
  propertiesProcessor.process(model);
  await highlighter.update();
  highlighter.events.select.onHighlight.add((selection) => {
    const fragmentID = Object.keys(selection)[0];
    const expressID = Number([...selection[fragmentID]][0]);
    propertiesProcessor.renderProperties(model, expressID);
  });
});

const mainToolbar = new OBC.Toolbar(viewer);

mainToolbar.addChild(
  ifcLoader.uiElement.get("main"),
  propertiesProcessor.uiElement.get("main"),
  button
);
viewer.ui.addToolbar(mainToolbar);
