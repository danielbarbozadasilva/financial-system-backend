const joi = require('joi')
const financialController = require('../../controllers/controllers.financial_asset')

module.exports = (router) => {
  router
    .route('/financial')
    .get(financialController.listAllFinancialAssetsController)
}
