export const validateRegister = (req, res, next) => {
  const { name, username, password, repeatPassword } = req.body;

  if (!name || !username || !password || !repeatPassword) {
    return res.status(400).json({ message: "All data must be filled!" });
  }

  if (req.body.password !== req.body.repeatPassword) {
    return res.status(400).json({ message: "Password mismatch" });
  }

  next();
};
