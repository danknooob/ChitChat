import mongoose from 'mongoose'

const connectToMongoDB = async() => {
    try {
        mongoose.connect(process.env.MONGO)
        console.log('Connected to MongoDB!');

    } catch (error) {
        console.log(err);
    }

}
export default connectToMongoDB;