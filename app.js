var newMemberAddBtn = document.querySelector(".addMemberBtn"),
  darkBg = document.querySelector(".dark_bg"),
  popupForm = document.querySelector(".popup"),
  crossBtn = document.querySelector(".closeBtn"),
  submitBtn = document.querySelector(".submitBtn"),
  modalTitle = document.querySelector(".modalTitle"),
  popupFooter = document.querySelector(".popupFooter"),
  imgInput = document.querySelector(".img"),
  imgHolder = document.querySelector(".imgholder");
(form = document.querySelector("form")),
  (formInputFields = document.querySelectorAll("form input")),
  (uploadimg = document.querySelector("#uploadimg")),
  (fName = document.getElementById("fName")),
  (lName = document.getElementById("lName")),
  (age = document.getElementById("age")),
  (city = document.getElementById("city")),
  (position = document.getElementById("position")),
  (salary = document.getElementById("salary")),
  (sDate = document.getElementById("sDate")),
  (email = document.getElementById("email")),
  (phone = document.getElementById("phone")),
  (entries = document.querySelector(".showEntries")),
  (tabSize = document.getElementById("table_size")),
  (userInfo = document.querySelector(".userInfo")),
  (table = document.querySelector("table")),
  (filterData = document.getElementById("search"));

// let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
// let getData = [...originalData]

let originalData = [];
let getData = [];

const fetchDataFromAPI = async () => {
  try {
    const response = await fetch(
      "https://67175f68b910c6a6e027c4a7.mockapi.io/api/v1/users"
    );
    originalData = await response.json();
    // Sort the data by createdAt in descending order
    originalData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    getData = [...originalData];
    displayIndexBtn();
    highlightIndexBtn();
    showInfo();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchDataFromAPI();

let isEdit = false,
  editId;

var arrayLength = 0;
var tableSize = 10;
var startIndex = 1;
var endIndex = 0;
var currentIndex = 1;
var maxIndex = 0;

showInfo();

newMemberAddBtn.addEventListener("click", () => {
  isEdit = false;
  submitBtn.innerHTML = "Submit";
  modalTitle.innerHTML = "Fill the Form";
  popupFooter.style.display = "block";
  imgInput.src = "./img/pic1.png";
  darkBg.classList.add("active");
  popupForm.classList.add("active");
});

crossBtn.addEventListener("click", () => {
  darkBg.classList.remove("active");
  popupForm.classList.remove("active");
  form.reset();
});

uploadimg.onchange = function () {
  if (uploadimg.files[0].size < 1000000) {
    // 1MB = 1000000
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      var imgUrl = e.target.result;
      imgInput.src = imgUrl;
    };

    fileReader.readAsDataURL(uploadimg.files[0]);
  } else {
    alert("This file is too large!");
  }
};

function preLoadCalculations() {
  array = getData;
  arrayLength = array.length;
  maxIndex = arrayLength / tableSize;

  if (arrayLength % tableSize > 0) {
    maxIndex++;
  }
}

function displayIndexBtn() {
  preLoadCalculations();

  const pagination = document.querySelector(".pagination");

  pagination.innerHTML = "";

  pagination.innerHTML =
    '<button onclick="prev()" class="prev">Previous</button>';

  for (let i = 1; i <= maxIndex; i++) {
    pagination.innerHTML +=
      '<button onclick= "paginationBtn(' +
      i +
      ')" index="' +
      i +
      '">' +
      i +
      "</button>";
  }

  pagination.innerHTML += '<button onclick="next()" class="next">Next</button>';

  highlightIndexBtn();
}

function highlightIndexBtn() {
  startIndex = (currentIndex - 1) * tableSize + 1;
  endIndex = startIndex + tableSize - 1;

  if (endIndex > arrayLength) {
    endIndex = arrayLength;
  }

  if (maxIndex >= 2) {
    var nextBtn = document.querySelector(".next");
    nextBtn.classList.add("act");
  }

  entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`;

  var paginationBtns = document.querySelectorAll(".pagination button");
  paginationBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("index") === currentIndex.toString()) {
      btn.classList.add("active");
    }
  });

  showInfo();
}

function showInfo() {
  document
    .querySelectorAll(".employeeDetails")
    .forEach((info) => info.remove());

  var tab_start = startIndex - 1;
  var tab_end = endIndex;

  if (getData.length > 0) {
    for (var i = tab_start; i < tab_end; i++) {
      var staff = getData[i];

      //   <td><img src="${staff.picture}" alt="" width="40" height="40"></td>
      if (staff) {
        let createElement = `<tr class = "employeeDetails">
                <td>${i + 1}</td>
                <td><img src="img/pic1.png" alt="" width="40" height="40"></td>
                <td>${staff.fName + " " + staff.lName}</td>
                <td>${staff.ageVal}</td>
                <td>${staff.cityVal}</td>
                <td>${staff.positionVal}</td>
                <td>${staff.salaryVal}</td>
                <td>${staff.sDateVal}</td>
                <td>${staff.emailVal}</td>
                <td>${staff.phoneVal}</td>
                <td>
                    <button onclick="readInfo('${staff.picture}', '${
          staff.fName
        }', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${
          staff.positionVal
        }', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${
          staff.phoneVal
        }')"><i class="fa-regular fa-eye"></i></button>

                    <button onclick="editInfo('${staff.id}', '${
          staff.picture
        }', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${
          staff.cityVal
        }', '${staff.positionVal}', '${staff.salaryVal}', '${
          staff.sDateVal
        }', '${staff.emailVal}', '${
          staff.phoneVal
        }')"><i class="fa-regular fa-pen-to-square"></i></button>


                    <button onclick = "deleteInfo(${
                      staff.id
                    })"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`;

        userInfo.innerHTML += createElement;
        table.style.minWidth = "1400px";
      }
    }
  } else {
    userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`;
    table.style.minWidth = "1400px";
  }
}

showInfo();

function readInfo(
  pic,
  fname,
  lname,
  Age,
  City,
  Position,
  Salary,
  SDate,
  Email,
  Phone
) {
  imgInput.src = pic;
  fName.value = fname;
  lName.value = lname;
  age.value = Age;
  city.value = City;
  position.value = Position;
  salary.value = Salary;
  sDate.value = SDate;
  email.value = Email;
  phone.value = Phone;

  darkBg.classList.add("active");
  popupForm.classList.add("active");
  popupFooter.style.display = "none";
  modalTitle.innerHTML = "Profile";
  formInputFields.forEach((input) => {
    input.disabled = true;
  });

  imgHolder.style.pointerEvents = "none";
}

function editInfo(
  id,
  pic,
  fname,
  lname,
  Age,
  City,
  Position,
  Salary,
  SDate,
  Email,
  Phone
) {
  isEdit = true;
  editId = id;

  imgInput.src = pic;
  fName.value = fname;
  lName.value = lname;
  age.value = Age;
  city.value = City;
  position.value = Position;
  salary.value = Salary;
  sDate.value = SDate;
  email.value = Email;
  phone.value = Phone;

  darkBg.classList.add("active");
  popupForm.classList.add("active");
  popupFooter.style.display = "block";
  modalTitle.innerHTML = "Update the Form";
  submitBtn.innerHTML = "Update";
  formInputFields.forEach((input) => {
    input.disabled = false;
  });

  imgHolder.style.pointerEvents = "auto";
}

function deleteInfo(id) {
  if (confirm("Are you sure you want to delete?")) {
    fetch(`https://67175f68b910c6a6e027c4a7.mockapi.io/api/v1/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        fetchDataFromAPI();
        preLoadCalculations();

        if (getData.length === 0) {
          currentIndex = 1;
          startIndex = 1;
          endIndex = 0;
        } else if (currentIndex > maxIndex) {
          currentIndex = maxIndex;
        }

        showInfo();
        highlightIndexBtn();
        displayIndexBtn();

        var nextBtn = document.querySelector(".next");
        var prevBtn = document.querySelector(".prev");

        if (Math.floor(maxIndex) > currentIndex) {
          nextBtn.classList.add("act");
        } else {
          nextBtn.classList.remove("act");
        }

        if (currentIndex > 1) {
          prevBtn.classList.add("act");
        }
        // window.location.reload();
      })
      .catch((error) => console.error("Error deleting data:", error));
  }
}

form.addEventListener("submit", async (e) => {
  console.log("submit");

  e.preventDefault();

  const information = {
    picture: imgInput.src == undefined ? "./img/pic1.png" : imgInput.src,
    fName: fName.value,
    lName: lName.value,
    ageVal: age.value,
    cityVal: city.value,
    positionVal: position.value,
    salaryVal: salary.value,
    sDateVal: sDate.value,
    emailVal: email.value,
    phoneVal: phone.value,
    createdAt: new Date().toISOString(),
  };

  try {
    if (!isEdit) {
      const response = await fetch(
        "https://67175f68b910c6a6e027c4a7.mockapi.io/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(information),
        }
      );
      const newUser = await response.json();
      // originalData.unshift(newUser);

      fetchDataFromAPI();
      updateSortIcons("")
    } else {
      // console.log("editttttt",information);

      const response = await fetch(
        `https://67175f68b910c6a6e027c4a7.mockapi.io/api/v1/users/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(information),
        }
      );
      const updatedUser = await response.json();
      fetchDataFromAPI();
      updateSortIcons("")
      // originalData[editId] = updatedUser;
      // window.location.reload();
    }

    getData = [...originalData];
    submitBtn.innerHTML = "Submit";
    modalTitle.innerHTML = "Fill the Form";

    darkBg.classList.remove("active");
    popupForm.classList.remove("active");
    form.reset();

    highlightIndexBtn();
    displayIndexBtn();
    showInfo();
  } catch (error) {
    console.error("Error saving data:", error);
  }
  var nextBtn = document.querySelector(".next");
  var prevBtn = document.querySelector(".prev");
  if (Math.floor(maxIndex) > currentIndex) {
    nextBtn.classList.add("act");
  } else {
    nextBtn.classList.remove("act");
  }

  if (currentIndex > 1) {
    prevBtn.classList.add("act");
  }
});

function next() {
  var prevBtn = document.querySelector(".prev");
  var nextBtn = document.querySelector(".next");

  if (currentIndex <= maxIndex - 1) {
    currentIndex++;
    prevBtn.classList.add("act");

    highlightIndexBtn();
  }

  if (currentIndex > maxIndex - 1) {
    nextBtn.classList.remove("act");
  }
}

function prev() {
  var prevBtn = document.querySelector(".prev");

  if (currentIndex > 1) {
    currentIndex--;
    prevBtn.classList.add("act");
    highlightIndexBtn();
  }

  if (currentIndex < 2) {
    prevBtn.classList.remove("act");
  }
}

function paginationBtn(i) {
  currentIndex = i;

  var prevBtn = document.querySelector(".prev");
  var nextBtn = document.querySelector(".next");

  highlightIndexBtn();

  if (currentIndex > maxIndex - 1) {
    nextBtn.classList.remove("act");
  } else {
    nextBtn.classList.add("act");
  }

  if (currentIndex > 1) {
    prevBtn.classList.add("act");
  }

  if (currentIndex < 2) {
    prevBtn.classList.remove("act");
  }
}

tabSize.addEventListener("change", () => {
  var selectedValue = parseInt(tabSize.value);
  tableSize = selectedValue;
  currentIndex = 1;
  startIndex = 1;
  displayIndexBtn();
});

filterData.addEventListener("input", () => {
  const searchTerm = filterData.value.toLowerCase().trim();

  if (searchTerm !== "") {
    const filteredData = originalData.filter((item) => {
      const fullName = (item.fName + " " + item.lName).toLowerCase();
      const city = item.cityVal.toLowerCase();
      const position = item.positionVal.toLowerCase();

      return (
        fullName.includes(searchTerm) ||
        city.includes(searchTerm) ||
        position.includes(searchTerm)
      );
    });

    // Update the current data with filtered data
    getData = filteredData;
  } else {
    getData = originalData;
  }

  currentIndex = 1;
  startIndex = 1;
  displayIndexBtn();
});

displayIndexBtn();

let sortDirection = true; // True for ascending, false for descending
let currentSortedColumn = ""; // Keep track of the currently sorted column

function updateSortIcons(column) {
  // Remove existing icons
  document.querySelectorAll("th span").forEach((span) => {
    span.innerHTML = ""; // Clear existing icons
  });

  if (column === "") {
    // Reset to show both up and down arrows
    document.querySelectorAll("th span").forEach((span) => {
      span.innerHTML = "&#9650;&#9660;"; // Show both up (▲) and down (▼) arrows
    });
  } else {
    // Add an up or down arrow based on the sort direction
    const icon = sortDirection ? "&#9650;" : "&#9660;"; // Up arrow for ascending, down arrow for descending
    const iconElement = document.getElementById(`${column}Icon`);
    iconElement.innerHTML = icon; // Update the specific column's icon
  }
}

function sortTable(column) {
  // Sort logic
  if (column === "fullName") {
    getData.sort((a, b) => {
      const fullNameA = (a.fName + " " + a.lName).toLowerCase();
      const fullNameB = (b.fName + " " + b.lName).toLowerCase();
      return sortDirection
        ? fullNameA.localeCompare(fullNameB)
        : fullNameB.localeCompare(fullNameA);
    });
  } else if (column === "age") {
    getData.sort((a, b) =>
      sortDirection ? a.ageVal - b.ageVal : b.ageVal - a.ageVal
    );
  } else if (column === "city") {
    getData.sort((a, b) => {
      const cityA = a.cityVal.toLowerCase();
      const cityB = b.cityVal.toLowerCase();
      return sortDirection
        ? cityA.localeCompare(cityB)
        : cityB.localeCompare(cityA);
    });
  } else if (column === "position") {
    getData.sort((a, b) => {
      const positionA = a.positionVal.toLowerCase();
      const positionB = b.positionVal.toLowerCase();
      return sortDirection
        ? positionA.localeCompare(positionB)
        : positionB.localeCompare(positionA);
    });
  } else if (column === "salary") {
    getData.sort((a, b) =>
      sortDirection ? a.salaryVal - b.salaryVal : b.salaryVal - a.salaryVal
    );
  } else if (column === "sDate") {
    getData.sort((a, b) => {
      const dateA = new Date(a.sDateVal);
      const dateB = new Date(b.sDateVal);
      return sortDirection ? dateA - dateB : dateB - dateA;
    });
  } else if (column === "email") {
    getData.sort((a, b) => {
      const emailA = a.emailVal.toLowerCase();
      const emailB = b.emailVal.toLowerCase();
      return sortDirection
        ? emailA.localeCompare(emailB)
        : emailB.localeCompare(emailA);
    });
  } else if (column === "phone") {
    getData.sort((a, b) => {
      const phoneA = a.phoneVal.toLowerCase();
      const phoneB = b.phoneVal.toLowerCase();
      return sortDirection
        ? phoneA.localeCompare(phoneB)
        : phoneB.localeCompare(phoneA);
    });
  }

  // Toggle sort direction for the next click
  sortDirection = !sortDirection;

  // Update the icon next to the column
  updateSortIcons(column);

  // Update the displayed data
  currentIndex = 1;
  showInfo();
  highlightIndexBtn();
}
