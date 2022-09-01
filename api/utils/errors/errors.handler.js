exports.formatError = (err, res) => {
  const { statusCode = 500, message = 'An unexpected error has occurred' } = err

  res.status(statusCode).json({
    statusCode,
    message
  })
}
