const logout = (req, res) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    return res.status(200).json({ message: "Sesión cerrada" });
  };
  
  export default logout;
  