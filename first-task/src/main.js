import { buildCanvas, explodeCube } from "./canvas.js";
import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
    <div class="container">
      <h1>Enter the cube dimensions:</h1>
      <div class="formWrapper">
        <form class='form' autoComplete="off" name="cube dimensions">
          <div class="wrapper">
            <input
              class="input"
              type="number"
              name="x"
              placeholder="X axis"
              min='1'
              max='100'
              required
              value='2'
            />
            <input
              class="input"
              type="number"
              name="y"
              placeholder="Y axis"
              min='1'
              max='100'
              required
              value='2'
            />
            <input
              class="input"
              type="number"
              name="z"
              placeholder="Z axis"
              min='1'
              max='100'
              required
              value='2'
            />
          </div>
          <input type="checkbox" name='isWireframeEnabled'>Wireframe</input>
          <button
            class="btn"
          >
            Render cube
          </button>
          </form>
          <div id="button-wrapper">
            <button
              class="btn explode hidden"
              type="submit"
            >
              Explode cube
            </button>    
          </div>
      </div>
    </div>
    <canvas class="webgl"></canvas>
`;

const form = document.querySelector("form");
const canvas = document.querySelector("canvas.webgl");
const buttonWrapper = document.querySelector(".explode");

buttonWrapper.addEventListener("click", () => {
  explodeCube();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const cubeParams = {};
  for (const [name, value] of data) {
    cubeParams[name] = value;
  }

  buildCanvas(canvas, cubeParams);
  buttonWrapper.classList.remove("hidden");
});
