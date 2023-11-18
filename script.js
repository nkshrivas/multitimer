// --------> for input section we added a limit -------->
const allInputsOfTypeNumber = document.querySelectorAll('input[type="number"]');

allInputsOfTypeNumber.forEach((element) => {
  element.addEventListener("input", () => {
    validateInput(element);
  });
});

function validateInput(input) {
  if (input.value.length > 2) {
    input.value = input.value.slice(0, 2);
  }
}
// --------> for input section we added a limit -------->

const setBtn = document.querySelector(".setbtn");
const activeTimerSection = document.querySelector(".active-timers");

setBtn.addEventListener("click", () => {
  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const second = document.getElementById("second").value;

  // if the hour,minute,second value is not empty then only create all
  // elements.

  if (hour != "" && minute != "" && second != "") {
    // creating the innerTimerDiv
    const innerTimerDiv = document.createElement("div");
    innerTimerDiv.setAttribute("class", "inner-timer");
    innerTimerDiv.classList.add("timeleft-timer");

    // creating a span and appending it in innerTimerDiv
    const innerSpan = document.createElement("span");
    const innerSpanTextNode = document.createTextNode("Time Left :");
    innerSpan.append(innerSpanTextNode);
    innerTimerDiv.append(innerSpan);

    // creating a hrsMinSecDiv
    const hrsMinSecDiv = document.createElement("div");
    hrsMinSecDiv.setAttribute("class", "hrs-min-sec");

    // here im creating the inputs 3 times and append in hrsMinSecDiv.
    for (let i = 0; i < 3; i++) {
      const hrsMinSecDivInput = document.createElement("input");
      if (i === 0) {
        hrsMinSecDivInput.setAttribute("id", "sethour");
        hrsMinSecDivInput.setAttribute("type", "number");
        hrsMinSecDivInput.value = hour; // Set the value for hour input

        const hrsMinSecDivSpan = document.createElement("span");
        const hrsMinSecDivSpanText = document.createTextNode(":");
        hrsMinSecDivSpan.append(hrsMinSecDivSpanText);

        hrsMinSecDiv.append(hrsMinSecDivInput);
        hrsMinSecDiv.append(hrsMinSecDivSpan);
      } else if (i === 1) {
        hrsMinSecDivInput.setAttribute("id", "setminute");
        hrsMinSecDivInput.setAttribute("type", "number");
        hrsMinSecDivInput.value = minute; // Set the value for minute input

        const hrsMinSecDivSpan = document.createElement("span");
        const hrsMinSecDivSpanText = document.createTextNode(":");
        hrsMinSecDivSpan.append(hrsMinSecDivSpanText);

        hrsMinSecDiv.append(hrsMinSecDivInput);
        hrsMinSecDiv.append(hrsMinSecDivSpan);
      } else if (i === 2) {
        hrsMinSecDivInput.setAttribute("id", "setsecond");
        hrsMinSecDivInput.setAttribute("type", "number");
        hrsMinSecDivInput.value = second; // Set the value for second input

        hrsMinSecDiv.append(hrsMinSecDivInput);
      }
    }

    // creating delete btn and appending it in the hrsMinSecDiv div.
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "deletebtn");
    const deleteBtnText = document.createTextNode("Delete");
    deleteBtn.append(deleteBtnText);
    hrsMinSecDiv.append(deleteBtn);

    // now appending the hrsMinSecDiv into the innerTimerDiv
    innerTimerDiv.append(hrsMinSecDiv);
    activeTimerSection.append(innerTimerDiv);

    // here we are hiding the text which tells the that
    // there is not active timers.
    const activeTimerSectionSpan = document.querySelector(
      ".active-timers span"
    );
    activeTimerSectionSpan.classList.add("present");

    // --------> wirting for the timer to start ---------->
    // here im creating the timer-is-up div for every
    // timeleft-timer div.
    const timeIsUpDiv = document.createElement("div");
    timeIsUpDiv.setAttribute("class", "time-is-up");

    const timeIsUpDivSpan = document.createElement("span");
    const timeIsUpDivSpanText = document.createTextNode("Timer Is Up !");
    timeIsUpDivSpan.append(timeIsUpDivSpanText);
    timeIsUpDiv.append(timeIsUpDivSpan);

    const timeIsUpDivButton = document.createElement("button");
    timeIsUpDivButton.setAttribute("class", "stopbtn");
    timeIsUpDiv.append(timeIsUpDivButton);

    innerTimerDiv.append(timeIsUpDiv);

    startTimerForDiv(innerTimerDiv);
  }
});

function startTimerForDiv(timerDiv) {
  const setHour = parseInt(timerDiv.querySelector("#sethour").value);
  const setMinute = parseInt(timerDiv.querySelector("#setminute").value);
  const setSecond = parseInt(timerDiv.querySelector("#setsecond").value);

  let totalTimeInSeconds = setHour * 3600 + setMinute * 60 + setSecond;

  const intervalId = setInterval(() => {
    totalTimeInSeconds--;

    if (totalTimeInSeconds < 0) {
      clearInterval(intervalId);
      // Timer finished, do something (e.g., display a message)
      timerDiv.style.display = "none"; // Hide the timer div

      const timeUpMessage = document.querySelector(".time-is-up");
      timeUpMessage.style.display = "flex";
    }

    const hoursLeft = Math.floor(totalTimeInSeconds / 3600);
    const minutesLeft = Math.floor((totalTimeInSeconds % 3600) / 60);
    const secondsLeft = totalTimeInSeconds % 60;

    const hrsMinSecDiv = timerDiv.querySelector(".hrs-min-sec");
    hrsMinSecDiv.innerHTML = `
        <input type="number" id="sethour" value="${hoursLeft
          .toString()
          .padStart(2, "0")}">
        <span>:</span>
        <input type="number" id="setminute" value="${minutesLeft
          .toString()
          .padStart(2, "0")}">
        <span>:</span>
        <input type="number" id="setsecond" value="${secondsLeft
          .toString()
          .padStart(2, "0")}">
        <button class="deletebtn">Delete</button>
      `;

    // Add delete button functionality for the current timeleft-timer div
    const deleteBtn = hrsMinSecDiv.querySelector(".deletebtn");
    deleteBtn.addEventListener("click", () => {
      clearInterval(intervalId);
      timerDiv.remove();

      // Check if there are any timerDivs left, if not, show the "no timers" message
      const timerDivs = document.querySelectorAll(".timeleft-timer");
      if (timerDivs.length === 0) {
        const activeTimerSectionSpan = document.querySelector(
          ".active-timers span"
        );
        activeTimerSectionSpan.classList.remove("present");
      }
    });
  }, 1000);
}