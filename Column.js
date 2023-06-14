import KanbanAPI from "./KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
    constructor(id, title) {
        const topDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban_column-title");
        this.elements.items = this.elements.root.querySelector(".kanban_column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban_add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click", () => {
            const newItem = KanbanAPI.insertItem(id, "");

            this.renderItem(newItem);
        });

        KanbanAPI.getItems(id).forEach(item => {
            this.renderItem(item);
        });
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban_column">
                <div class="kanban_column-title"></div>
                <hr>
                <div class="kanban_column-items"></div>
                <button class="kanban_add-item" type="button">+ Add</button>
            </div>
        `).children[0];
        // ADDED A LINE TO SEPARATE TITLE FROM TASKS
    }

    renderItem(data) {
        const item = new Item(data.id, data.content);

        this.elements.items.appendChild(item.elements.root);
    }
}