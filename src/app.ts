//special TS usage to make interfaces available
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-input.ts" />
namespace App {
  new ProjecInput();
  //instantiate to create two lists
  new ProjectList("active");
  new ProjectList("finished");
}
