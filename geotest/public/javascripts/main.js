// Generated by CoffeeScript 1.6.3
(function() {
  var onScript;

  onScript = function() {
    var computer, cp, gps, map, onLocation, onRecive, socket, tiles;
    socket = io.connect(window.location.href);
    map = L.map("map", {
      center: [19.21021, -96.17367],
      zoom: 14
    });
    //tiles = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
    tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Sacitec &copy; 2013 Iddar Olivares',
      key: 'BC9A493B41014CAABB98F0471D759707'
    });
    map.addLayer(tiles);
    map.locate({
      enableHighAccuracy: true
    });
    setInterval((function() {
      map.locate({
        enableHighAccuracy: true
      });
    }), 10000);
    cp = L.marker([19.190278, -96.153333]);
    map.addLayer(cp);
    onRecive = function(data) {
      var pos;
      console.log(data);
      pos = data.latlng;
      cp.setLatLng([pos.lat, pos.lng]).update();
      return cp.bindPopup("Usuarios Aqui");
    };
    computer = L.marker([19.190278, -96.153333]);
    map.addLayer(computer);
    onLocation = function(position) {
      var hr, min, pos, seg;
      hr = new Date();
      min = hr.getMinutes();
      seg = hr.getSeconds();
      pos = position.latlng;
      computer.setLatLng([pos.lat, pos.lng]).update();
      map.panTo([pos.lat, pos.lng]);
      computer.bindPopup("Aqui estas Tu :) " + min + ":" + +seg).openPopup();
      return socket.emit('coords:me', {
        latlng: pos
      });
    };
    map.on('locationfound', onLocation);
    socket.on('coords:user', onRecive);
    gps = L.marker([19.190278, -96.153333]);
    map.addLayer(gps);
    socket.on('coords:gps', function(data) {
      var pos;
      console.log(data);
      pos = data.latlng;
      gps.setLatLng([pos.lat, pos.lng]).update();
      gps.bindPopup("nuevo").openPopup();
    });
  };

  $(document).on('ready', onScript);

}).call(this);
