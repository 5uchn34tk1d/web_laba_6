"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const productSelect = document.getElementById("product");
    const calcButton = document.getElementById("calc-button");
    const errorBlock = document.getElementById("error");
    const resultBlock = document.getElementById("result");
    const quantityPattern = /^[1-9][0-9]{0,5}$/;

    function calculate() {
        const quantityText = quantityInput.value.trim();
        if (!quantityPattern.test(quantityText)) {
            resultBlock.textContent = "";
            errorBlock.textContent = "Ошибка: введите целое число от 1 до 999999, только цифры.";
            return;
        }
        const quantity = parseInt(quantityText, 10);
        const price = parseInt(productSelect.value, 10);
        errorBlock.textContent = "";
        resultBlock.textContent = "Стоимость заказа: " + (price * quantity) + " руб.";
    }

    calcButton.addEventListener("click", calculate);
});
