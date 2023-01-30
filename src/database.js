import mongoose from 'mongoose';

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1/companydb",{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   //useFindAndModify: true
   //useCreateIndex: true
})
   
   .then(db => console.log("DB is connected"))
   .catch(error => console.log(error))

   