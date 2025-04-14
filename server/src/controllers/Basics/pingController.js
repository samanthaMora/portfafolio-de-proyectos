const ping = (req, res) => {
  res.status(200).json({ message: "Servidor funcionando correctamente" });
};

export default ping;

