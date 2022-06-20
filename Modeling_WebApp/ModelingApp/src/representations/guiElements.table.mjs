import { PropertyContentType } from "../config/detailsSidebarConfig.mjs";

class Table {

    #context = "";
    #tableId = "";

    #tableColumnHeaders = "";
    #tableRows = "";

    #numberOfColumns = 0;

    constructor(context, tableId) {
        this.#context = context;
        this.#tableId = tableId;
    }

    render(appendToElementId) {
        const table = this.getCreatedTableTemplate();

        let containerElement = $("#" + appendToElementId);

        if (containerElement.length) {
            // ensure container exists
            containerElement.append(table);
            // TODO set $ entire table or just body?
        } else {
            // error?
        }
    }

    getCreatedTableTemplate(hoverTableItems = true) {
        return `<div class="table-responsive">
            <table id="${this.#tableId}-table" class="table ${hoverTableItems ? 'table-hover' : ''}">
                <thead id="${this.#tableId}-tableHead" class="thead-dark">
                    ${this.#tableColumnHeaders}
                </thead>
                <tbody id="${this.#tableId}-tableBody">
                    ${this.#tableRows}
                </tbody>
            </table>
        </div>`;
    }

    create(tableConfig) {
        this.createColumnHeaders(tableConfig.tableColumnHeaders);
        this.createRows(tableConfig.tableRows);
    }

    /**
     * 
     * @param {[{colspan: "[optional]", text: }]} tableColumns [{}]
     */
    createColumnHeaders(columnProperties) {
        if (!columnProperties || !(Array.isArray(columnProperties))) {
            return;
        }

        this.#numberOfColumns = columnProperties.length;
        let headers = "<tr>";
        for (const columnHeader of columnProperties) {
            headers = headers + `<th scope="col" ${columnHeader.colspan ? `colspan="${columnHeader.colspan}"` : ''}>${columnHeader.text}</th>`;
        }
        headers = headers + "</tr>";
        this.#tableColumnHeaders = headers;
    }

    // create(tableColumns =[]) {
    //     this.#numberOfColumns = tableColumns.length;
    //     let headers = "<tr>";
    //     for (const columnHeader of tableColumns) {
    //         const colspan = columnHeader.colspan ? 'colspan="' + columnHeader.colspan + '"' : null;
    //         headers = headers + '<th scope="col"' + colspan + '>' + columnHeader.text + '</th>';
    //     }
    //     headers = headers + "</tr>";

    //     let tableHead = '<thead id="' + this.#tableId + '-tableHead" class="thead-dark">' + headers + '<thead>';
    //     let tableBody = '<tbody id="' + this.#tableId + '-tableBody"></tbody>';
    //     let table = '<table id="' + this.#tableId + '" class="table">' + tableHead + tableBody + '</table>';
    //     $("#" + this.#tableContainerElement).append(table);
    //     this.$tableBody = $("#" + this.#tableId + "-tableBody");
    // }

    /**
     * 
     * @param {[{}]} rowProperties [{}] 
     */
    createRows(rows) {
        if (!rows || !(Array.isArray(rows))) {
            return;
        }

        let providedRows = "";

        for (const row of rows) {
            providedRows = providedRows + this.createRow(row);
        }
        // TODO
        this.#tableRows = providedRows;
    }

    /**
     * 
     * @param {{}} rowProperties {}
     */
    createRow(rowContent) {
        let hasAttributes = "attributes" in rowContent;
        let numberOfRowElements = hasAttributes ? Object.keys(rowContent).length - 1 : Object.keys(rowContent).length;

        // TODO have th with ID?
        if (!rowContent || (numberOfRowElements !== this.#numberOfColumns)) {
            throw new Error("The provided row includes too many or too less row elements for the number of available columns.");
        }

        let rowToAdd = "";

        Object.keys(rowContent).forEach((columnKey) => {
            const columnEntry = rowContent[columnKey];
            if ("attributes".localeCompare(columnKey) === 0) {
                // ignore -> representation relevant information
            } else if (joint.util.isObject(columnEntry)) {
                const specialContent = this.#createSpecialContent(columnEntry, columnKey);
                rowToAdd = rowToAdd + `<td data-table-context="${columnKey}">${specialContent}</td>`;
            } else {
                rowToAdd = rowToAdd + `<td data-table-context="${columnKey}">${columnEntry}</td>`;
            }
        });

        return `<tr class="tableRow ${hasAttributes ? rowContent.attributes.representationClass : ''}${hasAttributes && rowContent.attributes.disabled ? ' text-muted' : ''}">
            ${rowToAdd}
        </tr>`;
    }

    #createSpecialContent(rowColumnContent, columnContext="") {
        let specialContent = ""
        switch (rowColumnContent.contentType) {
            case PropertyContentType.CHECKBOX_WITHOUT_LABEL:
                const checkboxProperties = this.#createInputProperties(rowColumnContent);
                specialContent  = `<div class="form-check">
                    <input class="dialogCheckBox form-check-input position-static" type="checkbox" id="${rowColumnContent.id}-dialogCheckBox" 
                    value="${rowColumnContent.id}" data-entity-property="${this.#tableId}-${columnContext}" ${checkboxProperties}>
                </div>`
                break;        
            default:
                break;
        }
        return specialContent;
    }

    #createInputProperties(rowColumnContent) {
        // TODO check if same behaviour.... 
        return `${rowColumnContent.disabled ? "disabled" : ''} ${rowColumnContent.checked ? "checked" : ''} ${rowColumnContent.required ? "required" : ''}`;
    }

}

export default Table;