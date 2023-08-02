/* dom.js */

function init() {
  let element = document.getElementById("walkBtn");
  element.addEventListener("click", function () {
    walk();
  });

  element = document.getElementById("walkAdvancedBtn");
  element.addEventListener("click", function () {
    advancedWalk();
  });

  element = document.getElementById("modifyBtn");
  element.addEventListener("click", function () {
    modify();
  });

  element = document.getElementById("advancedModifyBtn");
  element.addEventListener("click", function () {
    advancedModify();
  });

  element = document.getElementById("addBtn");
  element.addEventListener("click", function () {
    add();
  });

  element = document.getElementById("advancedAddBtn");
  element.addEventListener("click", function () {
    advancedAddition();
  });

  element = document.getElementById("removeBtn");
  element.addEventListener("click", function () {
    remove();
  });

  element = document.getElementById("deleteBtn");
  element.addEventListener("click", function () {
    safeDelete();
  });

  element = document.getElementById("deleteSelectorBtn");
  element.addEventListener("click", function () {
    deleteSelector();
  });

  element = document.getElementById("basicCloneBtn");
  element.addEventListener("click", function () {
    basicClone();
  });

  element = document.getElementById("advancedCloneBtn");
  element.addEventListener("click", function () {
    advancedClone();
  });
}

function walk() {
  let el;
  let textArea = document.getElementById("walkOutput");

  el = document.getElementById("p1");
  textArea.value += showNode(el) + `\n\n`;

  el = el.firstChild;
  textArea.value += showNode(el) + `\n\n`;

  el = el.nextSibling;
  textArea.value += showNode(el) + `\n\n`;

  el = el.lastChild;
  textArea.value += showNode(el) + `\n\n`;

  el = el.parentNode.parentNode.parentNode;
  textArea.value += showNode(el) + `\n\n`;

  el = el.querySelector("section > *");
  textArea.value += showNode(el);
}

function showNode(el) {
  let nodeType = el.nodeType;
  let nodeName = el.nodeName;
  let nodeValue = el.nodeValue;

  return `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`;
}

function traverseWalk(node, indent = 0) {
  let output = "";
  for (let i = 0; i < indent; i++) {
    output += "--";
  }
  output += node.nodeName + "\n";

  for (let i = 0; i < node.children.length; i++) {
    output += traverseWalk(node.children[i], indent + 1);
  }
  return output;
}

function advancedWalk() {
  let rootElement = document.documentElement;
  let textArea = document.getElementById('walkAdvancedOutput');
  let output = traverseWalk(rootElement);

  textArea.value = output;
}

function modify() {
  let el = document.getElementById("p1");

  // You can do all the properties one by one if you know them in HTML
  el.title = "I was changed by JS";

  // you can update the style as a string
  // el.style = 'color: blue; font-size: 1em;';

  // you also may prefer to update on the CSS object.  This is the same as above
  // el.style.color = 'blue';
  // el.style.fontSize = '1em';
  // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

  // you can also update the class list
  el.classList.add("fancy");

  // you can also update the dataset which change data-* attributes
  el.dataset.cool = "true"; // data-cool="true"
  el.dataset.coolFactor = "9000"; //data-cool-factor="9000"
}

function advancedModify() {
  let h1Element = document.querySelector("h1");
  h1Element.innerText = `DOM Manipulation is Fun!`;

  let colorTag = Math.floor(Math.random() * 6) + 1;
  console.log(colorTag);
  h1Element.style.color = `var(--darkcolor${colorTag})`;

  let pElement = document.querySelector("p");
  if (pElement.classList.contains("shmancy")) {
    pElement.classList.remove("shmancy");
  } else {
    pElement.className = "";
    pElement.classList.add("shmancy");
  }
}

function add() {
  let p, em, txt1, txt2, txt3;

  // first we do things the long old-fashioned standard DOM way
  p = document.createElement("p"); // <p></p>
  em = document.createElement("em"); // <em></em>
  txt1 = document.createTextNode("This is a "); // "This is a"
  txt2 = document.createTextNode("test"); // "test"
  txt3 = document.createTextNode(" of the DOM"); // " of the DOM"

  p.appendChild(txt1); // <p>This is a</p>
  em.appendChild(txt2); // <em>test</em>
  p.appendChild(em); // <p>This is a<em>test</em></p>
  p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

  // go an insert this new copy below the old one
  let oldP = document.getElementById("p1");
  oldP.parentNode.insertBefore(p, oldP.nextSibling);

  // Alternative method using innerHTML and insertAdjacentHTML
  // let oldP = document.getElementById('p1');
  // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
  // clearly short hands are pretty easy!
}

function advancedAddition() {
  let selector = document.getElementById("selectAdd");
  let outputText = document.getElementById("output-advanced-add");
  let currentDate = new Date().toLocaleString();

  switch (selector.value) {
    case "text":
      let textNode = document.createTextNode("New Text Node - " + currentDate);
      outputText.appendChild(textNode);
      break;
    case "comment":
      let comment = document.createComment("New Comment - " + currentDate);
      outputText.appendChild(comment);
      alert("New Comment has been added with the date: " + currentDate);
      break;
    case "element":
      let newElement = document.createElement("p");
      newElement.textContent = "New Element - " + currentDate;
      outputText.appendChild(newElement);
      break;
  }
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
  let controlsSection = document.getElementById("controls");
  let bodyChildren = document.body.childNodes;
  for (let i = bodyChildren.length - 1; i >= 0; i--) {
    if (
      bodyChildren[i] !== controlsSection &&
      bodyChildren[i].nodeType === Node.ELEMENT_NODE
    ) {
      document.body.removeChild(bodyChildren[i]);
    }
  }
}

function deleteSelector() {
  let selector = document.getElementById("deleteSelector").value;

  if (document.getElementById(selector)) {
    let els = document.querySelectorAll("#" + selector);
    els.forEach((element) => {
      element.remove();
    });
  } else if (document.getElementsByClassName(selector).length > 0) {
    let els = document.querySelectorAll("." + selector);
    els.forEach((element) => {
      element.remove();
    });
  } else if (document.getElementsByTagName(selector).length > 0) {
    let els = document.querySelectorAll(selector);
    els.forEach((element) => {
      element.remove();
    });
  } else {
    alert(
      "The following CSS selector does not exist (make sure you do not type # or . when specifying the selector)"
    );
  }
}

function basicClone() {
  let el = document.getElementById('p1');
  let clone = el.cloneNode(true);
  let outputClone = document.getElementById('output-basic-clone');

  clone.removeAttribute("class");
  clone.removeAttribute("id");

  outputClone.append(clone);
}

function advancedClone() {
  let templates = document.getElementById("card-container");
  if (!templates) {
    return alert("Warning: Template does not exist")
  };
  let container = document.getElementById('output-basic-clone');
  let clone = templates.content.cloneNode(true);
  let uniqueContent = {};

  // Make more elements here by using a case statement
  uniqueContent = {
    title: "Cloud of dust",
    img: "/images/card-1.jpg",
    text: "This is an image of a nebula captured by the james web telescope",
    link: "https://www.nasa.gov/image-feature/goddard/2022/nasa-s-webb-reveals-cosmic-cliffs-glittering-landscape-of-star-birth"
  };


  clone.querySelector('.card-title').innerText = uniqueContent.title;
  clone.querySelector('.card-img img').src = uniqueContent.img;
  clone.querySelector('.card-info p').innerText = uniqueContent.text;
  clone.querySelector('.card-link').href = uniqueContent.link;

  let clonedTemplate = document.createElement('template');
  clonedTemplate.content.appendChild(clone);
  clonedTemplate.setAttribute('id', `card-container-${uuidv4()}`);

  container.appendChild(clonedTemplate);
}

// function from the following site https://www.geeksforgeeks.org/how-to-create-a-guid-uuid-in-javascript/
function uuidv4() {
  return 'xxxx'
    .replace(/[xy]/g, function (c) {
      const r = Math.random() * 4 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(4);
    });
}

window.addEventListener("DOMContentLoaded", init);
