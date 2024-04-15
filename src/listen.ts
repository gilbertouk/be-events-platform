import app from "./server";

const PORT: number = process.env.PORT ? +process.env.PORT : 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
