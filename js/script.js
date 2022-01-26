const MyBtn=document.querySelector(".MyBtn button");
const RulesBox=document.querySelector(".RulesBox");
const exitButton=document.querySelector(".Buttons .exitbtn");
const contineuButton=document.querySelector(".Buttons .contineubtn");
const Questions=document.querySelector(".Questions");
const option_list=document.querySelector(".MyOptions");
const timeCount=document.querySelector(".TimeCount .seconds");
const timeLine=document.querySelector(".QuestionHeader .time_lines")

MyBtn.onclick=()=>{
    RulesBox.classList.add("activeInfo");
}
exitButton.onclick=()=>{
    RulesBox.classList.remove("activeInfo");
}


contineuButton.onclick=()=>{
    RulesBox.classList.remove("activeInfo");
    Questions.classList.add("activeQuiz");
    showQuestions(0);
    startTimer(15);
    startTimerLiner(0);
}


const nextbtn=document.querySelector(".nextBtn");
const result_box=document.querySelector(".result_box");
const restart_quiz=document.querySelector(".buttons .restart1");
const quit_quiz=document.querySelector(".buttons .quit");

restart_quiz.onclick=()=>{
    Questions.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");

     que_count=0;
        
     timeValue=15;
    
     widthValue=0;
     userScore=0;
    
    
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLiner(widthValue);
    nextbtn.style.display="none";
    timeOff.textContent="Time Left"
   
       
        
}

quit_quiz.onclick=()=>{
    window.location.reload();
}
        let que_count=0;
        let counter;
        let timeValue=15;
        let counterLine;
        let widthValue=0;
        let userScore=0;

nextbtn.onclick=()=>{
    if(que_count<questions.length-1){
        que_count++;
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLiner(widthValue);
        nextbtn.style.display="none";
    }else{
        console.log("You have complete your task")
        showResultBox()
    }
}


function showQuestions(index){
    const que_text=document.querySelector(".text");
            let option_tag='<div class="options"><span>'+questions[index].options[0]+'</span></div>'
                        +'<div class="options"><span>'+questions[index].options[1]+'</span></div>'
                        +'<div class="options"><span>'+questions[index].options[2]+'</span></div>'
                        +'<div class="options"><span>'+questions[index].options[3]+'</span></div>'
            let que_tag="<span>"+questions[index].numb+ "."+questions[index].question+"</span>";
            que_text.innerHTML=que_tag;
            option_list.innerHTML=option_tag;

    const totalquestion=document.querySelector(".total_que");
            let total_queTag='<p>'+questions[index].numb+' of 5'+'</p>'
            totalquestion.innerHTML=total_queTag;
    const option = option_list.querySelectorAll(".options");
            for(let i=0;i<option.length;i++){
                option[i].setAttribute("onclick","optionSelected(this)");
            }
}

            let tickIcon='<div class="tick icon"><i class="fas fa-check"></i></div>';
            let crossIcon='<div class="cross icon"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    const position="beforeend"
            let userans=answer.textContent;
            let correctans=questions[que_count].answer;
            let alloptions=option_list.children.length;
            if(userans==correctans){
                userScore+=1;
                answer.classList.add("correct")
                console.log("answer is correct");
                answer.insertAdjacentHTML(position,tickIcon);
            }else{
                answer.classList.add("incorrect")
                console.log("answer is wrong");
                answer.insertAdjacentHTML(position,crossIcon)
                for(let i=0;i<alloptions;i++){
                    if(option_list.children[i].textContent==correctans){
                        option_list.children[i].setAttribute("class","options correct");
                        option_list.children[i].insertAdjacentHTML(position,tickIcon);
                    }
                }
            }
            for(let i=0 ; i<alloptions;i++){
                option_list.children[i].classList.add('disabled');
            }  
            nextbtn.style.display="block";
}


function showResultBox(){
    RulesBox.classList.remove("activeInfo");
    Questions.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText=document.querySelector(".score_text");
    if(userScore>3){
        let scoreTag='<span>Congratulations , You got <p>'+userScore+'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }else if(userScore>1){
        let scoreTag='<span>Carry on ,You got <p>'+userScore+'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;

    }else{
        let scoreTag='<span>I am sorry ,You got <p>'+userScore+'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
}

function startTimer(time){
    counter=setInterval(timer,1000);
    function timer(){
        timeCount.textContent=time;
        time--;
        if(time<9){
            let addzero=timeCount.textContent;
            timeCount.textContent="0"+addzero;
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent="00";
        }
    }
}

function startTimerLiner(time){
    counterLine=setInterval(timer,50);
    function timer(){
        time+=1;
        timeLine.style.width=time+"px";
        if(time>319){
            clearInterval(counterLine);
        }
    }
}