const mongooseDelete = require("mongoose-delete");
const { model, Schema, default: mongoose } = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const EventSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    date: { type: Date, require: true },
    frontpage: { type: String, require: true },
    location: { type: String, require: true },
    description: { type: String, require: true },
    slug: { type: String, slug: "title" },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    subscribers: [],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

EventSchema.statics.updateSlug = async function (id) {
  const event = await this.findById(id);
  if (!event) {
    return;
  }

  // Actualizar el slug basado en el título
  event.slug = event.title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  // Guardar los cambios en la base de datos
  await event.save();
  return event;
};

EventSchema.set("strictPopulate", false);

EventSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("Event", EventSchema);
