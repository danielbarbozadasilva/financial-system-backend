const clientController = require('../../controllers/controllers.client')

module.exports = (router) => {
  router.route('/client').get(clientController.listAllClientsController)
}
