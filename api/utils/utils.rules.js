module.exports = [
  {
    type: 1,
    permission: [
      'SEARCH_FINANCIAL',
      'CREATE_FINANCIAL',
      'DELETE_FINANCIAL',
      'UPDATE_FINANCIAL',
      'LIST_CLIENT',
      'LIST_CLIENT_ID',
      'UPDATE_STATUS_CLIENT',
      'UPDATE_CLIENT',
      'LIST_CLIENT_TRANSACTION',
      'LIST_CLIENT_ID_TRANSACTION',
      'CREATE_DEPOSIT',
      'LIST_BANKS',
      'LIST_CLIENT_BALANCE',
      'LIST_ACCOUNT',
      'LIST_ID_ACCOUNT',
      'LIST_CLIENT_ID_DEPOSIT'
    ]
  },
  {
    type: 2,
    permission: [
      'SEARCH_FINANCIAL',
      'CREATE_TRANSACTION',
      'LIST_CLIENT_ID',
      'LIST_CLIENT_BALANCE',
      'LIST_CLIENT_ID_TRANSACTION',
      'LIST_BANKS',
      'LIST_CLIENT_ID_DEPOSIT'
    ]
  }
]
