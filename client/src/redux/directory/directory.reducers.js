const INITIAL_STATE = {
  sections: [
    {
      title: "HANDICRAFT",
      id: "1",
      imageUrl:
        "https://imgkub.com/images/2022/03/11/amir-hosseini-8rwJ94EffhY-unsplash.jpg",
      linkUrl: "shop/handicraft",
    },
    {
      title: "FLORIST",
      id: "2",
      imageUrl:
        "https://imgkub.com/images/2022/03/11/bianka-csenki--nxksGFSoeM-unsplash.jpg",
      linkUrl: "shop/florist",
    },
    {
      title: "SCULPTURE",
      id: "3",
      imageUrl:
        "https://imgkub.com/images/2022/03/11/abhijeet-gaikwad-EF1nSXZCzcM-unsplash.jpg",
      linkUrl: "shop/sculpture",
    },
    {
      title: "ARTIST",
      size: "large",
      id: "4",
      imageUrl:
        "https://imgkub.com/images/2022/03/11/raimond-klavins-IIcSAthwzqg-unsplash.jpg",
      linkUrl: "shop/artist",
    },
    {
      title: "INSTRUMENT",
      size: "large",
      id: "5",
      imageUrl:
        "https://imgkub.com/images/2022/03/11/istockphoto-469868231-1024x1024.jpg",
      linkUrl: "shop/insttuments",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
