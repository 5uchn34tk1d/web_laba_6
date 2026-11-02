"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const typeInputs = document.querySelectorAll("input[name='field-type']");
    const optionBox = document.getElementById("option-box");
    const optionSelect = document.getElementById("option");
    const propertyBox = document.getElementById("property-box");
    const propertyCheckbox = document.getElementById("property");
    const addButton = document.getElementById("add-button");
    const clearButton = document.getElementById("clear-button");
    const errorBlock = document.getElementById("error");
    const resultBlock = document.getElementById("result");
    const orderBox = document.getElementById("order-box");
    const orderBody = document.getElementById("order-body");
    const orderTotal = document.getElementById("order-total");
    const quantityPattern = /^[1-9][0-9]{0,5}$/;
    let total = 0;

    function getType() {
        return document.querySelector("input[name='field-type']:checked");
    }

    function updateBlocks() {
        const typeId = getType().id;
        optionBox.hidden = typeId !== "type-notebook";
        propertyBox.hidden = typeId !== "type-folder";
    }

    function getUnitPrice() {
        const type = getType();
        let price = parseInt(type.value, 10);
        if (type.id === "type-notebook") {
            price += parseInt(optionSelect.value, 10);
        }
        if (type.id === "type-folder" && propertyCheckbox.checked) {
            price += parseInt(propertyCheckbox.value, 10);
        }
        return price;
    }

    function calculate() {
        const quantityText = quantityInput.value.trim();
        if (!quantityPattern.test(quantityText)) {
            resultBlock.textContent = "";
            errorBlock.textContent = "Ошибка: введите целое число от 1 до 999999, только цифры.";
            return 0;
        }
        const cost = getUnitPrice() * parseInt(quantityText, 10);
        errorBlock.textContent = "";
        resultBlock.textContent = "Стоимость товара: " + cost + " руб.";
        return cost;
    }

    function addToOrder() {
        const cost = calculate();
        if (cost === 0) {
            return;
        }
        const type = getType();
        let name = type.dataset.name;
        if (type.id === "type-notebook") {
            name += ", " + optionSelect.options[optionSelect.selectedIndex].dataset.name;
        }
        if (type.id === "type-folder" && propertyCheckbox.checked) {
            name += ", " + propertyCheckbox.dataset.name;
        }
        const row = orderBody.insertRow();
        row.insertCell().textContent = name;
        row.insertCell().textContent = quantityInput.value.trim();
        row.insertCell().textContent = cost + " руб.";
        total += cost;
        orderTotal.textContent = total + " руб.";
        orderBox.hidden = false;
    }

    function clearOrder() {
        orderBody.textContent = "";
        total = 0;
        orderTotal.textContent = "";
        orderBox.hidden = true;
    }

    quantityInput.addEventListener("input", calculate);
    typeInputs.forEach(function (input) {
        input.addEventListener("change", function () {
            updateBlocks();
            calculate();
        });
    });
    optionSelect.addEventListener("change", calculate);
    propertyCheckbox.addEventListener("change", calculate);
    addButton.addEventListener("click", addToOrder);
    clearButton.addEventListener("click", clearOrder);
    updateBlocks();
});
