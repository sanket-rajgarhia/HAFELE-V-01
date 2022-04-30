"use strict";

/* * JavaScript for the file lock-selection-survey.html - Global
 *  variables, constants and functions
 *  @author Sanket Rajgarhia
 *  @date   05/04/2022 (dd/mm/yyyy)
 *  @version 1.0
 * */

/*****************************************************************************/
/* GLOBAL VARIABLES                                                          */
/*****************************************************************************/

// Reference to the group <div> elements
let lockModelSelectionGroup = document.getElementById(
    "lock-model-group");
let installationLocationSelectionGroup = document.getElementById(
    "installation-location-group");
let doorConditionSelectionGroup = document.getElementById(
    "door-condition-group");
let existingDoorRetrofitSelectionGroup = document.getElementById(
    "existing-door-retrofit-group");
let doorTypeSelectionGroup = document.getElementById("door-type-group");
let swingDoorTypeSelectionGroup = document.getElementById("swing-door-type-group");
let swingDoorJambSelectionGroup = document.getElementById("swing-door-jamb-group");
let doorThicknessSelectionGroup = document.getElementById("door-thickness-group");
let doorThicknessInputGroup = document.getElementById("input-door-thickness");
let doorMaterialSelectionGroup = document.getElementById(
    "door-material-group");
let doorLeafSelectionGroup = document.getElementById(
    "door-leaf-group");

// Reference to the message label ids
let installationLocationMessageLabel = document.getElementById(
    "message-installation-location");
let doorConditionMessageLabel = document.getElementById(
    "message-door-condition");
let existingDoorRetrofitMessageLabel = document.getElementById(
    "message-existing-door-retrofit");
let doorTypeMessageLabel = document.getElementById(
    "message-door-type");
let swingDoorTypeMessageLabel = document.getElementById(
    "message-swing-door-type");
let swingDoorJambMessageLabel = document.getElementById(
    "message-swing-door-jamb");
let doorThicknessMessageLabel = document.getElementById(
    "message-door-thickness");
let doorThicknessInputMessageLabel = document.getElementById(
    "message-door-thickness-input");
let doorMaterialMessageLabel = document.getElementById(
    "message-door-material");
let doorLeafMessageLabel = document.getElementById(
    "message-door-leaf");

// Reference to the caution label ids
let swingDoorJambCautionLabel = document.getElementById(
    "caution-swing-door-jamb");
let existingDoorRetrofitCautionLabel = document.getElementById(
    "caution-existing-door-retrofit");

// Reference to the associated control <div> elements
let lockModelSelectionDiv = document.getElementById(
    "lock-model-selection-div");
let installationLocationSelectionDiv = document.getElementById(
    "installation-location-selection-div");
let doorConditionSelectionDiv = document.getElementById(
    "door-condition-selection-div");
let existingDoorRetrofitSelectionDiv = document.getElementById(
    "existing-door-retrofit-selection-div");
let doorTypeSelectionDiv = document.getElementById(
    "door-type-selection-div");
let swingDoorTypeSelectionDiv = document.getElementById(
    "swing-door-type-selection-div");
let swingDoorJambSelectionDiv = document.getElementById(
    "swing-door-jamb-selection-div");
let doorThicknessSelectionDiv = document.getElementById(
    "door-thickness-selection-div");
let doorThicknessInputDiv = document.getElementById(
    "door-thickness-input-div");
let doorMaterialSelectionDiv = document.getElementById(
    "door-material-selection-div");
let doorLeafSelectionDiv = document.getElementById(
    "door-leaf-selection-div");

let lockModelPrependDiv = lockModelSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let installationLocationPrependDiv = installationLocationSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let doorConditionPrependDiv = doorConditionSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let existingDoorRetrofitPrependDiv = existingDoorRetrofitSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let doorTypePrependDiv = doorTypeSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let swingDoorTypePrependDiv = swingDoorTypeSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let swingDoorJambPrependDiv = swingDoorJambSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let doorThicknessPrependDiv = doorThicknessSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let doorThicknessInputPrependDiv = doorThicknessInputDiv
    .getElementsByClassName("input-group-prepend")[0];
let doorMaterialPrependDiv = doorMaterialSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];
let doorLeafPrependDiv = doorLeafSelectionDiv
    .getElementsByClassName("input-group-prepend")[0];

let doorThicknessInputGroupTextDiv = doorThicknessInputPrependDiv
    .getElementsByClassName("input-group-text")[0];

// Reference to the Previous and Next button
let lockCardPreviousButton = document.getElementById("lock-selection-previous");
let lockCardNextButton = document.getElementById("lock-selection-next");

/*****************************************************************************/
/* EVENT LISTENER - CALLBACKS                                                */
/*****************************************************************************/

/* The callback function fired on 'change' - for lock model select 
 * control. 
 * @param    
 * @return   
 * */
const lockModelSelectionChange = (event) => {

    installationLocationSelectionGroup.selectedIndex = 0;
    doorTypeSelectionGroup.selectedIndex = 0;
    doorThicknessSelectionGroup.selectedIndex = 0;
    doorMaterialSelectionGroup.selectedIndex = 0;

    // If a lock model has been selected - then update the door type and 
    // door thickness select control
    if (lockModelSelectionGroup.selectedIndex > 0) {

        let selectedValue = lockModelSelectionGroup.value;

        // Hide the GARAGE (EXAMPLE) - Door Installation location 
        let optionElements = installationLocationSelectionGroup.getElementsByTagName('option');
        optionElements = Array.prototype.slice.call(optionElements, 0);
        let values = optionElements.map(function(item) {
            return item.value
        });
        let index = values.indexOf(DOOR_INSTALLATION_LOCATION.GARAGE_DOOR_EXAMPLE);
        if (typeof index !== -1) {
            optionElements[index].setAttribute("class", "hide");
        }

        // Fetch the object specifying the door type and door thickness range
        let compatibleDoor = lockCompatibility(selectedValue.toUpperCase());

        // Select the door type - automatically
        // Check if the door is compatible with both Swing and Sliding type
        if (compatibleDoor.doorType.indexOf('/') > -1) {
            doorTypeSelectionGroup.value = DOOR_TYPE.SWING_DOOR;
        } else {
            doorTypeSelectionGroup.value = compatibleDoor.doorType;
        }

        // Select the door thickness - automatically
        doorThicknessSelectionGroup.value = compatibleDoor.doorThickness;
        doorMaterialSelectionGroup.selectedIndex = 0;

        // Validate style applied upon selection 
        validateSelectControl(lockModelSelectionGroup, lockModelPrependDiv);

    } // Reset the door type and door thickness select control
    else {

        // Reset the validate and invalidate style
        resetSelectControl(lockModelSelectionGroup, lockModelPrependDiv);
    }

    installationLocationSelectionGroup.dispatchEvent(new Event("change"));
    doorConditionSelectionGroup.dispatchEvent(new Event("change"));
    doorTypeSelectionGroup.dispatchEvent(new Event("change"));
    swingDoorTypeSelectionGroup.dispatchEvent(new Event("change"));
    swingDoorJambSelectionGroup.dispatchEvent(new Event("change"));
    doorThicknessSelectionGroup.dispatchEvent(new Event("change"));
    doorMaterialSelectionGroup.dispatchEvent(new Event("change"));

}

/* The callback function fired on 'change' - for installation location select 
 * control. 
 * @param    
 * @return   
 * */
const installationLocationSelectionChange = (event) => {

    let selectedValue = installationLocationSelectionGroup.value;

    messageLabelShow(installationLocationMessageLabel, false, "");

    // In case of de-selection hide any warning message displayed
    if (installationLocationSelectionGroup.selectedIndex === 0) {

        // Reset the validate and invalidate style
        resetSelectControl(installationLocationSelectionGroup,
            installationLocationPrependDiv);

    } else {

        // If the installation location is outdoor exposed - then display
        // the warning message
        if (selectedValue === DOOR_INSTALLATION_LOCATION.OUTDOOR_EXPOSED) {
            messageLabelShow(installationLocationMessageLabel,
                true, MESSAGE.MESSAGE_FAILURE);

        }

        // Validate style applied upon selection 
        validateSelectControl(installationLocationSelectionGroup,
            installationLocationPrependDiv);

    }

}

/* The callback function fired on 'change' - for door condition select 
 * control. 
 * @param    
 * @return   
 * */
const doorConditionSelectionChange = (event) => {

    let selectedValue = doorConditionSelectionGroup.value;

    messageLabelShow(doorConditionMessageLabel, false, "");

    // Reset the existing door retrofit select control and 
    // associated message and caution warnings - and also
    // reset the validate and invalidate style
    resetSelectControl(existingDoorRetrofitSelectionGroup,
        existingDoorRetrofitPrependDiv);
    existingDoorRetrofitSelectionGroup.selectedIndex = 0;

    messageLabelShow(existingDoorRetrofitMessageLabel, false, "");
    messageLabelShow(existingDoorRetrofitCautionLabel, false, "");

    if (doorConditionSelectionGroup.selectedIndex === 0) {

        // Hide the existing door retrofit select combo
        elementShow(existingDoorRetrofitSelectionDiv, false);

        // Reset the validate and invalidate style
        resetSelectControl(doorConditionSelectionGroup,
            doorConditionPrependDiv);

    } else {

        // If the door condition is - an existing door - then display the 
        // existing door retrofit section <div>
        if (selectedValue === DOOR_CONDITION.INSTALLED) {
            elementShow(existingDoorRetrofitSelectionDiv, true);

            // Validation for lock model EL6000 - cannot be installed on 
            // an existing door
            if (lockModelSelectionGroup.value === LOCK_MODEL.DL6600) {
                messageLabelShow(doorConditionMessageLabel,
                    true, MESSAGE.MESSAGE_FAILURE);
            } else {
                messageLabelShow(doorConditionMessageLabel, false, "");
            }

        } else {
            elementShow(existingDoorRetrofitSelectionDiv, false);
        }

        // Validate style applied upon selection 
        validateSelectControl(doorConditionSelectionGroup,
            doorConditionPrependDiv);
    }

}

/* The callback function fired on 'change' - for existing door retrofit select 
 * control. 
 * @param    
 * @return   
 * */
const existingDoorRetrofitSelectionChange = (event) => {

    let selectedValue = existingDoorRetrofitSelectionGroup.value;

    messageLabelShow(existingDoorRetrofitMessageLabel, false, "");
    messageLabelShow(existingDoorRetrofitCautionLabel, false, "");

    // In case of de-selection hide any warning and caution message displayed
    if (existingDoorRetrofitSelectionGroup.selectedIndex === 0) {

        // Reset the validate and invalidate style
        resetSelectControl(existingDoorRetrofitSelectionGroup,
            existingDoorRetrofitPrependDiv);

    } else {

        // Error messages and caution messages for various locks and 
        // existing door retrofit selection
        let lockModelsUnsuitableForDoorWithLeverHandleSet = [
            LOCK_MODEL.DH2000, LOCK_MODEL.DL6500, LOCK_MODEL.DL6600,
            LOCK_MODEL.DL7000, LOCK_MODEL.DL7900
        ];
        let lockModelUnsuitableForDoorWithKnobLockSet = [LOCK_MODEL.DC1000,
            LOCK_MODEL.DL6600
        ];
        let lockModelUnsuitableForDoorWithGripHandle = [LOCK_MODEL.DC1000,
            LOCK_MODEL.DH2000, LOCK_MODEL.DL6500, LOCK_MODEL.DL6600,
            LOCK_MODEL.DL7000, LOCK_MODEL.DL7100, LOCK_MODEL.DL7600,
            LOCK_MODEL.DL7900, LOCK_MODEL.EL6000, LOCK_MODEL.EL7200,
            LOCK_MODEL.EL7500, LOCK_MODEL.PP8100, LOCK_MODEL.PP9000
        ];

        let lockModelSelectedValue = lockModelSelectionGroup.value;

        switch (selectedValue) {
            case DOOR_RETROFIT.LEVER_HANDLE:

                // Message Display
                if (lockModelsUnsuitableForDoorWithLeverHandleSet
                    .includes(lockModelSelectedValue) === true) {

                    messageLabelShow(existingDoorRetrofitMessageLabel,
                        true, MESSAGE.MESSAGE_FAILURE);

                } else {
                    messageLabelShow(existingDoorRetrofitMessageLabel,
                        false, "");
                }

                // Caution Message display
                if (lockModelSelectedValue === LOCK_MODEL.DC1000 ||
                    lockModelSelectedValue === LOCK_MODEL.DL6600) {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        false, "");
                } else if (lockModelSelectedValue === LOCK_MODEL.ER4900 ||
                    lockModelSelectedValue === LOCK_MODEL.ER5100 ||
                    lockModelSelectedValue === LOCK_MODEL.ER5200) {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        true, CAUTION.EXISTING_DOOR_RETROFIT_RIM_LOCK_CAUTION);
                } else {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        true, CAUTION.EXISTING_DOOR_RETROFIT_CAUTION);
                }

                break;
            case DOOR_RETROFIT.KNOB:

                // Message Display
                if (lockModelUnsuitableForDoorWithKnobLockSet
                    .includes(lockModelSelectedValue) === true) {

                    messageLabelShow(existingDoorRetrofitMessageLabel,
                        true, MESSAGE.MESSAGE_FAILURE);

                } else {
                    messageLabelShow(existingDoorRetrofitMessageLabel,
                        false, "");
                }

                // Caution Message display
                if (lockModelSelectedValue === LOCK_MODEL.DL6600) {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        false, "");
                } else if (lockModelSelectedValue === LOCK_MODEL.ER4900 ||
                    lockModelSelectedValue === LOCK_MODEL.ER5100 ||
                    lockModelSelectedValue === LOCK_MODEL.ER5200) {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        true, CAUTION.EXISTING_DOOR_RETROFIT_RIM_LOCK_CAUTION);
                } else {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        true, CAUTION.EXISTING_DOOR_RETROFIT_CAUTION);
                }

                break;
            case DOOR_RETROFIT.GRIP:

                // Message Display
                if (lockModelUnsuitableForDoorWithGripHandle
                    .includes(lockModelSelectedValue) === true) {

                    messageLabelShow(existingDoorRetrofitMessageLabel,
                        true, MESSAGE.MESSAGE_FAILURE);

                } else {
                    messageLabelShow(existingDoorRetrofitMessageLabel,
                        false, "");
                }

                // Caution Message display
                if (lockModelSelectedValue === LOCK_MODEL.DL6600) {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        false, "");
                } else if (lockModelSelectedValue === LOCK_MODEL.ER4900 ||
                    lockModelSelectedValue === LOCK_MODEL.ER5100 ||
                    lockModelSelectedValue === LOCK_MODEL.ER5200) {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        true, CAUTION.EXISTING_DOOR_RETROFIT_RIM_LOCK_CAUTION);
                } else {
                    messageLabelShow(existingDoorRetrofitCautionLabel,
                        true, CAUTION.EXISTING_DOOR_RETROFIT_CAUTION);
                }

                break;
            default:
                break;

        }

        // Validate style applied upon selection 
        validateSelectControl(existingDoorRetrofitSelectionGroup,
            existingDoorRetrofitPrependDiv);

    }

}

/* The callback function fired on 'change' - for door type select 
 * control. 
 * @param    
 * @return   
 * */
const doorTypeSelectionChange = (event) => {

    let selectedValue = doorTypeSelectionGroup.value;

    // Reset the selection of the swing door type and swing door jamb select
    // control
    swingDoorTypeSelectionGroup.selectedIndex = 0;
    swingDoorJambSelectionGroup.selectedIndex = 0;
    doorLeafSelectionGroup.selectedIndex = 0;

    swingDoorTypeSelectionGroup.dispatchEvent(new Event("change"));
    swingDoorJambSelectionGroup.dispatchEvent(new Event("change"));
    doorLeafSelectionGroup.dispatchEvent(new Event("change"));

    // Reset the swing door jamb and door leaf select control and 
    // associated message and caution warnings
    messageLabelShow(swingDoorJambMessageLabel, false, "");
    messageLabelShow(swingDoorJambCautionLabel, false, "");
    messageLabelShow(doorLeafMessageLabel, false, "");

    resetSelectControl(swingDoorTypeSelectionGroup,
        swingDoorTypePrependDiv);
    resetSelectControl(swingDoorJambSelectionGroup,
        swingDoorJambPrependDiv);
    resetSelectControl(doorLeafSelectionGroup,
        doorLeafPrependDiv);

    // Locate all the 'optgroup' tags
    let optionGroupElements = doorLeafSelectionGroup.getElementsByTagName('optgroup');
    optionGroupElements = Array.prototype.slice.call(optionGroupElements, 0);
    let labels = optionGroupElements.map(function(item) {
        return item.label
    });

    // Reset the visibility of all optgroup elements - make them visible
    for (let optGroupElement of optionGroupElements) {
        optGroupElement.removeAttribute("class", "hide");
    }

    // Locate all the 'option' tags
    let optionElements = doorLeafSelectionGroup.getElementsByTagName('option');
    optionElements = Array.prototype.slice.call(optionElements, 0);
    let values = optionElements.map(function(item) {
        return item.value
    });

    // Reset the visibility of all option elements - make them visible
    for (let optionElement of optionElements) {
        optionElement.removeAttribute("class", "hide");
    }

    messageLabelShow(doorTypeMessageLabel, false, "");

    if (doorTypeSelectionGroup.selectedIndex === 0) {

        // Hide the wing door type and swing door jamb select controls
        elementShow(swingDoorTypeSelectionDiv, false);
        elementShow(swingDoorJambSelectionDiv, false);

        // Reset the validate and invalidate style
        resetSelectControl(doorTypeSelectionGroup,
            doorTypePrependDiv);

    } else {

        // If the door type selected is swing door then - display the 
        // swing door type and swing door jamb select controls
        if (selectedValue === DOOR_TYPE.SWING_DOOR) {

            elementShow(swingDoorTypeSelectionDiv, true);
            elementShow(swingDoorJambSelectionDiv, true);

            // Hide the sliding door optgroup and hide it 
            let index = labels.indexOf(LOCK_SELECTION_SURVEY
                .LOCK_DOOR_LEAF_GROUP_LABEL_SLIDING_DOOR);
            if (index !== -1) {
                optionGroupElements[index].setAttribute("class", "hide");
            }

            // Hide selected items in the swing door selection as well
            // depending upon the lock type
            let selectedLockModel = lockModelSelectionGroup.value;
            let showOptions = []
            switch (selectedLockModel) {

                case LOCK_MODEL.DC1000:
                    break;
                case LOCK_MODEL.DH2000:
                case LOCK_MODEL.DL6500:
                case LOCK_MODEL.DL7000:
                case LOCK_MODEL.DL7100:
                    showOptions = [SWING_DOOR_LEAF.PLAIN_LEAF,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_100_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_EQUAL_OR_MORE_THAN_100_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_100_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_EQUAL_OR_MORE_THAN_100_MM
                    ]
                    displayDoorLeafOptions(showOptions);
                    break;
                case LOCK_MODEL.ER4900:
                case LOCK_MODEL.ER5100:
                case LOCK_MODEL.ER5200:
                    showOptions = [SWING_DOOR_LEAF.PLAIN_LEAF,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_50_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_EQUAL_OR_MORE_THAN_50_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_50_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_EQUAL_OR_MORE_THAN_50_MM
                    ]
                    displayDoorLeafOptions(showOptions);
                    break;
                case LOCK_MODEL.DL6600:
                    showOptions = [SWING_DOOR_LEAF.PLAIN_LEAF,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_60_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_EQUAL_OR_MORE_THAN_60_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_60_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_EQUAL_OR_MORE_THAN_60_MM
                    ]
                    displayDoorLeafOptions(showOptions);
                    break;
                case LOCK_MODEL.EL6000:
                case LOCK_MODEL.EL7200:
                case LOCK_MODEL.EL7500:
                case LOCK_MODEL.DL7600:
                case LOCK_MODEL.DL7900:
                case LOCK_MODEL.PP8100:
                case LOCK_MODEL.PP9000:
                    showOptions = [SWING_DOOR_LEAF.PLAIN_LEAF,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_130_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_EQUAL_OR_MORE_THAN_130_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_130_MM,
                        SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_EQUAL_OR_MORE_THAN_130_MM
                    ]
                    displayDoorLeafOptions(showOptions);
                    break;
                default:
                    break;
            }

        } // Hide the Swing door type and swing door jamb select controls
        else {
            elementShow(swingDoorTypeSelectionDiv, false);
            elementShow(swingDoorJambSelectionDiv, false);

            // Hide the swing door optgroup and hide it 
            let index = labels.indexOf(LOCK_SELECTION_SURVEY
                .LOCK_DOOR_LEAF_GROUP_LABEL_SWING_DOOR);
            if (index !== -1) {
                optionGroupElements[index].setAttribute("class", "hide");
            }
        }

        // If the lock model has been selected - then
        // validate that the door type matches with the selected lock
        if (lockModelSelectionGroup.selectedIndex > 0) {

            // Get the compatible door type and door thickness object
            let compatibleDoor = lockCompatibility(
                lockModelSelectionGroup.value.toUpperCase());

            // Check if the door is compatible with both Swing and Sliding type
            if (compatibleDoor.doorType.indexOf('/') > -1) {
                // Lock supports both types of door - do nothing
                messageLabelShow(doorTypeMessageLabel, false, "");

            } else {

                // Check if the selected door type is compatible with the already
                // selected lock type - if not display the warning message
                if (selectedValue.toUpperCase() !==
                    compatibleDoor.doorType.toUpperCase() &&
                    doorTypeSelectionGroup.selectedIndex > 0) {
                    messageLabelShow(doorTypeMessageLabel,
                        true, MESSAGE.MESSAGE_DOOR_TYPE_AND_LOCK_MISMATCH);
                } // Hide the warning message
                else {
                    messageLabelShow(doorTypeMessageLabel, false, "");
                }

            }

        } // Hide any warning message
        else {
            messageLabelShow(doorTypeMessageLabel, false, "");
        }

        // Validate style applied upon selection 
        validateSelectControl(doorTypeSelectionGroup, doorTypePrependDiv);

    }

}

/* The callback function fired on 'change' - for swing door type select 
 * control. 
 * @param    
 * @return   
 * */
const swingDoorTypeSelectionChange = (event) => {

    let selectedValue = swingDoorTypeSelectionGroup.value;

    swingDoorJambSelectionGroup.selectedIndex = 0;
    swingDoorJambSelectionGroup.dispatchEvent(new Event("change"));

    messageLabelShow(swingDoorTypeMessageLabel, false, "");

    if (swingDoorTypeSelectionGroup.selectedIndex === 0) {

        // Reset the validate and invalidate style
        resetSelectControl(swingDoorTypeSelectionGroup,
            swingDoorTypePrependDiv);

    } else {

        // If Swing door type is DOUBLE DOOR then Swing door jamb must be
        // double leaf door
        if (selectedValue === SWING_DOOR_TYPE.SWING_DOOR_DOUBLE) {

            if (lockModelSelectionGroup.value === LOCK_MODEL.PP8100) {
                messageLabelShow(swingDoorTypeMessageLabel, true,
                    MESSAGE.MESSAGE_JAMB_AND_LOCK_TYPE_MISMATCH);
            } else {
                messageLabelShow(swingDoorTypeMessageLabel, false, "");
            }

            swingDoorJambSelectionGroup.value = SWING_DOOR_JAMB.DOUBLE_LEAF_DOOR;
            swingDoorJambSelectionGroup.dispatchEvent(new Event("change"));

        } else {
            messageLabelShow(swingDoorTypeMessageLabel, false, "");
        }

        // Validate style applied upon selection 
        validateSelectControl(swingDoorTypeSelectionGroup,
            swingDoorTypePrependDiv);

    }

}

/* The callback function fired on 'change' - for swing door jamb select 
 * control. 
 * @param    
 * @return   
 * */
const swingDoorJambSelectionChange = (event) => {

    let selectedValue = swingDoorJambSelectionGroup.value;

    messageLabelShow(swingDoorJambMessageLabel, false, "");

    // Hide the caution warning
    messageLabelShow(swingDoorJambCautionLabel, false, "");

    // In case of de-selection hide any warning message displayed
    if (swingDoorJambSelectionGroup.selectedIndex === 0) {

        // Reset the validate and invalidate style
        resetSelectControl(swingDoorJambSelectionGroup,
            swingDoorJambPrependDiv);

    } else {

        // If the selected door jamb is for double leaf door - and the selected
        // lock is PP8100 - then display the warning message
        if (selectedValue === SWING_DOOR_JAMB.DOUBLE_LEAF_DOOR &&
            lockModelSelectionGroup.value === LOCK_MODEL.PP8100) {
            messageLabelShow(swingDoorJambMessageLabel,
                true, MESSAGE.MESSAGE_JAMB_AND_LOCK_TYPE_MISMATCH);
        } // Remove the warning message
        else {
            messageLabelShow(swingDoorJambMessageLabel, false, "");
        }

        // Display the caution warning
        messageLabelShow(swingDoorJambCautionLabel,
            true, CAUTION.SWING_DOOR_JAMB_CAUTION);

        // Validate style applied upon selection 
        validateSelectControl(swingDoorJambSelectionGroup,
            swingDoorJambPrependDiv);

    }

}

/* The callback function fired on 'change' - for door thickness select 
 * control. 
 * @param    
 * @return   
 * */
const doorThicknessSelectionChange = (event) => {

    let selectedValue = doorThicknessSelectionGroup.value;

    // Reset the door thickness input control value
    doorThicknessInputGroup.value = 1;

    // In case of de-selection hide any warning message displayed
    if (doorThicknessSelectionGroup.selectedIndex === 0) {
        messageLabelShow(doorThicknessMessageLabel, false, "");
        // Hide the input field - and validate
        elementShow(doorThicknessInputDiv, false);

        // Reset the validate and invalidate style
        resetSelectControl(doorThicknessSelectionGroup,
            doorThicknessPrependDiv);

    } else {

        // If the OTHER option is chosen - then display the input field
        // to enter door thickness and hide any warning messages
        if (selectedValue === DOOR_THICKNESS_IN_MM.MM_OTHER) {

            messageLabelShow(doorThicknessMessageLabel, false, "");

            // Get the compatible door type and door thickness object
            // resolve the minimum thickness value and set the starting value 
            // of the door thickness input control to the minimum value
            let compatibleDoor = lockCompatibility(
                lockModelSelectionGroup.value.toUpperCase());
            let thickness = compatibleDoor.doorThickness.split(" ")[0].split("-");
            let minThickness = Number.parseInt(thickness[0]);
            let maxThickness = Number.parseInt(thickness[1]);
            doorThicknessInputGroup.value = minThickness;

            elementShow(doorThicknessInputDiv, true);

            // Validate style applied upon selection 
            // Validate style applied since the input box has a value 
            doorThicknessInputDiv.classList.add("was-validated");
            validateInputControl(doorThicknessInputPrependDiv,
                doorThicknessInputGroupTextDiv);

        } // Hide the input field - and validate
        else {

            // Hide the door thickness input <div>
            elementShow(doorThicknessInputDiv, false);
            // Reset the validate and invalidate style
            resetSelectControl(doorThicknessInputGroup,
                doorThicknessInputPrependDiv);

            // If the lock model has been selected - then
            // validate that the door thickness matches with the selected lock
            if (lockModelSelectionGroup.selectedIndex > 0) {

                // Get the compatible door type and door thickness object
                let compatibleDoor = lockCompatibility(
                    lockModelSelectionGroup.value.toUpperCase());

                // If the selected door thickness does not match the door thickness
                // of the selected lock type and the selected door thickness is not 
                // the default value - display the warning message
                if (compatibleDoor.doorThickness.toUpperCase() !==
                    selectedValue.toUpperCase() &&
                    doorThicknessSelectionGroup.selectedIndex > 0) {

                    messageLabelShow(doorThicknessMessageLabel,
                        true, MESSAGE.MESSAGE_DOOR_THICKNESS_AND_LOCK_MISMATCH);

                } // Hide any warning message
                else {
                    messageLabelShow(doorThicknessMessageLabel, false, "");
                }
            } // Hide any warning message
            else {
                messageLabelShow(doorThicknessMessageLabel, false, "");
            }

        }

        // Validate style applied upon selection 
        validateSelectControl(doorThicknessSelectionGroup,
            doorThicknessPrependDiv);

    }

}

/* The callback function fired on 'keypress' - for door thickness input 
 * control. 
 * @param    
 * @return   
 * */
const doorThicknessInputKeyPress = (event) => {

    // Prevent the user from entering a negative quantity
    if (event.cancelable === true) {
        if (event.key === "-" || event.key === '.') {

            event.preventDefault();
            event.stopPropagation();

        }
    }

}

/* The callback function fired on 'keyup' - for door thickness input 
 * control. 
 * @param    
 * @return   
 * */
const doorThicknessInputKeyUp = (event) => {

    let selectedValue = doorThicknessInputGroup.value;

    resetValidation(doorThicknessInputGroupTextDiv, doorThicknessInputPrependDiv);

    if (selectedValue.trim() === "") {
        messageLabelShow(doorThicknessInputMessageLabel,
            true, MESSAGE.MESSAGE_DOOR_THICKNESS_AND_LOCK_MISMATCH);

        // Invalidate style applied since input box is empty 
        invalidateInputControl(doorThicknessInputPrependDiv, doorThicknessInputGroupTextDiv);

    } else {

        // Validate style applied since the input box has a value 
        validateInputControl(doorThicknessInputPrependDiv, doorThicknessInputGroupTextDiv);

        // Get the compatible door type and door thickness object
        // and determine the minimum and maximum thickness of the door supported
        // by the selected lock model
        let compatibleDoor = lockCompatibility(
            lockModelSelectionGroup.value.toUpperCase());
        let thickness = compatibleDoor.doorThickness.split(" ")[0].split("-");
        let minThickness = Number.parseInt(thickness[0]);
        let maxThickness = Number.parseInt(thickness[1]);


        let inputValue = Number.parseInt(doorThicknessInputGroup.value);

        // If the selected door thickness does not match the door thickness
        // of the selected lock type and the selected door thickness is not 
        // the default value - display the warning message
        if ((inputValue < minThickness || inputValue > maxThickness) &&
            doorThicknessSelectionGroup.selectedIndex > 0) {

            messageLabelShow(doorThicknessInputMessageLabel,
                true, MESSAGE.MESSAGE_DOOR_THICKNESS_AND_LOCK_MISMATCH);

        } else {
            messageLabelShow(doorThicknessInputMessageLabel, false, "");
        }

    }

}

/* The callback function fired on 'change' - for door material select 
 * control. 
 * @param    
 * @return   
 * */
const doorMaterialSelectionChange = (event) => {

    let selectedValue = doorMaterialSelectionGroup.value;

    messageLabelShow(doorMaterialMessageLabel, false, "");

    // In case of de-selection hide any warning message displayed
    if (doorMaterialSelectionGroup.selectedIndex === 0) {

        // Reset the validate and invalidate style
        resetSelectControl(doorMaterialSelectionGroup,
            doorMaterialPrependDiv);

    } else {

        if (selectedValue === DOOR_MATERIAL.GLASS ||
            selectedValue === DOOR_MATERIAL.PVC ||
            selectedValue === DOOR_MATERIAL.WPC) {

            messageLabelShow(doorMaterialMessageLabel,
                true, MESSAGE.MESSAGE_MATERIAL_FAILURE);

        } // If material is UPVC
        else if (selectedValue === DOOR_MATERIAL.UPVC) {

            let selectedLockModel = lockModelSelectionGroup.value;

            let suitableLockModels = [LOCK_MODEL.ER4900,
                LOCK_MODEL.ER5100, LOCK_MODEL.ER5200,
                LOCK_MODEL.DH2000, LOCK_MODEL.DL6500
            ]

            if (suitableLockModels.includes(selectedLockModel) === true) {
                messageLabelShow(doorMaterialMessageLabel,
                    false, "");
            } else {
                messageLabelShow(doorMaterialMessageLabel,
                    true, MESSAGE.MESSAGE_MATERIAL_FAILURE);
            }
        } else {
            messageLabelShow(doorMaterialMessageLabel,
                false, "");
        }

        // Validate style applied upon selection 
        validateSelectControl(doorMaterialSelectionGroup,
            doorMaterialPrependDiv);

    }

}

/* The callback function fired on 'change' - for door leaf select 
 * control. 
 * @param    
 * @return   
 * */
const doorLeafSelectionChange = (event) => {

    let selectedValue = doorLeafSelectionGroup.value;

    messageLabelShow(doorLeafMessageLabel, false, "");

    if (doorLeafSelectionGroup.selectedIndex === 0) {

        // Reset the validate and invalidate style
        resetSelectControl(doorLeafSelectionGroup,
            doorLeafPrependDiv);

    } else {

        // Locate the selected option tag
        let selectedOptionTag;
        let allOptionTags = doorLeafSelectionGroup
            .getElementsByTagName("option");

        // Loop over all the options tag - displayed or hidden
        for (let optionTag of allOptionTags) {

            //The option tag containing the selected value is found
            if (optionTag.value === selectedValue) {

                // If the option tag is of type PLAIN LEAF
                if (optionTag.value === SWING_DOOR_LEAF.PLAIN_LEAF) {

                    //Determine if it is the PLAIN LEAF with data-door-type
                    // data attribute [having either "", "SWING DOOR" or 
                    // "SLIDING DOOR"] matches the doorTypeSelection
                    if (doorTypeSelectionGroup.value === optionTag.dataset.doorType) {

                        // The option tag with PLAIN leaf of the same type as
                        // the door type selection ["SWING DOOR" or
                        // "SLIDING DOOR"]
                        selectedOptionTag = optionTag;
                        break;

                    } else {
                        // The option tag is of type PLAIN LEAF but it DOES NOT
                        // match the doorTypeSelection 
                        // ["SWING DOOR"/"SLIDING DOOR"]
                        continue;
                    }
                } // If the option tag is of type OTHER THAN - PLAIN LEAF
                else {
                    // For any other option tag other than PLAIN LEAF, a
                    // match was found - break from loop processing all the
                    // option tags
                    selectedOptionTag = optionTag;
                    break;
                }

            }

        }

        // If the door type selection is either ["SWING DOOR" OR 
        // "SLIDING DOOR"] and NOT in the UNSELECTED state
        // If the door type selection is in UNSELECTED STATE and you 
        // select PLAIN LEAF in any section - selectedOptionTag will
        // be undefined and selectedOptionTag.dataset.doorType
        // will generate an exception and hence this check is required.
        if (doorTypeSelectionGroup.value.trim() !== "" &&
            doorTypeSelectionGroup.selectedIndex > 0) {

            // Determine the selected option tag's door type
            let doorType = selectedOptionTag.dataset.doorType;

            // If a door leaf of the type - swing or sliding has been 
            // selected (and not the default message value) - then perform validations
            if (typeof doorType !== 'undefined') {

                let selectedLockModel = lockModelSelectionGroup.value;
                switch (selectedLockModel) {

                    case LOCK_MODEL.DC1000:
                        if (doorType.toUpperCase() === DOOR_TYPE.SLIDING_DOOR) {
                            messageLabelShow(doorLeafMessageLabel, true,
                                MESSAGE.MESSAGE_DOOR_LEAF_AND_DOOR_TYPE_MISMATCH);
                        }
                        break;
                    case LOCK_MODEL.DH2000:
                    case LOCK_MODEL.DL6500:
                    case LOCK_MODEL.DL7000:
                    case LOCK_MODEL.DL7100:
                        if (doorType.toUpperCase() === DOOR_TYPE.SLIDING_DOOR) {
                            messageLabelShow(doorLeafMessageLabel, true,
                                MESSAGE.MESSAGE_DOOR_LEAF_AND_DOOR_TYPE_MISMATCH);
                        } else {
                            if (selectedValue ===
                                SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_100_MM ||
                                selectedValue ===
                                SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_100_MM) {
                                messageLabelShow(doorLeafMessageLabel, true,
                                    MESSAGE.MESSAGE_DOOR_LEAF_FRAME_THICKNESS_INADEQUATE);
                            }
                        }
                        break;
                    case LOCK_MODEL.ER4900:
                    case LOCK_MODEL.ER5100:
                        if (doorType.toUpperCase() === DOOR_TYPE.SLIDING_DOOR) {
                            messageLabelShow(doorLeafMessageLabel, true,
                                MESSAGE.MESSAGE_DOOR_LEAF_AND_DOOR_TYPE_MISMATCH);
                        } else {
                            if (selectedValue ===
                                SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_50_MM ||
                                selectedValue ===
                                SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_50_MM) {
                                messageLabelShow(doorLeafMessageLabel, true,
                                    MESSAGE.MESSAGE_DOOR_LEAF_FRAME_THICKNESS_INADEQUATE);
                            }
                        }
                        break;
                    case LOCK_MODEL.ER5200:
                        if (selectedValue ===
                            SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_50_MM ||
                            selectedValue ===
                            SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_50_MM) {
                            messageLabelShow(doorLeafMessageLabel, true,
                                MESSAGE.MESSAGE_DOOR_LEAF_FRAME_THICKNESS_INADEQUATE);
                        }
                        break;
                    case LOCK_MODEL.DL6600:
                        if (selectedValue ===
                            SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_60_MM ||
                            selectedValue ===
                            SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_60_MM) {
                            messageLabelShow(doorLeafMessageLabel, true,
                                MESSAGE.MESSAGE_DOOR_LEAF_FRAME_THICKNESS_INADEQUATE);
                        }
                        break;
                    case LOCK_MODEL.EL6000:
                    case LOCK_MODEL.EL7200:
                    case LOCK_MODEL.EL7500:
                    case LOCK_MODEL.DL7600:
                    case LOCK_MODEL.DL7900:
                    case LOCK_MODEL.PP8100:
                    case LOCK_MODEL.PP9000:
                        if (doorType.toUpperCase() === DOOR_TYPE.SLIDING_DOOR) {
                            messageLabelShow(doorLeafMessageLabel, true,
                                MESSAGE.MESSAGE_DOOR_LEAF_AND_DOOR_TYPE_MISMATCH);
                        } else {
                            if (selectedValue ===
                                SWING_DOOR_LEAF.DOOR_LEAF_WITH_MULLION_LESS_THAN_130_MM ||
                                selectedValue ===
                                SWING_DOOR_LEAF.DOOR_LEAF_WITH_FRAME_LESS_THAN_130_MM) {
                                messageLabelShow(doorLeafMessageLabel, true,
                                    MESSAGE.MESSAGE_DOOR_LEAF_FRAME_THICKNESS_INADEQUATE);
                            }
                        }
                        break;
                    default:
                        break;

                }

                // Validate style applied upon selection 
                validateSelectControl(doorLeafSelectionGroup,
                    doorLeafPrependDiv);

            } // Hide any warning message
            else {
                messageLabelShow(doorLeafMessageLabel, false, "");

                // Validate style applied upon selection 
                validateSelectControl(doorLeafSelectionGroup,
                    doorLeafPrependDiv);
            }
        } else {
            messageLabelShow(doorLeafMessageLabel, false, "");

            // Validate style applied upon selection 
            validateSelectControl(doorLeafSelectionGroup,
                doorLeafPrependDiv);
        }
    }

}

/* The callback function fired on 'click' - for lock card previous button
 * control. 
 * @param    
 * @return   
 * */
const lockCardPreviousButtonClick = (event) => {

    // Redirect to the index page
    window.location.replace("../html/index.html");

}

/* The callback function fired on 'click' - for lock card next button 
 * control. 
 * @param    
 * @return   
 * */
const lockCardNextButtonClick = (event) => {

    // Input validation flag
    let inValidate = false;

    // Validate the lock model selection combo
    if (lockModelSelectionGroup.selectedIndex === 0) {
        invalidateSelectControl(lockModelSelectionGroup, lockModelSelectionDiv);
        inValidate = true;
    }

    // Validate the installation location selection combo
    if (installationLocationSelectionGroup.selectedIndex === 0) {
        invalidateSelectControl(installationLocationSelectionGroup,
            installationLocationPrependDiv);
        inValidate = true;
    }

    // Validate the door condition selection combo
    if (doorConditionSelectionGroup.selectedIndex === 0) {
        invalidateSelectControl(doorConditionSelectionGroup,
            doorConditionPrependDiv);
        inValidate = true;
    } else {

        // If the door condition is - existing 
        if (doorConditionSelectionGroup.value.toUpperCase() ===
            DOOR_CONDITION.INSTALLED.toUpperCase()) {

            // Validate the existing door retrofit selection combo
            if (existingDoorRetrofitSelectionGroup.selectedIndex === 0) {
                invalidateSelectControl(existingDoorRetrofitSelectionGroup,
                    existingDoorRetrofitPrependDiv);
                inValidate = true;
            }
        }
    }

    // Validate the door type selection combo
    if (doorTypeSelectionGroup.selectedIndex === 0) {
        invalidateSelectControl(doorTypeSelectionGroup,
            doorTypePrependDiv);
        inValidate = true;
    } else {

        // If door type is swing door - validate the swing door type and 
        // swing door jamb select fields
        if (doorTypeSelectionGroup.value.toUpperCase() ==
            DOOR_TYPE.SWING_DOOR.toUpperCase()) {

            if (swingDoorTypeSelectionGroup.selectedIndex === 0) {
                invalidateSelectControl(swingDoorTypeSelectionGroup,
                    swingDoorTypePrependDiv);
                inValidate = true;
            }
            if (swingDoorJambSelectionGroup.selectedIndex === 0) {
                invalidateSelectControl(swingDoorJambSelectionGroup,
                    swingDoorJambPrependDiv);
                inValidate = true;
            }
        }
    }

    // Validate the door thickness selection combo
    if (doorThicknessSelectionGroup.selectedIndex === 0) {
        invalidateSelectControl(doorThicknessSelectionGroup,
            doorThicknessPrependDiv);
        inValidate = true;
    } else {
        if (doorThicknessSelectionGroup.value === DOOR_THICKNESS_IN_MM.MM_OTHER) {
            if (doorThicknessInputGroup.value.trim() === "") {

                // Invalidate style applied since input box is empty 
                invalidateInputControl(doorThicknessInputPrependDiv,
                    doorThicknessInputGroupTextDiv);
                inValidate = true;
            }
        }
    }

    // Validate the door material selection combo
    if (doorMaterialSelectionGroup.selectedIndex === 0) {
        invalidateSelectControl(doorMaterialSelectionGroup,
            doorMaterialPrependDiv);
        inValidate = true;
    }

    // Validate the door leaf selection combo
    if (doorLeafSelectionGroup.selectedIndex === 0) {
        invalidateSelectControl(doorLeafSelectionGroup,
            doorLeafPrependDiv);
        inValidate = true;
    }

    // Check if any of the validations failed - if failure display
    // the status warning message
    if (inValidate === true) {
        window.scrollTo(0, 0);
        invalidStatusMessageDisplay(true, "high-severity",
            MESSAGE.MESSAGE_MISSING_INPUT);

    } else {

        // Hide the status message
        invalidStatusMessageDisplay(false);

        // Save data to the session store
        let lockAndDoorData = {

            lockModel: lockModelSelectionGroup.value,
            installationLocation: installationLocationSelectionGroup.value,
            installationLocationMessage: installationLocationMessageLabel.innerHTML,
            doorCondition: doorConditionSelectionGroup.value,
            doorConditionMessage: doorConditionMessageLabel.innerHTML,
            existingDoorRetrofit: existingDoorRetrofitSelectionGroup.value,
            existingDoorRetrofitMessage: existingDoorRetrofitMessageLabel.innerHTML,
            existingDoorRetrofitCaution: existingDoorRetrofitCautionLabel.innerHTML,
            doorType: doorTypeSelectionGroup.value,
            doorTypeMessage: doorTypeMessageLabel.innerHTML,
            swingDoorType: swingDoorTypeSelectionGroup.value,
            swingDoorTypeMessage: swingDoorTypeMessageLabel.innerHTML,
            swingDoorJamb: swingDoorJambSelectionGroup.value,
            swingDoorJambMessage: swingDoorJambMessageLabel.innerHTML,
            swingDoorJambCaution: swingDoorJambCautionLabel.innerHTML,
            doorThickness: doorThicknessSelectionGroup.value,
            doorThicknessMessage: doorThicknessMessageLabel.innerHTML,
            doorThicknessInput: doorThicknessSelectionGroup.value.toUpperCase() ===
                DOOR_THICKNESS_IN_MM.MM_OTHER.toUpperCase() ? doorThicknessInputGroup.value : "",
            doorThicknessInputMessage: doorThicknessInputMessageLabel.innerHTML,
            doorMaterial: doorMaterialSelectionGroup.value,
            doorMaterialMessage: doorMaterialMessageLabel.innerHTML,
            doorLeaf: doorLeafSelectionGroup.value,
            doorLeafMessage: doorLeafMessageLabel.innerHTML

        };

        sessionStorage.setItem('lockAndDoorData', JSON.stringify(lockAndDoorData));

        // Transition to the customer screen
        initializeCustomerCardControls();

        let customerInformationCaptureCard = document.getElementById(
            "customer-information-capture");
        let lockInformationCaptureCard = document.getElementById(
            "lock-information-capture");

        window.scrollTo(0, 0);
        lockInformationCaptureCard.classList.toggle('fade-out');

        setTimeout(function() {

            lockInformationCaptureCard.classList.remove('card-fade-in');
            lockInformationCaptureCard.classList.add("card-fade-out");

            customerInformationCaptureCard.classList.remove('card-fade-out');
            customerInformationCaptureCard.classList.add('card-fade-in');

        }, 500);
    }

}

/*****************************************************************************/
/* HELPER FUNCTIONS                                                          */
/*****************************************************************************/

/* The function displays or hides the warning message labels
 * @param    {HTMLElementId} messageLabel The HTML Element id of the message 
                                          label
* @param    {boolean} display If display is true then show the message label
                              else hide the message label
* @param    {String} message The innerHTML (text message) to be set 
 * @return   
 * */
const messageLabelShow = (messageLabel, display, message) => {

    if (display === true) {
        messageLabel.classList.remove("hide");
        messageLabel.classList.remove("fade-out");
        messageLabel.classList.add("fade-in");
    } else {
        messageLabel.classList.add("hide");
        messageLabel.classList.remove("fade-in");
        messageLabel.classList.add("fade-out");
    }
    messageLabel.innerHTML = message;

}

/* The function displays or hides the HTML control <div>
 * @param    {HTMLElementId} element The HTML Element id of the <div> 
* @param    {boolean} display If display is true then show the <div> else
                              hide the <div>
 * @return   
 * */
const elementShow = (element, display) => {

    if (display === true) {
        element.classList.remove("hide");
        element.classList.remove("fade-out");
        element.classList.add("fade-in");
    } else {
        element.classList.add("hide");
        element.classList.add("fade-out");
        element.classList.remove("fade-in");
    }

}

/* Function that hides the items in the doorLeafSelection options
 * except for the ones contained in the array which is passed.
 * @param    {string[]} showOptions  Options which are not to be hidden.
 **/
const displayDoorLeafOptions = (showOptions) => {

    // Hide the selected options in Door Leaf swing door selection
    let optionElements = doorLeafSelectionGroup.getElementsByTagName('option');
    optionElements = Array.prototype.slice.call(optionElements, 0);
    let values = optionElements.map(function(item) {
        return item.value
    });

    for (let optionValue of values) {

        if (showOptions.includes(optionValue) == false) {
            let index = values.indexOf(optionValue);
            if (index !== -1) {
                optionElements[index].setAttribute("class", "hide");
            }
        } else {
            if (optionValue === SLIDING_DOOR_LEAF.PLAIN_LEAF) {

                let index = values.indexOf(optionValue, 2);
                if (index !== -1) {

                    if (optionElements[index].dataset.doorType === DOOR_TYPE.SLIDING_DOOR) {
                        optionElements[index].setAttribute("class", "hide");
                    }

                }
            }
        }
    }
}

/*****************************************************************************/
/* REGISTER EVENT LISTENERS                                                  */
/*****************************************************************************/

lockModelSelectionGroup.addEventListener("change", lockModelSelectionChange);
installationLocationSelectionGroup.addEventListener("change",
    installationLocationSelectionChange);
doorConditionSelectionGroup.addEventListener("change",
    doorConditionSelectionChange);
existingDoorRetrofitSelectionGroup.addEventListener("change",
    existingDoorRetrofitSelectionChange);
doorTypeSelectionGroup.addEventListener("change", doorTypeSelectionChange);
swingDoorTypeSelectionGroup.addEventListener("change",
    swingDoorTypeSelectionChange)
swingDoorJambSelectionGroup.addEventListener("change",
    swingDoorJambSelectionChange);
doorThicknessSelectionGroup.addEventListener("change",
    doorThicknessSelectionChange);

doorThicknessInputGroup.addEventListener("keypress",
    doorThicknessInputKeyPress);
doorThicknessInputGroup.addEventListener("keyup",
    doorThicknessInputKeyUp);


doorMaterialSelectionGroup.addEventListener("change",
    doorMaterialSelectionChange);
doorLeafSelectionGroup.addEventListener("change", doorLeafSelectionChange);

lockCardPreviousButton.addEventListener("click", lockCardPreviousButtonClick);
lockCardNextButton.addEventListener("click", lockCardNextButtonClick);

/*****************************************************************************/
/* END OF FILE                                                               */
/*****************************************************************************/