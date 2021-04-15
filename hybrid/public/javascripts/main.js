"use strict";
/**
 * @author Daniel Flockert
 */

import { chatapp } from './chatapp.js';

document.addEventListener('DOMContentLoaded', () => { 

    // Load connection data from meta elements
    let itempropElements = document.querySelectorAll('meta[itemprop]');
    for (let itemprop of itempropElements) {
        let itempropName = itemprop.getAttribute('itemprop');
        let itempropContent = itemprop.getAttribute('content');
        console.log(`${itempropName}: ${itempropContent}`);
        chatapp[itempropName] = itempropContent;
    }

    // Set username
    chatapp.username = chatapp.data_username;
    
    // Login
    chatapp.loginBtnClick();


});