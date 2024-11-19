import express from "express";
import cors from "cors";
import configRoutes from "./router";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
configRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
