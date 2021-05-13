const geolib = require('geolib')

module.exports = {


  friendlyName: 'Get all nearby',


  description: '',


  inputs: {
    maximumDistanceInMeters: { type: 'number', required: true, min: 0 }
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

    const { maximumDistanceInMeters } = inputs
    const { _id: _user } = this.req.user

    const {
      latitude,
      longitude
    } = this.req.user

    if (!latitude || !longitude){
      throw Error('User lat lon is not available.')
    }

    const loggedInUserGeoPosition = { latitude, longitude }

    // Fetch my friends
    const friends = await FriendMap.find({
      _users: _user
    }).populate({
      path: '_users',
      match: { _id: { $ne: _user } }
    })


    // Pick all those users whose distance is less than the max given distances in meters
    const nearbyFriends = []
    for (let index = 0; index < friends.length; index++) {
      const element = friends[index]

      const friendGeoPosition = {
        latitude: element._users[0].latitude,
        longitude: element._users[0].longitude
      }

      const distance = geolib.getDistance(loggedInUserGeoPosition, friendGeoPosition)
      if (distance <= maximumDistanceInMeters) {
        nearbyFriends.push(element)
      }

    }

    // Return proper response
    return exits.success({
      message: 'Nearby friends fetch successful.',
      items: nearbyFriends
    })

  }


}
