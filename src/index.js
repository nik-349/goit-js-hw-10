import './css/styles.css';
const Handlebars = require("handlebars");
import debounce from 'lodash.debounce';
import countryListTpl from './templates/countries_list.hbs';
import countryInfoTpl from "./templates/country_info.hbs";
import {fetchCountries} from "./fetch/api"

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const refs = {
    inputEl: document.querySelector(`[id="search-box"]`),
    listEl: document.querySelector(".country-list"),
    infoEl: document.querySelector(".country-info")
}

refs.inputEl.addEventListener("input", debounce(onSearchCountries,DEBOUNCE_DELAY) );

function onSearchCountries (event) {

    const nameOfCountryForSearch = event.target.value.trim();
    
    clearList();

    fetchCountries(nameOfCountryForSearch)
        .then(onDisplayCountries)
            .catch(onFetchError);
    
}

function onDisplayCountries (data) {
    let dataLength = data.length;    
    
    if (1 < dataLength && dataLength < 10) {
        refs.listEl.insertAdjacentHTML("beforeend", countryListTpl(data))
    } else if ( dataLength === 1) {
        refs.infoEl.insertAdjacentHTML("beforeend", countryInfoTpl(data) )
    } else {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
}

function clearList() {
    refs.listEl.innerHTML = '';
    refs.infoEl.innerHTML = '';
}

function onFetchError(error) {
    Notify.failure('Oops, there is no country with that name');
}
    
    
