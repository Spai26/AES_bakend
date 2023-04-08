const addCategoryToBlog = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  const result = await BlogModel.findById(id);
  try {
    if (result) {
      //implementar logica para que a su vez se guarde en la db de categorias
      result.category.push(category);
      await result.save();

      res.status(200).json({ result });
    } else {
      handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_ESE_ID`, 404);
    }
  } catch (error) {
    handlerHttpError(res, `ERROR_ALGO_SALIO_MAL_EN_LA_PETICION`, 400);
  }
};

const deleteCategoryToBlog = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const result = await BlogModel.findById(id);
    if (result) {
      result.category = result.category.filter((e) => e !== category);
      await result.save();
      res.status(200).json({ message: `Categoria eliminada con exito` });
    } else {
      handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_EL_ID`, 404);
    }
  } catch (error) {
    handlerHttpError(res, `ERROR_ALGO_SALIO_MAL_EN_LA_PETICION`, 400);
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.query;
    const result = await BlogModel.findOne({ slug: slug });

    if (result) {
      res.status(200).send({ result });
    } else {
      handlerHttpError(res, `NO_SE_HA_ENCONTRADO_EL_BLOG`, 404);
    }
  } catch (error) {
    handlerHttpError(res, "ERROR_EN_BUSQUEDA_POR_SLUG", 400);
  }
};


const getBlogByName = async (req, res) => {
    const { name } = req.query;
  
    try {
      const result = await BlogModel.find({
        name: { $regex: new RegExp(`${name}`, "i") },
      });
      if (result) {
        res.status(200).json({ result });
      }
    } catch (error) {
      handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`);
    }
  };
  

  const getBlogById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await BlogModel.findById(id);
      res.status(200).json({ result });
    } catch (error) {
      handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400);
    }
  };