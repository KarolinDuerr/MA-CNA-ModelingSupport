/**
 * Configuration of the available entity shapes  
 */
const SidebarEntityShapes = {

    Component: {
        index: 1,
        shape: new joint.shapes.qualityModel.Component({
            position: { x: 20, y: 26 },
            size: { width: 100, height: 45 },
            attrs: {
                root: {
                    title: "cna.qualityModel.Component"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: "Component",
                    }
                }
            }
        })
    },

    Service: {
        index: 2,
        shape: new joint.shapes.qualityModel.Service({
            position: { x: 145, y: 18 },
            size: { width: 80, height: 45 },
            attrs: {
                root: {
                    title: "cna.qualityModel.Service"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: "Service"
                    }
                }
            }
        })
    },

    BackingService: {
        index: 3,
        shape: new joint.shapes.qualityModel.BackingService({
            position: { x: 20, y: 100 },
            size: { width: 100, height: 45 },
            attrs: {
                root: {
                    title: "cna.qualityModel.BackingService"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: "Backing Service",
                    }
                }
            }
        })
    },

    StorageBackingService: {
        index: 4,
        shape: new joint.shapes.qualityModel.StorageBackingService({
            position: { x: 145, y: 100 },
            size: { width: 80, height: 60 },
            attrs: {
                root: {
                    title: "cna.qualityModel.StorageBackingService"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: "Storage Backing Service",
                    }
                }
            }
        })
    },

    Endpoint: {
        index: 5,
        shape: new joint.shapes.qualityModel.Endpoint({
            position: { x: 41, y: 182 },
            size: { width: 55, height: 55 },
            attrs: {
                root: {
                    title: "cna.qualityModel.Endpoint"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: "Endpoint",
                    }
                }
            }
        })
    },

    ExternalEndpoint: {
        index: 6,
        shape: new joint.shapes.qualityModel.ExternalEndpoint({
            position: { x: 155, y: 182 },
            size: { width: 55, height: 55 },
            attrs: {
                root: {
                    title: "cna.qualityModel.ExternalEndpoint"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: 'External Endpoint',
                    }
                }
            }
        })
    },

    Infrastructure: {
        index: 7,
        shape: new joint.shapes.qualityModel.Infrastructure({
            position: { x: 20, y: 264 },
            size: { width: 100, height: 45 },
            attrs: {
                root: {
                    title: "cna.qualityModel.Infrastructure"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: "Infrastructure",
                    }
                }
            }
        })
    },

    DataAggregate: {
        index: 8,
        shape: new joint.shapes.qualityModel.DataAggregate({
            position: { x: 140, y: 264 },
            size: { width: 45, height: 25 },
            attrs: {
                root: {
                    title: "cna.qualityModel.DataAggregate"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: 'Data Aggregate',
                    }
                }
            }
        })
    },

    RequestTrace: {
        index: 9,
        shape: new joint.shapes.qualityModel.RequestTrace({
            position: { x: 18, y: 348 },
            size: { width: 110, height: 45 },
            attrs: {
                root: {
                    title: "cna.qualityModel.RequestTrace"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: "Request Trace",
                    }
                }
            }
        })
    },

    BackingData: {
        index: 10,
        shape: new joint.shapes.qualityModel.BackingData({
            position: { x: 147, y: 346 },
            size: { width: 80, height: 60 },
            attrs: {
                root: {
                    title: "cna.qualityModel.BackingData"
                },
                body: {
                    class: "entityHighlighting"
                },
                label: {
                    fontSize: 11,
                    textWrap: {
                        text: 'Backing Data',
                    }
                }
            },
        })
    },

    Link: {
        index: 11,
        shape: new joint.shapes.qualityModel.Link({
            source: { x: 20, y: 434 },
            target: { x: 120, y: 434 },
            labels: [
                {
                    attrs: {
                        rect: {
                            fill: "none"
                        },
                        text: {
                            text: "Link"
                        }
                    },
                    position: {
                        ref: "text",
                        offset: 18
                    }
                }
            ],
            attrs: {
                root: {
                    title: "cna.qualityModel.Link"
                },
                wrapper: {
                    cursor: "move", // TODO after drag change to "pointer"
                    class: "sidebarConnection"
                }
            }
        })
    },

    DeploymentMapping: {
        index: 12,
        shape: new joint.shapes.qualityModel.DeploymentMapping({
            source: { x: 145, y: 434 },
            target: { x: 225, y: 434 },
            labels: [
                {
                    attrs: {
                        rect: {
                            fill: "none"
                        },
                        text: {
                            text: joint.util.breakText("Deployment Mapping", { width: "100" })
                        }
                    },
                    position: {
                        ref: "text",
                        offset: 22
                    }
                }
            ],
            attrs: {
                root: {
                    title: "cna.qualityModel.DeploymentMapping"
                },
                wrapper: {
                    cursor: "move", // TODO after drag change to "pointer"
                    class: "sidebarConnection"
                }
            }
        })
    }
}

export default SidebarEntityShapes;