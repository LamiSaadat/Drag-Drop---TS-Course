/// <reference path="base-components.ts"/>
/// <reference path="../models/drag-drop-interfaces.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../models/project.ts"/>

namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    //transofrm data when you retrieve it
    get persons() {
      return this.project.people === 1
        ? "1 person assigned"
        : `${this.project.people} persons assigned`;
    }

    //the hostElementId and the newElementId will be different for each item so we are getting them from the constructor and passing it into the super
    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
      //transfer then info in text format and the id so to identify the project
      //transfer small amount of data to save memory
      event.dataTransfer!.setData("text/plain", this.project.id);
      //controls how the cursor looks like and tells the browser about our intentions. We can also use "copy"
      event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler(_event: DragEvent) {
      console.log("DragEnd");
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent = this.persons;
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}
