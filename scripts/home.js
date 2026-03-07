const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");
const cardContainer = document.getElementById("card-container");
const allButons = document.querySelectorAll(".toggle-btn");

function selectCategory(id) {
  // console.log(id)
  allButons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    const selectedBtton = btn.id === id;
    if (selectedBtton) {
      btn.classList.add("btn-primary");
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

function displayIssues(dataArr) {
  cardContainer.innerHTML = "";
  dataArr.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card card-border border-t-3 border-gray-200 bg-white w-fit shadow-lg">
              <div class="card-body p-4">
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
                <p class="text-[#64748B] text-xs">${data.assignee ? data.assignee : "unknown_assignee"}</p>
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
    // console.log(data)
    const dataArr = json.data;
    // console.log(dataArr)
    displayIssues(dataArr);
  } catch (error) {
    console.log(error);
  }
}

loadIssues();
