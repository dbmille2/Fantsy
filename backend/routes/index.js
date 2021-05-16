const express = require("express");
const router = express.Router();
const apiRouter = require("./api");


router.use("/api", apiRouter);

router.get("/hello/world", function (req, res) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });

  router.use(express.static(path.resolve("../frontend/build")));

  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(201).json({});
  });
}

module.exports = router;
