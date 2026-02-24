# 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?


| getElementById('id')| getElementsByClassName('class')| querySelector('selector') | querySelectorAll('selector') |
|---|---|---|---|
| It returns single element | It returns HTMLCollection (live collection)| It returns single element| It returns NodeList (static) |
| Selection type is id | Selection type is class | Selection type is id CSS selector | Selection type is CSS selector |
|Only one element should have that id. Returns null if not found.|Can return multiple elements. Live means it updates automatically if DOM changes.|Returns the first matching element. Can select by id, class, tag, or combination.|Returns all matching elements. Static, doesn’t auto-update if DOM changes.
|Example:document.getElementById('myId'); |Example:document.getElementsByClassName('myClass'); |Example:document.querySelector('.myClass');  | Example:document.querySelectorAll('.myClass'); |

# 2. How do you create and insert a new element into the DOM?
# 2. How to Create and Insert a New Element into the DOM

## 1. Create the Element
Use `document.createElement('tag')` to create a new element.

Example:  
`let newDiv = document.createElement('div');`

---

## 2. Configure the Element
Set content, attributes, or add child elements before insertion:

- Add text: `newDiv.innerText = "Hello World!";`  
- Add class or ID: `newDiv.classList.add('myClass');`  
- Add child nodes:  


---

## 3. Insert the Element

### a) Append as last child  
`parent.appendChild(newDiv);`

### b) Append with flexibility (can add text too)  
`parent.append(newDiv, 'Extra text');`

### c) Prepend as first child  
`parent.prepend(newDiv);`

### d) Insert before a specific element  
`parent.insertBefore(newDiv, referenceElement);`

### e) Insert relative to an element  
`element.insertAdjacentElement('afterend', newDiv);`  
Positions: `'beforebegin'`, `'afterbegin'`, `'beforeend'`, `'afterend'`

### f) Using innerHTML (string-based, not method)  
`parent.innerHTML += '<div class="myClass">Hello World!</div>';`

---

**Summary:**  
1. Create element → `document.createElement()`  
2. Configure content, classes, or children  
3. Insert → `appendChild`, `append`, `prepend`, `insertBefore`, `insertAdjacentElement`, or `innerHTML`

# 3. What is Event Bubbling? How does it work?

Event bubbling is a default JavaScript mechanism where an event triggered on a child element propagates upward through its parent elements in the DOM tree, one by one, from the innermost target up to the document root.

Example: Clicking a button inside a div triggers the click on the button, then its parent div, and so on up to document.

Default behavior for most events like click, keyup.

document.getElementById('parent').addEventListener('click', () => console.log('Parent clicked'));
document.getElementById('child').addEventListener('click', () => console.log('Child clicked'));

# Event Bubbling Example

## HTML
```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```


Clicking the button logs:

Child clicked
Parent clicked

# 4. What is Event Delegation? Why is it useful?

Event Delegation is when you attach a single event listener to a parent element instead of each child, and then use event.target to handle events for specific children.

Why it’s useful:

1.It Handles dynamically added elements.

2.Improves performance by reducing multiple event listeners.

Example:

document.getElementById('list').addEventListener('click', function(event) {
    if(event.target.tagName === 'LI') {
        console.log('Clicked:', event.target.innerText);
    }
});

Now you don’t need to attach a click listener to every <li>.

# 5. Difference between preventDefault() and stopPropagation()?

## Key Differences: `event.preventDefault()` vs `event.stopPropagation()`

| Feature | `event.preventDefault()` | `event.stopPropagation()` |
|---------|-------------------------|--------------------------|
| **Purpose** | Prevents the default behavior associated with the event (if it is cancelable). | Prevents the event from reaching other elements in the DOM hierarchy. |
| **Example Use Case** | Prevents a form from submitting and refreshing the page, or a link from navigating. | Prevents a click on a child element from triggering a click handler on its parent element. |
| **Effect on Propagation** | The event continues to propagate as usual unless `stopPropagation()` is also called. | The event's default action will still occur if not explicitly prevented. |
| **Effect on Default Action** | Stops the default action. | Does not stop the default action. |