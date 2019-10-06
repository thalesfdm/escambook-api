import { config, v2 } from 'cloudinary';

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.IMG_CLOUD_NAME,
    api_key: process.env.IMG_API_KEY,
    api_secret: process.env.IMG_API_SECRET
  });
  next();
}

export { cloudinaryConfig, v2 };