const multiRoomProps = {
  user: {
    id: 2,
    name: '황인서',
    nickName: 'sjsjsj1246',
    roomId: null,
  },
  room: {
    id: 1,
    roomOwner: {
      id: 1,
      name: '황인서',
      nickName: 'sjsjsj1246',
      image:
        'https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=918&q=80',
    },
    title: '바람 부는 날 5Km 함께 뛰어요',
    isOpen: true,
    description: 'ㅎㅇ',
    limitMember: 4,
    userAmount: 3,
    multiRoomMember: [
      {
        id: 1,
        name: '황인서',
        nickName: 'sjsjsj1246',
        image:
          'https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=918&q=80',
      },
      {
        id: 2,
        name: '김건훈',
        nickName: 'dfaa1243',
        image:
          'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      },
      {
        id: 3,
        name: '조인혁',
        nickName: '불닭볶음면',
        image:
          'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
      },
    ],
    startDate: '2021-11-19T12:31:04.672Z',
    targetDistance: 3,
    targetTime: 30,
    roomImage: '',
  },
};

export default multiRoomProps;
