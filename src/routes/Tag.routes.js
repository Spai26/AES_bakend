const { Router } = require('express')
const {
   searchTagsHandler,
   getTagsById,
   updateTag,
   deleteTag,
   createTags 
} = require('../handlers/Tags/Tags.handlers')
const TagRoutes = Router()

TagRoutes.get('/', searchTagsHandler)
TagRoutes.get('/:id', getTagsById)
TagRoutes.post('/', createTags)
TagRoutes.put('/:id', updateTag)
TagRoutes.delete('/:id', deleteTag)

module.exports = TagRoutes