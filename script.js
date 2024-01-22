const steps = document.querySelectorAll(".step"),
  all_Plan_btn = document.querySelectorAll(".plan_btn"),
  scroller = document.querySelector(".switch"),
  change_btn = document.querySelector(".plan_purchased_box h2 a");

let step_no = 1;

// function for form Validation

let validForm = () => {
  const nameInput = document.querySelector("#name"),
    emailInput = document.querySelector("#email"),
    phoneNumInput = document.querySelector("#phone_num");

  // regex for Validation

  const validName = /^[a-zA-Z0-9_+]+\s[a-zA-Z0-9/_+]+$/;
  const validEmail = /^[a-zA-Z0-9_+]+\@{1}[a-z]{3,}\.{1}[a-z]{2,}$/;
  const validPhoneNumber = /^\d{10,}$/;

  // Error Elements

  const nameError = nameInput.parentElement.querySelector("b");
  const emailError = emailInput.parentElement.querySelector("b");
  const phoneError = phoneNumInput.parentElement.querySelector("b");
  // User Name validation

  if (nameInput.value === "") {
    nameInput.classList.add("error");
    nameError.style.visibility = "visible";
    nameError.innerText = "This field is required";
  } else if (!nameInput.value.match(validName)) {
    nameInput.classList.add("error");
    nameError.style.visibility = "visible";
    nameError.innerText = "Valid Name required";
  } else {
    nameInput.classList.remove("error");
    nameError.style.visibility = "hidden";
  }
  // User Email validation

  if (emailInput.value === "") {
    emailInput.classList.add("error");
    emailError.style.visibility = "visible";
    emailError.innerText = "This field is required";
  } else if (!emailInput.value.match(validEmail)) {
    emailInput.classList.add("error");
    emailError.style.visibility = "visible";
    emailError.innerText = "Valid Email required";
  } else {
    emailInput.classList.remove("error");
    emailError.style.visibility = "hidden";
  }

  // User PhoneNumber validation

  if (phoneNumInput.value === "") {
    phoneNumInput.classList.add("error");
    phoneError.style.visibility = "visible";
    phoneError.innerText = "This field is required";
  } else if (!phoneNumInput.value.match(validPhoneNumber)) {
    phoneNumInput.classList.add("error");
    phoneError.style.visibility = "visible";
    phoneError.innerText = "Valid Phone-Number required";
  } else {
    phoneNumInput.classList.remove("error");
    phoneError.style.visibility = "hidden";
  }

  if (
    nameInput.value.match(validName) &&
    emailInput.value.match(validEmail) &&
    phoneNumInput.value.match(validPhoneNumber)
  ) {
    return true;
  }
};

// function for adding active class in current step circle

let active_circle = () => {
  if (step_no === 5) {
    return;
  } else {
    const allCircle = document.querySelectorAll(".circle");
    allCircle.forEach((activeCircle) => {
      activeCircle.classList.remove("active");
    });
    document.querySelector(`.circle${step_no}`).classList.add("active");
  }
};

// function for displaying next_step
let display_Next_Step = () => {
  document.querySelector(`.step${step_no}`).style.display = "none";
  step_no++;
  document.querySelector(`.step${step_no}`).style.display = "block";
  active_circle();
};

// function for displaying previous_step

let display_Previous_Step = () => {
  document.querySelector(`.step${step_no}`).style.display = "none";
  step_no--;
  document.querySelector(`.step${step_no}`).style.display = "block";
  active_circle();
};
// function for scorller adding bonus plans in the plan_btns

scroller.addEventListener("click", () => {
  let all_lables = document.querySelectorAll(".switch_box label");
  let bonus_months = document.querySelectorAll(".plan_txt small");
  if (scroller.previousElementSibling.checked) {
    // hiding bonus plans
    bonus_months.forEach((show_month) => {
      show_month.style.visibility = "hidden";
    });
    // adding active class in Month
    all_lables[0].classList.add("active");
    all_lables[2].classList.remove("active");
  } else {
    // showing bonus plans
    bonus_months.forEach((show_month) => {
      show_month.style.visibility = "visible";
    });
    // adding active class in Year

    all_lables[0].classList.remove("active");
    all_lables[2].classList.add("active");
  }
  updatePlan_prizes();
});

// function for updating plan Prizes on step 2

let updatePlan_prizes = () => {
  const plan_prize_elements = document.querySelectorAll(".plan_txt p");
  if (scroller.previousElementSibling.checked) {
    // Month_Plan Prizes

    let Month_plan = ["+$9/mo", "+$12/mo", "+$15/mo"];

    for (let i = 0; i < plan_prize_elements.length; i++) {
      plan_prize_elements[i].innerText = Month_plan[i];
    }
  } else {
    // Year_Plan Prizes

    let Year_plan = ["+$90/yr", "+$120/yr", "+$150/yr"];

    for (let i = 0; i < plan_prize_elements.length; i++) {
      plan_prize_elements[i].innerText = Year_plan[i];
    }
  }
};

// storing plan type Monthly or Yearly based on the selection step2

let Load_data_in_next_steps = () => {
  // addOne_prize_elements a variable for updating addOn Prizes on step 3
  let addOne_prize_elements = document.querySelectorAll(
    ".add_ons_txt  .service_chg"
  );
  // variable for updating Plan Prizes on step 2

  if (!scroller.previousElementSibling.checked) {
    // Month_addOns Prizes
    let Month_addOns = ["+$1/mo", "+$2/mo", "+$2/mo"];
    for (let i = 0; i < addOne_prize_elements.length; i++) {
      addOne_prize_elements[i].innerText = Month_addOns[i];
    }
    sessionStorage.setItem("plan_type", "(Monthly)");
  } else {
    let Year_addOns = ["+$10/yr", "+$20/yr", "+$20/yr"];
    for (let i = 0; i < addOne_prize_elements.length; i++) {
      addOne_prize_elements[i].innerText = Year_addOns[i];
    }
    sessionStorage.setItem("plan_type", "(Yearly)");
  }
};

// function for storing data on sessionStorage

let store_SessionStorage = () => {
  all_Plan_btn.forEach((btn) => {
    let active_btn = document.querySelector(".plan_btns_box .active");
    if (active_btn) {
      let plan_name = active_btn.querySelector(".plan_txt b");
      let plan_prize = active_btn.querySelector(".plan_txt p");
      let total_customer_bill_name = document.querySelector(
        ".service_selected_box .total_customer_bill_name"
      );

      // Ensure that planName and planPrize are valid
      if (plan_name && plan_prize) {
        sessionStorage.setItem("plan_name", plan_name.innerText);
        sessionStorage.setItem("plan_prize", plan_prize.innerText);
      }
      if (sessionStorage.getItem("plan_type") === "(Yearly)") {
        total_customer_bill_name.innerText = "Total (per Year)";
      } else {
        total_customer_bill_name.innerText = "Total (per Month)";
      }
    }
  });
};
// function for adding active class on plan_btn on step2
all_Plan_btn.forEach((active_btn) => {
  active_btn.addEventListener("click", (e) => {
    all_Plan_btn.forEach((remove_active) => {
      remove_active.classList.remove("active");
    });
    e.target.classList.add("active");
    store_SessionStorage();
  });
});

// function for getting Total Customer bill

let getTotalAmount = () => {
  // plan_prize_element display total bill in this element
  let total_bill_opt = document.querySelector(".total_bill");
  let plan_prize = document.querySelector("#plan_prize");

  let plan_prize_str = parseInt(plan_prize.innerText.match(/\d/g));

  let all_addOns_prizes = document.querySelectorAll(
    ".service_selected_box .servie_prize"
  );
  let sum = 0;

  for (let i = 0; i < all_addOns_prizes.length; i++) {
    let value = parseInt(all_addOns_prizes[i].innerText.match(/\d+/)[0]);
    sum += parseInt(value);
  }
  let final_prize = eval(plan_prize_str + sum);

  if (sessionStorage.getItem("plan_type") === "(Yearly)") {
    total_bill_opt.innerText = `+$${final_prize}/yr`;
  } else {
    total_bill_opt.innerText = `+$${final_prize}/mo`;
  }
};
// function for Appending addOns Selected data

let append_addOns = (input) => {
  const add_one_name = input.nextElementSibling.querySelector(
    ".add_ons_txt h3 span"
  );
  const add_one_charge = input.nextElementSibling.querySelector(
    ".add_ons_txt .service_chg"
  );
  let div = document.createElement("div");
  let p = document.createElement("p");
  let span = document.createElement("span");

  div.classList.add("service_selected_box", "flex_x_center");
  p.classList.add("service_n", "cool_gray_txt");
  span.classList.add("servie_prize", "purplish_blue_txt", "medium_font");
  p.innerText = add_one_name.innerText;
  span.innerText = add_one_charge.innerText;

  div.appendChild(p);
  div.appendChild(span);
  document.querySelector(".Servies_finalization").style.display = "grid";
  document.querySelector(".Servies_finalization").appendChild(div);
};

// function for adding addOns Selected data on step4 on input Checked basis

let load_addOns = () => {
  // target all add_ons container
  let add_ons_input = document.querySelectorAll(".add-ons_input");

  add_ons_input.forEach((input) => {
    if (input.checked) {
      append_addOns(input);
    }
  });
};

// function for removing selected_addOns on step 4

let remove_selected_addOns = () => {
  const Servies_finalization = document.querySelector(".Servies_finalization");
  let ChildArray = Array.from(Servies_finalization.children);
  ChildArray.forEach((child) => {
    Servies_finalization.removeChild(child);
  });
};

// function for loading Customer selected Plan Name on step4
let load_Selected_Plan = () => {
  const plan_name_element = document.querySelector(
    ".plan_purchased_box h2 span"
  );
  const plan_prize_element = document.querySelector(
    ".plan_btns_box #plan_prize"
  );
  const plan_name = sessionStorage.getItem("plan_name");
  const plan_prize = sessionStorage.getItem("plan_prize");
  const plan_type = sessionStorage.getItem("plan_type");

  plan_name_element.innerText = `${plan_name} ${plan_type}`;
  plan_prize_element.innerText = plan_prize;
};

// function for displaying step2 on clicking change btn
change_btn.addEventListener("click", () => {
  document.querySelector(`.step${step_no}`).style.display = "none";
  step_no--;
  step_no--;
  document.querySelector(`.step${step_no}`).style.display = "block";
  active_circle();
  remove_selected_addOns();
});
steps.forEach((step) => {
  let next_btn = step.querySelector(`.next_btn`);
  let previous_btn = step.querySelector(`.previous_btn`);

  if (next_btn) {
    next_btn.addEventListener("click", () => {
      if (validForm() && step_no === 1) {
        display_Next_Step();
      } else if (step_no === 2) {
        display_Next_Step();
        Load_data_in_next_steps();
        store_SessionStorage();
      } else if (step_no === 3) {
        load_addOns();
        display_Next_Step();
        load_Selected_Plan();
        getTotalAmount();
      } else if (step_no === 4) {
        display_Next_Step();
      }
    });
  }

  if (previous_btn) {
    previous_btn.addEventListener("click", () => {
      if (step_no === 4) {
        remove_selected_addOns();
      }
      display_Previous_Step();
    });
  }
});
