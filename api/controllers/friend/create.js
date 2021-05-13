const ObjectId = require('mongoose').Types.ObjectId

module.exports = {


  friendlyName: 'Create',


  description: 'Create friend.',


  inputs: {
    friendId: { type: 'string', required: true }
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
    const { friendId } = inputs

    // Check if logged in user id and friend user id is same
    if (_user.toString() === friendId) {
      return exits.badRequest('You cannot be friends with yourself.')
    }

    // Give error if the provided friend user id is not a valid mongo id
    if (!ObjectId.isValid(friendId)) {
      return exits.invalidMongoId()
    }

    // Try to fetch the user by the friend user mongo id
    const friend = await User.getById(friendId)

    // Give error if the provided friend user id does not exists
    if (!friend) {
      return exits.invalidMongoId()
    }


    // Check if the users are already friends, if yes stop processing
    const existingFriendMap = await FriendMap.findOne({
      $and: [
        { _users: _user },
        { _users: friend._id }
      ]
    }).lean()
    if (existingFriendMap) {
      return exits.success({
        message: 'You are already friends.',
      })
    }



    // Try to create a user
    const friendMap = new FriendMap({
      _users: [_user, friend._id],
    })

    // Check if valid
    await friendMap.isValid()

    // Save the data
    await friendMap.save()

    // Return proper response
    return exits.success({
      statusCodeToSet: 201,
      message: 'Friend create successful.',
      item: friendMap
    })

  }


}
