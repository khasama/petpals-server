const path = require('path');
const drive = require("../configs/drive.config");

const MediaController = {};

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42";

MediaController.streamImage = async (req, res) => {
    try {
        const id = req.params.id
        const data = await drive.files.get(
            {
                fileId: id,
                alt: 'media',
            },
            {
                responseType: 'stream'
            }
        );
        return data.data.pipe(res);
    } catch (error) {
        console.log(error);
    }
};

module.exports = MediaController;
