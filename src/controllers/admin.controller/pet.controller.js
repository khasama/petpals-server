const PetModel = require("../../models/pet.model");

const petController = {};

petController.petPage = async (req, res, next) => {
    try {
        const pets = await PetModel.find().populate('category').populate('subcategory').sort({ 'createdAt': 'desc' });
        return res.render("admin/pages/pet", { pets, domain: global.domain });
    } catch (error) {
    }
};

petController.getPet = async (req, res, next) => {
    try {
        const _id = req.params.id;
        if (_id) {
            const pet = await PetModel.findById({ _id }).populate('category').populate('subcategory');
            // const items = await ItemModal.find({ deleted: false });
            // const subitems = await SubitemModal.find({ deleted: false });
            return res.render("admin/pages/pet_detail", { pet, domain: global.domain });
        }

    } catch (error) {
    }
};

// petController.addProduct = async (req, res, next) => {
//     try {
//         const { name, price, description, item, subitem } = req.body;
//         const images = req.files;
//         if (name && price && description && item && subitem && images) {
//             const key = Object.keys(images);
//             const arrImgs = [];
//             let product = {
//                 name,
//                 slug: slug(name),
//                 description,
//                 price,
//                 item,
//                 subitem
//             }
//             for (const img of key) {
//                 const i = images[img];
//                 const buffer = await image.resize(i.data);
//                 const imageId = await drive.uploadFile(
//                     {
//                         name: `${slug(name)}-${img}.webp`,
//                         buffer: buffer,
//                         type: "webp"
//                     }, false, 'product');
//                 arrImgs.push(imageId);
//             }
//             product = { ...product, ...{ images: arrImgs } };
//             const newProduct = new ProductModel(product);
//             await newProduct.save();
//             return res.status(200).json({ status: "success" });
//         } else {
//             return res.status(400);
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500);
//     }
// };

// petController.softDeleteProduct = async (req, res, next) => {
//     try {
//         const _id = req.params.id;
//         if (_id) {
//             await ProductModel.findOneAndUpdate({ _id }, { deleted: true });
//             return res.status(200).json({ status: "success" });
//         }
//         return res.status(400);
//     } catch (error) {
//         return res.status(500)
//     }
// };

// petController.deleteProductImage = async (req, res, next) => {
//     try {
//         const _id = req.params.id;
//         const image = req.body.image;
//         if (_id && image) {
//             const product = await ProductModel.findById({ _id });
//             let images = product.images;
//             if (images.length > 1) {
//                 drive.deleteFile(image);
//                 images = images.filter((img) => {
//                     return img !== image;
//                 });
//                 await ProductModel.findOneAndUpdate({ _id }, { images });
//                 return res.status(200).json({ status: "success" });
//             } else {
//                 return res.status(200).json({ status: "failed", message: 'Mỗi sản phẩm phải có ít nhất 1 ảnh' });
//             }

//         }
//         return res.status(200).json({ status: "error", message: "missing params" });

//     } catch (error) {
//         return res.status(500)
//     }
// };

// petController.updateProduct = async (req, res, next) => {
//     try {
//         const { name, price, description, item, subitem } = req.body;
//         const images = req.files;
//         const _id = req.params.id;
//         if (_id && name && price && description && item && subitem) {
//             const imgs = JSON.parse(JSON.stringify(await ProductModel.findById({ _id }))).images;

//             const arrImgs = [];
//             let product = {
//                 name,
//                 slug: slug(name),
//                 description,
//                 price,
//                 item,
//                 subitem
//             }
//             if (images) {
//                 const key = Object.keys(images);
//                 for (const img of key) {
//                     const i = images[img];
//                     const buffer = await image.resize(i.data);
//                     const imageId = await drive.uploadFile(
//                         {
//                             name: `${slug(name)}-${img}.webp`,
//                             buffer: buffer,
//                             type: "webp"
//                         }, false, 'product');
//                     arrImgs.push(imageId);
//                 }
//             }

//             product = { ...product, ...{ images: [...arrImgs, ...imgs] } };
//             await ProductModel.findOneAndUpdate({ _id }, product);
//             return res.status(200).json({ status: "success" });
//         } else {
//             return res.status(200).json({ status: "success", message: "Missing params" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500);
//     }
// };

module.exports = petController;