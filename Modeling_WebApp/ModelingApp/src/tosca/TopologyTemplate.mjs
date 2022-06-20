class ToscaTopologyTemplate {
    
    node_templates;

    relationship_templates;

    constructor(nodeTemplates, relationshipTemplates) {
        // this.node_templates = {
        //     test: new RootComponent(),
        //     test2: new RootComponent()
        // };

        this.node_templates = nodeTemplates;
        this.relationship_templates = relationshipTemplates;
    }
}

export default ToscaTopologyTemplate;