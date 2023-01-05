/// <reference path="base-components.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../models/drag-drop-interfaces.ts"/>
/// <reference path="../state/project-state.ts"/>

namespace App {
  //Project List Class
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    // templateElement: HTMLTemplateElement;
    // hostElement: HTMLDivElement;
    // element: HTMLElement; //section element doesn't exist so we use element
    assignedProjects: Project[];

    constructor(private status: "active" | "finished") {
      super("project-list", "app", false, `${status}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.status}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        // const listItem = document.createElement("li");
        // listItem.textContent = prjItem.title;
        // listEl.appendChild(listItem);
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
      //does data exist and is the data format allowed
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        //the default drag and drop is to not allow dropping. So we prevent it
        event.preventDefault();
        //then update the background
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @Autobind
    dropHandler(event: DragEvent) {
      const prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.status === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @Autobind
    dragLeaveHandler(_event: DragEvent) {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);
      //register a listener function
      //gets a list of projects
      projectState.addListener((projects: Project[]) => {
        //filter the projects
        const relevantProjects = projects.filter((prj) => {
          if (this.status === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });

        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      //fill the blank spaces in the template with content

      //add dynamic id to the unordered list
      const listId = `${this.status}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      //create dynamic heading for the section
      this.element.querySelector("h2")!.textContent =
        this.status.toUpperCase() + " PROJECTS";
    }
  }
}
