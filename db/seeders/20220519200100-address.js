'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'address',
      [
        {
          address: 'Rua ffg 123',
          uf: 'RJ',
          city: 'CARAPEBUS',
          zip_code: '23200-200',
          complement: 'casa',
        },
        {
          address: 'Rua abc 123',
          uf: 'RJ',
          city: 'CARMO',
          zip_code: '22133-100',
          complement: 'casa'
        },
        {
          address: 'Rua acr 123',
          uf: 'SP',
          city: 'ALTAIR',
          zip_code: '22113-250',
          complement: 'apart.'
        },
        {
          address: 'Rua gfgf 123',
          uf: 'SP',
          city: 'CAJAMAR',
          zip_code: '23233-200',
          complement: 'apart.'
        },
        {
          address: 'Rua hdt 123',
          uf: 'SP',
          city: 'CAJAMAR',
          zip_code: '23233-200',
          complement: 'apart.'
        },
        {
          address: 'Rua fgh 123',
          uf: 'RJ',
          city: 'CARMO',
          zip_code: '22133-100',
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
