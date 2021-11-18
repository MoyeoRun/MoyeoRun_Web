const multiRoomProps = {
  user: {
    id: 1,
    name: '비둘기',
    email: 'sjsjsj1246@naver.com',
    nickName: 'sjsjsj1246',
    image:
      'https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=918&q=80',
  },
  roomOwner: {
    id: 1,
    name: '비둘기',
    email: 'sjsjsj1246@naver.com',
    nickName: 'sjsjsj1246',
    image:
      'https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=918&q=80',
  },
  room: {
    id: 2,
    roomImage: '',
    title: '테스트',
    status: 'Open',
    description: '음',
    startDate: '2021-11-1T13:30:00.000Z',
    targetDistance: 1,
    targetTime: 2700000,
    limitMember: 7,
    multiRoomMember: [
      {
        roomId: 2,
        userId: 8,
        runId: null,
        rank: null,
        isOwner: true,
        isReady: false,
        multiRoomUser: {
          id: 1,
          name: '비둘기',
          email: 'sjsjsj1246@naver.com',
          nickName: 'sjsjsj1246',
          image:
            'https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=918&q=80',
        },
      },
      {
        roomId: 2,
        userId: 8,
        runId: null,
        rank: null,
        isOwner: false,
        isReady: false,
        multiRoomUser: {
          id: 2,
          name: '뻐꾸기',
          email: 'sjsjsj1246@naver.com',
          nickName: 'sjsjsj1246',
          image:
            'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        },
      },
      {
        roomId: 2,
        userId: 8,
        runId: null,
        rank: null,
        isOwner: false,
        isReady: true,
        multiRoomUser: {
          id: 3,
          name: '까치',
          email: 'sjsjsj1246@naver.com',
          nickName: 'sjsjsj1246',
          image:
            'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
        },
      },
    ],
  },
};

export default multiRoomProps;
