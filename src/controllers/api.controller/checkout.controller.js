const createError = require("http-errors");
const CheckoutService = require("../../services/checkout.service");


const CheckoutController = {};

CheckoutController.checkout = async (req, res, next) => {
    try {
        const { idUser, paymentMethod, fullName, email, address, phone } = req.body;
        if (idUser && paymentMethod) {
            const data = await CheckoutService.checkout(idUser, parseInt(paymentMethod), fullName, email, address, phone);
            return res.status(200).json({ status: "success", data });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

// CheckoutController.sendMail = async (req, res, next) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'khavl741953@gmail.com',
//                 pass: 'serywbgtytbszpok'
//             }
//         });

//         const mailOptions = {
//             from: 'khavl741953@gmail.com',
//             to: 'khavl741953.1@gmail.com',
//             subject: 'Tạo đơn hàng thành công',
//             html: `
//                 <h4>Đơn hàng của bạn đã được tạo thành công !!!<h4>
//                 <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi</p>
//             `,
//         };

//         await transporter.sendMail(mailOptions);
//     } catch (error) {
//         return res.status(200).json({ status: "failed", message: error.message });
//     }
// };

CheckoutController.getMyOrders = async (req, res, next) => {
    try {
        const { idUser } = req.params;
        if (idUser) {
            const data = await CheckoutService.getMyOrders(idUser);
            return res.status(200).json({ status: "success", data });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

module.exports = CheckoutController;