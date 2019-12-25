module.exports = (data) => (request, response) => {
  response.status(200).json({ data });
};
