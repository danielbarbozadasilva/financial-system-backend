const fs = require('fs')
const uuid = require('uuid').v4
const path = require('path')

const root_address = process.env.FILE_BASE_PATH
const image_address = process.env.IMAGE_PATH

const UtilCreateAddress = (destiny, file_name = '') => {
  return path.join(root_address, destiny, file_name)
}

const UtilCreateAddressDownload = (source, file_name) => {
  const address = path.join(source, file_name).replace('\\', '/')
  return `${image_address + address}`
}

const UtilCreateName = (type) => {
  const resp = type.split('/')[1]
  return `${uuid()}.${resp}`
}

const UtilMove = (old_path, new_path) => {
  return fs.renameSync(old_path, new_path)
}

const UtilRemove = (source, file) => {
  const address_file = UtilCreateAddress(source, file)
  if (fs.existsSync(address_file)) {
    fs.unlinkSync(address_file)
  }
}

module.exports = {
  UtilCreateAddress,
  UtilCreateAddressDownload,
  UtilCreateName,
  UtilMove,
  UtilRemove
}
