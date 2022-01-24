import mongoose from 'mongoose'

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI!)
		console.log('db connected')
	} catch (error) {
		process.exit(1)
		console.error(error)
	}
}

connectDB()
