export const getFoodImageSrc = (image, url) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http") ||
    image.startsWith("/") ||
    image.startsWith("data:") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  return `${url}/images/${image}`;
};
