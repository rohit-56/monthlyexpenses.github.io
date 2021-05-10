var page1=document.getElementById("page1");
var page2=document.getElementById("page2");
var page3=document.getElementById("page3");
let list=[];
var monthlist=["31","28","31","30","31","30","31","31","30","31","30","31"];
var bdgi=0,baln=0,mon=0,yr=0,edat='',etit='',eexp='';
var i=0,index=0;
   function func(){
     yr=document.getElementById("yr").value;
     mon=document.getElementById("mon").value;
     bdgi=document.getElementById("totals").value;
     baln=bdgi;
    if(yr<2000 || yr>2050){
        alert("INCORRECT YEAR");
    }
    else if(mon<1 || mon>12)
    alert("INCORRECT MONTH NUMBER");
    else{
        document.getElementById("yr").value='';
        document.getElementById("mon").value='';
        document.getElementById("totals").value='';
    localStorage.setItem('bdgi',JSON.stringify(bdgi));
    localStorage.setItem('yr',JSON.stringify(yr));
    localStorage.setItem('mon',JSON.stringify(mon));
    localStorage.setItem('baln',JSON.stringify(baln)); 
    dothis();
    }        
   }
   function dothis(){

    page1.style.display="none";
    page2.style.display="block";
    document.getElementById("bdg").innerHTML="INCOME"+"<br>"+bdgi;
    document.getElementById("bal").innerHTML="BALANCE"+"<br>"+baln;
     
}
function record(){
    
    var dat=document.getElementById("dat").value+"/"+mon+"/"+yr;
    var tit=document.getElementById("tit").value;
    var exp=document.getElementById("exp").value;
    
    if(dat=='' || tit=='' || exp=='')
    alert("FILL ALL THE DETAILS");
    else if(dat<1 || dat>monthlist[mon-1]){
    document.getElementById("dat").value='';
    alert("PLEASE ENTER THE VALID DATE");
    }
    else if(exp<1){
        document.getElementById("exp").value='';
        alert("PLEASE ENTER THE VALID EXPENSE AMOUNT");
    }
    else{
       
    var ans={
        id:i,
        dates:dat,
        titl:tit,
        expens:exp
          }
    i++;
    list.push(ans);
    document.getElementById("dat").value='';
    document.getElementById("tit").value='';
    document.getElementById("exp").value='';
    showbalance(exp);
    
    }
}
function showbalance(exp){
    
    if(baln-exp<0){
       alert("INSUFFICIENT BALANCE!!");
       list.splice(list.length-1,1);
    }
    else
    {
        baln=baln-exp;
        localStorage.setItem('baln',JSON.stringify(baln));
    document.getElementById("bal").innerHTML="BALANCE"+"<br>"+baln;
    if(baln<=(bdgi/10))
    alert("LOW BALANCE !! SPENT MONEY CAREFULLY");
    displaythis(list);
    
    }
}
const getLocalStorage = function(){

const todoStorage = localStorage.getItem('list');
const bd=localStorage.getItem('bdgi');
const ba=localStorage.getItem('baln');
const mont=localStorage.getItem('mon');
const yea=localStorage.getItem('yr');
if ((todoStorage === 'undefined' || todoStorage === null) && bd===null && ba===null ){
list = [];

}
else if((todoStorage === 'undefined' || todoStorage === null) && bd!==null && ba!==null){
list=[];
bdgi=JSON.parse(bd);
baln=JSON.parse(ba);
yr=JSON.parse(yea);
mon=JSON.parse(mont);
dothis();
}
else {

list = JSON.parse(todoStorage);
bdgi=JSON.parse(bd);
baln=JSON.parse(ba);
yr=JSON.parse(yea);
mon=JSON.parse(mont);
dothis();
displaythis(list);
}
}

const setLocalStorage = function(list){
localStorage.setItem('list', JSON.stringify(list));
}

// get local storage from page
getLocalStorage();
 
    function displaythis(list){
    var showit=document.getElementById("showit");
    showit.innerHTML=null;
    for(var j=0;j<list.length;j++){
       showit.innerHTML += "<br><br>"+`
       <div>
        <i>
        <div class="d">${list[j].dates}</div>
        <div class="t">${list[j].titl}</div>
        <div class="e">${list[j].expens}</div>
        <div>
        <button type="button" class="b1" onclick="editlist(${j})"><i class="material-icons">edit</i></button>
        <button type="button" class="b2" onclick="deletelist(${j})"><i class="material-icons">delete</i></button>
        </div>
        </i>
        </div>`;
    }
   
    setLocalStorage(list);
    showit.style.display="block";
}
function deletelist(j){
    let balanc=list[j].expens;
    alert(list[j].titl+" is Deleted !!");
    list.splice(j,1);
    showbalance(-balanc);
    displaythis(list);
}
function editlist(j){
    page2.style.display="none";
      page3.style.display="block";
      index=j;
      document.getElementById("ebtn").addEventListener("click",func_e);
}
function func_e(){
   edat=document.getElementById("edat").value;
   etit=document.getElementById("etit").value;
   eexp=document.getElementById("eexp").value;
   page3.style.display="none";
   page2.style.display="block";
   var ans={
       id:index,
       dates:edat,
        titl:etit,
        expens:eexp

   }
   let balanc=eexp-list[index].expens;
   list.splice(index,1);
   list.splice(index,0,ans);
   showbalance(balanc);
   displaythis(list);
}
function endfunc(){
   list=[];
   baln=0;
   bdgi=0;
   localStorage.clear();
    page2.style.display="none";
    page1.style.display="block";
}