import jwt from 'jsonwebtoken';

export function auth(req, res, next) {

  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ success: false, message: 'no token provided' });

  try {
    const decoded = jwt.verify(token, process.env.PVT_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ success: false, message: 'access denied' });
  }

}

export function generateToken(user) {

  return jwt.sign({
    id: user.id,
    username: user.username
  }, process.env.PVT_KEY, { expiresIn: '8h' });

}