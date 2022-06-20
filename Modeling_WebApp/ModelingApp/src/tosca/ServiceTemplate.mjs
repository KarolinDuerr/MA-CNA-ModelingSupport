import ToscaTopologyTemplate from "./TopologyTemplate.mjs";

class MetaDataContent {

    template_name;

    constructor(name) {
        this.template_name = name;
    }
};

class ToscaServiceTemplate {

    tosca_definitions_version = "tosca_simple_yaml_1_3";

    metadata;

    topology_template;

    constructor(name, nodeTemplates, relationshipTemplates) {
        this.metadata = new MetaDataContent(name);
        this.topology_template = new ToscaTopologyTemplate(nodeTemplates, relationshipTemplates);
    }

}

export default ToscaServiceTemplate;