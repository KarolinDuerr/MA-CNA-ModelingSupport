class AccordionCollapse {

    #context = "";

    #accordionContainerElement = "";
    #containerId = "";

    #overallHeadline = "";

    #collapsibleGroups = [];

    #hiddenCollapsibleGroups = new Set();

    #visible = true;

    /**
     * Creates a Bootstrap-based Accordion Collapse element (see {@link https://getbootstrap.com/docs/4.6/components/collapse/} 
     * for more information).
     * 
     * @param {string} accordionContainerElement The document element to add this Accordion Collapse element.
     * @param {string} context The context to use as pre-string for unique classes.
     * @param {string} containerId The ID for this entire Accordion Collapse element.
     * @param {string} overallHeadline The headline for this Accordion Collapse element. 
     */
    constructor(accordionContainerElement, context, containerId, overallHeadline) {
        this.#context = context;
        this.#accordionContainerElement = accordionContainerElement;
        this.#containerId = containerId;
        this.#overallHeadline = overallHeadline;
    }

    /**
     * Creates an Accordion Collapse by appending the necessary div Bootstrap classes to the provided document element.
     * 
     * @param {string} headlineId ID for the overall headline in order to be able to set individual CSS properties. 
     */
    create(headlineId = "") {
        let accordionDiv = '<div class="accordion" id="' + this.#containerId + '"></div>';
        $(this.#accordionContainerElement).append(accordionDiv);
        $("#" + this.#containerId).append('<div id="' + headlineId + '"><h6>' + this.#overallHeadline + '</h6></div>');

        this.changeVisibility(false);
        $("#" + this.#containerId).keydown((event) => { this.#handleEnterKey(event); });
    }

    /**
     * Adds a collapsible group to the overall Accordion Collapse container.
     * 
     * @param {string} collapsibleGroup The name of the collapsible group, will also be used as ID basis.
     * @param {string} headlineIconClass Icont font class to add an Icon infront of the group headline text .
     * @param {string} headlineText The group headline text of the collapsible group.
     */
    addCollapsibleAccordionGroup(collapsibleGroup = "", headlineIconClass = "", headlineText = "") {
        this.#collapsibleGroups.push(collapsibleGroup);
        let cardDiv = '<div id="' + collapsibleGroup + '-card" class="' + this.#context + ' card"></div>';
        $("#" + this.#containerId).append(cardDiv);
        let cardHeader = '<div class="card-header" id="' + collapsibleGroup + '-header"></div>';
        $("#" + collapsibleGroup + "-card").append(cardHeader);
        let headerButton = '<button id="' + collapsibleGroup + '-button" class="' + this.#context + '-headlineButton btn btn-link btn-block text-left collapsed" type="button"><i class="' + this.#context + '-iconHeadline '
            + headlineIconClass + '"></i> ' + headlineText + '</button>';
        let h = '<h2 class="mb-0">' + headerButton + '</h2>';
        $("#" + collapsibleGroup + "-header").append(h);

        $("#" + collapsibleGroup + "-button").attr({
            "data-toggle": "collapse",
            "data-target": "#collapse-" + collapsibleGroup,
            "aria-expanded": "false",
            "aria-controls": "collapse-" + collapsibleGroup
        })

        let divContentContainer = '<div id="collapse-' + collapsibleGroup + '" class="collapse" aria-labelledby="' + collapsibleGroup + '-header" data-parent="#' + this.#containerId + '"></div>';
        let divContent = '<div id="' + collapsibleGroup + '-card-body" class="card-body"></div>';
        $("#" + collapsibleGroup + "-card").append(divContentContainer);
        $("#collapse-" + collapsibleGroup).append(divContent);

        $("#" + collapsibleGroup + "-button").on("click", () => { $(':focus').blur(); });

        // TODO add highlighting?
        // $("#" + collapsibleGroup + "-card").on("show.bs.collapse", () => {
        //     $("#" + collapsibleGroup + "-card").addClass("accordionCard-highlighted");
        // });
        // $("#" + collapsibleGroup + "-card").on("hide.bs.collapse", () => {
        //     $("#" + collapsibleGroup + "-card").removeClass("accordionCard-highlighted");
        // });
    }

    /**
     * Adds the HTML string to the provided collapsible group which is identified by its element ID.
     * 
     * @param {string} collapsibleGroupIdToAppendTo The ID of the collapsible group the html item is supposed to be added.
     * @param {string} contentToAdd The html content supposed to be added to the identified collapsible group.
     */
    addContentToAccordionGroup(collapsibleGroupIdToAppendTo = "", contentToAdd = "") {
        $("#" + collapsibleGroupIdToAppendTo + "-card-body").append(contentToAdd);
        $("#" + collapsibleGroupIdToAppendTo + "-card-body").children().last().attr({
            "data-group-context": collapsibleGroupIdToAppendTo,
            "data-group-id": collapsibleGroupIdToAppendTo + "-card-body"
        })
    }

    /**
     * Emtpy provided collapsible group except for the given sections. The according elements are identified
     * by their IDs.
     * 
     * @param {string} collapsibleGroupIdToEmpty The collapsible group that should be emptied.
     * @param {string[]} sectionIdToKeep The ids of the included sections that should be kept.
     */
    emptyContentOfAccordionGroup(collapsibleGroupIdToEmpty = "", sectionIdsToKeep = []) {
        let groupSections = $("[data-group-context=" + collapsibleGroupIdToEmpty + "]");
        let groupSectionsToRemove = groupSections.filter((index) => {
            return sectionIdsToKeep.includes(groupSections[index].id) === false;
        })
        groupSectionsToRemove.detach();
    }

    /**
     * Change visibility of entire Accordion Collapse Element.
     * 
     * @param {boolean} visible Decide whether the element should be visible or not. Default is true.
     */
    changeVisibility(visible = true) {
        this.#visible = visible;
        if (visible) {
            $("#" + this.#containerId).show();
            return;
        }

        $("#" + this.#containerId).hide();
    }

    /**
     * Change visibility of included collapsible group element. In case all collapsible groups of this
     * Accordion Collapse element are hidden, the entire element will be hidden too.
     * 
     * @param {string} collapsibleGroupId The ID of the collapsible group whose visibility property should be changed.
     * @param {boolean} visible Decide whether the element should be visible or not. Default is true.
     * @returns 
     */
    changeCollapsibleGroupVisibility(collapsibleGroupId, visible = true) {
        if (visible) {
            $("#" + collapsibleGroupId + "-card").show();
            this.#hiddenCollapsibleGroups.delete(collapsibleGroupId);
        } else {
            $("#" + collapsibleGroupId + "-card").hide();
            this.#hiddenCollapsibleGroups.add(collapsibleGroupId);
        }

        this.#checkForVisibleGroups();
    }

    /**
     * Change visibility of all collapsible group elements except for given group ID. In case all collapsible groups of this
     * Accordion Collapse element are hidden, the entire element will be hidden too.
     * 
     * @param {string} ignoreCollapsibleGroupId The ID of the collapsible group whose visibility property should not be changed.
     * @param {boolean} visible Decide whether the other groups should be visible or not. Default is true.
     * @returns 
     */
    changeVisibilityExceptGroupId(ignoreCollapsibleGroupId, visible = true) {
        if (visible) {
            this.#collapsibleGroups.forEach((groupId) => {
                if (ignoreCollapsibleGroupId === groupId) {
                    return;
                }
                $("#" + groupId + "-card").show();
                this.#hiddenCollapsibleGroups.delete(groupId);
            });
        } else {

            this.#collapsibleGroups.forEach((groupId) => {
                if (ignoreCollapsibleGroupId === groupId) {
                    return;
                }
                $("#" + groupId + "-card").hide();
                this.#hiddenCollapsibleGroups.add(groupId);
            });
        }

        this.#checkForVisibleGroups();
    }

    /**
     * Change for all included collapsible group elements their visibility such that they are all shown.
     */
    showAllCollapsibleGroups() {
        this.#collapsibleGroups.forEach((groupId) => {
            $("#" + groupId + "-card").show();
            this.#hiddenCollapsibleGroups.delete(groupId);
        });

        this.#checkForVisibleGroups();
    }

    /**
     * If the Accordion Collapse element includes Form elements with validation, the provided validation will 
     * be hidden if somewhere within this Accordion element the user clicks. 
     */
    // handleFormFeedback() {
    //     $("#" + this.#containerId).click((event) => {
    //         this.#hideFeedbackElements();
    //     });
    // }

    /**
     * In case all collapsible groups of this Accordion Collapse element are hidden, the entire element 
     * will be hidden too.
     */
    #checkForVisibleGroups() {
        if (this.#hiddenCollapsibleGroups.size === this.#collapsibleGroups.length) {
            // all included elements are hidden --> hide entire element
            this.changeVisibility(false);
        } else if (this.#visible === false) {
            this.changeVisibility(true);
        }
    }

    /**
     * Reacting to the keydown event.
     * 
     * @param {event} event The triggered keydown event. 
     */
    #handleEnterKey(event) {
        if (event.which == 13) {
            this.#hideFeedbackElements();

            if (event.target.type === "button") {
                let groupContext = event.target.id.replace("-button", "");
                if (this.#collapsibleGroups.includes(groupContext)) {
                    // Collapsible Property Group was collapsed/opened using enter 
                    return;
                }
                if (event.target.id.includes("-enterButton")) {
                    // ignore since event is triggered again by input field itself 
                    return;
                }
            }

            if (event.target.getAttribute("data-property-type") === "entity") {
                $("#" + this.#containerId).trigger({
                    type: "entitySpecificPropertyChanged",
                    propertyId: event.target.id,
                    originalTarget: event.target,
                    orginalEvent: event
                });
            } else {
                $("#" + this.#containerId).trigger({
                    type: "entityPropertyChanged",
                    propertyId: event.target.id,
                    propertyType: event.target.getAttribute("data-property-type"),
                    originalTarget: event.target,
                    orginalEvent: event
                });
            }

            event.preventDefault();
        }
    }

    /**
     * Hide visible validation feedback and remove valid classes from elements.
     */
    #hideFeedbackElements() {
        // TODO more efficient possible?
        $("#" + this.#containerId + " .valid-feedback:visible").hide();
        $("#" + this.#containerId + " .invalid-feedback:visible").hide();
        $("#" + this.#containerId + " .is-valid").removeClass("is-valid");
        $("#" + this.#containerId + " .is-invalid").removeClass("is-invalid");
    }
}

export default AccordionCollapse;