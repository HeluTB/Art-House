/*   Unsplash
let generateImageForm = 
    document.getElementById('generate-image-form');
let formInput = 
    document.getElementById('input-value');
let imageContainerText = 
    document.getElementById('imageContainerText');
let imageGenerated = 
    document.getElementById('generated-image');
let imageContainer = 
    document.getElementById('images-visible');
const apiKey = 'Sy88ThLZbCnE2EfO0UjdT4ydPaTi922pWnF1stnBHxg'
//const url = `https://api.unsplash.com/photos/random?query=${category}&client_id=${apiKey}`;

async function fetchImages(category) {
    try {
        let response = 
        await fetch(`https://api.unsplash.com/photos/random?query=${category}&client_id=${apiKey}`);
        if (!response.ok) {
            throw new Error('Unable to fetch the data');
        }
		let data = await response.json();
        imageContainerText.innerText = 
        "Below is your generated Image:";
        imageContainer.style.display = "block";
        imageGenerated.src = data.urls.regular;
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}

generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let enteredText = formInput.value;
    if (enteredText !== "") {
        fetchImages(enteredText);
    }
    else {
        imageContainerText.innerText = 
            "Input field can not be empty!";
    }
}) */

let generateImageForm = 
    document.getElementById('generate-image-form');
let formInput = 
    document.getElementById('input-value');
let imageContainerText = 
    document.getElementById('imageContainerText');
let imageContainer = 
    document.getElementById('images-visible');

	  
async function generateImage(prompt) {
	const apiKey = 'sk-NJA6S5wI8MfMJ03Hyro7OjlKCSBPS2FTOIq8mksbNsAohIfv';
	const engineId = 'stable-diffusion-xl-1024-v1-0'; // Replace with actual engine ID

	const url = `https://api.stability.ai/v1/generation/${engineId}/text-to-image`;
  
	const payload = {
	  cfg_scale: 7,
	  height: 1024,
	  width: 1024,
	  sampler: 'K_DPM_2_ANCESTRAL',
	  samples: 1,
	  steps: 30,
	  text_prompts: [
		{
		  text: prompt,
		  weight: 1
		}
	  ]
	};
  
	try {
	  const response = await fetch(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${apiKey}`
		},
		body: JSON.stringify(payload)
	  });
  
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	  }
  
	  const data = await response.json();
	  console.log('Success:', data);

	  imageContainerText.innerText = "Below is your generated Image:";
	  imageContainer.style.display = "block";
		
	  const artifacts = data.artifacts;
	  const base64Image = artifacts[0].base64;

	  let imageGenerated = document.querySelector('.my-generated-image');
	  imageGenerated.src = "data:image/png;base64," + base64Image;
	} catch (error) {
	  console.error('Error:', error);
	  throw error;
	}
}


generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let enteredText = formInput.value;
    if (enteredText !== "") {
        generateImage(enteredText);
    }
    else {
        imageContainerText.innerText = 
            "Input field can not be empty!";
    }
})
