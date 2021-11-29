const testData = {
  time: 1000,
  user: {
    id: 11,
    nickName: 'sjsjsj1246',
    email: 'test@gmail.com',
    image: 'https://source.unsplash.com/random/90x90',
  },
  room: {
    id: 11,
    roomImage: '',
    title: '바람 부는 날 5Km 함께 뛰어요',
    description: 'ㅎㅇ',
    startDate: '2021-11-14T12:31:04.672Z',
    targetDistance: 3,
    targetTime: 30000,
    roomImage: '',
    limitMember: 4,
    multiRoomMember: [
      {
        userId: 11,
        multiRoomUser: {
          id: 11,
          nickName: 'user1',
          image: 'https://source.unsplash.com/random/90x90',
        },
      },
      {
        userId: 12,
        multiRoomUser: {
          id: 12,
          nickName: 'user12',
          image: 'https://source.unsplash.com/random/90x90',
        },
      },
      {
        userId: 13,
        multiRoomUser: {
          id: 13,
          nickName: 'user13',
          image: 'https://source.unsplash.com/random/90x90',
        },
      },
      {
        userId: 14,
        multiRoomUser: {
          id: 14,
          nickName: 'user14',
          image: 'https://source.unsplash.com/random/90x90',
        },
      },
      {
        userId: 15,
        multiRoomUser: {
          id: 15,
          nickName: 'user15',
          image: 'https://source.unsplash.com/random/90x90',
        },
      },
      {
        userId: 16,
        multiRoomUser: {
          id: 16,
          nickName: 'user16',
          image: 'https://source.unsplash.com/random/90x90',
        },
      },
    ],
  },
  userRunData: [
    {
      user: {
        id: 11,
        nickName: 'user11',
        image: 'https://source.unsplash.com/random/90x90',
      },
      runStatus: {
        time: 1234,
        distance: 1,
        pace: 3.12,
      },
      runData: [
        {
          latitude: 37.659187827620975,
          longitude: 127.0514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
        {
          latitude: 37.559187827620975,
          longitude: 127.1514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
      ],
    },
    {
      user: {
        id: 12,
        nickName: 'user2',
        image: 'https://source.unsplash.com/random/90x90',
      },
      runStatus: {
        time: 1234,
        distance: 1,
        pace: 3.12,
      },
      runData: [
        {
          latitude: 37.6812312312323,
          longitude: 127.0514242126567,
          currentAltitude: 28,
          currentTime: 1234657,
          currentDistance: 3.12,
          momentPace: 6.01,
        },
      ],
    },
    {
      user: {
        id: 13,
        nickName: 'user3',
        image: 'https://source.unsplash.com/random/90x90',
      },
      runStatus: {
        time: 2334,
        distance: 1,
        pace: 5.12,
      },
      runData: [
        {
          latitude: 37.692342342343434,
          longitude: 127.0514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
      ],
    },
    {
      user: {
        id: 14,
        nickName: 'user4',
        image: 'https://source.unsplash.com/random/90x90',
      },
      runStatus: {
        time: 2334,
        distance: 1,
        pace: 5.12,
      },
      runData: [
        {
          latitude: 37.692342342343434,
          longitude: 127.0514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
      ],
    },
    {
      user: {
        id: 15,
        nickName: 'user5',
        image: 'https://source.unsplash.com/random/90x90',
      },
      runStatus: {
        time: 2334,
        distance: 1,
        pace: 5.12,
      },
      runData: [
        {
          latitude: 37.692342342343434,
          longitude: 127.0514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
      ],
    },
    {
      user: {
        id: 16,
        name: '조인혁',
        nickName: 'user6',
        image: 'https://source.unsplash.com/random/90x90',
        token: null,
        height: null,
        weight: null,
      },
      runStatus: {
        time: 2334,
        distance: 1,
        pace: 5.12,
      },
      runData: [
        {
          latitude: 37.692342342343434,
          longitude: 127.0514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
      ],
    },
  ],
};

export default testData;
