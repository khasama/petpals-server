const sharp = require('sharp');
const Image = {};

Image.resize = async (img, type) => {
    let imgBuffer;
    if (type == "thumb") {
        imgBuffer = await sharp(img).resize(285, 400, { fit: 'fill' }).webp().toBuffer();
    }
    if (type == "background") {
        imgBuffer = await sharp(img).resize(550, 300, { fit: 'fill' }).webp().toBuffer();
    }
    return imgBuffer;
}

module.exports = Image;