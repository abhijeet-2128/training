import nodemailer from 'nodemailer';

const sendEmail = async (email: string, subject: string, text: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: '	geo.barton84@ethereal.email',
                pass: 'UNrsbkVrQDH2HSWcQ5'
            }
        });
        await transporter.sendMail({
            from: 'geo.barton84@ethereal.email' ,  // process.env.USER,
            to: email,
            subject: subject,
            text:  text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

 export default sendEmail;

