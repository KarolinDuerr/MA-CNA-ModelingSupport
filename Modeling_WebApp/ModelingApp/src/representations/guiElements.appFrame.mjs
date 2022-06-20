class ModelingApplicationFrame {

    #applicationNameElementId = "applicationNameInputField";

    renderApplicationFrame(parentId) {
        $("#" + parentId).empty();
        $("#" + parentId).append(this.getApplicationFrameTemplate);
    }

    getApplicationFrameTemplate() {
        return `${this.#createInitialOverlay()}${this.#createApplicationArea()}`;
    }

    #createInitialOverlay() {
        return `<div id="init-overlay" class="init-overlay">
            <div class="init-overlay-content">
                <h2 class="user-select-none text-center">Welcome to the CNA Modeling Application!</h2>
                <div id="init-firstInformation">
                    <p class="user-select-none">// TODO</p>
                    <button id="createNewDiagramBtn" type="button" class="btn btn-outline-dark btn-light"><i
                            class="fa-solid fa-pencil"></i> Create new
                        diagram</button>
                </div>
                <div id="startModelingForm">
                    <p class="user-select-none">Please type the application name of the System entity you want to model 
                        in the following form. Afterwards, you can start modeling your application's architecture.</p>
                    <form class="needs-validation" novalidate>
                        <div class="form-row">
                            <div class="input-group has-validation">
                                <div class="input-group-prepend">
                                    <span class="user-select-none input-group-text">Application Name</span>
                                </div>
                                <input name="systemName" type="text" class="form-control"
                                    id="${this.#applicationNameElementId}" placeholder="Application name of your System"
                                    required>
                                <div class="validationError invalid-feedback">
                                    Please provide an application name.
                                </div>
                            </div>
                            <div class="startModelingBtnArea form-group row">
                                <div class="col-auto">
                                    <button id="startModelingBtn" type="button" class="btn btn-outline-dark"><i
                                            class="fa-solid fa-pencil"></i> Start
                                        modeling</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
    }

    #createApplicationArea() {
        return `<div id="app">
            <div id="appToolbarContainer" class="app-header d-print-none"></div>
            <div class="app-body">
                <div class="entityShapes-sidebar-container d-print-none"></div>
                <div class="visible-modeling-area"></div>
                <div class="details-container d-print-none"></div>
            </div>
            <div id="modals" class="d-print-none"></div>
        </div>`;
    }

    get getApplicationNameElementId() {
        return this.#applicationNameElementId;
    }
}

export default ModelingApplicationFrame;