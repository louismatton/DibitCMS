export class Website {
  _id: String;
  title: String;
  userId: String;
  pages: {
    pageTitle: String,
    createdDate: Date,
    pageOrder: Number,
    pageVisible:Boolean,
    posts: {
      postTitle: String,
      postText: String,
      postPhotos: {
        type: String
      }[],
      postType: String,
      postDate: Date,
      postOrder: Number,
      postVisible:Boolean
    }[];
  }[];

  savingsHistory: {
    savings: {
      type: Number,
      required: true,
      default: 0
    },
    date: {
      type: Date,
      required: false
    }
  }[];

  consumptionHistory: {
    consumption: {
      type: Number,
      required: true,
      default: 0
    },
    date: {
      type: Date,
      required: false
    }
  }[];

  // constructor() {
  //   this._id = ""
  //   this.image = "https://openclipart.org/download/260694/circle-stroked-15.svg"
  //   this.name = ""
  //   this.currentTemp = null
  //   this.wantedTemp = null
  //   this.statusOn = 0
    // this.consumptionHistory = [];
    // this.savingsHistory = [];
    // this.temperatureHistory = [];
  // }
}


export default Website;
