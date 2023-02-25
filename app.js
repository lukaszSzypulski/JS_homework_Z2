function validateVat() {
    const input = document.querySelector("input[name='vatNumber']");
    const vatNumber = input.value;
    const validateNumber = vatNumber.trim() !== "";

    if (validateNumber) {
        axios
            .get("https://api.vatcomply.com/vat", {
                params: {
                    vat_number: vatNumber
                }
            })
            .then(response => {
                const isValid = response.data.valid;

                if (isValid) {
                    input.classList.remove("is-invalid");
                    input.classList.add("is-valid");
                    const errorMessage = document.getElementById("number-input-message");
                    if (errorMessage) {
                        errorMessage.classList.add("d-none");
                    }
                    const vatMessage = document.getElementById("vat-message");
                    if (vatMessage) {
                        vatMessage.innerText = "Numer VAT jest poprawny";
                        vatMessage.classList.add("text-success");
                    }
                } else {
                    input.classList.add("is-invalid");
                    input.classList.remove("is-valid");
                    const errorMessage = document.getElementById("number-input-message");
                    if (errorMessage) {
                        errorMessage.innerText = "Numer VAT jest niepoprawny.";
                        errorMessage.classList.remove("d-none");
                        errorMessage.classList.add("text-danger");
                    }
                    const vatMessage = document.getElementById("vat-message");
                    if (vatMessage) {
                        vatMessage.innerText = "";
                        vatMessage.classList.remove("text-success");
                    }
                }
            })
            .catch(() => {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                const errorMessage = document.getElementById("number-input-message");
                if (errorMessage) {
                    errorMessage.innerText = "Wystąpił błąd podczas walidacji numeru VAT. Spróbuj ponownie później.";
                    errorMessage.classList.remove("d-none");
                    errorMessage.classList.add("text-danger");
                }
                const vatMessage = document.getElementById("vat-message");
                if (vatMessage) {
                    vatMessage.innerText = "";
                    vatMessage.classList.remove("text-success");
                }
            });
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        const errorMessage = document.getElementById("number-input-message");
        if (errorMessage) {
            errorMessage.innerText = "Numer VAT nie może być pusty.";
            errorMessage.classList.remove("d-none");
            errorMessage.classList.add("text-danger");
        }
        const vatMessage = document.getElementById("vat-message");
        if (vatMessage) {
            vatMessage.innerText = "";
            vatMessage.classList.remove("text-success");
        }
    }
}
