import ModelingApplicationFrame from './src/representations/guiElements.appFrame.mjs'
import SystemEntityManager from './src/systemEntityManager.mjs';
import ModelingAppMainView from './src/views/modelingAppMainView.mjs'

class ModelingApplication {

    // TODO add css?

    "use strict";

    #currentSystemName = "";
    #currentSystemGraph = null;

    #systemEntityManager = null;

    constructor() {
        this.#currentSystemGraph = new joint.dia.Graph;
        this.#systemEntityManager = new SystemEntityManager(this.#currentSystemGraph);
    }

    renderInto(parentElement) {
        const appFrame = new ModelingApplicationFrame();
        parentElement.insertAdjacentHTML("beforeend", appFrame.getApplicationFrameTemplate());

        document.getElementById("app").addEventListener("openModelingApplicationOverlay", () => {
            document.getElementById("init-overlay").style.display = "block";
            $("#appToolbarContainer button").attr("disabled", true);
        });

        document.getElementById("createNewDiagramBtn").onclick = () => {
            document.getElementById("init-firstInformation").style.display = "none";
            document.getElementById("startModelingForm").style.display = "block";
        }

        this.#handleStartModelingClick();
        this.#handleEnterKey(appFrame.getApplicationNameElementId);

        const mainView = new ModelingAppMainView({
            el: '#app',
            modelingAreaGraph: this.#currentSystemGraph,
            currentSystemName: this.getCurrentSystemName
        });

        if (this.getCurrentSystemName) {
            $("#appNameTitle").val(this.getCurrentSystemName);
        }

        $("#appNameTitle").on("systemNameChanged", (event) => {
        // this.#currentSystemGraph.on("systemNameChanged", (event) => {
            this.setCurrentSystemName = event.updatedSystemName;
        });

        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-tooltip-toggle="tooltip"]').tooltip();
        });
    }

    getModeledSystemEntity() {
        return this.#systemEntityManager.getCurrentSystemEntity;
    }

    get getCurrentSystemName() {
        return this.#currentSystemName;
    }

    set setCurrentSystemName(systemName) {
        if (!systemName) {
            return;
        }

        if (!this.#currentSystemName) {
            $("#appNameTitle").trigger({
                type: "initialSystemName",
                systemName: systemName
            });
            this.#currentSystemGraph.trigger("initialSystemName", { systemName: systemName });
        }

        this.#currentSystemName = systemName;
        // sessionStorage ?
    }

    #handleStartModelingClick() {
        document.getElementById("startModelingBtn").onclick = () => {
            this.#configureGetSystemName();
        }
    }

    #handleEnterKey(inputFieldId) {
        document.getElementById(inputFieldId).addEventListener("keydown", (event) => {
            if (event.key?.localeCompare("Enter") === 0) {
                event.preventDefault();
                this.#configureGetSystemName();
            }
        });
    }

    #configureGetSystemName() {
        let providedAppName = $("#applicationNameInputField").val();
        let forms = $("#init-overlay .needs-validation");

        for (const form of forms) {
            form.classList.add('was-validated');
        }

        if (!providedAppName) {
            return;
        }

        this.setCurrentSystemName = providedAppName;
        $("#appNameTitle").val(providedAppName);
        $("#init-overlay").toggle();
        $("#appToolbarContainer button").attr("disabled", false);
    }
}

export default ModelingApplication;
