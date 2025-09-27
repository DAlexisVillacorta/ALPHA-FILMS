const usersController = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Usuario con id ${id}` });
};

module.exports = usersController;
