const validExtensionImage = (imageurl) => {
  const validExtension = ["jpg", "png", "gif"];
  const extension = imageurl.split(".").pop().toLowerCase();
  console.log(extension);
  return validExtension.includes(extension);
};

const validExtensionFile = (file) => {
  const extension = file.split(".").pop().toLowerCase();

  return extension === "pdf" ? true : false;
};

module.exports = {
  validExtensionImage,
  validExtensionFile,
};

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/rumlkqm3RT8"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>;
