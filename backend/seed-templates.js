const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://lvhai2k2_viora:Levanhai%40123@cluster0.o8iu0jl.mongodb.net/myapp?retryWrites=true&w=majority";

const templateSchema = new mongoose.Schema({
  code: String,
  name: String,
  thumbnailUrl: String,
  layoutConfig: mongoose.Schema.Types.Mixed,
  deletedAt: Date
});

const Template = mongoose.model("Template", templateSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const defaultTemplates = [
      { id: 1, code: "classic-pink", name: "Classic Pink", thumbnailUrl: "/templates/classic.jpg", layoutConfig: {}, deletedAt: null },
      { id: 2, code: "modern-blue", name: "Modern Blue", thumbnailUrl: "/templates/modern.jpg", layoutConfig: {}, deletedAt: null },
      { id: 3, code: "royal-gold", name: "Royal Gold", thumbnailUrl: "/templates/royal.jpg", layoutConfig: {}, deletedAt: null },
    ];

    await Template.deleteMany({});
    console.log("Deleted old templates.");

    for (const t of defaultTemplates) {
      await Template.create(t);
      console.log(`Created template: ${t.code}`);
    }

    console.log("Done seeding templates.");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
