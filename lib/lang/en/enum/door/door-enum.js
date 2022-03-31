'use strict';

/* * The Door Enumeration Values (EN).
 *  @author   Sanket Rajgarhia
 *  @date 31/03/2022 (dd/mm/yyyy)
 *  @version 1.0
 *  @language: en
 * */

/*****************************************************************************/
/* DOOR ENUMERATION (EN)                                                     */
/*****************************************************************************/

/* Door Material specification */
const DOOR_MATERIAL = {
    WOOD: "WOOD",
    GLASS: "GLASS",
    STEEL: "STEEL",
    ALUMINIUM: "ALUMINIUM",
    PVC: "PVC",
    UPVC: "UPVC",
    WPC: "WPC"

};

/* Door Condition Specification */
const DOOR_CONDITION = {

    INSTALLED: "EXISTING",
    NEW: "NEW"

}

/* Door Installation Location */
const DOOR_INSTALLATION_LOCATION = {

    INDOOR: "INDOOR",
    OUTDOOR_PROTECTED: "OUTDOOR PROTECTED (FROM WATER AND STRONG SUNLIGHT)",
    OUTDOOR_EXPOSED: "OUTDOOR EXPOSED (TO WATER AND SUNLIGHT)"

}

/* Thickness of the door */
const DOOR_THICKNESS_IN_MM = {

    MM_30_TO_50: "30-50 MM",
    MM_32_TO_50: "32-50 MM",
    MM_35_TO_50: "35-50 MM",
    MM_35_TO_60: "35-60 MM",
    MM_35_TO_90: "35-90 MM"

}

/*****************************************************************************/
/* FREEZE - TO EMULATE ENUMERATION                                           */
/*****************************************************************************/

// Prevent addition of properties to the json Object
Object.freeze(DOOR_MATERIAL);
Object.freeze(DOOR_CONDITION);
Object.freeze(DOOR_INSTALLATION_LOCATION);
Object.freeze(DOOR_THICKNESS_IN_MM);

/*****************************************************************************/
/* END OF FILE                                                               */
/*****************************************************************************/