import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'photos.files' }, // Assuming you are using GridFS
});

const PlantModel = mongoose.model('Plant', plantSchema);

export default PlantModel;
