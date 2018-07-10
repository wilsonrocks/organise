
function getDetails (req, res, next) {
  const {id} = req.params;
  if (!id.match(/^[0-9]+$/)) {

    const response = {
      error: {
        status: 400,
        message: `The requested ID ${id} should be an integer.`,
      }
    }
    return res
      .status(400)
      .send(response);

  }

  return res.send();
}


module.exports = {
  getDetails,
}