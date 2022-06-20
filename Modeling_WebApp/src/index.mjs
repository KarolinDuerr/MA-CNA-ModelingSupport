import ModelingApplication from '../ModelingApp/modelingApp.mjs'
import Homepage from './home.mjs';

// get element to which the content is supposed to be added
const mainSection = document.querySelector("main");

// create the Modeling Application Object
const modelingApp = new ModelingApplication();
const homepage = new Homepage();

// render required content dynamically and only if needed
const menuItems = document.querySelectorAll("a[data-entry-module]");
const navbarItems = new Map();
for (const menuItem of menuItems) {
    navbarItems.set(menuItem.dataset.menuIndex, menuItem.parentNode);
    menuItem.addEventListener("click", async (event) => {
        // prevent loading href since it is dynamically rendered
        event.preventDefault();

        const activeElement = document.querySelector("li.active");
        activeElement?.classList.remove("active");
        menuItem.parentNode.classList.add("active");

        mainSection.innerHTML = "";
        document.title = "CNA Modeling:";
        if (menuItem.dataset.entryModule.includes("ModelingApp")) {
            modelingApp.renderInto(mainSection);
            sessionStorage.setItem("currentMenuSelectionIndex", menuItem.dataset.menuIndex);
            triggerModelingApplicationFirstLoad();
            document.title += " Modeling Application";
        } else {
            homepage.renderInto(mainSection);
            sessionStorage.setItem("currentMenuSelectionIndex", menuItem.dataset.menuIndex);
            document.title += " Home";
        }
    });
}

// TODO reload resets modeling application => name disappears --> overlay or save
window.onload = () => {
    document.title = "CNA Modeling:";

    // handle rendering on page loading
    switch (sessionStorage.getItem("currentMenuSelectionIndex")) {
        case "1":
            navbarItems.get("1")?.classList.add("active");;
            homepage.renderInto(mainSection);
            document.title += " Home";
            sessionStorage.setItem("currentMenuSelectionIndex", "1");
            break;
        case "2":
            navbarItems.get("2")?.classList.add("active");
            modelingApp.renderInto(mainSection);
            document.title += " Modeling Application";
            sessionStorage.setItem("currentMenuSelectionIndex", "2");
            // TODO
            const overlayEvent = new Event("openModelingApplicationOverlay");
            document.getElementById("app")?.dispatchEvent(overlayEvent);
            break;
        default:
            navbarItems.get("1")?.classList.add("active");
            homepage.renderInto(mainSection);
            document.title += " Home";
            sessionStorage.setItem("currentMenuSelectionIndex", "1");
            break;
    }
}

const triggerModelingApplicationFirstLoad = () => {
    if (!(sessionStorage.getItem("reloadModelingApplication"))) {
        // trigger modeling app overlay
        const overlayEvent = new Event("openModelingApplicationOverlay");
        document.getElementById("app")?.dispatchEvent(overlayEvent);
        sessionStorage.setItem("reloadModelingApplication", true);
    }
}

// todo remove from here
document.querySelector("a.navbar-brand").addEventListener("click", (event) => {
    console.log(modelingApp.getModeledSystemEntity());
});