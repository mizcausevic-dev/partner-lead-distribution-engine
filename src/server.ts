import app from "./app.js";

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Partner Lead Distribution Engine listening on http://localhost:${port}`);
});
