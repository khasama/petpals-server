const sharp = require('sharp');
const Image = {};

Image.resize = async (img) => {
    const imgBuffer = await sharp(img)
        .resize(500, 500, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .webp()
        .toBuffer();
    return imgBuffer;
}

module.exports = Image;