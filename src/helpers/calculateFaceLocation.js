export default function calculateFaceLocation(regions) {
  const boundingBoxes = regions.map((region) => {
    return region.region_info.bounding_box;
  });
  const image = document.getElementById("inputImage");
  const width = ++image.width;
  const height = ++image.height;
  const insetBoxes = boundingBoxes.map((boundingBox) => {
    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - boundingBox.right_col * width,
      bottomRow: height - boundingBox.bottom_row * height,
    };
  });
  return insetBoxes;
}
