/////////////////  loading screen ////////////////////////////
$(document).ready(()=>{
  $(".spinner").fadeOut(2000,()=>{
    $(".spinner").parent().fadeOut(1000,()=>{
      $(".spinner").parent().remove();
      $("body").css("overflow","auto");
    })
  })
});

let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let addMarkBtn = document.getElementById("addMarkBtn");

let markBookContainer;

///////////////// get or add markBook and check it ////////////////////////////

if (localStorage.getItem("userBookMark") != null) {
  markBookContainer = JSON.parse(localStorage.getItem("userBookMark"));
  displayBookMark();
} else {
  markBookContainer = [];
}
addMarkBtn.addEventListener("click", () => {
  let bookMark = {
    name: siteName.value,
    link: siteUrl.value,
  };
  markBookContainer.push(bookMark);
  localStorage.setItem("userBookMark", JSON.stringify(markBookContainer));
  displayBookMark();
  clearForm();
});

///////////////// clearForm ////////////////////////////

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid");
  siteName.classList.remove("is-invalid");

  siteUrl.classList.remove("is-invalid");
  siteUrl.classList.remove("is-valid");

  addMarkBtn.disabled=true;
};

///////////////// displayBookMark ////////////////////////////

function displayBookMark() {
  let cartona = ``;
  for (let i = 0; i < markBookContainer.length; i++) {
    cartona += `
  <div class="col-md-6 mb-2">
    <h3>${markBookContainer[i].name}</h3>
  </div>
  <div class="col-md-6 mb-2">
    <button class="btn btn-success" onclick=""><a href="${markBookContainer[i].link}" target="_blank" 
    class="text-white text-decoration-none">Visit</a></button>
    <button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button>
  </div>
  
  `;
  };
  document.getElementById("myRow").innerHTML = cartona;
};

function deleteBookMark(term) {
  markBookContainer.splice(term, 1);
  localStorage.setItem("userBookMark", JSON.stringify(markBookContainer));
  displayBookMark();
};

//////////////////////////// validation form ///////////////////////////////

let counter= 0;
function validationBookMarkName() {
  let regex = /^[A-Z][A-za-z 0-9]{3,9}$/;
  if (regex.test(siteName.value)) {
    siteNameAlert.style.display = "none";
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    addMarkBtn.disabled=false;
    counter++;
    return true;
  } else {
    siteNameAlert.style.display = "block";
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    addMarkBtn.disabled=true;
    return false;
  };
};

function validationBookMarkUrl() {
  let regex = /^(www)\.[a-z0-9\-\.]+\.(com|net|org)$/i;
  if (regex.test(siteUrl.value)) {
    siteUrlAlert.style.display = "none";
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    addMarkBtn.disabled=false;
    counter++
    return true;
  } else {
    siteUrlAlert.style.display = "block";
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    addMarkBtn.disabled=true;
    return false
  };
};

siteName.addEventListener("keyup",validationBookMarkName);
siteName.addEventListener("blur",validationBookMarkName);
siteUrl.addEventListener("keyup",validationBookMarkUrl);
siteUrl.addEventListener("blur",validationBookMarkUrl)

function submitMission(){
    if(counter == 2){
        addMarkBtn.disabled=false;
    };
};
$(".form-control").change(()=>{
    submitMission()
});



/////////////////to down & to top////////////////////////////

let elemOffset = $("#btnDown").offset().top;
$(window).scroll(()=>{
  let wsScroll = $(window).scrollTop();
  if (wsScroll> elemOffset-200){
    $("#btnTop").fadeIn(500);
  }
  else{
    $("#btnTop").fadeOut(500);
  }
})

$("#btnDown").click(()=>{
  $(window).scrollTop();
  $('html, body').animate({ scrollTop:   elemOffset+20 }, 150);
});


$("#btnTop").click(()=>{
  $(window).scrollTop();
  $('html, body').animate({scrollTop:0},150);
});


