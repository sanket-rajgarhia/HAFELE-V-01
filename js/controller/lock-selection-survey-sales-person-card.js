"use strict";

/* * JavaScript for the file lock-selection-survey.html - sales person card
 *  section.
 *  @author Sanket Rajgarhia
 *  @date   02/04/2022 (dd/mm/yyyy)
 *  @version 1.0
 * */

/*****************************************************************************/
/* GLOBAL VARIABLES                                                          */
/*****************************************************************************/

// Global variables - associated with the - Sales Person Id input control
let salesPersonIdInputPlaceholder = "";
let salesPersonIdDiv = document.getElementById("sales-person-id-div");
let salesPersonIdInput = document.getElementById("input-sales-person-id");
let salesPersonIdInvalidFeedback = salesPersonIdDiv.getElementsByClassName(
    "invalid-feedback")[0];
let salesPersonIdPrependDiv = salesPersonIdDiv.getElementsByClassName(
    "input-group-prepend")[0];
let salesPersonIdInputGroupTextDiv = salesPersonIdDiv.getElementsByClassName(
    "input-group-text")[0];

// Global variables - associated with the - Sales Person Name input control
let salesPersonNameInputPlaceholder = "";
let salesPersonNameDiv = document.getElementById("sales-person-name-div");
let salesPersonNameInput = document.getElementById("input-sales-person-name");
let salesPersonNameInvalidFeedback = salesPersonNameDiv
    .getElementsByClassName("invalid-feedback")[0];
let salesPersonNamePrependDiv = salesPersonNameDiv
    .getElementsByClassName("input-group-prepend")[0];
let salesPersonNameInputGroupTextDiv = salesPersonNameDiv
    .getElementsByClassName("input-group-text")[0];

// Global variables - associated with the - Sales Person Location text area 
// control
let salesPersonLocationTextAreaPlaceholder = "";
let salesPersonLocationDiv = document.getElementById(
    "sales-person-location-div");
let salesPersonLocationTextArea = document.getElementById(
    "input-sales-person-info");
let salesPersonLocationInvalidFeedback = salesPersonLocationDiv
    .getElementsByClassName("invalid-feedback")[0];
let salesPersonLocationPrependDiv = salesPersonLocationDiv
    .getElementsByClassName("input-group-prepend")[0];
let salesPersonLocationTextAreaGroupTextDiv = salesPersonLocationDiv
    .getElementsByClassName("input-group-text")[0];

/*****************************************************************************/
/* EVENT LISTENER - CALLBACKS                                                */
/*****************************************************************************/

/* The callback function fired on 'get focus' - for sales person 
 * id input control. 
 * @param    
 * @return   
 * */
const resetSalesPersonIdInputOnGetFocus = () => {

    // Preserve the original placeholder text - the first time the control 
    // gets focus.
    // The salesPersonIdInputPlaceholder variable will be empty - the first time
    // control gets focus
    if (salesPersonIdInputPlaceholder.length === 0) {
        salesPersonIdInputPlaceholder = salesPersonIdInput.placeholder;
    }

    // If the sales person id input control has the class SWAP_VALUE 
    // attached - it means that an incorrect value was entered in the field
    // the last time the control had focus.
    if (salesPersonIdInput.classList.contains(SWAP_VALUE) === true) {

        // Remove the class SWAP_VALUE - as the user is preparing to re-enter
        // a valid value
        salesPersonIdInput.classList.remove(SWAP_VALUE);

        // Set the value of the input control to the placeholder value.
        // The erroneous/invalid value was preserved in the placeholder 
        // value - the last time input control lost focus.
        salesPersonIdInput.value = salesPersonIdInput.placeholder;

        // Set the placeholder value of the input control to the original
        // placeholder value of the field.
        salesPersonIdInput.placeholder = salesPersonIdInputPlaceholder;

        // Select the value set in the input field
        salesPersonIdInput.select();

    }

    // Reset all validation related classes
    resetValidation(salesPersonIdPrependDiv, salesPersonIdInputGroupTextDiv);

    // Refresh to original state of the container div
    salesPersonIdDiv.classList.remove("was-validated");

}

/* The callback function fired on 'blur' - for sales person id input control.
 * @param    
 * @return   
 * */
const validateSalesPersonIdInputOnBlur = () => {

    // Check for white spaces
    if (salesPersonIdInput.value.trim().length === 0) {

        // White spaces are present - reset the value to be empty
        salesPersonIdInput.value = "";

        // Update the invalid feedback message
        salesPersonIdInvalidFeedback.innerHTML = "Sales Person ID cannot " +
            "be blank.";

        invalidateInputControl(salesPersonIdPrependDiv,
            salesPersonIdInputGroupTextDiv);

    } // Check for the length of the id to be not more than 50 characters
    else if (salesPersonIdInput.value.trim().length > 50) {

        // Update the placeholder to display the erroneous/invalid 
        // entered value and reset the input value to blank to invalidate the 
        // input control
        salesPersonIdInput.placeholder = salesPersonIdInput.value;
        salesPersonIdInput.value = "";

        // Update the invalid feedback message
        salesPersonIdInvalidFeedback.innerHTML = "Sales Person ID cannot " +
            " contain more than 50 characters.";

        // Add the SWAP_VALUE class to the sales person id input control
        salesPersonIdInput.classList.add(SWAP_VALUE);

        invalidateInputControl(salesPersonIdPrependDiv,
            salesPersonIdInputGroupTextDiv);


    } else // Passed all validation checks
    {
        validateInputControl(salesPersonIdPrependDiv,
            salesPersonIdInputGroupTextDiv);
    }

    salesPersonIdDiv.classList.add("was-validated");

    // Enable/Disable the navigation button(s)
    if (allInputsAreValidated("sale-person-information-capture") === true) {
        salesPersonCardNextButton.disabled = false;
    } else {
        salesPersonCardNextButton.disabled = true;
    }

}

/* The callback function fired on 'get focus' - for sales person 
 * name input control. 
 * @param    
 * @return   
 * */
const resetSalesPersonNameInputOnGetFocus = () => {

    // Preserve the original placeholder text - the first time the control 
    // gets focus.
    // The salesPersonNameInputPlaceholder variable will be empty - the first time
    // control gets focus
    if (salesPersonNameInputPlaceholder.length === 0) {
        salesPersonNameInputPlaceholder = salesPersonNameInput.placeholder;
    }

    // If the sales person name input control has the class SWAP_VALUE 
    // attached - it means that an incorrect value was entered in the field
    // the last time the control had focus.
    if (salesPersonNameInput.classList.contains(SWAP_VALUE) === true) {

        // Remove the class SWAP_VALUE - as the user is preparing to re-enter
        // a valid value
        salesPersonNameInput.classList.remove(SWAP_VALUE);

        // Set the value of the input control to the placeholder value.
        // The erroneous/invalid value was preserved in the placeholder 
        // value - the last time input control lost focus.
        salesPersonNameInput.value = salesPersonNameInput.placeholder;

        // Set the placeholder value of the input control to the original
        // placeholder value of the field.
        salesPersonNameInput.placeholder = salesPersonNameInputPlaceholder;

        // Select the value set in the input field
        salesPersonNameInput.select();

    }

    // Reset all validation related classes
    resetValidation(salesPersonNamePrependDiv, salesPersonNameInputGroupTextDiv);

    // Refresh to original state of the container div
    salesPersonNameDiv.classList.remove("was-validated");

}

/* The callback function fired on 'blur' - for sales person name input control.
 * @param    
 * @return   
 * */
const validateSalesPersonNameInputOnBlur = () => {

    // Check for white spaces
    if (salesPersonNameInput.value.trim().length === 0) {

        // White spaces are present - reset the value to be empty
        salesPersonNameInput.value = "";

        // Update the invalid feedback message
        salesPersonNameInvalidFeedback.innerHTML = "Sales Person name cannot " +
            "be blank.";

        invalidateInputControl(salesPersonNamePrependDiv,
            salesPersonNameInputGroupTextDiv);

    } // Check for the length of the name to be not more than 50 characters
    else if (salesPersonNameInput.value.trim().length > 50) {

        // Update the placeholder to display the erroneous/invalid 
        // entered value and reset the input value to blank to invalidate the 
        // input control
        salesPersonNameInput.placeholder = salesPersonNameInput.value;
        salesPersonNameInput.value = "";

        // Update the invalid feedback message
        salesPersonNameInvalidFeedback.innerHTML = "Name cannot contain more " +
            "than 50 characters.";

        // Add the SWAP_VALUE class to the sales person name input control
        salesPersonNameInput.classList.add(SWAP_VALUE);

        invalidateInputControl(salesPersonNamePrependDiv,
            salesPersonNameInputGroupTextDiv);


    } else // Passed all validation checks
    {
        validateInputControl(salesPersonNamePrependDiv,
            salesPersonNameInputGroupTextDiv);
    }

    salesPersonNameDiv.classList.add("was-validated");

    // Enable/Disable the navigation button(s)
    if (allInputsAreValidated("sale-person-information-capture") === true) {
        salesPersonCardNextButton.disabled = false;
    } else {
        salesPersonCardNextButton.disabled = true;
    }

}

/* The callback function fired on 'get focus' - for sales person 
 * location textarea control.
 * @param    
 * @return   
 * */
const resetSalesPersonLocationTextAreaOnGetFocus = () => {

    // Remove the required attribute - if present
    salesPersonLocationTextArea.removeAttribute("required", "");

    // Preserve the original placeholder text - the first time the control 
    // gets focus.
    // The salesPersonLocationTextAreaPlaceholder variable will be empty 
    // the first time control gets focus
    if (salesPersonLocationTextAreaPlaceholder.length === 0) {
        salesPersonLocationTextAreaPlaceholder = salesPersonLocationTextArea
            .placeholder;
    }

    // If the customer Information TextArea control has the class SWAP_VALUE 
    // attached - it means that an incorrect value was entered in the field
    // the last time the control had focus.
    if (salesPersonLocationTextArea.classList.contains(SWAP_VALUE) === true) {

        // Remove the class SWAP_VALUE - as the user is preparing to re-enter
        // a valid value
        salesPersonLocationTextArea.classList.remove(SWAP_VALUE);

        // Set the value of the textarea control to the placeholder value.
        // The erroneous/invalid value was preserved in the placeholder 
        // value - the last time textarea control lost focus.
        salesPersonLocationTextArea.value = salesPersonLocationTextArea
            .placeholder;

        // Set the placeholder value of the textarea control to the original
        // placeholder value of the field.
        salesPersonLocationTextArea.placeholder =
            salesPersonLocationTextAreaPlaceholder;

        // Select the value set in the textarea field
        salesPersonLocationTextArea.select();

    }

    // Reset all validation related classes
    resetValidation(salesPersonLocationPrependDiv,
        salesPersonLocationTextAreaGroupTextDiv);

    // Refresh to original state of the container div
    salesPersonLocationDiv.classList.remove("was-validated");

}

/* The callback function fired on 'blur' - for sales person
 * textarea control.
 * @param    
 * @return   
 * */
const validateSalesPersonLocationTextAreaOnBlur = () => {

    // Check for white spaces
    if (salesPersonLocationTextArea.value.trim().length === 0) {

        // White spaces are present - reset the value to be empty
        salesPersonLocationTextArea.value = "";

        // Update the invalid feedback message
        salesPersonLocationInvalidFeedback.innerHTML = "";

        validateInputControl(salesPersonLocationPrependDiv,
            salesPersonLocationTextAreaGroupTextDiv);

    } // Check for the length of the info to be not more than 250 characters
    else if (salesPersonLocationTextArea.value.trim().length > 150) {

        // Set the required attribute
        salesPersonLocationTextArea.setAttribute("required", "");

        // Update the placeholder to display the erroneous/invalid
        // entered value and reset the textarea value to blank to invalidate the
        // textarea control
        salesPersonLocationTextArea.placeholder = salesPersonLocationTextArea.value;
        salesPersonLocationTextArea.value = "";

        // Update the invalid feedback message
        salesPersonLocationInvalidFeedback.innerHTML = "Sales " +
            "Person location cannot contain more than 150 characters.";

        // Add the SWAP_VALUE class to the customer Information textarea control
        salesPersonLocationTextArea.classList.add(SWAP_VALUE);

        invalidateInputControl(salesPersonLocationPrependDiv,
            salesPersonLocationTextAreaGroupTextDiv);


    } else // Passed all validation checks
    {
        validateInputControl(salesPersonLocationPrependDiv,
            salesPersonLocationTextAreaGroupTextDiv);
    }

    salesPersonLocationDiv.classList.add("was-validated");

    // Enable/Disable the navigation button(s)
    if (allInputsAreValidated("sale-person-information-capture") === true) {
        salesPersonCardNextButton.disabled = false;
    } else {
        salesPersonCardNextButton.disabled = true;
    }

}

/*****************************************************************************/
/* REGISTER EVENT LISTENERS                                                  */
/*****************************************************************************/

// Event listeners registered for the Sales Person ID input control
salesPersonIdInput.addEventListener(
    "blur", validateSalesPersonIdInputOnBlur);
salesPersonIdInput.addEventListener(
    "focus", resetSalesPersonIdInputOnGetFocus);

// Event listeners registered for the Sales Person Name input control
salesPersonNameInput.addEventListener(
    "blur", validateSalesPersonNameInputOnBlur);
salesPersonNameInput.addEventListener(
    "focus", resetSalesPersonNameInputOnGetFocus);

// Event listeners registered for the Sales Person Location text area control
salesPersonLocationTextArea.addEventListener("blur",
    validateSalesPersonLocationTextAreaOnBlur);
salesPersonLocationTextArea.addEventListener("focus",
    resetSalesPersonLocationTextAreaOnGetFocus);

/*****************************************************************************/
/* END OF FILE                                                               */
/*****************************************************************************/