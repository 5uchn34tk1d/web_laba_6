"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const typeRadios = document.querySelectorAll("input[name='field-type']");
    const productBlock = document.getElementById("product-block");
    const propertyBlock = document.getElementById("property-block");
    const productSelect = document.getElementById("product");
    const propertyCheckbox = document.getElementById("property");
    const addButton = document.getElementById("add-button");
    const calcButton = document.getElementById("calc-button");
    const clearButton = document.getElementById("clear-button");
    const errorBlock = document.getElementById("error");
    const priceBlock = document.getElementById("price");
    const orderBox = document.getElementById("order-box");
    const orderBody = document.getElementById("order-body");
    const resultBlock = document.getElementById("result");
    const quantityPattern = /^[1-9][0-9]{0,5}$/;
    const productNames = ["Тетрадь", "Папка", "Ежедневник", "Маркер"];
    const order = [];
    let currentName = "";
    let currentQuantity = 0;
    let currentCost = 0;

    function getType() {
        const checked = document.querySelector("input[name='field-type']:checked");
        return parseInt(checked.value, 10);
    }

    function updateForm() {
        const type = getType();
        if (type === 2) {
            productBlock.style.display = "block";
        } else {
            productBlock.style.display = "none";
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
            priceBlock.textContent = "";
            errorBlock.textContent = "Ошибка: введите целое число от 1 до 999999, только цифры.";
            return;
        }
        const quantity = parseInt(quantityText, 10);
        const type = getType();
        let price = 0;
        if (type === 1) {
            price = 30;
            currentName = "Карандаш";
        }
        if (type === 2) {
            price = parseInt(productSelect.value, 10);
            currentName = productNames[productSelect.selectedIndex];
        }
        if (type === 3) {
            price = 50;
            currentName = "Ручка";
            if (propertyCheckbox.checked) {
                price = price + parseInt(propertyCheckbox.value, 10);
                currentName = "Ручка с гравировкой";
            }
        }
        currentQuantity = quantity;
        currentCost = price * quantity;
        errorBlock.textContent = "";
        priceBlock.textContent = "Стоимость позиции: " + currentCost + " руб.";
    }

    function addCell(row, text) {
        const cell = document.createElement("td");
        cell.textContent = text;
        row.appendChild(cell);
    }

    function renderOrder() {
        let total = 0;
        orderBody.textContent = "";
        order.forEach(function (item) {
            const row = document.createElement("tr");
            addCell(row, item.name);
            addCell(row, item.quantity);
            addCell(row, item.cost + " руб.");
            orderBody.appendChild(row);
            total = total + item.cost;
        });
        if (order.length === 0) {
            orderBox.hidden = true;
            resultBlock.textContent = "Заказ пуст.";
        } else {
            orderBox.hidden = false;
            resultBlock.textContent = "Стоимость заказа: " + total + " руб.";
        }
    }

    function addItem() {
        calculate();
        if (currentCost === 0) {
            return;
        }
        order.push({name: currentName, quantity: currentQuantity, cost: currentCost});
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
    productSelect.addEventListener("change", calculate);
    propertyCheckbox.addEventListener("change", calculate);
    addButton.addEventListener("click", addItem);
    calcButton.addEventListener("click", renderOrder);
    clearButton.addEventListener("click", clearOrder);

    updateForm();
    calculate();
    renderOrder();
});
