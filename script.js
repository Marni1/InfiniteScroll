const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

console.log(imageContainer)
let photosArray = []
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//Unsplash API
const count = 30;
const apiKey = 'YOUR API KEY' //https://unsplash.com/documentation#getting-started
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Check if images loaded and ready 
function imageLoad() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true
    }
}


//Helper Function to set atrtributes

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }

}


//Create elemntss for link& photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoad)
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}

// Get photos from Unsplash API//
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch Error here
    }
}
//CHECK to see if scrollin near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos();
    }
})

getPhotos();