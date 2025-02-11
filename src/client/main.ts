import "./style.css";
import Dropzone from "dropzone";
// Optionally, import the dropzone file to get default styling.
import "dropzone/dist/dropzone.css";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<form>
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
</form>
`;

const LOCALHOST = "http://localhost:3000";
let imgDataURI: string | null = null;
const myDropzone = new Dropzone(".foto-input", {
  url: "/falsa",
  autoProcessQueue: false,
  paramName: "dropzoneFile",
});

const output = document.querySelector("#output");

myDropzone.on("thumbnail", (file) => {
  // Add an info line about the added file for each file.
  output!.innerHTML += `<div>File added: ${file.name}</div>`;
  imgDataURI = file.dataURL || null;
  console.log(file.dataURL);
});

addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = (document.querySelector("#name") as HTMLInputElement).value;
  const bio = (document.querySelector("#bio") as HTMLInputElement).value;
  const imgURL = imgDataURI;
  if (!imgURL) {
    alert("Please upload an image");
    return;
  }

  const response = await fetch(`${LOCALHOST}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, bio, imgURL }),
  });

  if (response.ok) {
    alert("Profile saved successfully");
  } else {
    alert("Failed to save profile");
  }
});
