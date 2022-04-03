"use strict";

/* * JavaScript for the file lock-selection-survey.html - Global
 *  variables, constants and functions
 *  @author Sanket Rajgarhia
 *  @date   31/03/2022 (dd/mm/yyyy)
 *  @version 1.0
 * */

/*****************************************************************************/
/* GLOBAL CONSTANTS                                                          */
/*****************************************************************************/

// A constant value to be used as a css class name for determining if an input 
// control received an invalid input which it is holding in its placeholder 
// property
const SWAP_VALUE = "swapValue";

/*****************************************************************************/
/* GLOBAL VARIABLE                                                          */
/*****************************************************************************/

// Global variables - associated with the - Next button control
let salesPersonCardNextButton = document.getElementById("sales-person-next");
let customerCardNextButton = document.getElementById("customer-next");

/*****************************************************************************/
/* WINDOWS ONLOAD                                                            */
/*****************************************************************************/

/* Anonymous function fired on window load. 
 * @param    
 * @return   
 * */
window.onload = function() {

    // Disable the Next button in salesPerson Card
    salesPersonCardNextButton.disabled = true;
    // Disable the Next button in Customer Card
    customerCardNextButton.disabled = true;

};

/*****************************************************************************/
/* HELPER FUNCTIONS                                                          */
/*****************************************************************************/

/* Helper function to provide the invalidate style for the input control. 
 * @param   {HTMLElement}   prependDiv   <div class="input-group-prepend">
 * @param   {HTMLElement}   inputGroupTextDiv  <span class="input-group-text">
 * @return   
 * */
const invalidateInputControl = (prependDiv, inputGroupTextDiv) => {

    // Add the class - prepend-invalid to the customer name prepend div
    prependDiv.classList.remove("prepend-valid");
    prependDiv.classList.add("prepend-invalid");

    // Make the input-group-text <div> transparent
    inputGroupTextDiv.classList.remove("input-group-text-opaque");
    inputGroupTextDiv.classList.add("input-group-text-transparent");

}

/* Helper function to provide the validate style for input the control. 
 * @param   {HTMLElement}   prependDiv   <div class="input-group-prepend">
 * @param   {HTMLElement}   inputGroupTextDiv  <span class="input-group-text">
 * @return   
 * */
const validateInputControl = (prependDiv, inputGroupTextDiv) => {

    // Add the class - prepend-valid to the customer name prepend div
    prependDiv.classList.remove("prepend-invalid");
    prependDiv.classList.add("prepend-valid");

    // Make the input-group-text <div> transparent
    inputGroupTextDiv.classList.remove("input-group-text-opaque");
    inputGroupTextDiv.classList.add("input-group-text-transparent");

}

/* Helper function to remove the validate and invalidate style for 
 * the input control.
 * @param   {HTMLElement}   prependDiv   <div class="input-group-prepend">
 * @param   {HTMLElement}   inputGroupTextDiv  <span class="input-group-text">
 * @return   
 * */
const resetValidation = (prependDiv, inputGroupTextDiv) => {

    // Remove the class - prepend-invalid to the customer name prepend div
    // if present
    prependDiv.classList.remove("prepend-invalid");
    // Remove the class - prepend-invalid to the customer name prepend div 
    // if present 
    prependDiv.classList.remove("prepend-valid");

    // Make the input-group-text <div> opaque
    inputGroupTextDiv.classList.remove("input-group-text-transparent");
    inputGroupTextDiv.classList.add("input-group-text-opaque");

}

/* Helper function to check if all input fields are validated.
 * @param  {HTMLElement} topLevelDivId for each card section
 * @return {boolean}    true if all fields are validated - false otherwise  
 * */
const allInputsAreValidated = (topLevelDivId) => {

    // Flag to check if all input fields were validated
    let allFieldsAreValidated = false;

    let topLevelDiv = document.getElementById(topLevelDivId);

    // Get all the div elements which have the class "input-group"
    let allInputContainerDivElements = topLevelDiv
        .getElementsByClassName("input-group");

    // Iterate over all the div elements 
    for (let containerDiv of allInputContainerDivElements) {

        // Get the div element with the class "input-group-prepend"
        // inside the container div
        let prependDiv = containerDiv
            .getElementsByClassName("input-group-prepend")[0];

        // If the container div contains the class "optional"
        // check if the input box has any value - if it does not have any
        // value - consider it to be validated
        if (containerDiv.classList.contains("optional") === true) {

            // Check if the container div has an input control
            if (containerDiv.getElementsByTagName("input").length > 0) {

                // If the length of the input value in the input control is 0
                // and the prepend div contains the class prepend-invalid
                if (containerDiv.getElementsByTagName("input")[0]
                    .value.length === 0 &&
                    prependDiv.classList.contains("prepend-invalid") === true) {
                    allFieldsAreValidated = false;
                    break;
                } else {
                    allFieldsAreValidated = true;
                    continue;
                }

            } // The container div has a textarea control
            else {

                // If the length of the textarea value in the textarea control is 0
                // and the prepend div contains the class prepend-invalid
                if (containerDiv.getElementsByTagName("textarea")[0]
                    .value.length === 0 &&
                    prependDiv.classList.contains("prepend-invalid") === true) {
                    allFieldsAreValidated = false;
                    break;
                } else {
                    allFieldsAreValidated = true;
                    continue;
                }

            }

        }

        if (prependDiv.classList.contains("prepend-valid")) {
            allFieldsAreValidated = true;
        } else {
            allFieldsAreValidated = false;
            break;
        }

    }

    return allFieldsAreValidated;

}

/*****************************************************************************/
/* END OF FILE                                                               */
/*****************************************************************************/