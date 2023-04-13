const showAllItems = (req, res) => {
  res.send({ data: "here" });
};

const uploadItems = (req, res) => {
  res.send({ data: "upload" });
};

module.exports = {
  showAllItems,
  uploadItems,
};
