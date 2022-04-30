"use strict";

/* * JavaScript for the file index.html
 *  @author Sanket Rajgarhia
 *  @date   22/04/2022 (dd/mm/yyyy)
 *  @version 1.0
 * */

/*****************************************************************************/
/* PAGE COMPONENT ENUMERATIONS                                               */
/*****************************************************************************/

// index page title (EN)
const INDEX = {
    TITLE: "แบบสำรวจการเลือกล็อค",
};

// Lock selection card
const LOCK_SELECTION_CARD = {
    HEADER: "ล็อคการค้นหาโมเดล",
    LABEL_LOCK_MODEL: "ล็อคการค้นหาโมเดล",
    SUITABILITY_MESSAGE: "ล็อคนี้เหมาะสำหรับประเภทประตูต่อไปนี้",
    LABEL_DOOR_TYPE: "ประเภทประตู : ",
    LABEL_DOOR_THICKNESS: "ช่วงความหนาของประตู : ",
};

// Door specification card
const DOOR_SPECIFICATION_CARD = {
    HEADER: "ข้อกำหนดประตู",
    PROCEED_MESSAGE: `คลิกที่ปุ่ม ` +
        `<span id="label-next" class="highlight-text"></span> ` +
        `และระบุข้อกำหนดของประตูเพื่อตรวจสอบความเหมาะสมของรุ่นล็อค`,
        
    LABEL_NEXT: "ถัดไป",
};

// Navigation buttons
const NAVIGATION_BUTTONS = {
    SELECT_BUTTON: "     เลือก     ",
    NEXT_BUTTON: "      ถัดไป      "
};

/*****************************************************************************/
/* FREEZE - TO EMULATE ENUMERATION                                           */
/*****************************************************************************/

// Prevent addition of properties to the json Object
Object.freeze(INDEX);
Object.freeze(LOCK_SELECTION_CARD);
Object.freeze(DOOR_SPECIFICATION_CARD);
Object.freeze(NAVIGATION_BUTTONS);

/*****************************************************************************/
/* END OF FILE                                                               */
/*****************************************************************************/