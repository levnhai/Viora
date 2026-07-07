const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://lvhai2k2_viora:Levanhai%40123@cluster0.o8iu0jl.mongodb.net/myapp?retryWrites=true&w=majority";

const templateSchema = new mongoose.Schema({
  id: Number,
  code: String,
  name: String,
  description: String,
  thumbnail: String,
  previewImages: [String],
  previewUrl: String,
  price: Number,
  version: String,
  status: String,
  active: Boolean,
  category: String,
  deletedAt: Date
});

const Template = mongoose.model("Template", templateSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const defaultTemplates = [
      { id: 1, code: "rose-gold", name: "Rose Gold", thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&auto=format", price: 460000, version: "1.0.0", status: "active", active: true, deletedAt: null },
      { id: 2, code: "minimal-green", name: "Minimal Green", thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop&auto=format", price: 460000, version: "1.0.0", status: "active", active: true, deletedAt: null },
      { id: 3, code: "classic-white", name: "Classic White", thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop&auto=format", price: 460000, version: "1.0.0", status: "active", active: true, deletedAt: null },
      { id: 4, code: "love-story", name: "Love Story", thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format", price: 460000, version: "1.0.0", status: "active", active: true, deletedAt: null },
      { id: 5, code: "eternal-flower", name: "Eternal Flower", thumbnail: "https://images.unsplash.com/photo-1507504038482-76210378664a?w=600&h=800&fit=crop&auto=format", price: 460000, version: "1.0.0", status: "active", active: true, deletedAt: null },
      { id: 6, code: "black-elegant", name: "Black Elegant", thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=800&fit=crop&auto=format", price: 560000, version: "1.0.0", status: "active", active: true, deletedAt: null },
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
