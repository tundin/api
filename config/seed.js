var mongoose = require("mongoose");
var Post = require("../app/models/post");
var Tag = require("../app/models/tag");
var Channel = require("../app/models/channel")


mongoose.connect(require("./database").url)


// Create Tags
var seedTags = function(num){
  Tag.remove({}, function(err){
    for (var i = 0; i < num; i += 1) {
      Tag.create({
        name: "tag-" + i,
        description: "Seeded generic tag no. " + i
      }, function(err, tag){
        if (err){
          return console.log("error in seeding tag: ", err);
        }
        console.log("Created tag: ", tag);
      });
    }
  })
};

var getRandomSubarray = function(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

var seedArticles = function(num){
  Tag.find({}, function(err, tags){
    if (err) return console.log(err);
    for (var i = 0; i < num; i += 1){
      var newPost = new Post({
        title: "#" + i + "Seeded Post",
        body: "#"+ i + " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula ut felis vel blandit. Fusce varius pretium est molestie feugiat. Phasellus vitae dapibus sem. Ut risus risus, condimentum vitae congue ac, vestibulum eu ante. Nunc sed molestie ligula. Vivamus a purus nisl. Vestibulum quis scelerisque nisi. Aenean lobortis ligula non libero interdum pulvinar. Vestibulum faucibus purus quis neque ornare cursus. Pellentesque rhoncus pellentesque scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer nec lacinia ipsum, id laoreet lectus. Morbi nec congue nisi, et ultrices diam. Proin ut sodales nisi, sed malesuada ligula. Etiam mi leo, sollicitudin a dapibus id, aliquet in tellus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In et lobortis neque. Aenean vulputate aliquet congue. Nullam blandit purus sit amet lectus vehicula lobortis. Mauris rutrum ut sem et congue. Donec tincidunt felis sit amet leo posuere, non tempus ligula luctus. Vivamus eu nunc nec magna tincidunt luctus. Vestibulum ac accumsan massa, nec viverra lorem. Sed eget auctor elit, eu tempus quam. Vivamus quis nunc a ipsum finibus imperdiet. Nullam in eros et velit ultrices efficitur. Aliquam commodo at eros et mattis. Nulla facilisi. Suspendisse ultrices libero eu est egestas, in.",
        tags: getRandomSubarray(tags, Math.floor(Math.random()* (5) + 1))
      });
      newPost.save(function(err, post){
        if (!err) console.log("post saved: ", post);
        else console.log(err);
      })
    }
  })
};

var seedChannels = function(num) {
  Tag.find({}, function(err, tags) {
    if (err) return console.log(err);
    for (var i = 0; i < num; i += 1){
      newChannel = new Channel({
        name: "Channel " + i,
        tags: getRandomSubarray(tags, Math.floor(Math.random()* (5) + 1))
      });
      newChannel.save(function(err, channel){
        if (!err) console.log("channel saved: ", channel);
        else console.log(err);
      });
    }
  });
};

seedArticles(12);
