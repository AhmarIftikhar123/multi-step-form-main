// DOM Elements
const steps = document.querySelectorAll(".step"),
  form_Inputs = document.querySelectorAll(".input_box input"),
  bonus_plan = document.querySelectorAll(".plan_txt small"),
  scroller = document.querySelector("#scroller .switch"),
  plan_btns = document.querySelectorAll(".plan_btn"),
  Change_btn = document.querySelector(
    ".plan_btns_box .plan_purchased_box h2 a"
  ),
  Servies_finalization_box = document.querySelector(".Servies_finalization");

// Variables
let step_no = 1;

let getTotal = () => {
  let sum = 0;
  let total_bill_opt = document.querySelector(".total_bill");
  let plan_prize_element = document.getElementById("plan_prize");

  let plan_prize = parseInt(plan_prize_element.textContent.match(/\d+/g));

  let all_add_ons_prizes = Servies_finalization_box.querySelectorAll(
    ".servie_prize"
  );

  if (all_add_ons_prizes.length < 4) {
    for (let i = 0; i < all_add_ons_prizes.length; i++) {
      let value = parseInt(all_add_ons_prizes[i].textContent.match(/\d+/g));
      sum += value;
    }
    let final_prize = eval(`${plan_prize} + ${sum}`);
    if (!scroller.previousElementSibling.checked) {
      total_bill_opt.textContent = `+$${final_prize}/mo`;
    } else {
      total_bill_opt.textContent = `+$${final_prize}/yr`;
    }
  }
};

// Event listener for change button
Change_btn.addEventListener("click", () => {
  document.querySelector(`.step${step_no}`).style.display = "none";
  step_no--;
  show_previous_step();
  remove_selected_plan();
  store_Plan_data();
});

// Function to show the previous step
let show_previous_step = () => {
  document.querySelector(`.step${step_no}`).style.display = "none";
  step_no--;
  active_step_circle(step_no);
  document.querySelector(`.step${step_no}`).style.display = "block";
};

// Function to remove selected plan
let remove_selected_plan = () => {
  Servies_finalization_box.style.display = "grid";
  const childrenArray = Array.from(Servies_finalization_box.children);

  childrenArray.slice(0).forEach((child) => {
    Servies_finalization_box.removeChild(child);
  });
};

// Function to display the next step
let display_next_step = () => {
  document.querySelector(`.step${step_no}`).style.display = "none";
  step_no++;
  active_step_circle(step_no);
  document.querySelector(`.step${step_no}`).style.display = "block";
};

// Function to add selected add-ons
let adding_selected_addOns = (add_one_name, add_one_charge) => {
  let div = document.createElement("div");
  let p = document.createElement("p");
  let span = document.createElement("span");

  div.classList.add("service_selected_box", "flex_x_center");
  p.classList.add("service_n", "cool_gray_txt");
  span.classList.add("servie_prize", "purplish_blue_txt", "medium_font");
  p.textContent = add_one_name;
  span.textContent = add_one_charge;

  div.appendChild(p);
  div.appendChild(span);
  document.querySelector(".Servies_finalization").appendChild(div);
};

// Function to pick add-ons
let pick_addOns = () => {
  const add_ons_input = document.querySelectorAll(".plan_btns_box input");
  add_ons_input.forEach((addOn) => {
    if (addOn.checked) {
      let add_one_name = addOn.parentElement.querySelector("h3 span")
        .textContent;
      let add_one_charge = addOn.parentElement.querySelector(".service_chg")
        .textContent;

      adding_selected_addOns(add_one_name, add_one_charge);
    }
  });
};

// Function to store selected plan data
let store_Plan_data = () => {
  const customer_Selection = document.querySelector(
    ".plan_btns_box .plan_purchased_box h2 span"
  );
  const customer_Selection_prize = document.querySelector(
    ".plan_btns_box .plan_purchased_box b"
  );
  let add_chargs = document.querySelectorAll(".add_ons_txt .service_chg");

  let total_customer_bill_name = document.querySelector(
    ".service_selected_box  .total_customer_bill_name"
  );
  if (!scroller.previousElementSibling.checked) {
    total_customer_bill_name.textContent = "Total " + "  " + "(per Month)";

    let active_btn = document.querySelector(".plan_btns_box .active");
    let plan_name = active_btn.querySelector("b").textContent;
    let plan_prize = active_btn.querySelector("p").textContent;

    customer_Selection.textContent = plan_name + " (Monthly)";
    customer_Selection_prize.textContent = plan_prize;

    let month_addOns = ["+1$/mo", "+2$/mo", "+2$/mo"];
    for (let i = 0; i < add_chargs.length; i++) {
      add_chargs[i].textContent = month_addOns[i];
    }
  } else {
    total_customer_bill_name.textContent = "Total " + "  " + "(per Year)";

    let active_btn = document.querySelector(".plan_btns_box .active");
    let plan_name = active_btn.querySelector("b").textContent;
    let plan_prize = active_btn.querySelector("p").textContent;

    customer_Selection.textContent = plan_name + " (Yearly)";
    customer_Selection_prize.textContent = plan_prize;

    let year_addOns = ["+10$/yr", "+20$/yr", "+20$/yr"];
    for (let i = 0; i < add_chargs.length; i++) {
      add_chargs[i].textContent = year_addOns[i];
    }
  }
};

// Event listener for scroller
scroller.addEventListener("click", () => {
  if (!scroller.previousElementSibling.checked) {
    let year_prizes = ["$90/yr", "$120/yr", "$150/yr"];
    let service_chg = document.querySelectorAll(".plan_txt p");

    for (let i = 0; i < service_chg.length; i++) {
      service_chg[i].textContent = year_prizes[i];
    }

    bonus_plan.forEach((plan) => {
      plan.style.visibility = "visible";
    });
    scroller.parentElement.nextElementSibling.classList.add("active");
    scroller.parentElement.previousElementSibling.classList.remove("active");
  } else {
    let month_prizes = ["$9/mo", "$12/mo", "$15/mo"];
    let service_chg = document.querySelectorAll(".plan_txt p");

    for (let i = 0; i < service_chg.length; i++) {
      service_chg[i].textContent = month_prizes[i];
    }

    scroller.parentElement.nextElementSibling.classList.remove("active");
    scroller.parentElement.previousElementSibling.classList.add("active");

    bonus_plan.forEach((plan) => {
      plan.style.visibility = "hidden";
    });
  }
});

// Event listener for plan buttons
plan_btns.forEach((plan_selected) => {
  plan_selected.addEventListener("click", (e) => {
    plan_btns.forEach((remove_active_state) => {
      remove_active_state.classList.remove("active");
    });
    e.target.classList.toggle("active");
  });
});

// Event listeners and functions for input validation
form_Inputs.forEach((input) => {
  input.addEventListener("blur", (e) => {
    e.target.classList.replace("error", "blur");
  });
});

// Function to activate step circle
let active_step_circle = (active_circle) => {
  if (active_circle >= 5) {
    return;
  } else {
    let circle = document
      .querySelectorAll(".step_box .circle")
      .forEach((circle) => {
        circle.classList.remove("active");
        document
          .querySelector(`.circle${active_circle}`)
          .classList.add("active");
      });
  }
};

// Function to validate user information
let validUser_Info = () => {
  const nameInput = document.querySelector("#name"),
    emailInput = document.querySelector("#email"),
    phoneNumInput = document.querySelector("#phone_num");

  let valid_Username_regex = /^[a-zA-Z+_\-]+\s[a-zA-Z]+$/;
  let valid_Email_regex = /^[a-zA-Z0-9._%+-]+\@[a-z]{3,5}\.com$/;
  let valid_Number_regex = /^[0-9]{10,}$/;

  let name_error_element = nameInput.parentElement.querySelector(".error");
  let email_error_element = emailInput.parentElement.querySelector(".error");
  let phoneNumber_error_element = phoneNumInput.parentElement.querySelector(
    ".error"
  );

  // Validation for User_name
  if (nameInput.value === "") {
    nameInput.classList.add("error");
    name_error_element.style.visibility = "visible";
    name_error_element.textContent = "This field is required";
    return false;
  } else if (!nameInput.value.match(valid_Username_regex)) {
    nameInput.classList.add("error");
    name_error_element.style.visibility = "visible";
    name_error_element.textContent = "Valid Name Required";
    return false;
  } else {
    name_error_element.style.visibility = "hidden";
  }

  // Validation for Email
  if (emailInput.value === "") {
    emailInput.classList.add("error");
    email_error_element.style.visibility = "visible";
    email_error_element.textContent = "This field is required";
    return false;
  } else if (!emailInput.value.match(valid_Email_regex)) {
    emailInput.classList.add("error");
    email_error_element.style.visibility = "visible";
    email_error_element.textContent = "Valid Email Required";
    return false;
  } else {
    email_error_element.style.visibility = "hidden";
  }

  // Validation for Phone Number
  if (phoneNumInput.value === "") {
    phoneNumInput.classList.add("error");
    phoneNumber_error_element.style.visibility = "visible";
    phoneNumber_error_element.textContent = "This field is required";
    return false;
  } else if (!phoneNumInput.value.match(valid_Number_regex)) {
    phoneNumInput.classList.add("error");
    phoneNumber_error_element.style.visibility = "visible";
    phoneNumber_error_element.textContent = "Valid Phone-Number Required";
    return false;
  } else {
    phoneNumber_error_element.style.visibility = "hidden";
  }

  if (
    nameInput.value.match(valid_Username_regex) &&
    emailInput.value.match(valid_Email_regex) &&
    phoneNumInput.value.match(valid_Number_regex)
  ) {
    return true;
  }
};

// Event listeners for steps and navigation
steps.forEach((step) => {
  let next_btn = step.querySelector(".next_btn");
  let previous_btn = step.querySelector(".previous_btn");

  if (next_btn) {
    next_btn.addEventListener("click", () => {
      if (validUser_Info() && step_no === 1) {
        display_next_step();
      } else if (step_no === 2) {
        store_Plan_data();
        display_next_step();
      } else if (step_no === 3) {
        pick_addOns();
        getTotal();
        Servies_finalization_box.style.display = "grid";
        display_next_step();
      } else if (step_no === 4) {
        display_next_step();
      } else {
        // Handle additional cases if needed
      }
    });
  }

  if (previous_btn) {
    previous_btn.addEventListener("click", () => {
      if (step_no === 1) {
        return;
      } else if (step_no === 4) {
        remove_selected_plan();
        show_previous_step();
      } else {
        show_previous_step();
      }
    });
  }
});
