const nodemailer = require('nodemailer');

module.exports = {
    sendMail: async (orderInfo) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAILER_MAIL,
                    pass: process.env.MAILER_PASS
                }
            });

            const mailOptions = {
                from: process.env.MAILER_MAIL,
                to: orderInfo.email,
                subject: 'Tạo đơn hàng thành công',
                html: `
                    <p>Đơn hàng của bạn đã được tạo thành công !!!<p>
                    <p>Tên người nhận: ${orderInfo.fullName}<p>
                    <p>Số điện thoại người nhận: ${orderInfo.phone}<p>
                    <p>Địa chỉ giao hàng: ${orderInfo.address}<p>
                    <p>Số tiền: ${orderInfo.total}<p>
                    <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi</p>
                `,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            throw error;
        }
    },
}