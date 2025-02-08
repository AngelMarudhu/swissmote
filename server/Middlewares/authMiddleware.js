import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader.split(" ")[1];
    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken.id;
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({ message: "Not authorized" });
  }
};

export default authUser;
