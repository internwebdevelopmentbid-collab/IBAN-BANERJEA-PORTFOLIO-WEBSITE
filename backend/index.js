import app from "./src/app.js";
import connectDatabase from "./src/config/db.js";

let databasePromise;

const handler = async (req, res) => {
  if (!databasePromise) {
    databasePromise = connectDatabase();
  }

  await databasePromise;

  return app(req, res);
};

export default handler;
