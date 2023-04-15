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

const validResources = (url, origin) => {
  const validExtimg = ["jpg", "png", "gif"];
  const validExtfile = "pdf";

  const formOrigin = {
    videos: (url)=>{},
    images: (url) => {
      const extract = url.split(".").pop().toLowerCase();
      return validExtimg.includes(extract);
    },
    slider: "slider",
  };
  return formOrigin[origin](url);
};

module.exports = {
  validExtensionImage,
  validExtensionFile,
  validResources,
};
