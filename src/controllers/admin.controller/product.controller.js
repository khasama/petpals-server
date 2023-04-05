const createError = require("http-errors");
const ProductModel = require("../../models/product.model");
const ItemModal = require("../../models/item.model");
const SubitemModal = require("../../models/subitem.model");
const image = require("../../utils/image");
const drive = require("../../utils/drive");
const slug = require("slug");

const ProductController = {};

ProductController.productPage = async (req, res, next) => {
    try {
        const products = await ProductModel.find().populate('item').populate('subitem').sort({ 'createdAt': 'desc' });
        const items = await ItemModal.find({ deleted: false });
        return res.render("admin/pages/product", { products, items, domain: global.domain });
    } catch (error) {
    }
};

ProductController.getProduct = async (req, res, next) => {
    try {
        const _id = req.params.id;
        if (_id) {
            const product = await ProductModel.findById({ _id }).populate('item').populate('subitem');
            const items = await ItemModal.find({ deleted: false });
            const subitems = await SubitemModal.find({ deleted: false });
            return res.render("admin/pages/product_detail", { product, items, subitems, domain: global.domain });
        }

    } catch (error) {
    }
};

ProductController.addProduct = async (req, res, next) => {
    try {
        const { name, price, description, item, subitem } = req.body;
        const images = req.files;
        if (name && price && description && item && subitem && images) {
            const key = Object.keys(images);
            const arrImgs = [];
            let product = {
                name,
                slug: slug(name),
                description,
                price,
                item,
                subitem
            }
            for (const img of key) {
                const i = images[img];
                const buffer = await image.resize(i.data);
                const imageId = await drive.uploadFile(
                    {
                        name: `${slug(name)}-${img}.webp`,
                        buffer: buffer,
                        type: "webp"
                    }, false, 'product');
                arrImgs.push(imageId);
            }
            product = { ...product, ...{ images: arrImgs } };
            const newProduct = new ProductModel(product);
            await newProduct.save();
            return res.status(200).json({ status: "success" });
        } else {
            return res.status(200).json({ status: "failed", message: "Missing params" });
        }
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

ProductController.softDeleteProduct = async (req, res, next) => {
    try {
        const _id = req.params.id;
        if (_id) {
            await ProductModel.findOneAndUpdate({ _id }, { deleted: true });
            return res.status(200).json({ status: "success" });
        }
        return res.status(400);
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

ProductController.deleteProductImage = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const image = req.body.image;
        if (_id && image) {
            const product = await ProductModel.findById({ _id });
            let images = product.images;
            if (images.length > 1) {
                drive.deleteFile(image);
                images = images.filter((img) => {
                    return img !== image;
                });
                await ProductModel.findOneAndUpdate({ _id }, { images });
                return res.status(200).json({ status: "success" });
            } else {
                return res.status(200).json({ status: "failed", message: 'Mỗi sản phẩm phải có ít nhất 1 ảnh' });
            }

        }
        return res.status(200).json({ status: "failed", message: "missing params" });

    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

ProductController.updateProduct = async (req, res, next) => {
    try {
        const { name, price, description, item, subitem } = req.body;
        const images = req.files;
        const _id = req.params.id;
        if (_id && name && price && description && item && subitem) {
            const imgs = JSON.parse(JSON.stringify(await ProductModel.findById({ _id }))).images;

            const arrImgs = [];
            let product = {
                name,
                slug: slug(name),
                description,
                price,
                item,
                subitem
            }
            if (images) {
                const key = Object.keys(images);
                for (const img of key) {
                    const i = images[img];
                    const buffer = await image.resize(i.data);
                    const imageId = await drive.uploadFile(
                        {
                            name: `${slug(name)}-${img}.webp`,
                            buffer: buffer,
                            type: "webp"
                        }, false, 'product');
                    arrImgs.push(imageId);
                }
            }

            product = { ...product, ...{ images: [...arrImgs, ...imgs] } };
            await ProductModel.findOneAndUpdate({ _id }, product);
            return res.status(200).json({ status: "success" });
        } else {
            return res.status(200).json({ status: "success", message: "Missing params" });
        }
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

module.exports = ProductController;