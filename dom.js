/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('walkAdvancedBtn')
    element.addEventListener('click', function () {
        advancedWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('advancedAddBtn');
    element.addEventListener('click', function () {
        advancedAddition();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('deleteBtn');
    element.addEventListener('click', function () {
        safeDelete(); 
    });

    element = document.getElementById('deleteSelectorBtn');
    element.addEventListener('click', function () {
        deleteSelector(); 
    });
}

function walk() {
   let el;
   let textArea = document.getElementById('walkOutput'); 

   el = document.getElementById('p1');
   textArea.value += showNode(el) + `\n\n`;

   el = el.firstChild;
   textArea.value += showNode(el) + `\n\n`;

   el = el.nextSibling;
   textArea.value += showNode(el) + `\n\n`;

   el = el.lastChild;
   textArea.value += showNode(el) + `\n\n`;

   el = el.parentNode.parentNode.parentNode;
   textArea.value += showNode(el) + `\n\n`;

   el = el.querySelector('section > *');
   textArea.value += showNode(el);

}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    return `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`;
}

function traverseWalk(node, indent=0) {
    let output = "";
    stack.forEach(() => {
        output += "--";
    });
    output += node.nodeName + "\n";

    let children = Array.from(node.children);
    for(let i=0; i < children.length; i++){
        stack.push(i);
        output += traverseWalk(children[i], stack);
        stack.pop();
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
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advancedModify() {
    let h1Element = document.querySelector('h1');
    h1Element.innerText = `DOM Manipulation is Fun!`;

    let colorTag = Math.floor(Math.random() * 6) + 1; 
    console.log(colorTag);
    h1Element.style.color = `var(--darkcolor${colorTag})`; 

    let pElement = document.querySelector('p');
    pElement.classList.toggle('shmancy');
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function advancedAddition() {
    let selector = document.getElementById('selectAdd');
    let outputText = document.getElementById('output-advanced-add');
    let currentDate = new Date().toLocaleString();
    
    console.log(selector.value);
    console.log('Enter switch case');
    switch (selector.value) {
        case 'text':
            let textNode = document.createTextNode('New Text Node - ' + currentDate);
            outputText.appendChild(textNode);
            break;
        case 'comment':
            let comment = document.createComment('New Comment - ' + currentDate);
            outputText.appendChild(comment);
            alert('New Comment has been added with the date: ' + currentDate);
            break;
        case 'element':
            let newElement = document.createElement('p');
            newElement.textContent = 'New Element - ' + currentDate;
            outputText.appendChild(newElement);
            break;
    }
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
    let controlsSection = document.getElementById('controls');
    let bodyChildren = document.body.childNodes;
    for (let i = bodyChildren.length - 1; i >= 0; i--) { 
        if (bodyChildren[i] !== controlsSection && bodyChildren[i].nodeType === Node.ELEMENT_NODE) {
            document.body.removeChild(bodyChildren[i]);
        }
    }
}

function deleteSelector() {

}

window.addEventListener('DOMContentLoaded', init);
