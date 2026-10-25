"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const typeRadios = document.querySelectorAll("input[name='field-type']");
    const optionsBlock = document.getElementById("options-block");
    const propertyBlock = document.getElementById("property-block");
    const optionSelect = document.getElementById("option");
    const propertyCheckbox = document.getElementById("property");
    const addButton = document.getElementById("add-button");
    const clearButton = document.getElementById("clear-button");
    const errorBlock = document.getElementById("error");
    const resultBlock = document.getElementById("result");
    const orderList = document.getElementById("order-list");
    const totalBlock = document.getElementById("total");
    const quantityPattern = /^[1-9][0-9]{0,5}$/;
    const typePrices = [50, 120, 300];
    const typeNames = ["Ручка", "Тетрадь", "Папка"];
    const optionNames = ["мягкая обложка", "твёрдая обложка", "кожаная обложка"];
    const order = [];
    let currentCost = 0;

    function getType() {
        const checked = document.querySelector("input[name='field-type']:checked");
        return parseInt(checked.value, 10);
    }

    function updateForm() {
        const type = getType();
        if (type === 2) {
            optionsBlock.style.display = "block";
        } else {
            optionsBlock.style.display = "none";
        }
        if (type === 3) {
            propertyBlock.style.display = "block";
        } else {
            propertyBlock.style.display = "none";
        }
    }

    function calculate() {
        const quantityText = quantityInput.value.trim();
        if (!quantityPattern.test(quantityText)) {
            currentCost = 0;
            resultBlock.textContent = "";
            errorBlock.textContent = "Ошибка: введите целое число от 1 до 999999, только цифры.";
            return;
        }
        const quantity = parseInt(quantityText, 10);
        const type = getType();
        let price = typePrices[type - 1];
        if (type === 2) {
            price = price + parseInt(optionSelect.value, 10);
        }
        if (type === 3 && propertyCheckbox.checked) {
            price = price + parseInt(propertyCheckbox.value, 10);
        }
        currentCost = price * quantity;
        errorBlock.textContent = "";
        resultBlock.textContent = "Стоимость позиции: " + currentCost + " руб.";
    }

    function renderOrder() {
        let total = 0;
        orderList.textContent = "";
        order.forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = item.text;
            orderList.appendChild(li);
            total = total + item.cost;
        });
        if (order.length === 0) {
            totalBlock.textContent = "Заказ пуст.";
        } else {
            totalBlock.textContent = "Итого по заказу: " + total + " руб.";
        }
    }

    function addItem() {
        calculate();
        if (currentCost === 0) {
            return;
        }
        const type = getType();
        let text = typeNames[type - 1];
        if (type === 2) {
            text = text + ", " + optionNames[optionSelect.selectedIndex];
        }
        if (type === 3 && propertyCheckbox.checked) {
            text = text + ", с файлами";
        }
        text = text + ": " + quantityInput.value.trim() + " шт. — " + currentCost + " руб.";
        order.push({text: text, cost: currentCost});
        renderOrder();
    }

    function clearOrder() {
        order.length = 0;
        renderOrder();
    }

    typeRadios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            updateForm();
            calculate();
        });
    });
    quantityInput.addEventListener("input", calculate);
    optionSelect.addEventListener("change", calculate);
    propertyCheckbox.addEventListener("change", calculate);
    addButton.addEventListener("click", addItem);
    clearButton.addEventListener("click", clearOrder);

    updateForm();
    calculate();
    renderOrder();
});
