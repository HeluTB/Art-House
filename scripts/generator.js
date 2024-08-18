/*   Unsplash api
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

// stability api
// Getting references to the HTML elements
let generateImageForm = 
    document.getElementById('generate-image-form');// Form element to generate an image
let formInput = 
    document.getElementById('input-value');// Input field where the user types their prompt
let imageContainerText = 
    document.getElementById('imageContainerText');// Text element to show a message about the generated image
let imageContainer = 
    document.getElementById('images-visible');// Container to show the generated image


	  
async function generateImage(prompt) {
	const apiKey = 'sk-NJA6S5wI8MfMJ03Hyro7OjlKCSBPS2FTOIq8mksbNsAohIfv';// API key for authentication
	const engineId = 'stable-diffusion-xl-1024-v1-0'; // Engine ID for the image generation engine

	// URL for the API endpoint
	const url = `https://api.stability.ai/v1/generation/${engineId}/text-to-image`;
  
	// Payload containing the configuration for the image generation
	const payload = {
	  cfg_scale: 7,// Configuration scale
	  height: 1024,// Height of the generated image
	  width: 1024, // Width of the generated image
	  sampler: 'K_DPM_2_ANCESTRAL',// Sampler method for image generation
	  samples: 1,// Number of images to generate
	  steps: 30,// Number of steps for image generation
	  text_prompts: [
		{
		  text: prompt,// Text prompt for image generation
		  weight: 1// Weight of the prompt
		}
	  ]
	};
  
	try {
		 // Making a POST request to the image generation API
	  const response = await fetch(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json', // Content type for the request
		  'Authorization': `Bearer ${apiKey}`// Authorization header with API key
		},
		body: JSON.stringify(payload)// Converting the payload to a JSON string
	  });
  
	   // Checking if the response was successful
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);// Throw an error if the request failed
	  }
  
	  const data = await response.json();
	  console.log('Success:', data);// Logging the success response to the console

	  // Updating the UI with the generated image
	  imageContainerText.innerText = "Below is your generated Image:";
	  imageContainer.style.display = "block";
		
	 // Extracting the base64 image data from the response
	  const artifacts = data.artifacts;
	  const base64Image = artifacts[0].base64;

	  // Setting the source of the image element to the base64 image data
	  let imageGenerated = document.querySelector('.my-generated-image');
	  imageGenerated.src = "data:image/png;base64," + base64Image;
	} catch (error) {
	  console.error('Error:', error);
	  throw error;
	}
}

// Adding an event listener to the form for the 'submit' event
generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();// Preventing the default form submission behavior
    let enteredText = formInput.value;// Getting the text entered by the user
    if (enteredText !== "") {// Checking if the input is not empty
        generateImage(enteredText);// Generating the image with the entered text
    }
    else {
        imageContainerText.innerText = 
            "Input field can not be empty!";// Showing an error message if the input is empty
    }
})
