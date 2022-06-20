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
    <div class="container-fluid h-100">
    <div>`;
    }
}

export default Homepage;