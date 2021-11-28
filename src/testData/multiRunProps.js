const temp = {
  none: {
    remainTime: 10000,
    rank: 1,
    image: 'https://source.unsplash.com/random/90x90',
  },
  runStatus: {
    pace: 1000,
    distance: 1000,
    time: 1000,
  },
  user: {
    id: 1,
    name: '황인서',
    nickName: 'sjsjsj1246',
    email: 'test@gmail.com',
    token: null,
    weight: 50,
    height: 190,
    image: 'https://source.unsplash.com/random/90x90',
  },
  room: {
    id: 1,
    roomImage: '',
    title: '바람 부는 날 5Km 함께 뛰어요',
    statue: 'open',
    description: 'ㅎㅇ',
    startDate: '2021-11-14T12:31:04.672Z',
    targetDistance: 3,
    targetTime: 30,
    roomImage: '',
    limitMember: 4,
    // userAmount: 3,
    // roomId: 1,
    // userId: 2,
    // runId: 1,
    // isOwner: true,
    // isReady: false,
    multiRoomMember: [
      {
        userId: 1,
        isOwer: true,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 1,
          name: '황인서',
          nickName: 'sjsjs…',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 2,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 2,
          name: '김건훈',
          nickName: 'sjsjs…',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 3,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 3,
          name: '조인혁',
          nickName: 'ㅁㄴㄹㅁㄴㅇㄹ',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
    ],
  },
  othersRunData: [
    {
      userId: 1,
      time: 1234,
      distance: 1.232,
      pace: 3.12,
      runData: [
        {
          latitude: 37.659187827620975,
          longitude: 127.0514252126567,
          currentAltitude: 30,
          currentTime: 1234567,
          currentDistance: 3.23,
          momentPace: 6.12,
        },
      ],
    },

    {
      userId: 2,
      time: 1234,
      distance: 1.5552,
      pace: 3.12,
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
      userId: 3,
      time: 2334,
      distance: 2.232,
      pace: 5.12,
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
  runData: [
    {
      latitude: 37.659232320975,
      longitude: 127.0514252126567,
      currentAltitude: 30,
      currentTime: 1234567,
      currentDistance: 3.23,
      currentPace: 612,
    },
  ],
};

const multiRunProps = {
  time: 1000,
  user: {
    id: 1,
    name: '황인서',
    nickName: 'sjsjsj1246',
    email: 'test@gmail.com',
    token: null,
    weight: 50,
    height: 190,
    image: 'https://source.unsplash.com/random/90x90',
  },
  room: {
    id: 1,
    roomImage: '',
    title: '바람 부는 날 5Km 함께 뛰어요',
    statue: 'open',
    description: 'ㅎㅇ',
    startDate: '2021-11-14T12:31:04.672Z',
    targetDistance: 3,
    targetTime: 30000,
    roomImage: '',
    limitMember: 4,
    multiRoomMember: [
      {
        userId: 1,
        isOwer: true,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 1,
          name: '황인서',
          nickName: 'user1',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 2,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 2,
          name: '김건훈',
          nickName: 'user2',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 3,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 3,
          name: '조인혁',
          nickName: 'user3',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 4,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 4,
          name: '조인혁',
          nickName: 'user4',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 5,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 5,
          name: '조인혁',
          nickName: 'user5',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
      {
        userId: 6,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 6,
          name: '조인혁',
          nickName: 'user6',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
      },
    ],
  },
  userRunData: [
    {
      user: {
        id: 1,
        name: '조인혁',
        nickName: 'user1',
        image: 'https://source.unsplash.com/random/90x90',
        token: null,
        height: null,
        weight: null,
      },
      runStatus: {
        time: 1234,
        distance: 1.232,
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
          latitude: 37.759187827620975,
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
        id: 2,
        name: '조인혁',
        nickName: 'user2',
        image: 'https://source.unsplash.com/random/90x90',
        token: null,
        height: null,
        weight: null,
      },
      runStatus: {
        time: 1234,
        distance: 1.5552,
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
        id: 3,
        name: '조인혁',
        nickName: 'user3',
        image: 'https://source.unsplash.com/random/90x90',
        token: null,
        height: null,
        weight: null,
      },
      runStatus: {
        time: 2334,
        distance: 2.232,
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
        id: 4,
        name: '조인혁',
        nickName: 'user4',
        image: 'https://source.unsplash.com/random/90x90',
        token: null,
        height: null,
        weight: null,
      },
      runStatus: {
        time: 2334,
        distance: 2.232,
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
        id: 5,
        name: '조인혁',
        nickName: 'user5',
        image: 'https://source.unsplash.com/random/90x90',
        token: null,
        height: null,
        weight: null,
      },
      runStatus: {
        time: 2334,
        distance: 2.232,
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
        id: 6,
        name: '조인혁',
        nickName: 'user6',
        image: 'https://source.unsplash.com/random/90x90',
        token: null,
        height: null,
        weight: null,
      },
      runStatus: {
        time: 2334,
        distance: 2.232,
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

export default multiRunProps;

const psop = {
  props: {
    time: 123,
    user: {
      id: 1,
      name: '황인서',
      nickName: 'sjsjsj1246',
      email: 'test@gmail.com',
      token: null,
      weight: 50,
      height: 190,
      image: 'https://source.unsplash.com/random/90x90',
    },
    room: {
      id: 1,
      roomImage: '',
      title: '바람 부는 날 5Km 함께 뛰어요',
      statue: 'open',
      description: 'ㅎㅇ',
      startDate: '2021-11-14T12:31:04.672Z',
      targetDistance: 3,
      targetTime: 30,
      limitMember: 4,
      multiRoomMember: [
        {
          userId: 1,
          isOwer: true,
          isReady: false,
          roomId: 1,
          runId: null,
          multiRoomUser: {
            id: 1,
            name: '황인서',
            nickName: 'sjsjs…',
            image: 'https://source.unsplash.com/random/90x90',
            token: null,
            height: null,
            weight: null,
          },
        },
        {
          userId: 2,
          isOwer: false,
          isReady: false,
          roomId: 1,
          runId: null,
          multiRoomUser: {
            id: 2,
            name: '김건훈',
            nickName: 'sjsjs…',
            image: 'https://source.unsplash.com/random/90x90',
            token: null,
            height: null,
            weight: null,
          },
        },
        {
          userId: 3,
          isOwer: false,
          isReady: false,
          roomId: 1,
          runId: null,
          multiRoomUser: {
            id: 3,
            name: '조인혁',
            nickName: 'ㅁㄴㄹㅁㄴㅇㄹ',
            image: 'https://source.unsplash.com/random/90x90',
            token: null,
            height: null,
            weight: null,
          },
        },
      ],
    },
    userRunData: [
      {
        userId: 3,
        time: 2334,
        distance: 2.232,
        pace: 5.12,
        runData: [
          {
            latitude: 37.69234234234344,
            longitude: 127.0514252126567,
            currentAltitude: 30,
            currentTime: 1234567,
            currentDistance: 3.23,
            momentPace: 6.12,
          },
        ],
      },
      {
        userId: 2,
        time: 1234,
        distance: 1.5552,
        pace: 3.12,
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
        userId: 1,
        time: 1234,
        distance: 1.232,
        pace: 3.12,
        runData: [
          {
            latitude: 37.659187827620975,
            longitude: 127.0514252126567,
            currentAltitude: 30,
            currentTime: 1234567,
            currentDistance: 3.23,
            momentPace: 6.12,
          },
        ],
      },
    ],
  },
  displayUserId: 1,
  userRankProps: {
    rank: [
      {
        userId: 3,
        time: 2334,
        distance: 2.232,
        pace: 5.12,
        runData: [
          {
            latitude: 37.69234234234344,
            longitude: 127.0514252126567,
            currentAltitude: 30,
            currentTime: 1234567,
            currentDistance: 3.23,
            momentPace: 6.12,
          },
        ],
        rank: 1,
        isMe: false,
        image: 'https://source.unsplash.com/random/90x90',
        color: '#00F2B8',
        displayUserId: 1,
      },
      {
        userId: 2,
        time: 1234,
        distance: 1.5552,
        pace: 3.12,
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
        rank: 2,
        isMe: false,
        image: 'https://source.unsplash.com/random/90x90',
        color: '#FC6BFF',
        displayUserId: 1,
      },
      {
        userId: 1,
        time: 1234,
        distance: 1.232,
        pace: 3.12,
        runData: [
          {
            latitude: 37.659187827620975,
            longitude: 127.0514252126567,
            currentAltitude: 30,
            currentTime: 1234567,
            currentDistance: 3.23,
            momentPace: 6.12,
          },
        ],
        rank: 3,
        isMe: true,
        image: 'https://source.unsplash.com/random/90x90',
        color: '#1162FF',
        displayUserId: 1,
      },
    ],
  },
  mapViewProps: {
    displayUserId: 1,
    userPoints: [
      {
        userId: 3,
        runData: [
          {
            latitude: 37.69234234234344,
            longitude: 127.0514252126567,
            currentAltitude: 30,
            currentTime: 1234567,
            currentDistance: 3.23,
            momentPace: 6.12,
          },
        ],
        center: {
          lat: 37.69234234234344,
          lng: 127.0514252126567,
        },
        rank: {
          userId: 3,
          time: 2334,
          distance: 2.232,
          pace: 5.12,
          runData: [
            {
              latitude: 37.69234234234344,
              longitude: 127.0514252126567,
              currentAltitude: 30,
              currentTime: 1234567,
              currentDistance: 3.23,
              momentPace: 6.12,
            },
          ],
          rank: 1,
          isMe: false,
          image: 'https://source.unsplash.com/random/90x90',
          color: '#00F2B8',
          displayUserId: 1,
        },
      },
      {
        userId: 2,
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
        center: {
          lat: 37.6812312312323,
          lng: 127.0514242126567,
        },
        rank: {
          userId: 2,
          time: 1234,
          distance: 1.5552,
          pace: 3.12,
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
          rank: 2,
          isMe: false,
          image: 'https://source.unsplash.com/random/90x90',
          color: '#FC6BFF',
          displayUserId: 1,
        },
      },
      {
        userId: 1,
        runData: [
          {
            latitude: 37.659187827620975,
            longitude: 127.0514252126567,
            currentAltitude: 30,
            currentTime: 1234567,
            currentDistance: 3.23,
            momentPace: 6.12,
          },
        ],
        center: {
          lat: 37.659187827620975,
          lng: 127.0514252126567,
        },
        rank: {
          userId: 1,
          time: 1234,
          distance: 1.232,
          pace: 3.12,
          runData: [
            {
              latitude: 37.659187827620975,
              longitude: 127.0514252126567,
              currentAltitude: 30,
              currentTime: 1234567,
              currentDistance: 3.23,
              momentPace: 6.12,
            },
          ],
          rank: 3,
          isMe: true,
          image: 'https://source.unsplash.com/random/90x90',
          color: '#1162FF',
          displayUserId: 1,
        },
      },
    ],
  },
  lineUpProps: {
    markerData: [
      {
        userId: 1,
        isOwer: true,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 1,
          name: '황인서',
          nickName: 'sjsjs…',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
        distance: 1.232,
        color: '#1162FF',
      },
      {
        userId: 2,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 2,
          name: '김건훈',
          nickName: 'sjsjs…',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
        distance: 1.5552,
        color: '#FC6BFF',
      },
      {
        userId: 3,
        isOwer: false,
        isReady: false,
        roomId: 1,
        runId: null,
        multiRoomUser: {
          id: 3,
          name: '조인혁',
          nickName: 'ㅁㄴㄹㅁㄴㅇㄹ',
          image: 'https://source.unsplash.com/random/90x90',
          token: null,
          height: null,
          weight: null,
        },
        distance: 2.232,
        color: '#00F2B8',
      },
    ],
  },
};
