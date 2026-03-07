const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");
const allButons = document.querySelectorAll(".toggle-btn");
const cardContainer = document.getElementById("card-container");

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

function displayIssues(dataArr) {
  cardContainer.innerHTML = "";
  dataArr.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card card-border border-gray-200 bg-white w-fit shadow-lg">
              <div class="card-body p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <img src="./assets/Open-Status.png" alt="" />
                    <img src="./assets/Closed- Status .png" alt="" />
                  </div>
                  <h4 class="bg-red-100 px-4 rounded-lg text-red-500">${data.priority}</h4>
                </div>
                <h2 class="card-title text-[#1F2937] text-sm font-semibold pt-3">${data.title}</h2>
                <p class="text-[#64748B] text-xs line-clamp-2">
                  ${data.description}
                </p>
                <div class="flex items-center gap-2 pt-3">
                  <h4 class="bg-red-100 px-3 rounded-lg text-red-500">${data.labels[0]}</h4>
                  <h4 class="bg-yellow-100 px-3 rounded-lg text-yellow-500">
                    ${data.labels[1]}
                  </h4>
                </div>
              </div>
              <hr class="text-gray-200" />
              <div class="p-3">
                <p class="text-[#64748B] text-xs">${data.assignee}</p>
                <p class="text-[#64748B] text-xs">${data.createdAt.split("T")[0]}</p>
              </div>
            </div>
        `;
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
