import { ApiService } from "./ApiService.js";
import { ChatUI } from "./ChatUI.js";

function getInputValue(id: string): string {
  return (document.getElementById(id) as HTMLInputElement)?.value || "";
}

function showMessage(id: string, message: string) {
  const element = document.getElementById(id);
  if (element){
    element.innerHTML = message;
  }
}

function setupEventListeners() {
  const regButton = document.getElementById("regButton");
  regButton?.addEventListener("click", async () => {
    const name = getInputValue("regName");
    const email = getInputValue("regEmail");
    const password = getInputValue("regPass");
    const groupId = getInputValue("regGroup");

    const result = await ApiService.registerUser(name, email, password, groupId);
    if (result.error) {
      console.error("Registration failed:", result.error);
      return;
    }
    console.log("Registration success, token:", ApiService.getToken(), "UserID:", ApiService.getRegisteredUserId());
  });

  const loginButton = document.getElementById("loginButton");
  loginButton?.addEventListener("click", async () => {
    const username = getInputValue("loginUser");
    const password = getInputValue("loginPass");

    const result = await ApiService.loginUser(username, password);
    if (result.error) {
      console.error("Login failed:", result.error);
      return;
    }
    console.log("Login success, token:", ApiService.getToken(), "UserID:", ApiService.getRegisteredUserId());
  });

  const loadUsersButton = document.getElementById("loadUsersBtn");
  loadUsersButton?.addEventListener("click", async () => {
    const users = await ApiService.getUsers();
    const listContainer = document.getElementById("usersList");

    if (Array.isArray(users) && listContainer) {
      listContainer.innerHTML = ""; // Clear previous entries
      users.forEach(user => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${user.id} Name: ${user.name} Group: ${user.group_id}`;
        listContainer.appendChild(listItem);
      });
    }
  });

  const sendButton = document.getElementById("sendButton");
  sendButton?.addEventListener("click", async () => {
    const sender = getInputValue("senderId");
    const receiver = getInputValue("receiverId");
    const message = getInputValue("messageText");

    const result = await ApiService.sendMessage(sender, receiver, message);
    console.log("Message sent?", result);

    if (result.success) {
      showMessage("sendResult", "<br>Message sent successfully!");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();

  /*
  const container = document.getElementById("chat-container");
  if (container) {
    const chatUI = new ChatUI();
    // Beispiel:
    // chatUI.renderConversation(container, { id: "1", name: "Me", group_id: "1" }, { id: "2", name: "Bob", group_id: "1" });
  }
  */
});
