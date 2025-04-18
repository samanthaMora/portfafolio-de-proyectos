const logout = (req, res) => {
  // Ya no hay cookie que limpiar, simplemente respondemos
  return res.status(200).json({ message: "Sesión cerrada" });
};

export default logout;

  