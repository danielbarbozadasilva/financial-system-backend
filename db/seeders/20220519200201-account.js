'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'account',
      [
        { 
          number: '12316121-1',
          type: 'C/C',
          balance: 3100.00,
          user_id: 2,
          branch_id: 1
        },
        {  
          number: '40126582-2',
          type: 'C/C',
          balance: 1100.00,
          user_id: 3,
          branch_id: 1
        },
        {  
          number: '65536124-9',
          type: 'C/C',
          balance: 11400.00,
          user_id: 4,
          branch_id: 1
        },
        {  
          number: '14316134-1',
          type: 'C/C',
          balance: 24100.00,
          user_id: 5,
          branch_id: 1
        },
        {  
          number: '21528231-2',
          type: 'C/C',
          balance: 21100.00,
          user_id: 6,
          branch_id: 1
        }
      ],
      {
        updateOnDuplicate: ['number', 'type', 'balance', 'user_id', 'branch_id'],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('account', null, {})
  }
}
