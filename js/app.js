/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/* Main functions and variables, but not all 
we'll find here how we gave variables for the section, and some of the document elements
like the heading text and how we changed the text and the colors using pure JS.
using the variable for the sections using the TagName, we were able to call it out
in the navbar section and build our navbar. */ 

let section = document.getElementsByTagName('section');
const heading = document.getElementById('p1');
heading.textContent = "Welcome to my Project!"
heading.style.fontFamily = "Helvetica, Tahoma, Times New Roman";
heading.style.color = "#5F9EA0";

/* Some text adjustment to freely control the HTML content through JS.
This wasn't integral at all but I wanted to demonstrate how we can freely modify and control
any HTML element through the DOM. In that case I have changed the text of some paragraphs
using the textContent command after defining and calling the paragraphs and the headings
using the querySelectors and then adding them to a const variable. */

const para1 = document.querySelector('#para')
para1.textContent = "This is a way for a developer to change any HTML heading and paragraph using JavaScript only. I took this chance to exhibit this function and to change some text, making this project more personal to me, and it could also offer more variety.";
const para2 = document.querySelector('#para2')
para2.textContent = "I have done my best to make sure this new experience from static to dynamic does not change or alter the original vision, or drastically change the landing page. But instead, giving it a needed animated, reflective sense and state."
para1.style.fontFamily = "monospace";
para1.style.fontSize = "x-large";
para2.style.fontFamily = "monospace";
para2.style.fontSize = "x-large";

/* Coding the 'Go to Top' Button, which is essential for a dynamic experience and viewing 
of the webpage, and adds a lot of user-friendly help. */


const scrollBtn = document.querySelector(".btn"); //identify the element
const btnVisibility = () => {

  if (window.scrollY > 400) {
      scrollBtn.style.visibility = "visible"; //only visible after scrolling from top
  } else {
      scrollBtn.style.visibility = "hidden"; //current state is hidden for effectivness
  }
};

/* The even listener part of the function to activate it and to make sure it has a
smooth transition. */ 

document.addEventListener("scroll", () => {
btnVisibility();
});

scrollBtn.addEventListener("click", () => {
window.scrollTo({
    top: 0,
    behavior: "smooth"
});
});


/* The Navigation Menu section  */
/* Here, I started to create the navigation bar as closely as I could to the other presentations.
But I also took some liberty in following the requierments, by including the very helpful commands
of appendChild, the innerText and taking advantage of the project's anchor attriutes.
We also code a new method of setting an active state to the landing page based on
the current selected section, this process was mainly done by JS and some CSS tricks */

function navBar() {
    const section = document.getElementsByTagName('section');

    for (let i = 0; i < section.length; i++) {
      let navBarUL = document.getElementById("navBarULID");
      let link = `<a href='#' onclick="console.log(${i})" id='link_no${i+1}'> Section ${i+1} </a>`;

      
      let newLI = document.createElement("li")
      newLI.innerHTML = link
      navBarUL.appendChild(newLI)
      let j = i
    }

    for (let i = 0; i < section.length; i++) {
      document.getElementById( 'link_no' + (i + 1)).addEventListener('click', function(e) {

        /* this command here is to prevent malfunctions as without it clicking on sections
        will get blocked and overrwritten. */
        e.preventDefault();


        let allActiveLinks = document.getElementsByClassName('active-link');
        for (let i = 0; i < allActiveLinks.length; i++) {
            const element = allActiveLinks[i];
            element.classList.remove('active-link');
            
        }

 /* This code is to identify the browser with the current section as the user clicks on it,
 putting an active state here.
 Later on the page we will use that code again but to code the active state
 when a user starts scrolling. */

        document.getElementById('link_no' + (i + 1)).classList.add('active-link');
        let currentLocation = location.href;
        currLocationArray = currentLocation.split("#");
        currentLocation = currLocationArray[0];
        currentLocation += `#section${i+1}`;
        
        // final trigger to identify URL without reloading the page and messing up codes.
        window.history.pushState("", "", currentLocation);

       // coordinates for the scrolling function
        let sectionOfI = document.getElementById(`section${i+1}`);
        let scrollArea = getOffset(sectionOfI);
        
         scrollEventNew(scrollArea.top,e);
        
    }) 
      
    }
}


/* Coded here is the main top offset and the measuerments of the website sections
using getBoundingClient and rectangle numbers to help us access and code the next 
functions for scrolling and active states. This is important becauset it carries the
foundation of everything we will do later. */

function getOffset(element) {
  const rect = element.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect()

  // After getting our main measuerments, we tell the DOM to return its numbers and use them.
  return {
    top: rect.top - bodyRect.top // to get absolute position of webpage
  };
}



/* After setting the main variable and function of the navbar's early stages, we now head to the
stylization and visual elements. Instead of doing it over CSS, we show the advantages of JS
by coding it right here! */

function navBarStyle () {
    let anchor = document.getElementsByTagName('a');
    let styles = `
        display: flex;
        flex-direction: row;
        align-items: stretch;
        color: #000;
        text-decoration: none;
        margin: 0 0.5em 0 0.5em;
        padding: 0.5em;
        background-color: #E0D5CA;
        font-size: large;
        transform:translateX(-0.5em);
    `;

    for (i = 0; i < anchor.length; i++) {
        anchor[i].setAttribute('style', styles);
    } }



    /* The new smooth-scrolling function now completely built in pure JS.
    The function here takes some coordinates from scrollArea above. */

     function scrollEventNew(y , event) {
      window.scrollTo({
        left: 0,
        top: y,
        behavior: 'smooth'
    })  
    } 
    
    /* After setting our main function. We begin to modify and launch our scroll system using 
    getBounding once again and the for loop method to identify how do we exactly want the scroll
    to happen, while keeping in mind it has to have a dynamic and smooth transition. */

     window.onscroll = function() {
      const sections = document.getElementsByTagName('section');

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        let boundingRectangle = section.getBoundingClientRect();

        if(boundingRectangle.top >=-300 && boundingRectangle.top <=300){
         
        let allActiveLinks = document.getElementsByClassName('active-link');
        
        // active section based on viewport 
        if(boundingRectangle.top >=0 && boundingRectangle.top <=100){
          section.classList.add('your-active-class');
        } else {
          section.classList.remove('your-active-class');
        }

        for (let j = 0; j < allActiveLinks.length; j++) {
            const element = allActiveLinks[j];
            element.classList.remove('active-link');
            
            
        }
      
      

/*  This code is to identify the browser with the current section as the user scrolls
on the webpage and not just clicking on it putting an active state here. 
I have used the replaceState function to make sure the page is stable. 
Since every time a user scrolls and the active section changes, the page just kept
getting refreshed for some reason, so I added this to prevent that event. */ 


        document.getElementById('link_no' + (i + 1)).classList.add('active-link')
        let currentLocation = location.href;
        currLocationArray = currentLocation.split("#")
        currentLocation = currLocationArray[0]
        currentLocation += `#section${i+1}`
        window.history.replaceState("", "", currentLocation);
        }
        
      }

    }



/* These functions are used to callout the DOM elements of the navigation bar. */ 

  navBar();
  navBarStyle();
   

