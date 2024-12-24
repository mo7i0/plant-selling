// plantRoutes.js
import express from 'express';
import mongoose from 'mongoose'; // Import mongoose
import PlantModel from './Models/PlantsModels.js'; // Import the Plant model

const router = express.Router();

const Photo = mongoose.connection.collection('photos.files'); // GridFS collection

router.get('/plants', async (req, res) => {
    try {
        const plants = await PlantModel.aggregate([
            {
                $lookup: {
                    from: 'photos.files',
                    localField: 'imageId', // Ensure this matches your schema
                    foreignField: '_id',
                    as: 'imageData',
                },
            },
            {
                $unwind: {
                    path: '$imageData',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]);
        console.log('Plants with Images:', JSON.stringify(plants, null, 2));
        res.status(200).json({ data: plants });
    } catch (error) {
        console.error('Error fetching plants with images:', error);
        res.status(500).json({ msg: 'Error fetching plants', error });
    }
});



export default router;