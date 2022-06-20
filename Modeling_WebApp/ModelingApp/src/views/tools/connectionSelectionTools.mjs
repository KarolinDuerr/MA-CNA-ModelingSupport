let CustomRemoveLinkButton = joint.linkTools.Remove.extend({
    name: "remove",
    children: [{
        tagName: "title",
        selector: "iconTooltip",
        textContent: "Remove entire entity"
    },
    {
        tagName: "circle",
        selector: "button",
        attributes: {
            r: 7,
            fill: "#33334F",
            cursor: "pointer",
            class: "entityTool"
        }
    }, {
        tagName: "path",
        selector: "icon",
        attributes: {
            d: "M -3 -3 3 3 M -3 3 3 -3",
            fill: "none",
            stroke: "#FFFFFF",
            "stroke-width": 2,
            pointerEvents: "none"
        }
    }]
});

class ConnectionSelectionTools extends joint.dia.ToolsView {

    "use strict";

    tools = []

    constructor(sidebarAddedLink = false) {
        super({ name: "ConnectionTools" });

        this.options.tools = [
            this.createRemoveTool(),
            this.createArrowHeadTool(),
            this.createSourceAnchorTool(),
            this.createTargetAnchorTool(),
            this.createVerticesTools(),
            this.createSegmentsTool()
        ]

        if (sidebarAddedLink) {
            this.options.tools.push(this.createSourceArrowHeadTool());
        }

        this.tools = this.options.tools;
    }

    createRemoveTool() {
        return new CustomRemoveLinkButton({
            focusOpacity: 0.5,
            distance: 20,
            offset: -15
        });
    }

    createSourceArrowHeadTool() {
        let sourceArrowheadTool = new joint.linkTools.SourceArrowhead({
            focusOpacity: 0.5
        });

        return sourceArrowheadTool;
    }

    createArrowHeadTool() {
        let targetArrowheadTool = new joint.linkTools.TargetArrowhead({
            focusOpacity: 0.5
        });

        return targetArrowheadTool;
    }

    createSourceAnchorTool() {
        let sourceAnchor = new joint.linkTools.SourceAnchor({
            focusOpacity: 0.5
        });
        sourceAnchor.options.customAnchorAttributes.r = 4;
        sourceAnchor.options.defaultAnchorAttributes.r = 5;

        return sourceAnchor;
    }

    createTargetAnchorTool() {
        return new joint.linkTools.TargetAnchor({
            focusOpacity: 0.5
        });
    }

    createSegmentsTool() {
        let segmentsTool =  new joint.linkTools.Segments({
            focusOpacity: 0.5
        });

        return segmentsTool;
    }

    createVerticesTools() {
        let verticesTool = new joint.linkTools.Vertices({
            focusOpacity: 0.5,
            vertexAdding: false
        });

        return verticesTool;
    }
}

export default ConnectionSelectionTools;