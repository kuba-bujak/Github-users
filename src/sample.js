const { useState } = require("react");

function gnar() {
  const [nickname, setNickname] = useState("dude");
  return <h1>gnarly</h1>;
}

function Image() {
  return <img src="/img.png" />;
}

console.log("Test narzędzia Prettier.");
