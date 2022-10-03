let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("un-el");
const deleteButton = document.getElementById("delete-btn");
const saveTabButton = document.getElementById("tab-btn");

// localStorage.clear();
//key and value need to be string
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
  //passing myLeads as argument to render function which can take any argument
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>"  + myLeads[i] + "</a></li>"
    // console.log(listItems)
    listItems += `
    <li>
    <a target='_blank' href= '${leads[i]}'>
      ${leads[i]}
    </a>
  </li>
  `;
  }
  ulEl.innerHTML = listItems;
}

deleteButton.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

saveTabButton.addEventListener("click", function () {
  // chrome.tabs.query({active: true,lastFocusedWindow: true},function(tabs) {})
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

inputBtn.addEventListener("click", function () {
  console.log("Button clicked!");
  myLeads.push(inputEl.value);
  console.log(myLeads);
  inputEl.value = " ";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

//DOM manipulation comes with a cost
// const variable cannot be re-assigned

//other way to access HTML elements
//const li = document.createElement("li")
//li.textContent= my Leads[i]
//ulEl.append(li)
