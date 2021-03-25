var mongoose = require('mongoose');

// {
//   "id":"c1",
//   "thumbURL":"https://imgauto-phinf.pstatic.net/20170919_172/auto_1505802094784hvqgh_JPEG/20170919152131_p5j9fjk4.jpg?type=f120_80",
//   "viewURL":"https://imgauto-phinf.pstatic.net/20170919_172/auto_1505802094784hvqgh_JPEG/20170919152131_p5j9fjk4.jpg?type=f980_654",
//   "originURL":"https://imgauto-phinf.pstatic.net/20170919_172/auto_1505802094784hvqgh_JPEG/20170919152131_p5j9fjk4.jpg",
// }

var carouselSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  thumbURL: {
    type: String,
    require: true,
    unique: true,
  },
  viewURL: {
    type: String,
    require: true,
    unique: true,
  },
  originURL: {
    type: String,
    require: true,
    unique: true
  },
  
});

var Carousel = mongoose.model('carousel', carouselSchema);

module.exports = Carousel;
