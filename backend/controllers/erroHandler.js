function errorHandler(err, req, res, next) {
  if (!res.status) {
    res.status(500);
  }
  res.json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

export { errorHandler };
