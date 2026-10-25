"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const typeRadios = document.querySelectorAll("input[name='field-type']");
    const optionsBlock = document.getElementById("options-block");
    const propertyBlock = document.getElementById("property-block");
    const optionSelect = document.getElementById("option");
    const propertyCheckbox = document.getElementById("property");
    const errorBlock = document.getElementById("error");
    const resultBlock = document.getElementById("result");
    const quantityPattern = /^[1-9][0-9]{0,5}$/;
    const typePrices = [50, 120, 300];

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
        errorBlock.textContent = "";
        resultBlock.textContent = "Стоимость заказа: " + (price * quantity) + " руб.";
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

    updateForm();
    calculate();
});
