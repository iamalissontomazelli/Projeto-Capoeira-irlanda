const nodemailer = require('nodemailer');

// Controller responsável por enviar a mensagem
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validação básica
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Configuração do Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // Montando o e-mail
    const mailOptions = {
      from: `"Site Capoeira Dublin" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // você recebe o e-mail
      subject: "Nova mensagem do site de capoeira",
      html: `
        <h3>Nova mensagem recebida:</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `
    };

    // Enviar o e-mail
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Mensagem enviada com sucesso!" });

  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res.status(500).json({ error: "Erro ao enviar a mensagem." });
  }
};