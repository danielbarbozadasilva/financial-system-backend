'use strict'
const cryptography = require('../../api/utils/utils.cryptography')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          name: 'Daniel Barboza',
          email: 'daniel@gmail.com',
          cpf: '123.123.123-45',
          gender: 'M',
          birth_date: '1997-03-05',
          password: cryptography.UtilCreateHash('daniel'),
          phone: '+55 (21) 3324-1121',
          status: true,
          kind: 'administrator',
          address_id: 1
        },
        {
          name: 'Fatima Souza',
          email: 'fatima@gmail.com',
          cpf: '423.423.423-45',
          gender: 'F',
          birth_date: '1998-05-01',
          password: cryptography.UtilCreateHash('fatima'),
          phone: '+55 (21) 2121-2321',
          status: true,
          kind: 'client',
          address_id: 2
        },
        {
          name: 'Tatiana Gonçalves',
          email: 'tatiana@gmail.com',
          cpf: '233.113.223-35',
          gender: 'F',
          birth_date: '1991-01-04',
          password: cryptography.UtilCreateHash('tatiana'),
          phone: '+55 (21) 3114-2121',
          status: true,
          kind: 'client',
          address_id: 3
        },
        {
          name: 'Guilherme Barboza',
          email: 'guilherme@gmail.com',
          cpf: '123.123.123-45',
          gender: 'M',
          birth_date: '1998-08-01',
          password: cryptography.UtilCreateHash('guilherme'),
          phone: '+55 (21) 2324-2133',
          status: true,
          kind: 'client',
          address_id: 4
        }
      ],
      {
        updateOnDuplicate: [
          'name',
          'email',
          'cpf',
          'gender',
          'birth_date',
          'password',
          'phone',
          'status',
          'kind',
          'address_id'
        ],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {})
  }
}