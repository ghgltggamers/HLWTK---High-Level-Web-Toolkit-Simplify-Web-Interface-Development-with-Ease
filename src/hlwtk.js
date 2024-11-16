/*
 * HLWTK - High Level Web Tool Kit
 * Written by ghgltggamer
 * Goal - Provide a way to create reusable components of UI with ease.
 * Giving devs the controll of full frontend
 * Licensed under MIT LICENSE, Checout LICENSE file for more info
 * Modify this if familiar with HLWTK
 * Documentation is included with every aspect of line
*/

// Source 
// In HLWTK everything is defined as function and variables
// macros -> These are special constants defined to hold numeric values for HLWTK to understand
const HLWTK_CURRENT_VERSION = '1.0'; // for hlwtk current version
const HLWTK_DISPOSE_EVERYTHING = 1110101110; // for hlwtk destroy function
const HLWTK_TYPE_INT = typeof HLWTK_DISPOSE_EVERYTHING; // stores an integert type
const HLWTK_NONE = 0; // hlwtk none type
const HLWTK_COMPONENT = 2; // defines for hlwtk component
const HLWTK_JNODE = 3; // defines for hlwtk dom
// Base function for creating UI Components in HLWTK
function HLWTK_Component (Component_args=[]) {
    const component_root = document.createElement('hlwtk_component');
    return {
        hlwtk_component_root: component_root, // component_root_access is the critical access of root not recommended for programmer's use since hlwtk handles this it-self.
        control: { // control system for the component , Developed for programmer's usage
            maked: false,
            destroyed: false,
            make(parent=document.body, type=HLWTK_JNODE){ // basic implementation of make() for making element directly to parent
                if (this.destroyed){
                    this.maked = false;
                    this.destroyed = false;
                    this.make(parent, type);
                }
                else if (!this.destroyed) {
                    if (this.maked){
                        return 0;
                    }
                    else {
                        if (type === HLWTK_JNODE){
                            parent.appendChild(component_root);
                            this.maked = true;
                            return 1;
                        }
                        else if(type === HLWTK_COMPONENT) {
                            parent.hlwtk_component_root.appendChild(component_root);
                            this.maked = true;
                            return 1;
                        }
                        else {
                            console.error('HLWTK Error -> Expected a valid type for HLWTK_Component().control.make(parent, type)');
                        }
                    }
                }
            },
            content(content=HLWTK_NONE){ // basic implementation of content() which will return the content or set it
                if (content === HLWTK_NONE){
                    return component_root.innerHTML;
                }
                else {
                    component_root.innerHTML += content;
                    return 1;
                }
            },
            baked_components: [],
            bake(parent=document.body, type=HLWTK_JNODE){ // basic implementation of bake() which will bake it infinite times as requested
                if (type === HLWTK_JNODE){
                    var bake_element = document.createElement('hlwtk_baked_element');
                    bake_element.innerHTML = this.content();
                    parent.appendChild(bake_element);
                    this.baked_components.push(bake_element);
                    return 1;
                }
                else if (type === HLWTK_COMPONENT){
                    var bake_element = document.createElement('hlwtk_baked_element');
                    bake_element.innerHTML = this.content();
                    parent.hlwtk_component_root.appendChild(bake_element);
                    parent.control.baked_components.push(bake_element);
                    return 1;
                }
            },
            destroy(){ // basic implementation of destroy for destroy if maked
                if (this.destroyed){
                    return 0;
                }
                else if (!this.destroyed) {
                    if (this.maked){
                        component_root.remove();
                        this.destroyed = true;
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            },
            dispose(index){ // basic implementation of dispose if baked
                if (index  === HLWTK_DISPOSE_EVERYTHING){
                    for (var i = 0;i < this.baked_components.length;i++){
                        this.baked_components[i].remove();
                    }
                }
                else {
                    if ((typeof index) === HLWTK_TYPE_INT){
                        this.baked_components[index].remove();
                    }
                    else{
                        console.error('HLWTK Error : Can not parse any data type exept int for HLWTK_Component().control.dispose()');
                    }
                }
            }
        }
    }
}; 