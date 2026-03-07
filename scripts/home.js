const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClose = document.getElementById("btn-close");
const allButons = document.querySelectorAll(".toggle-btn");


function selectCategory(id){
    // console.log(id)
    allButons.forEach(btn => {
        btn.classList.remove("btn-primary");
        const selectedBtton = btn.id === id;
        if(selectedBtton){
            btn.classList.add("btn-primary")
        }
    })
}