import Notiflix from 'notiflix';

export const selectBreed = document.querySelector(".breed-select");
export const errorText = document.querySelector(".error");

const loaderText = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");

const API_KEY = 'live_D6jugGRROa5bEjJ3vZpDj7nDnffFN10aPT1airKpBbRgLxdpe782AZmmNQJyJxew'
const arrayId = [];
let render = [];

import SlimSelect from 'slim-select'

export function fetchBreeds() {
    const API_URL = `api.thecatapi.com/v1/breeds`
    fetch(`https://${API_URL}?` + new URLSearchParams({
        api_key: API_KEY,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }))
        .then(response => response.json())
        .then(data => {
            render = data;
            // console.log(render);
            for (let value of render) {
                arrayId.push(value.id)
            }
            for (let i = 0; i < arrayId.length; i++) {
                let optionElement = document.createElement("option");
                optionElement.text = arrayId[i];
                selectBreed.add(optionElement);
            }
            configureSlimSelect();
            // console.log(arrayId)
            // catInfo.innerHTML = JSON.stringify(render)
            loaderText.classList.add('hidden');
            selectBreed.classList.remove('hidden');

        })
        .catch(() => {
            loaderText.classList.add('hidden');
            Notiflix.Notify.failure(errorText);
            // errorText.classList.remove('hidden');
        })
}

function configureSlimSelect() {
    const breedSelect = new SlimSelect({
        select: '.breed-select',
        data: render.map(breed => ({ text: breed.id, value: breed.id })),
        settings: {
            placeholderText: 'Raza',
            allowDeselect: true,
        }
    });
    // catInfo.classList.add('hidden');// Ocultar inicialmente el catInfo

    // breedSelect.onChange(() => {
    //     if (breedSelect.selected()) {
    //         catInfo.classList.remove('hidden'); // Mostrar el catInfo cuando hay una selección
    //     } else {
    //         catInfo.classList.add('hidden');// Ocultar inicialmente el catInfo
    //     }
    // });
}

export function fetchCatByBreed(breedId) {
    // console.log(breedId)
    loaderText.classList.remove('hidden');
    catInfo.classList.add('hidden');
    const API_URL = `api.thecatapi.com/v1/images/search`
    fetch(`https://${API_URL}?` + new URLSearchParams({
        api_key: API_KEY,
        breed_ids: `${breedId}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }))
        .then(response => response.json())
        .then(data => {
            render = data;
            // console.log(render);
            let name;
            let raza;
            let description;
            let temperamento;
            let imgUrl;
            for (let value of render) {
                const array = value.breeds;
                array.filter(element => {
                    // console.log(element.name)
                    name = element.name
                    raza = element.id
                    description = element.description
                    temperamento = element.temperament

                });
                imgUrl = value.url

            }
            loaderText.classList.add('hidden');
            catInfo.classList.remove('hidden');
            catInfo.innerHTML = '';
            catInfo.innerHTML += `
                <img src="${imgUrl}">
                <h1 class = "nombre">${name}</h1>
                <p class = "raza"> <b>Raza:</b> ${raza}</p> 
                <p class = "descrip"> <b>Descripción:</b> ${description}</p>
                <p class = "temperamento"> <b>Temperamento:</b> ${temperamento}</p>`;
        })
        .catch(() => {
            Notiflix.Notify.failure(errorText)
            loaderText.classList.add('hidden');
            // errorText.classList.remove('hidden');
        })
}


