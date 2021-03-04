import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DemoSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
}, {
        timestamps: true
});

export const Demo = mongoose.model('Demo', DemoSchema);