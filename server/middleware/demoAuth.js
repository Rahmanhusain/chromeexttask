// Demo authentication middleware
export default function demoAuth(req, res, next) {
  // In real apps, check for a token or session
  if (req.headers["authcred"] === "abcdtoken") {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}
