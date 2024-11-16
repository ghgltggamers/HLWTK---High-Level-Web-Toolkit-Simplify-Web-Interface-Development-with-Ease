# HLWTK
HLWTK stands for "High Level Web Tool Kit" which is designed for creating stunning websites with a lot of ease. HLWTK also allows you to create custom APIs and Libraries with it.

## Installing HLWTK?
Install it via downloading or cloning this repository and include tthe hlwtk.js file in your html file to get started with work.

## Documentation
Let's learn HLWTK now

Topics :-
1. What is HLWTK and why to use it? <br>
2. Introduction to structure of HLWTK <br>
3. HLWTK_Component() function and all it's methods <br>
4. Creating a custom widget API with HLWTK <br>
5. Deploying a HLWTK Project <br>
6. Best practises with HLWTK <br>

### 1. What is HLWTK and why to use it? 
HLWTK stands for "High Level Web Tool Kit" which was desined to be easy and open source and allow developers to have a powerfull tool for manipulating html directly from JavaScript with HLWTK Control system.

Why to use?
Using HLWTK can be a good option specialy if you want to create a complex website since HLWTK not only provides a control system but a lot of pre defined complex widgets which you can use to create your own UI with ease.

### 2. Introduction to structure of HLWTK
HLWTK follows a simple and nature focused structure with meaning every component to have there custom control system, In HLWTK everything is defined as functions and variables to make this a light weight option. In HLWTK Every thing must start from HLWTK prefix and then request

For example if you want to create something then 
```javascript
HLWTK_Component(); // This is a demo used to show structure of HLWTK
```

Macros: These are really important in HLWTK as these  are used to tell the functions of HLWTK to function in a specific way. These are always in upper case characters. 

For example
```javascript
HLWTK_Component().control.make(document.body, HLWTK_JNODE); // Here HLWTK_JNODE is a macro , Don't be scared of what is written just focus on macro because after few more time you will be able to write more things
```

### 3. HLWTK_Component() function and all it's methods
To be honest this is the most important thing to master in HLWTK because every widget in HLWTK relies on this single function for there functionality or more correctly they simply extends this function and without this function you will be confused a lot of how someone did bla bla bla and with learning this you won't every see documentation and start using other methods of HLWTK like a pro, So be sure to learn this and don't skip this.

HLWTK_Component() is the base function and returns a control system and the root of the element. The control system is what you will always want to touch and handle and root is what you would never want to deal with directly because the root is a JNODE in HLWTK (JNODE represents JavaScript Node System nothing else) and you can directly apply javascript function on this example adding id or classlist etc. and control is what which allows you to manipulate the root with a lot of safety since root access it a critical access in HLWTK and you must better use control system instead of root directly.

#### Exploring control system
Control system in HLWTK is basically a bunch of fuunctions and variables to manipulate and controll the root of the HLWTK_Component() and you can access control system by using <code>HLWTK_Component().control</code>. These are the methods you must learn is using HLWTK.

#### make() [method]
make method makes the component in the specified parent, By default the parent is set to document.body , make takes 2 arguments (parent, type) where parent is the location where the component must make and type is tells make about what kind of parent is given to make and this can only be an JavaScript node element or a hlwtk component and as you may have guessed you need macros here where are HLWTK_JNODE for javascript node element or HLWTK_COMPONENT for hlwtk component as arent. here is a example

```javascript
const myComponent = HLWTK_Component();
myComponent.control.make();// with no arguments parent is set to document.body and type is set to HLWTK_JNODE
myComponent.control.make(document.body);// document.body is a javascript node selector so it means by default HLWTK_JNODE with any js selector is valid
myComponent.control.make(document.body,HLWTK_JNODE); // Optional but if defined with HLWTK_JNODE then it will only improve redablity

const component = HLWTK_Component(); // created another component
component.control.make(myComponent, HLWTK_COMPONENT); // here we uses another component as pparent so we need to tell the make about this so we tell it by HLWTK_COMPONENT macro.
```

Note: Make can only make a hlwtk component 1 time if you try to create it multiple times then make would return 0 for unable to create , You must destroy the component first before remaking it. control system also provides a maked variable to check weather component was maked or not.


#### content() [method]
This method returns the content of the component in the form of html or it can set the content of the component dynamically! here's how , content() takes a single argument which is html data as string to be the content of the component but in case if the value is set fo HLWTK_NONE macro then it would return the html data of the component simply.

Example
```javascript
const a = HLWTK_Component();
a.control.content('Hello world');
a.control.make();

if (a.control.maked){ // checking thet if a was maked 
    console.log(a.control.content());// log the content of a
}
else {
    console.log('Something is blocking a to be maked').
}
```

Note : content() has a default value of HLWTK_NONE and if another data is parsed to it then it would simply erase all the previous data and add the new one.


#### bake() [method]
bake is more complex from make but follows the same arguments which make follows bacause bake is also used to make elements but it doesnot makes them it actually bakes them and allows multiple elements to be baked , because make can only make component once but bake is capable to bake component multiple times. It doesnot relies on make but uses same arguments in same way as make does (parent, type) but bake baked elements as hlwtk baked element not simple hlwtk element so this is also a key difference between them and no is better because it's up to you what you want to use. Example with bake

```javascript
const myUI = HLWTK_Component();
myUI.bake();
myUI.bake();
myUI.bake();
myUI.bake();
// by default bake has values of document.body and HLWTK_JNODE but you can change them anytime you want to.
```

Note : You can use make and bake together if you want.


#### destroy() [method]
destroy do not takes any argument and it simply destroys the maked elements and once destroyed and not remaked with make you can check status by control system's destroyed variable which will be true if component was destroyed but was not remaked, And false when component was not destroyed or remaked but not destroyed

For example
```javascript
const a = HLWTK_Component();
a.control.make();
a.control.destroy();
if (a.control.destroyed){
    console.log('component was destroyed')
}
else {
    console.log('component was not destroyed')
}
```

Note : destroy() will only destroy maked component but won't destroy baked components.


#### dispose() [method]
dispose() method will dispose (or likely destroy but different) the baked elements but won't affect the maked element. dispose() takes an argument index from which it disposes the baked element and it can take a macro HLWTK_DISPOSE_EVERYTHING which will simply tell dispose() to dispose every single baked element of the component.

For example
```javascript
const a = HLWTK_Component();
a.control.content('this is a');
a.control.bake();
a.control.bake(document.getElementById('myelm'));

a.dispose(0); // dispose from index 0 means first iteration of a
a.dispose(HLWTK_DISPOSE_EVERYTHING); // dispose every bakes of a
```

Note : This will only affect baked element not maked elements.

#### A bonus information about root
root can be accessed by HLWTK_Control().hlwtk_component_root;


### 4. Creating a custom widget API with HLWTK <br>
Let you create your own widget library or a full API with HLWTK!

Example let's create a widget API with HLWTK
```javascript

function myApi_Button_new(label){// a function for creating button
    let component = HLWTK_Component();
    component.content(`<button>${label}</button>`);
    return component.control; // output the control system of component
}

// using our API function to create html button
var btn = myApi_Button_new('Click me');
btn.make();

```
It was very simple right as you won't need to define make() method yourself cool.


### 5. Deploying a HLWTK Project <br>
Deploying your HLWTK project is super easy just host all your project files in your hosting server and that's it.


### 6. Best practises with HLWTK <br>
Follow these best practices to ensure your project is efficient and maintainable:
#### 1. Component Reusability

Design components to be generic and reusable across different projects.
#### 2. Keep Control Logic Separate

Use the control object for managing component state and interactions.
#### 3. Minimize Direct DOM Manipulations

Let HLWTK handle DOM manipulations wherever possible.
#### 4. Error Handling

Use built-in error handling for methods like make() and dispose().
#### 5. Do not use direct root
Use built-in methods of control system and avoid direct use of root.

## Contributing checkout the CONTRIBUTING.md
## Url to this repo : https://github.com/ghgltggamers/HLWTK---High-Level-Web-Toolkit-Simplify-Web-Interface-Development-with-Ease/

Thanks for reading this documentation was written entirely by ghgltggamer on 1:00 pm HLWTK first release
