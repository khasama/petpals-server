const PetModel = require("../models/pet.model");
const slug = require("slug");
const image = require("../utils/image");
const drive = require("../utils/drive");

const PetService = {};

PetService.getAllPet = async (query) => {
    try {
        let { page, limit, category, subcategory, price, latest } = query;
        let filter = { deleted: false };
        let sort = { 'createdAt': 'desc' };
        if (!page || page < 0) page = 1;
        if (!limit || limit < 0) limit = 20;
        if (category) filter = { ...filter, ...{ category } };
        if (subcategory) filter = { ...filter, ...{ subcategory } };
        if (price) sort = { price };
        if (latest && latest == 1) sort = { 'createdAt': 'desc' };
        if (latest && latest == 0) sort = { 'createdAt': 'asc' };
        let pets = JSON.parse(
            JSON.stringify(
                await PetModel
                    .find(filter)
                    .sort(sort)
                    .limit(limit).skip((page - 1) * limit)
                    .populate('category')
                    .populate('subcategory')
            )
        )
        pets = pets.map(pet => {
            return { ...pet, ...{ thumb: `${global.domain}media/image/${pet.images[0]}` } }
        });
        return pets;
    } catch (error) {
        throw error;
    }
};

PetService.getMyPets = async (idUser) => {
    try {

        let pets = JSON.parse(
            JSON.stringify(
                await PetModel
                    .find({ owner: idUser })
                    .populate('category')
                    .populate('subcategory')
            )
        );
        pets = pets.map(pet => {
            return { ...pet, ...{ thumb: `${global.domain}media/image/${pet.images[0]}` } }
        });
        return pets;
    } catch (error) {
        throw error;
    }
};

PetService.getPet = async (_id) => {
    try {
        let pet = JSON.parse(
            JSON.stringify(
                await PetModel.findById({ _id })
                    .populate('owner')
                    .populate('category')
                    .populate('subcategory')
            )
        )
        if (pet) {
            let images = pet.images;
            images = images.map(image => {
                return `${global.domain}media/image/${image}`;
            });
            pet = { ...pet, ...{ images } };
            pet.owner.avatar = `${global.domain}media/image/${pet.owner.avatar}`;;
            delete pet.owner.password;
            return pet;
        }
        throw new Error("Not found");
    } catch (error) {
        throw error;
    }
};

PetService.updatePet = async (_id, name, price, description, category, subcategory, images, idUser) => {
    try {
        const currentPet = JSON.parse(JSON.stringify(await PetModel.findById({ _id })));
        const owner = currentPet.owner;
        if (owner == idUser) {
            const imgs = currentPet.images;
            const arrImgs = [];
            let pet = {
                name,
                slug: slug(name),
                description,
                price,
                category,
                subcategory,
                owner
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
                        }, false, 'pet');
                    arrImgs.push(imageId);
                }
            }

            pet = { ...pet, ...{ images: [...arrImgs, ...imgs] } };
            await PetModel.findOneAndUpdate({ _id }, pet);
            return res.status(200).json({ status: "success" });
        } else { throw new Error("Not the owner"); }

    } catch (error) {
        throw error;
    }
};

PetService.addPet = async (name, price, description, category, subcategory, images, idUser) => {
    try {
        const key = Object.keys(images);
        const arrImgs = [];
        let pet = {
            name,
            slug: slug(name),
            description,
            price,
            category,
            subcategory,
            owner: idUser
        }
        for (const img of key) {
            const i = images[img];
            const buffer = await image.resize(i.data);
            const imageId = await drive.uploadFile(
                {
                    name: `${slug(name)}-${img}.webp`,
                    buffer: buffer,
                    type: "webp"
                }, false, 'pet');
            arrImgs.push(imageId);
        }
        pet = { ...pet, ...{ images: arrImgs } };
        const newPet = new PetModel(pet);
        return await newPet.save();
    } catch (error) {
        throw error;
    }
};

PetService.softDeletePet = async (_id) => {
    try {
        await PetModel.findOneAndUpdate({ _id }, { deleted: true });
        return res.status(200).json({ status: "success" });
    } catch (error) {
        throw error;
    }
};

PetService.deletePetImage = async (_id, image) => {
    try {
        const pet = await PetModel.findById({ _id });
        let images = pet.images;
        if (images.length > 1) {
            drive.deleteFile(image);
            images = images.filter((img) => {
                return img !== image;
            });
            await PetModel.findOneAndUpdate({ _id }, { images });
            return true;
        } else {
            throw new Error('Mỗi sản phẩm phải có ít nhất 1 ảnh');
        }
    } catch (error) {
        throw error;
    }
};

PetService.getRecommendPets = async (_id) => {
    try {
        const subcategory = JSON.parse(JSON.stringify(await PetModel.findById({ _id }))).subcategory;
        let pets = JSON.parse(
            JSON.stringify(
                await PetModel.find({ subcategory })
                    .populate('owner')
                    .populate('category')
                    .populate('subcategory')
                    .limit(10)
            )
        );
        pets = pets.filter(pet => {
            if (pet._id != _id) return { ...pet, ...{ thumb: `${global.domain}media/image/${pet.images[0]}` } }
        });
        return pets;
    } catch (error) {
        throw error;
    }
};

module.exports = PetService;
