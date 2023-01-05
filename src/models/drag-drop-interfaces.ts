//Drag & Drop interfaces
//add this interface to classes that renders an element that can be dragged --> ProjectItem
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  //add this interface to classes where the dragged objects are dropped into --> ProjectList
  export interface DragTarget {
    //tells the browser the thing your dragging something over is a valid DragTarget
    dragOverHandler(event: DragEvent): void;
    //react to the drop
    dropHandler(event: DragEvent): void;
    //if we're giving visual feedback to the user when no drop happens
    dragLeaveHandler(event: DragEvent): void;
  }
}
