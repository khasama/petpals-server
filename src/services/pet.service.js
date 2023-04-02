const PetModel = require("../models/pet.model");
const slug = require("slug");
const image = require("../utils/image");
const drive = require("../utils/drive");

const PetService = {};

PetService.getAllPet = async () => {
    try {
        const pets = await PetModel.find();
        return pets;
    } catch (error) {
        throw error;
    }
};

PetService.getPet = async (_id) => {
    try {
        let pet = JSON.parse(JSON.stringify(await PetModel.findById({ _id }).populate('owner')));
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

module.exports = PetService;
