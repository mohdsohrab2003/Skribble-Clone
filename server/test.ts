import mongoose from "mongoose";

const uri =
  "mongodb+srv://ahamkermr_db_user:sXFrjazN1y45k9Ep@skribble.pngjsr5.mongodb.net/skribble?retryWrites=true&w=majority&appName=skribble";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
