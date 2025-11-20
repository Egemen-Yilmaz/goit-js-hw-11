import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

const key = "53317222-33ad4c1be86b2938ae2a211ff";

function fetchImages(searchTerm) {

    const URL = `https://pixabay.com/api/?key=${key}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then((data) => {
            if (data.hits.length === 0) {
                throw new Error("No images found");
            }
            return data.hits;
        })
        
    }

form.addEventListener("submit", onSearch);

function onSearch(event) {
    event.preventDefault();

    const searchTerm = event.currentTarget.elements.searchQuery.value.trim();

    if (searchTerm === "") {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query.',
            position: 'topRight'
        });
        return;
    }

    gallery.innerHTML = "";
    loader.style.display = "block";
    
    fetchImages(searchTerm)
    .then(images => {
        const markup = images.map(createImageCardMarkup).join("");

        gallery.insertAdjacentHTML("beforeend", markup)

        lightbox.refresh();
    })
    .catch((error) => {

        if (error.message == "No images found") {
            iziToast.error({
                title: 'Error',
                message: "Sorry, there are no images matching your search query. Please, try again!",
                position: 'topRight'
            });
        } else {
            iziToast.error({
                title: 'Error',
                message: `An API error occurred: ${error.message}`,
                position: 'topRight'
            });
        }
    })
    .finally(() => {
        loader.style.display = "none";
    });


    event.currentTarget.reset();
}


function createImageCardMarkup(image) {
    const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
    } = image;

    return `
    <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            <div class="info-box">
                <p class="info-item"><b>Likes</b>${likes}</p>
                <p class="info-item"><b>Views</b>${views}</p>
                <p class="info-item"><b>Comments</b>${comments}</p>
                <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
        </a>
    </li>
    `;
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});