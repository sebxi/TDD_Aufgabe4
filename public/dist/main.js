var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiService } from "./ApiService.js";
function getInputValue(id) {
    var _a;
    return ((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value) || "";
}
function showMessage(id, message) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = message;
    }
}
function setupEventListeners() {
    const regButton = document.getElementById("regButton");
    regButton === null || regButton === void 0 ? void 0 : regButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const name = getInputValue("regName");
        const email = getInputValue("regEmail");
        const password = getInputValue("regPass");
        const groupId = getInputValue("regGroup");
        const result = yield ApiService.registerUser(name, email, password, groupId);
        if (result.error) {
            console.error("Registration failed:", result.error);
            return;
        }
        console.log("Registration success, token:", ApiService.getToken(), "UserID:", ApiService.getRegisteredUserId());
    }));
    const loginButton = document.getElementById("loginButton");
    loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const username = getInputValue("loginUser");
        const password = getInputValue("loginPass");
        const result = yield ApiService.loginUser(username, password);
        if (result.error) {
            console.error("Login failed:", result.error);
            return;
        }
        console.log("Login success, token:", ApiService.getToken(), "UserID:", ApiService.getRegisteredUserId());
    }));
    const loadUsersButton = document.getElementById("loadUsersBtn");
    loadUsersButton === null || loadUsersButton === void 0 ? void 0 : loadUsersButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const users = yield ApiService.getUsers();
        const listContainer = document.getElementById("usersList");
        if (Array.isArray(users) && listContainer) {
            listContainer.innerHTML = ""; // Clear previous entries
            users.forEach(user => {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${user.id} Name: ${user.name} Group: ${user.group_id}`;
                listContainer.appendChild(listItem);
            });
        }
    }));
    const sendButton = document.getElementById("sendButton");
    sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const sender = getInputValue("senderId");
        const receiver = getInputValue("receiverId");
        const message = getInputValue("messageText");
        const result = yield ApiService.sendMessage(sender, receiver, message);
        console.log("Message sent?", result);
        if (result.success) {
            showMessage("sendResult", "<br>Message sent successfully!");
        }
    }));
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
