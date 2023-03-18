const { Readable } = require('stream');
const Upload = {};

const drive = require("../configs/drive.config");

async function setFilePublic(fileId) {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });
    } catch (error) {
        console.log(error);
    }
};

Upload.uploadFile = async (file, share, t) => {
    try {
        let type, folder;
        if (t === "prod") {
            type = `image/${file.type}`;
            folder = process.env.FOLDER_IMAGE_PRODUCTS;
        } else if (t === "user") {
            type = `text/${file.type}`;
            folder = process.env.FOLDER_HLS;
        }
        const createFile = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: type,
                parents: [folder]
            },
            media: {
                mimeType: type,
                body: Readable.from(file.buffer)
            }
        });
        const fileId = createFile.data.id;
        if (share) await setFilePublic(fileId);
        return fileId;
    } catch (error) {
        throw error;
    }
};

Upload.deleteFile = async (fileId) => {
    try {
        const deleteFile = await drive.files.delete({ fileId });
        if (deleteFile.status === 204) {
            return true;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = Upload;