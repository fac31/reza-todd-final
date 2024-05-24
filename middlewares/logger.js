const logger = (req, res, next) => {
  const colorMethods = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };
  const color = colorMethods[req.method] || "white";

  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[
      color
    ]
  );
  next();
};

module.exports = logger;
