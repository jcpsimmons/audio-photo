import React, { useEffect } from "react";
import * as Tone from "tone";

// create synth route to master
const synth = new Tone.Synth().toMaster();

export default function Magic() {
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  const loadImageToCanvas = () => {
    let canvas = document.getElementById("viewport");

    let ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "img/profilepic.png";

    img.onload = () => {
      //  once image loads - draw it to canvas
      ctx.drawImage(img, 0, 0);
      canvas.style.width = `${img.width}px`;
      canvas.style.height = `${img.height}px`;

      // get the pixel data
      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      let totalPixelsCounted = 0;

      let greyPixelData = [];

      // convert to greyscale
      var i;
      for (i = 0; i < imageData.data.length; i += 4) {
        let avg =
          (imageData.data[i] +
            imageData.data[i + 1] +
            imageData.data[i + 2] +
            imageData.data[i + 3]) /
          4;
        imageData.data[i] = avg;
        imageData.data[i + 1] = avg;
        imageData.data[i + 2] = avg;
        imageData.data[i + 3] = avg;

        greyPixelData.push(avg);
      }
      ctx.putImageData(imageData, 0, 0);

      console.log("totalPixelsCounted :>> ", totalPixelsCounted);

      greyPixelData.map((pixel, index) => {
        // scale number
        let note = scale(pixel, 0, 255, 300, 2000);

        let percent = setTimeout(() => {
          // synth.triggerAttackRelease(note, ".1");
        }, index * 110);
      });
    };
  };

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const modX = e.pageX - rect.left;
    const modY = e.pageY - rect.top;

    if (modX > 0 && modY > 0 && e.pageY < rect.bottom && e.pageX < rect.right) {
      console.log("modX, modY", modX, modY);

      let canvas = document.getElementById("viewport");
      let ctx = canvas.getContext("2d");
      console.log(ctx.getImageData(modX, modY, modX + 1, modY + 1));
    }
  };

  useEffect(() => {
    loadImageToCanvas();
  }, []);

  return (
    <div>
      <h1>asdfasdf</h1>
      <canvas onClick={handleClick} id="viewport"></canvas>
      <p>asdfa</p>
    </div>
  );
}
