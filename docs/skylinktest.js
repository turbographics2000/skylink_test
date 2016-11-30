var skylinkDemo = new Skylink();

skylinkDemo.on('peerJoined', function(peerId, peerInfo, isSelf) {
  if(isSelf || !peerInfo.userData.startsWidth('mentor')) return;
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
});
skylinkDemo.on('incomingStream', function(peerId, stream, peerInfo, isSelf) {
  if(isSelf || !peerInfo.userData.startsWidth('mentor')) return;
  var vid = document.getElementById(peerId);
  attachMediaStream(vid, stream);
});
skylinkDemo.on('peerLeft', function(peerId, peerInfo, isSelf) {
  var vid = document.getElementById(peerId);
  vid && document.body.removeChild(vid);
});
skylinkDemo.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('myvideo');
  vid && attachMediaStream(vid, stream);
});

// skylink.init() execute in .html file
// skylinkDemo.init("e3bb93c0-0728-4460-b2ad-ed735dc5e92a", function (error, success) {
//    if (success) {
//      skylinkDemo.joinRoom("my_room", {
//        userData: "mentor",
//        audio: true,
//        video: true
//      });
//    }
//  });