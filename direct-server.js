const { spawn } = require("child_process");
const path = require("path");

const PORT = process.env.PORT || 10000;

const dbPath = path.join(__dirname, "db.json");

console.log(`Starting JSON Server on port ${PORT} with the database ${dbPath}`);

const jsonServer = spawn(
  "npx",
  ["json-server", "--watch", dbPath, "--port", PORT, "--host", "0.0.0.0"],
  {
    stdio: "inherit",
  }
);

jsonServer.on("error", (error) => {
  console.error("Error starting JSON Server:", error);
  process.exit(1);
});

jsonServer.on("close", (code) => {
  console.log(`JSON Server closed with code: ${code}`);
  process.exit(code);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM signal, terminating...");
  jsonServer.kill();
});

process.on("SIGINT", () => {
  console.log("Received SIGINT signal, terminating...");
  jsonServer.kill();
});
