import "./style.css";
import Dropzone from "dropzone";
// Optionally, import the dropzone file to get default styling.
import "dropzone/dist/dropzone.css";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div>
<h1>Mi perfil</h1>
<div class="form">
<label for="name">Nombre:</label><br/>
<input type="text" id="name" name="name" required /><br/>
<label for="email">Bio:</label><br/>
<input type="text" id="bio" name="bio" required /><br/><br/>
<button class="foto-input">Agregar foto</button><br/><br/>
<div id="output"></div>

<button type="submit">Guardar datos</button>
</div>
<p class="read-the-docs">
Click on the Vite and TypeScript logos to learn more
</p>
</div>
`;

const myDropzone = new Dropzone(".foto-input", {
  url: "/falsa",
  autoProcessQueue: false,
});

const output = document.querySelector("#output");

myDropzone.on("thumbnail", (file) => {
  // Add an info line about the added file for each file.
  output!.innerHTML += `<div>File added: ${file.name}</div>`;
  console.log(file.dataURL);
});
