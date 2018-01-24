// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Generated by tools/bigint-tester.py.

// Flags: --harmony-bigint

// TODO(adamk/jkummerow/neis): Support BigInts in TF unary ops.
// Flags: --noopt

var data = [{
  a: "3d02c87edc77722299f6559ecca038911f864a4e78c20af80f4a6d9",
  r: "-3d02c87edc77722299f6559ecca038911f864a4e78c20af80f4a6da"
}, {
  a: "ac01894aeaf77255ede209897561ec1e3c7e916b9",
  r: "-ac01894aeaf77255ede209897561ec1e3c7e916ba"
}, {
  a: "-7aaab657ab197f26eb6b98fe4c2c79b199a8156129ca04",
  r: "7aaab657ab197f26eb6b98fe4c2c79b199a8156129ca03"
}, {
  a: "9718579cc52befdaff1ec035b5ed03cec5c1d1678c28712cf0c9bec2c807897b74f0",
  r: "-9718579cc52befdaff1ec035b5ed03cec5c1d1678c28712cf0c9bec2c807897b74f1"
}, {
  a: "e614366bc4e67509843254c52e13da5380b00a35aa1d233e70821f7d649ad1957db",
  r: "-e614366bc4e67509843254c52e13da5380b00a35aa1d233e70821f7d649ad1957dc"
}, {
  a: "fb815f78e6952b500226c",
  r: "-fb815f78e6952b500226d"
}, {
  a: "94404df802649cff2ea6c0996f55ec60c14f00ab29b287092389951f6227c4ec7",
  r: "-94404df802649cff2ea6c0996f55ec60c14f00ab29b287092389951f6227c4ec8"
}, {
  a: "-74b42cd7bccd",
  r: "74b42cd7bccc"
}, {
  a: "da",
  r: "-db"
}, {
  a: "3a9ade198",
  r: "-3a9ade199"
}, {
  a: "56e766d24fd18c2241f244dedc426c0b1ae59e7ed4f06def0a75e0a5c8651e2ce87928",
  r: "-56e766d24fd18c2241f244dedc426c0b1ae59e7ed4f06def0a75e0a5c8651e2ce87929"
}, {
  a: "cc430c91347b22ecb1a6f1a2ceea168ffa4a9b80065bd1ec5d",
  r: "-cc430c91347b22ecb1a6f1a2ceea168ffa4a9b80065bd1ec5e"
}, {
  a: "32e4b7f82d8c037d0f562296e21b1e58a",
  r: "-32e4b7f82d8c037d0f562296e21b1e58b"
}, {
  a: "-526d3f1a904561f0cde1f0a2a4",
  r: "526d3f1a904561f0cde1f0a2a3"
}, {
  a: "3de5a9635a40539831c9665577e5eedbf680755e2065a0caa346759e17225",
  r: "-3de5a9635a40539831c9665577e5eedbf680755e2065a0caa346759e17226"
}, {
  a: "-d912828b8d6419900",
  r: "d912828b8d64198ff"
}, {
  a: "-17968ddf93",
  r: "17968ddf92"
}, {
  a: "-c2bfd766e34923d549bbaedb4d9b7bb35a61908e6144462a",
  r: "c2bfd766e34923d549bbaedb4d9b7bb35a61908e61444629"
}, {
  a: "af426ec83aaafc84a94930e51a2899696a3d",
  r: "-af426ec83aaafc84a94930e51a2899696a3e"
}, {
  a: "-283de5b9379a45f065d3b8662ac38faa6492bc0eea6b7e3b51591a5cc27669e",
  r: "283de5b9379a45f065d3b8662ac38faa6492bc0eea6b7e3b51591a5cc27669d"
}];

var error_count = 0;
for (var i = 0; i < data.length; i++) {
  var d = data[i];
  var a = BigInt.parseInt(d.a, 16);
  var r = ~a;
  if (d.r !== r.toString(16)) {
    print("Input:    " + a.toString(16));
    print("Result:   " + r.toString(16));
    print("Expected: " + d.r);
    error_count++;
  }
}
if (error_count !== 0) {
  print("Finished with " + error_count + " errors.")
  quit(1);
}
