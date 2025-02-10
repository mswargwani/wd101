document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const userTableBody = document.querySelector("#userTable tbody");
  const dobInput = document.getElementById("dob");
  function setDateRange(){
      const today = new Date();

      const minAge = 18;
      const maxAge = 55;
      const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
      const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
      
      dobInput.setAttribute("max", maxDate.toISOString().split("T")[0]);
      dobInput.setAttribute("min", minDate.toISOString().split("T")[0]);
  }

  function validateDOB(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18 || age > 55) {
          alert("Date of Birth must be between ages 18 and 55.");
          return false;
      }
      return true;
  }

  function saveData(event) {
      event.preventDefault();

      const user = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          dob: dobInput.value,
          acceptTerms: document.getElementById("acceptTerms").checked
      };
      if (!user.acceptTerms) {
          alert("You must accept the terms and conditions.");
          return;
      }

      if (!validateDOB(user.dob)) {
          return;
      }
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      alert("User data saved successfully!");
      displayUserData();
      form.reset();
  }
  function displayUserData() {
      userTableBody.innerHTML = "";
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.password}</td>
              <td>${user.dob}</td>
              <td>${user.acceptTerms}</td>
          `;
          userTableBody.appendChild(row);
      });
  }
  setDateRange();
  displayUserData();
  form.addEventListener("submit", saveData);
});