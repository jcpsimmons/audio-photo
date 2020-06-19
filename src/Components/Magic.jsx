import React, { useEffect } from "react";
import * as Tone from "tone";

// create synth route to master
const synth = new Tone.Synth().toMaster();

export default function Magic() {
  const loadImageToCanvas = () => {
    let canvas = document.getElementById("viewport");

    let ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "img/profilepic.png";

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      canvas.style.width = `${img.width}px`;
      canvas.style.height = `${img.height}px`;

      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      for (let j = 0; j < img.height; j++) {
        for (let i = 0; i < img.width; i++) {
          let index = i * 4 * imageData.width + j * 4;
          let red = imageData.data[index];
          let green = imageData.data[index + 1];
          let blue = imageData.data[index + 2];
          let alpha = imageData.data[index + 3];
          let average = (red + green + blue) / 3;
          imageData.data[index] = average;
          imageData.data[index + 1] = average;
          imageData.data[index + 2] = average;
          imageData.data[index + 3] = alpha;

          console.log("average :>> ", average);
        }
      }
    };
  };

  useEffect(() => {
    synth.triggerAttackRelease("C4", "4n");

    loadImageToCanvas();
  }, []);

  return (
    <div>
      <h1>asdfasdf</h1>
      <div id="myCanvas">
        <canvas id="viewport"></canvas>
      </div>
      <p>asdfa</p>
    </div>
  );
}
