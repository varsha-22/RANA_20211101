import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50,
    },
    value: {
        type: String,
    },
}, { timestamps: true })


const Categories = mongoose.model('Categories', categorySchema);

export default { Categories }