"use strict";
/**
 * @author Daniel Flockert
 */

import { chatapp } from './chatapp.js';

document.addEventListener('DOMContentLoaded', () => { 

    // Vue JS setup

    // Set username
    const data_username = document.querySelector('#data-username').innerHTML;
    chatapp.username = data_username;


});