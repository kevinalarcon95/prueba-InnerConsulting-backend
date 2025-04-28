const fs = require("fs");
const path = require("path");

const backupDatabase = () => {
  const dbData = fs.readFileSync(path.join(__dirname, "../db.json"), "utf8");
  const backupPath = path.join(__dirname, "../db-backup.json");
  fs.writeFileSync(backupPath, dbData);
  console.log(`Database backed up at ${new Date().toISOString()}`);
};

const restoreDatabase = () => {
  try {
    const backupPath = path.join(__dirname, "../db-backup.json");
    if (fs.existsSync(backupPath)) {
      const backupData = fs.readFileSync(backupPath, "utf8");
      fs.writeFileSync(path.join(__dirname, "../db.json"), backupData);
      console.log(`Database restored from backup at ${new Date().toISOString()}`);
    } else {
      console.log("No backup file found. Starting with empty database.");
    }
  } catch (error) {
    console.error("Error restoring database:", error);
  }
};

const startBackupService = () => {
  restoreDatabase();
  setInterval(backupDatabase, 5 * 60 * 1000);
  process.on("SIGTERM", () => {
    console.log("Received SIGTERM signal. Backing up database before shutdown.");
    backupDatabase();
    process.exit(0);
  });
};

module.exports = { startBackupService };
