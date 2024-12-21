document.addEventListener("DOMContentLoaded", function () {
  const ft_list = document.getElementById("ft_list");
  const newTodoButton = document.getElementById("newTodo");
  const cookieName = "todoList";

  // Function to get cookies
  function getCookie(name) {
    const cookieString = document.cookie;
    if (!cookieString) {
      return null;
    }
    const cookies = cookieString.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }

  // Function to set cookies
  function setCookie(name, value, days) {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  }

  // Function to load tasks from cookie
  function loadTasksFromCookie() {
    const savedTasks = getCookie(cookieName);
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach((taskText) => {
        addTaskToList(taskText);
      });
    }
  }

  // Function to save tasks to cookie
  function saveTasksToCookie() {
    const tasks = Array.from(ft_list.children).map((div) => div.textContent);
    setCookie(cookieName, JSON.stringify(tasks), 30); // Save for 30 days
  }

  // Function to add a new task to the list
  function addTaskToList(taskText) {
    const newDiv = document.createElement("div");
    newDiv.textContent = taskText;
    newDiv.addEventListener("click", function () {
      if (confirm("Do you want to remove this TO DO?")) {
        ft_list.removeChild(newDiv);
        saveTasksToCookie();
      }
    });
    ft_list.prepend(newDiv);
  }

  // Event listener for the "New" button
  newTodoButton.addEventListener("click", function () {
    const task = prompt("Enter new to do:");
    if (task && task.trim() !== "") {
      addTaskToList(task.trim());
      saveTasksToCookie();
    }
  });

  // Load tasks on page load
  loadTasksFromCookie();

  // Save tasks before the page unloads (refresh or close)
  window.addEventListener("beforeunload", saveTasksToCookie);
});
