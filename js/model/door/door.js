'use strict';

/* * The generic Door class.
 *  @author Sanket Rajgarhia
 *  @date   30/03/2022 (dd/mm/yyyy)
 *  @version 1.0
 * */

/*****************************************************************************/
/* DOOR CLASS IMPLEMENTATION                                                 */
/*****************************************************************************/

class Door {

    /* *Constructor
     * @param    {DOOR_MATERIAL} material                           Material of the door
     * @param    {DOOR_CONDITION} condition                         Existing/New door
     * @param    {DOOR_INSTALLATION_LOCATION} installationLocation  Door Installation location
     * @param    {DOOR_THICKNESS} thickness                         Thickness of the door
     * */
    constructor(material, condition, installationLocation) {

        this._material = material;
        this._condition = condition;
        this._installationLocation = installationLocation;
        this._thickness = thickness;

    }

    /* Get the material of the door
     * @return {DOOR_MATERIAL}  Material of the door
     */
    get material() {
        return this._material;
    }

    /* Set the material of the door
     * @param    {DOOR_MATERIAL} material   Material of the door
     */
    set material(material) {
        this._material = material;
    }

    /* Get the condition of the door
     * @return {DOOR_CONDITION}     Existing/New door
     */
    get condition() {
        return this._condition;
    }

    /* Set the condition of the door
     * @param    {DOOR_CONDITION} condition     Existing/New door
     */
    set condition(condition) {
        this._condition = condition;
    }

    /* Get the installation location of the door
     * @return {DOOR_INSTALLATION_LOCATION}     Door Installation location
     */
    get installationLocation() {
        return this._installationLocation;
    }

    /* Set the installation location of the door
     * @param    {DOOR_INSTALLATION_LOCATION}   Door Installation location
     */
    set installationLocation(installationLocation) {
        this._installationLocation = installationLocation;
    }

    /* Get the thickness of the door
     * @return {DOOR_THICKNESS}     Thickness of the door
     */
    get thickness() {
        return this._thickness;
    }

    /* Set the thickness of the door
     * @param    {DOOR_THICKNESS} thickness     Thickness of the door
     */
    set thickness(thickness) {
        this._thickness = thickness;
    }

}

/*****************************************************************************/
/* END OF FILE                                                               */
/*****************************************************************************/