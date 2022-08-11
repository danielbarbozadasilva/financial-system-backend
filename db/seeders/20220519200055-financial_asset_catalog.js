module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'assets',
      [
        {
          name: 'Ativo 1',
          description:
            'Uma empresa dos Estados Unidos que desenvolve, fabrica, licencia, apoia e vende softwares de computador.',
          bvmf: 'SSFT34',
          current_price: 53.95,
          quantity: 100,
          image: JSON.stringify({
            origin: 'img01.jpg',
            name: 'img01.jpg',
            type: 'image/jpg'
          })
        },
        {
          name: 'Ativo 2',
          description:
            'Uma fabricante de automóveis multinacional estadunidense sediada em Dearborn, Michigan.',
          bvmf: 'WDMO34',
          current_price: 64.19,
          quantity: 200,
          image: JSON.stringify({
            origin: 'img02.jpg',
            name: 'img02.jpg',
            type: 'image/jpg'
          })
        },
        {
          name: 'Ativo 3',
          description:
            'Uma empresa argentina de tecnologia que oferece soluções de comércio eletrônico. ',
          bvmf: 'MWLI14',
          current_price: 31.99,
          quantity: 100,
          image: JSON.stringify({
            origin: 'img03.jpg',
            name: 'img03.jpg',
            type: 'image/jpg'
          })
        },
        {
          name: 'Ativo 4',
          description: 'O maior fabricante de automóveis do mundo.',
          bvmf: 'SFNB12',
          current_price: 32.12,
          quantity: 50,
          image: JSON.stringify({
            origin: 'img04.jpg',
            name: 'img04.jpg',
            type: 'image/jpg'
          })
        },
        {
          name: 'Ativo 5',
          description:
            'O maior banco brasileiro, com sede na cidade de São Paulo, no estado homônimo.',
          bvmf: 'IGUB4',
          current_price: 25.73,
          quantity: 150,
          image: JSON.stringify({
            origin: 'img05.jpg',
            name: 'img05.jpg',
            type: 'image/jpg'
          })
        },
        {
          name: 'Ativo 6',
          description:
            'Uma empresa multinacional de tecnologia que fabrica softwares e hardwares.',
          bvmf: 'CVDC34',
          current_price: 18.75,
          quantity: 300,
          image: JSON.stringify({
            origin: 'img06.jpg',
            name: 'img06.jpg',
            type: 'image/jpg'
          })
        },
        {
          name: 'Ativo 7',
          description: 'Uma grande empresa multinacional de tecnologia.',
          bvmf: 'ETLC34',
          current_price: 34.93,
          quantity: 250,
          image: JSON.stringify({
            origin: 'img07.jpg',
            name: 'img07.jpg',
            type: 'image/jpg'
          })
        },
        {
          name: 'Ativo 8',
          description:
            'Uma empresa Estado-unidense fabricante de circuitos integrados, especialmente processadores e placas de vídeo.',
          bvmf: 'WMD34',
          current_price: 50.04,
          quantity: 50,
          image: JSON.stringify({
            origin: 'img08.jpg',
            name: 'img08.jpg',
            type: 'image/jpg'
          })
        }
      ],
      {
        updateOnDuplicate: [
          'name',
          'description',
          'bvmf',
          'current_price',
          'quantity',
          'image'
        ],
        ignoreDuplicates: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('assets', null, {})
  }
}
