let items = document.querySelectorAll('.slider .item');
console.log(items)
let active = 2;
function loadShow(){
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    // show after
    let stt = 0;
    for(var i = active + 1; i < items.length; i ++){
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
     stt = 0;
    for(var i = (active - 1); i >= 0; i --){
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

loadShow();

let next = document.getElementById('next');
let prev = document.getElementById('prev');
next.onclick = function(){
   active = active + 1 < items.length ?  active + 1 : 0;
   loadShow();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active -1 : active;
    loadShow();
}

const urls = ["https://v2.jokeapi.dev/joke/Any", "https://v2.jokeapi.dev/joke/Any", "https://v2.jokeapi.dev/joke/Any", "https://v2.jokeapi.dev/joke/Any", "https://v2.jokeapi.dev/joke/Any"];
const datajoke=document.querySelectorAll(".joke");
const dataresponse=document.querySelectorAll(".response");
const tag=document.querySelectorAll('.Joke_heading');


// using of Promise and then/catch 

const ByPromiseOnly=()=>
{
    Promise.all(urls.map(elem=>fetch(elem)))
    .then(arr=> Promise.all(arr.map(arr=>arr.json())))
    .then(data=>data.forEach((elem,i)=>{
       
        tag[i].innerHTML=elem.category;
        if(elem.type==="single")
            {
                const data1=elem.joke.replace(/\s+/g,' ').trim();
                console.log(data1)
                datajoke[i].innerHTML=data1;
                dataresponse[i].innerHTML="";
            }
            else
            {
                const data1=elem.setup.replace(/\s+/g,' ').trim();
                const data2=elem.delivery.replace(/\s+/g,' ').trim();
                datajoke[i].innerHTML=data1;
                dataresponse[i].innerHTML=data2;
            }
    })).catch(err=>console.error(err));
}
ByPromiseOnly();


function clickHandler()
{
 
   document.querySelector('.btn').addEventListener('click',(e)=>{
  e.preventDefault();
    ByPromiseOnly();
   })
}

console.log("async")


// using a async/await

// async function fetchData() {
//   try {
//     const responses = await Promise.all(urls.map(url => fetch(url)));
//     // console.log(responses);
//     const data = await Promise.all( responses.map(res => res.json()));
//     // console.log(dataresponse);
//     // console.log(datajoke)
//     data.forEach((elem,i)=>{
//         // console.log(elem,i);
//        if(elem.type==="single")
//         {
//             datajoke[i].innerHTML=elem.joke;
//             dataresponse[i].innerHTML="";
//         }
//         else
//         {
//             datajoke[i].innerHTML=elem.setup;
//             dataresponse[i].innerHTML=elem.delivery;

//         }
//     })
  
//     // Log each joke data
//     // data.forEach(joke => console.log(joke));
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }


// fetchData();


