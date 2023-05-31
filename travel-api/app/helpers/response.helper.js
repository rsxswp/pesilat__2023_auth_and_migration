const response = (
  res,
  status,
  { message = null, data = null, errors = null }
) => {
  if (errors) {
    return res.status(status).json({
      status_bool: false,
      message: message,
      data: null,
      errors,
    });
  } else {
    return res.status(status).json({
      status: true,
      message,
      data,
      errors,
    });
  }
};

module.exports = response;
