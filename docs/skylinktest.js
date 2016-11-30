window.MediaStream = window.MediaStream || window.webkitMediaStream;
var skylinkDemo = new Skylink();
var uuid = (new MediaStream()).id;

skylinkDemo.on('peerJoined', function(peerId, peerInfo, isSelf) {
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.

  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
});
skylinkDemo.on('incomingStream', function(peerId, stream, peerInfo, isSelf) {
  if(isSelf) return;
  var vid = document.getElementById(peerId);
  attachMediaStream(vid, stream);
});
skylinkDemo.on('peerLeft', function(peerId, peerInfo, isSelf) {
  var vid = document.getElementById(peerId);
  document.body.removeChild(vid);
});
skylinkDemo.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('myvideo');
  attachMediaStream(vid, stream);
});

skylinkDemo.init("e3bb93c0-0728-4460-b2ad-ed735dc5e92a", function (error, success) {
   if (success) {
     skylinkDemo.joinRoom("my_room", {
       userData: "mentor",
       audio: true,
       video: true
     });
   }
 });