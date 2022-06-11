'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'address',
      [
        {
          address: 'Rua ffg 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '23200-200',
          complement: 'casa',
        },
        {
          address: 'Rua abc 123',
          uf: 'RJ',
          city: 'Rio de janeiro',
          zip_code: '22133-100',
          complement: 'casa'
        },
        {
          address: 'Rua acr 123',
          uf: 'SP',
          city: 'São Paulo',
          zip_code: '23233-200',
          complement: 'apart.'
        },
        {
          address: 'Rua gfgf 123',
          uf: 'SP',
          city: 'São Paulo',
          zip_code: '23233-200',
          complement: 'apart.'
        }
      ],
      {
        updateOnDuplicate: ['address', 'uf', 'city', 'zip_code', 'complement'],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('address', null, {})
  }
}
