class Homepage {

    renderInto (parentElement) {
        parentElement.insertAdjacentHTML("beforeend", this.getHomepageCreatedTemplate());
    }

    getHomepageCreatedTemplate() {
        return `<div class="jumbotron jumbotron-fluid text-center">
        <div class="container-fluid">
            <h1>Welcome</h1>
            <p>TODO</p>
        </div>
    </div>
    <div class="container-fluid h-100" style="border-style: solid; border-color: yellow;">
    <div>`;
    }
}

// export const renderPageInto = (parentElement, existingHomepage) => {
//     const homePage = existingHomepage || new Homepage();
//     parentElement.insertAdjacentHTML("beforeend", homePage.getHomepageCreatedTemplate());
// }

export default Homepage;