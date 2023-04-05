const PATH_PUBLIC = process.env.PATH_PUBLIC;

const upload = (req, res) => {
  const { file } = req;
  const fileData = {
    filename: file.filename,
    url: `${PATH_PUBLIC}/${file.filename}`,
  };
  res.send({ fileData });
};

module.exports = upload;
