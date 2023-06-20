import { fetchBreeds, fetchCatByBreed, selectBreed, errorText } from "./cat-api";

errorText.classList.add('hidden');
selectBreed.classList.add('hidden')
fetchBreeds()
errorText.classList.add('hidden');

selectBreed.addEventListener('change', () => {
    const selectedValue = selectBreed.value
    fetchCatByBreed(selectedValue);
})
