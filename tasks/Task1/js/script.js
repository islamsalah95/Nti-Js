//vars
const addUser = document.querySelector("#addUser");
const dataTableBody = document.querySelector("#dataTableBody");
const singleUser = document.querySelector("#singleUser");
const editUser = document.querySelector("#editUser");
//funcs
const readFromStorage = (keyword, dataType = "array") => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(keyword));
    if (!Array.isArray(data) && dataType == "array")
      throw new Error("data must be an array");
  } catch (e) {
    data = [];
  }
  return data;
};

const writeDataToStorage = (keyword, data) =>
  localStorage.setItem(keyword, JSON.stringify(data));

const createMyOwnElement = (parent, ele, txt, classes, attribute) => {
  // element, append in parent, class, textcontent, setattribute <======
  const myEle = document.createElement(ele);
  parent.appendChild(myEle);
  if (classes) myEle.className = classes;
  if (txt) myEle.textContent = txt;
  if (attribute) myEle.setAttribute(attribute.name, attribute.val); // {name:"id", val:"1"}
  return myEle;
};

const drawTable = (allUsers) => {
  allUsers.forEach((user, ind) => {
    const tr = createMyOwnElement(dataTableBody, "tr", null, null, null);
    createMyOwnElement(tr, "td", ind + 1, null, null);
    createMyOwnElement(tr, "td", user.id, null, null);
    createMyOwnElement(tr, "td", user.name, null, null);
    createMyOwnElement(tr, "td", user.age, null, null);
    createMyOwnElement(tr, "td", user.status, null, null);
    const td = createMyOwnElement(tr, "td", null, null, null);
    const delBtn = createMyOwnElement(
      td,
      "button",
      "delete",
      "btn btn-danger mx-2",
      null
    );
    delBtn.addEventListener("click", () => deleteUser(allUsers, ind));
    const editBtn = createMyOwnElement(
      td,
      "button",
      "edit",
      "btn btn-warning mx-2",
      null
    );
    editBtn.addEventListener("click", () => editUserFunc(allUsers, ind));
    const showBtn = createMyOwnElement(
      td,
      "button",
      "show",
      "btn btn-primary mx-2",
      null
    );
    showBtn.addEventListener("click", () => showUser(allUsers, ind));
  });
};

const emptyData = (msg, cols) => {
  const tr = createMyOwnElement(
    dataTableBody,
    "tr",
    null,
    "alert alert-danger",
    null
  );
  createMyOwnElement(tr, "td", msg, "text-center", {
    name: "colspan",
    val: cols,
  });
};

const drawUsers = (allUsers) => {
  dataTableBody.textContent = "";
  if (allUsers.length == 0) emptyData("No Users Yet", 5);
  else drawTable(allUsers);
};

const deleteUser = (allUsers, ind) => {
  allUsers.splice(ind, 1);
  writeDataToStorage("users", allUsers);
  drawUsers(allUsers);
};

const editUserFunc = (allUsers, ind) => {
  writeDataToStorage("edit", { index: ind, userData: allUsers[ind] });
  window.location.href = "edit.html";
};

const showUser = (allUsers, ind) => {
  writeDataToStorage("showSingle", { index: ind, userData: allUsers[ind] });
  window.location.href = "showSingle.html";
};

if (addUser) {
  addUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      id: Date.now(),
      name: addUser.elements.name.value,
      age: addUser.elements.age.value,
      status: addUser.elements.status.value,
    };
    const allUsers = readFromStorage("users");
    allUsers.push(user);
    writeDataToStorage("users", allUsers);
    addUser.reset();
    window.location.href = "index.html";
  });
}
if (dataTableBody) {
  const allUsers = readFromStorage("users");
  drawUsers(allUsers);
}
if (singleUser) {
  const singleUserData = readFromStorage("showSingle", "obj");
  if (!singleUserData) {
    const tr = createMyOwnElement(
      singleUser,
      "div",
      "no users found",
      "alert alert-danger",
      null
    );
  }
  const userData = singleUserData.userData;
  const userIndex = singleUserData.index;
  const tr = createMyOwnElement(singleUser, "div", null, null, null);
  createMyOwnElement(tr, "h4", userData.id, null, null);
  createMyOwnElement(tr, "h4", userData.name, null, null);
  createMyOwnElement(tr, "h4", userData.age, null, null);
  createMyOwnElement(tr, "h4", userData.status, null, null);
}

if (editUser) {
  const editUserData = readFromStorage("edit", "obj");
  const userData = editUserData.userData;
  const userIndex = editUserData.index;
  const name = document.querySelector("#nname");        name.value = userData.name;
  const age = document.querySelector("#aage");          age.value = userData.age;
  const status = document.querySelector("#sstatus");    status.value = userData.status;

  editUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      name: editUser.elements.name.value,
      age: editUser.elements.age.value,
      status: editUser.elements.status.value,
    };
    const allUsers = readFromStorage("users");
    // allUsers.push(user);  ==> modify current info instead of push new
    allUsers[userIndex].name = user.name;
    allUsers[userIndex].age = user.age;
    allUsers[userIndex].status = user.status;
    writeDataToStorage("users", allUsers);
    window.location.href = "index.html";
  });
}
