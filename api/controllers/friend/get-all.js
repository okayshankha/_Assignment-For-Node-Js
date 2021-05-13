module.exports = {


  friendlyName: 'Get all',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'success'
    },
    badRequest: {
      responseType: 'badRequest'
    },
    conflict: {
      responseType: 'conflict'
    },
    unauthorized: {
      responseType: 'unauthorized'
    },
    invalidMongoId: {
      responseType: 'invalidMongoId'
    },
  },


  fn: async function (inputs, exits) {

    const { _id: _user } = this.req.user

    // Fetch my friends
    const friends = await FriendMap.find({
      _users: _user
    }).populate({
      path: '_users',
      match: { _id: { $ne: _user } }
    })

    // Return proper response
    return exits.success({
      message: 'Friends fetch successful.',
      items: friends
    })

  }


}
