module.exports = (error, req, res, next) => {
  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: "Ha ocurrido un error inesperado." });
};
