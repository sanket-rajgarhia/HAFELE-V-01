"use strict";

/* * JavaScript for the file lock-selection-survey.html - customer card
 *  section.
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
/* GLOBAL VARIABLES                                                          */
/*****************************************************************************/

// Global variables - associated with the - Customer Name input control
let customerNameInputPlaceholder = "";
let customerNameDiv = document.getElementById("customer-name-div");
let customerNameInput = document.getElementById("input-customer-name");
let customerNameInvalidFeedback = customerNameDiv
    .getElementsByClassName("invalid-feedback")[0];
let customerNamePrependDiv = customerNameDiv
    .getElementsByClassName("input-group-prepend")[0];
let customerNameInputGroupTextDiv = customerNameDiv
    .getElementsByClassName("input-group-text")[0];

// Global variables - associated with the - Customer Mobile input control
let customerMobileInputPlaceholder = "";
let customerMobileDiv = document.getElementById("customer-mobile-div");
let customerMobileInput = document.getElementById("input-customer-mobile");
let customerMobileInvalidFeedback = customerMobileDiv
    .getElementsByClassName("invalid-feedback")[0];
let customerMobilePrependDiv = customerMobileDiv
    .getElementsByClassName("input-group-prepend")[0];
let customerMobileInputGroupTextDiv = customerMobileDiv
    .getElementsByClassName("input-group-text")[0];

// Global variables - associated with the - Customer Address1 input control
let customerAddress1InputPlaceholder = "";
let customerAddress1Div = document.getElementById("customer-address1-div");
let customerAddress1Input = document.getElementById("input-customer-address1");
let customerAddress1InvalidFeedback = customerAddress1Div
    .getElementsByClassName("invalid-feedback")[0];
let customerAddress1PrependDiv = customerAddress1Div
    .getElementsByClassName("input-group-prepend")[0];
let customerAddress1InputGroupTextDiv = customerAddress1Div
    .getElementsByClassName("input-group-text")[0];

// Global variables - associated with the - Customer Address2 input control
let customerAddress2InputPlaceholder = "";
let customerAddress2Div = document.getElementById("customer-address2-div");
let customerAddress2Input = document.getElementById("input-customer-address2");
let customerAddress2InvalidFeedback = customerAddress2Div
    .getElementsByClassName("invalid-feedback")[0];
let customerAddress2PrependDiv = customerAddress2Div
    .getElementsByClassName("input-group-prepend")[0];
let customerAddress2InputGroupTextDiv = customerAddress2Div
    .getElementsByClassName("input-group-text")[0];

// Global variables - associated with the - Customer Address3 input control
let customerAddress3InputPlaceholder = "";
let customerAddress3Div = document.getElementById("customer-address3-div");
let customerAddress3Input = document.getElementById("input-customer-address3");
let customerAddress3InvalidFeedback = customerAddress3Div
    .getElementsByClassName("invalid-feedback")[0];
let customerAddress3PrependDiv = customerAddress3Div
    .getElementsByClassName("input-group-prepend")[0];
let customerAddress3InputGroupTextDiv = customerAddress3Div
    .getElementsByClassName("input-group-text")[0];

// Global variables - associated with the - Next button control
let customerCardNextButton = document.getElementById("customer-next");

/*****************************************************************************/
/* WINDOWS ONLOAD                                                            */
/*****************************************************************************/

/* Anonymous function fired on window load. 
 * @param    
 * @return   
 * */
window.onload = function() {

    // Disable the Next button in Customer Card
    customerCardNextButton.disabled = true;

};

/*****************************************************************************/
/* EVENT LISTENER - CALLBACKS                                                */
/*****************************************************************************/

/* The callback function fired on 'get focus' - for customer 
 * name input control. 
 * @param    
 * @return   
 * */
const resetCustomerNameInputOnGetFocus = () => {

    // Preserve the original placeholder text - the first time the control 
    // gets focus.
    // The customerNameInputPlaceholder variable will be empty - the first time
    // control gets focus
    if (customerNameInputPlaceholder.length === 0) {
        customerNameInputPlaceholder = customerNameInput.placeholder;
    }

    // If the customer name input control has the class SWAP_VALUE 
    // attached - it means that an incorrect value was entered in the field
    // the last time the control had focus.
    if (customerNameInput.classList.contains(SWAP_VALUE) === true) {

        // Remove the class SWAP_VALUE - as the user is preparing to re-enter
        // a valid value
        customerNameInput.classList.remove(SWAP_VALUE);

        // Set the value of the input control to the placeholder value.
        // The erroneous/invalid value was preserved in the placeholder 
        // value - the last time input control lost focus.
        customerNameInput.value = customerNameInput.placeholder;

        // Set the placeholder value of the input control to the original
        // placeholder value of the field.
        customerNameInput.placeholder = customerNameInputPlaceholder;

        // Select the value set in the input field
        customerNameInput.select();

    }

    // Reset all validation related classes
    resetValidation(customerNamePrependDiv, customerNameInputGroupTextDiv);

    // Refresh to original state of the container div
    customerNameDiv.classList.remove("was-validated");

}

/* The callback function fired on 'blur' - for customer name input control.
 * @param    
 * @return   
 * */
const validateCustomerNameInputOnBlur = () => {

    // Check for white spaces
    if (customerNameInput.value.trim().length === 0) {

        // White spaces are present - reset the value to be empty
        customerNameInput.value = "";

        // Update the invalid feedback message
        customerNameInvalidFeedback.innerHTML = "Customer name cannot " +
            "be blank.";

        invalidateInputControl(customerNamePrependDiv,
            customerNameInputGroupTextDiv);

    } // Check for the length of the name to be not more than 50 characters
    else if (customerNameInput.value.trim().length > 50) {

        // Update the placeholder to display the erroneous/invalid 
        // entered value and reset the input value to blank to invalidate the 
        // input control
        customerNameInput.placeholder = customerNameInput.value;
        customerNameInput.value = "";

        // Update the invalid feedback message
        customerNameInvalidFeedback.innerHTML = "Name cannot contain more " +
            "than 50 characters.";

        // Add the SWAP_VALUE class to the customer name input control
        customerNameInput.classList.add(SWAP_VALUE);

        invalidateInputControl(customerNamePrependDiv,
            customerNameInputGroupTextDiv);


    } else // Passed all validation checks
    {
        validateInputControl(customerNamePrependDiv,
            customerNameInputGroupTextDiv);
    }

    customerNameDiv.classList.add("was-validated");

    // Enable/Disable the navigation button(s)
    if (allInputsAreValidated() === true) {
        customerCardNextButton.disabled = false;
    } else {
        customerCardNextButton.disabled = true;
    }

}

/* The callback function fired on 'get focus' - for customer 
 * mobile input control.
 * @param    
 * @return   
 * */
const resetCustomerMobileInputOnGetFocus = () => {

    // Preserve the original placeholder text - the first time the control
    // gets focus.
    // The customerMobileInputPlaceholder variable will be empty 
    // the first time control gets focus
    if (customerMobileInputPlaceholder.length === 0) {
        customerMobileInputPlaceholder = customerMobileInput.placeholder;
    }

    // If the customer mobile input control has the class SWAP_VALUE 
    // attached - it means that an incorrect value was entered in the field
    // the last time the control had focus.
    if (customerMobileInput.classList.contains(SWAP_VALUE) === true) {

        // Remove the class SWAP_VALUE - as the user is preparing to re-enter
        // a valid value
        customerMobileInput.classList.remove(SWAP_VALUE);

        // Set the value of the input control to the placeholder value.
        // The erroneous/invalid value was preserved in the placeholder 
        // value - the last time input control lost focus.
        customerMobileInput.value = customerMobileInput.placeholder;

        // Set the placeholder value of the input control to the original
        // placeholder value of the field.
        customerMobileInput.placeholder = customerMobileInputPlaceholder;

        // Select the value set in the input field
        customerMobileInput.select();

    }

    // Reset all validation related classes
    resetValidation(customerMobilePrependDiv, customerMobileInputGroupTextDiv);

    // Refresh to original state of the container div
    customerMobileDiv.classList.remove("was-validated");

}

/* The callback function fired on 'blur' - for customer mobile input control. 
 * @param    
 * @return   
 * */
const validateCustomerMobileInputOnBlur = () => {

    // Check for white spaces
    if (customerMobileInput.value.trim().length === 0) {

        // White spaces are present - reset the value to be empty
        customerMobileInput.value = "";

        // Update the invalid feedback message
        customerMobileInvalidFeedback.innerHTML = "Mobile number cannot " +
            "be blank.";

        invalidateInputControl(customerMobilePrependDiv,
            customerMobileInputGroupTextDiv);

    } // Check for the length of the mobile no. to be exactly 10 characters
    // and contains only numeric digits starting with a 0
    else if (customerMobileInput.value.trim().length < 10 ||
        customerMobileInput.value.trim().length > 10 ||
        isNaN(parseInt(customerMobileInput.value.trim())) === true ||
        String("0" + parseInt(customerMobileInput.value.trim())) !==
        customerMobileInput.value.trim()) {

        // Update the placeholder to display the erroneous/invalid 
        // entered value and reset the input value to blank to invalidate the 
        // input control
        customerMobileInput.placeholder = customerMobileInput.value;
        customerMobileInput.value = "";

        // Update the invalid feedback message
        customerMobileInvalidFeedback.innerHTML = "Mobile No. must contain " +
            "10 digits, starting with a 0."

        // Add the SWAP_VALUE class to the customer mobile input control
        customerMobileInput.classList.add(SWAP_VALUE);

        invalidateInputControl(customerMobilePrependDiv,
            customerMobileInputGroupTextDiv);

    } else // Passed all validation checks
    {
        validateInputControl(customerMobilePrependDiv,
            customerMobileInputGroupTextDiv);

    }

    customerMobileDiv.classList.add("was-validated");

    // Enable/Disable the navigation button(s)
    if (allInputsAreValidated() === true) {
        customerCardNextButton.disabled = false;
    } else {
        customerCardNextButton.disabled = true;
    }

}

/* The callback function fired on 'get focus' - for customer 
 * Address1 input control.
 * @param    
 * @return   
 * */
const resetCustomerAddress1InputOnGetFocus = () => {

    // Preserve the original placeholder text - the first time the control 
    // gets focus.
    // The customerAddress1InputPlaceholder variable will be empty 
    // the first time
    // control gets focus
    if (customerAddress1InputPlaceholder.length === 0) {
        customerAddress1InputPlaceholder = customerAddress1Input.placeholder;
    }

    // If the customer Address1 input control has the class SWAP_VALUE 
    // attached - it means that an incorrect value was entered in the field
    // the last time the control had focus.
    if (customerAddress1Input.classList.contains(SWAP_VALUE) === true) {

        // Remove the class SWAP_VALUE - as the user is preparing to re-enter
        // a valid value
        customerAddress1Input.classList.remove(SWAP_VALUE);

        // Set the value of the input control to the placeholder value.
        // The erroneous/invalid value was preserved in the placeholder 
        // value - the last time input control lost focus.
        customerAddress1Input.value = customerAddress1Input.placeholder;

        // Set the placeholder value of the input control to the original
        // placeholder value of the field.
        customerAddress1Input.placeholder = customerAddress1InputPlaceholder;

        // Select the value set in the input field
        customerAddress1Input.select();

    }

    // Reset all validation related classes
    resetValidation(customerAddress1PrependDiv,
        customerAddress1InputGroupTextDiv);

    // Refresh to original state of the container div
    customerAddress1Div.classList.remove("was-validated");

}

/* The callback function fired on 'blur' - for customer Address1 input control.
 * @param    
 * @return   
 * */
const validateCustomerAddress1InputOnBlur = () => {

    // Check for white spaces
    if (customerAddress1Input.value.trim().length === 0) {

        // White spaces are present - reset the value to be empty
        customerAddress1Input.value = "";

        // Update the invalid feedback message
        customerAddress1InvalidFeedback.innerHTML = "Address cannot be blank.";

        invalidateInputControl(customerAddress1PrependDiv,
            customerAddress1InputGroupTextDiv);

    } // Check for the length of the Address1 to be not more than 50 characters
    else if (customerAddress1Input.value.trim().length > 50) {

        // Update the placeholder to display the erroneous/invalid
        // entered value and reset the input value to blank to invalidate the
        // input control
        customerAddress1Input.placeholder = customerAddress1Input.value;
        customerAddress1Input.value = "";

        // Update the invalid feedback message
        customerAddress1InvalidFeedback.innerHTML = "Address Line 1 cannot " +
            "contain more than 50 characters.";

        // Add the SWAP_VALUE class to the customer Address1 input control
        customerAddress1Input.classList.add(SWAP_VALUE);

        invalidateInputControl(customerAddress1PrependDiv,
            customerAddress1InputGroupTextDiv);


    } else // Passed all validation checks
    {
        validateInputControl(customerAddress1PrependDiv,
            customerAddress1InputGroupTextDiv);
    }

    customerAddress1Div.classList.add("was-validated");

    // Enable/Disable the navigation button(s)
    if (allInputsAreValidated() === true) {
        customerCardNextButton.disabled = false;
    } else {
        customerCardNextButton.disabled = true;
    }

}

/* The callback function fired on 'get focus' - for customer 
 * Address2 input control.
 * @param    
 * @return   
 * */
const resetCustomerAddress2InputOnGetFocus = () => {

    // Remove the required attribute - if present
    customerAddress2Input.removeAttribute("required", "");

    // Preserve the original placeholder text - the first time the control 
    // gets focus.
    // The customerAddress2InputPlaceholder variable will be empty 
    // the first time
    // control gets focus
    if (customerAddress2InputPlaceholder.length === 0) {
        customerAddress2InputPlaceholder = customerAddress2Input.placeholder;
    }

    // If the customer Address2 input control has the class SWAP_VALUE 
    // attached - it means that an incorrect value was entered in the field
    // the last time the control had focus.
    if (customerAddress2Input.classList.contains(SWAP_VALUE) === true) {

        // Remove the class SWAP_VALUE - as the user is preparing to re-enter
        // a valid value
        customerAddress2Input.classList.remove(SWAP_VALUE);

        // Set the value of the input control to the placeholder value.
        // The erroneous/invalid value was preserved in the placeholder 
        // value - the last time input control lost focus.
        customerAddress2Input.value = customerAddress2Input.placeholder;

        // Set the placeholder value of the input control to the original
        // placeholder value of the field.
        customerAddress2Input.placeholder = customerAddress2InputPlaceholder;

        // Select the value set in the input field
        customerAddress2Input.select();

    }

    // Reset all validation related classes
    resetValidation(customerAddress2PrependDiv,
        customerAddress2InputGroupTextDiv);

    // Refresh to original state of the container div
    customerAddress2Div.classList.remove("was-validated");

}

/* The callback function fired on 'blur' - for customer Address2 input control.
 * @param    
 * @return   
 * */
const validateCustomerAddress2InputOnBlur = () => {

    // Check for white spaces
    if (customerAddress2Input.value.trim().length === 0) {

        // White spaces are present - reset the value to be empty
        customerAddress2Input.value = "";

        // Update the invalid feedback message
        customerAddress2InvalidFeedback.innerHTML = "";

        validateInputControl(customerAddress2PrependDiv,
            customerAddress2InputGroupTextDiv);

    } // Check for the length of the Address2 to be not more than 50 characters
    else if (customerAddress2Input.value.trim().length > 50) {

        // Set the required attribute
        customerAddress2Input.setAttribute("required", "");

        // Update the placeholder to display the erroneous/invalid
        // entered value and reset the input value to blank to invalidate the
        // input control
        customerAddress2Input.placeholder = customerAddress2Input.value;
        customerAddress2Input.value = "";

        // Update the invalid feedback message
        customerAddress2InvalidFeedback.innerHTML = "Address Line 2 cannot " +
            "contain more than 50 characters.";

        // Add the SWAP_VALUE class to the customer Address2 input control
        customerAddress2Input.classList.add(SWAP_VALUE);

        invalidateInputControl(customerAddress2PrependDiv,
            customerAddress2InputGroupTextDiv);


    } else // Passed all validation checks
    {
        validateInputControl(customerAddress2PrependDiv,
            customerAddress2InputGroupTextDiv);
    }

    customerAddress2Div.classList.add("was-validated");

    // Enable/Disable the navigation button(s)
    if (allInputsAreValidated() === true) {
        customerCardNextButton.disabled = false;
    } else {
        customerCardNextButton.disabled = true;
    }

}

/* The callback function fired on 'get focus' - for customer 
 * Address3 input control.
 * @param    
 * @return   
 * */
const resetCustomerAddress3InputOnGetFocus = () => {

    // Remove the required attribute - if present
    customerAddress3Input.removeAttribute("required", "");

    // Preserve the original placeholder text - the first time the control 
    // gets focus.
    // The customerAddress3InputPlaceholder variable will be empty 
    // the first time
    // control gets focus
    if (customerAddress3InputPlaceholder.length === 0) {
        customerAddress3InputPlaceholder = customerAddress3Input.placeholder;
    }

    // If the customer Address3 input control has the class SWAP_VALUE 
    // attached - it means that an incorrect value was entered in the field
    // the last time the control had focus.
    if (customerAddress3Input.classList.contains(SWAP_VALUE) === true) {

        // Remove the class SWAP_VALUE - as the user is preparing to re-enter
        // a valid value
        customerAddress3Input.classList.remove(SWAP_VALUE);

        // Set the value of the input control to the placeholder value.
        // The erroneous/invalid value was preserved in the placeholder 
        // value - the last time input control lost focus.
        customerAddress3Input.value = customerAddress3Input.placeholder;

        // Set the placeholder value of the input control to the original
        // placeholder value of the field.
        customerAddress3Input.placeholder = customerAddress3InputPlaceholder;

        // Select the value set in the input field
        customerAddress3Input.select();

    }

    // Reset all validation related classes
    resetValidation(customerAddress3PrependDiv,
        customerAddress3InputGroupTextDiv);

    // Refresh to original state of the container div
    customerAddress3Div.classList.remove("was-validated");

}

/* The callback function fired on 'blur' - for customer Address3 input control.
 * @param    
 * @return   
 * */
const validateCustomerAddress3InputOnBlur = () => {

    // Check for white spaces
    if (customerAddress3Input.value.trim().length === 0) {

        // White spaces are present - reset the value to be empty
        customerAddress3Input.value = "";

        // Update the invalid feedback message
        customerAddress3InvalidFeedback.innerHTML = "";

        validateInputControl(customerAddress3PrependDiv,
            customerAddress3InputGroupTextDiv);

    } // Check for the length of the Address3 to be not more than 50 characters
    else if (customerAddress3Input.value.trim().length > 50) {

        // Set the required attribute
        customerAddress3Input.setAttribute("required", "");

        // Update the placeholder to display the erroneous/invalid
        // entered value and reset the input value to blank to invalidate the
        // input control
        customerAddress3Input.placeholder = customerAddress3Input.value;
        customerAddress3Input.value = "";

        // Update the invalid feedback message
        customerAddress3InvalidFeedback.innerHTML = "Address Line 3 cannot " +
            "contain more than 50 characters.";

        // Add the SWAP_VALUE class to the customer Address3 input control
        customerAddress3Input.classList.add(SWAP_VALUE);

        invalidateInputControl(customerAddress3PrependDiv,
            customerAddress3InputGroupTextDiv);


    } else // Passed all validation checks
    {
        validateInputControl(customerAddress3PrependDiv,
            customerAddress3InputGroupTextDiv);
    }

    customerAddress3Div.classList.add("was-validated");

    // Enable/Disable the navigation button(s)
    if (allInputsAreValidated() === true) {
        customerCardNextButton.disabled = false;
    } else {
        customerCardNextButton.disabled = true;
    }

}

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
 * @param  
 * @return {boolean}    true if all fields are validated - false otherwise  
 * */
const allInputsAreValidated = () => {

    // Flag to check if all input fields were validated
    let allFieldsAreValidated = false;

    // Get all the div elements which have the class "input-group"
    let allInputContainerDivElements = document
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
            if (containerDiv.getElementsByTagName("input")[0].value.length === 0) {
                allFieldsAreValidated = true;
                continue;
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
/* REGISTER EVENT LISTENERS                                                  */
/*****************************************************************************/

// Event listeners registered for the Customer Name input control
customerNameInput.addEventListener("blur", validateCustomerNameInputOnBlur);
customerNameInput.addEventListener("focus", resetCustomerNameInputOnGetFocus);

// Event listeners registered for the Customer Mobile input control
customerMobileInput.addEventListener("blur",
    validateCustomerMobileInputOnBlur);
customerMobileInput.addEventListener("focus",
    resetCustomerMobileInputOnGetFocus);

// Event listeners registered for the Customer Address1 input control
customerAddress1Input.addEventListener("blur",
    validateCustomerAddress1InputOnBlur);
customerAddress1Input.addEventListener("focus",
    resetCustomerAddress1InputOnGetFocus);

// Event listeners registered for the Customer Address2 input control
customerAddress2Input.addEventListener("blur",
    validateCustomerAddress2InputOnBlur);
customerAddress2Input.addEventListener("focus",
    resetCustomerAddress2InputOnGetFocus);

// Event listeners registered for the Customer Address3 input control
customerAddress3Input.addEventListener("blur",
    validateCustomerAddress3InputOnBlur);
customerAddress3Input.addEventListener("focus",
    resetCustomerAddress3InputOnGetFocus);

/*****************************************************************************/
/* END OF FILE                                                               */
/*****************************************************************************/