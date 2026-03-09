const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");
const totalIssues = document.getElementById("total-issues");
const cardContainer = document.getElementById("card-container");
const openModalCard = document.getElementById("my_modal_5");
const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");
const issuesWord = document.getElementById("issues-word");
const allButons = document.querySelectorAll(".toggle-btn");
let allIssues = [];

async function fetchIssuesWithStatus(id) {
  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues ",
    );
    const json = await res.json();
    const dataArr = json.data;
    const openDataArr = dataArr.filter(
      (data) => data.status.toLowerCase() === "open",
    );
    const closedDataArr = dataArr.filter(
      (data) => data.status.toLowerCase() === "closed",
    );

    if (id === "btn-open") {
      displayIssues(openDataArr);
    } else if (id === "btn-close") {
      displayIssues(closedDataArr);
    } else {
      displayIssues(dataArr);
    }
  } catch (error) {
    console.log(error);
  }
}

function selectCategory(id) {
  // console.log(id)
  allButons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    const selectedBtton = btn.id === id;
    if (selectedBtton) {
      btn.classList.add("btn-primary");
      fetchIssuesWithStatus(id);
    }
  });
}

function handleStatus(status, cardWrapper, priority) {
  const card = cardWrapper.querySelector(".card");
  const openStatusImg = card.querySelector(".open-status-img");
  const closeStatusImg = card.querySelector(".close-status-img");
  const priorityEl = card.querySelector(".priority");
  //   console.log(status);
  //   console.log(closeStatusImg);
  if (status === "open") {
    openStatusImg.classList.remove("hidden");
    card.classList.add("border-t-green-500");
  } else if (status === "closed") {
    closeStatusImg.classList.remove("hidden");
    card.classList.add("border-t-purple-500");
  }

  if (priority === "high") {
    priorityEl.classList.add("bg-red-100", "text-red-500");
  } else if (priority === "medium") {
    priorityEl.classList.add("bg-yellow-100", "text-yellow-500");
  } else {
    priorityEl.classList.add("bg-gray-100", "text-gray-500");
  }
}


btnSearch.addEventListener("click", async() => {
  const searchInputVal = searchInput.value.toLowerCase();
  try {
      const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInputVal}`);
  const json = await res.json();
  const searchedIssues = json.data;
  console.log(searchedIssues)
   if (searchInputVal.trim() === "") {
    displayIssues(allIssues);
    return;
  }else{
    displayIssues(searchedIssues);
  }
  searchInput.value = "";
  } catch (error) {
    console.log(error)
  }

});

function showCard(data) {
  const modalCard = document.getElementById("modal-card");
  modalCard.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("space-y-6");
  div.innerHTML = `
          <div>
          <h2 class="text-2xl text-[#1F2937] font-bold">${data.title}</h2>
          <div class="pt-2 flex items-center gap-3">
            <span class="bg-green-600 px-2 py-1 rounded-full text-white text-xs">Opened</span>
            <span class="text-gray-400">•</span>
            <span class="text-[#64748B] text-xs">opened by <span>${data.author ? data.author : "unknown_author"}</span></span>
            <span class="text-gray-400">•</span>
            <span class="text-[#64748B] text-xs">${data.updatedAt.split("T")[0]}</span>
          </div>
          </div>
          <div class="flex items-center gap-2 pt-3">
          ${data.labels
            .map(
              (label) => `
            <h2 class="bg-blue-100 px-3 rounded-lg text-blue-500">${label}</h2>
            `,
            )
            .join("")}</div>
          <p class="text-[#64748B]">${data.description}</p>
          <div class="bg-[#F8FAFC] p-4 flex items-center rounded-sm">
            <div class="flex-1">
              <h4 class="text-[#64748B]">Assignee:</h4>
              <h3 class="text-[#1F2937] font-semibold">${data.assignee ? data.assignee : "unknown_assignee"}</h3>
            </div>
            <div class="flex-1">
              <h4 class="text-[#64748B]">Priority:</h4>
              <span class=" text-white text-xs bg-red-500  px-3 font-light rounded-2xl">${data.priority.toUpperCase()}</span>
            </div>
  `;
  modalCard.appendChild(div);
}

async function loadCard(id) {
  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const json = await res.json();
    const data = json.data;
    // console.log(data)
    showCard(data);
    openModalCard.showModal();
    // console.log(id)
  } catch (error) {
    console.log(error);
  }
}

function displayIssues(dataArr) {
  totalIssues.textContent = dataArr.length;
  if(dataArr.length === 0 || dataArr.length === 1){
    issuesWord.textContent = "Issue"
  }else{
    issuesWord.textContent = "Issues"
  }
  cardContainer.innerHTML = "";
  dataArr.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card card-border border-t-3 border-gray-200 bg-white w-fit shadow-lg">
              <div class="card-body p-4 cursor-pointer" onclick="loadCard(${data.id})">
                <div class="flex justify-between items-center">
                  <div>
                    <img  src="./assets/Open-Status.png" alt="" class="hidden open-status-img" />
                    <img   src="./assets/Closed-Status.png" alt="" class="hidden close-status-img"  />
                  </div>
                  <h4 class=" px-4 rounded-lg priority text-sm font-medium">${data.priority.toUpperCase()}</h4>
                </div>
                <h2 class="card-title text-[#1F2937] text-sm font-semibold pt-3 line-clamp-1">${data.title}</h2>
                <p class="text-[#64748B] text-xs line-clamp-2">
                  ${data.description}
                </p>
                <div class="flex items-center gap-2 pt-3">
                  ${data.labels.map((label) => `<h4 class="bg-blue-100 px-3 rounded-lg text-blue-500">${label}</h4>`).join("")}
                </div>
              </div>
              <hr class="text-gray-200" />
              <div class="p-3">
                <p class="text-[#64748B] text-xs">#1 by ${data.author ? data.author : "unknown_author"}</p>
                <p class="text-[#64748B] text-xs">${data.createdAt.split("T")[0]}</p>
              </div>
            </div>
        `;
    handleStatus(data.status, div, data.priority);
    cardContainer.appendChild(div);
  });
}

async function loadIssues() {
  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const json = await res.json();
    const dataArr = json.data;
    allIssues = dataArr;
    displayIssues(dataArr);
  } catch (error) {
    console.log(error);
  }
}

loadIssues();
