window.onload = function() {
    
    const passwordOutput = document.querySelector(".page-output-container-password");           

    // Buttons -------------------------------------------------------------
    const generateButton = document.querySelector("#generate-button");
    const generateButtonSymbol = document.querySelector(".material-symbols-outlined");
    const copyButton = document.querySelector("#copy-button");
    const minusButton = document.querySelector("#minus-button");
    const plusButton = document.querySelector("#plus-button");

    const minValuePassword = 1;    
    const maxValuePassword = 50;     

    // Options -------------------------------------------------------------
    // slider
    const inputSlider = document.querySelector(".size-password-slider-field input");
    let valueInputSlider = inputSlider.value;
    // value showed for the size
    const numberShowed = document.querySelector(".size-password-description-value");

    inputSlider.oninput = (()=>{
        valueInputSlider = inputSlider.value;
        numberShowed.textContent = valueInputSlider;
    });
  
    // When clicking the minus button, the value and the slider change
    minusButton.onclick = () => {
        if (valueInputSlider > minValuePassword && valueInputSlider <= maxValuePassword) {
            let valueInputSliderNumber = Number(valueInputSlider);

            valueInputSliderNumber -= 1;
            valueInputSlider = (valueInputSliderNumber).toString();

            numberShowed.textContent = valueInputSlider;
            inputSlider.value = valueInputSlider;

            return valueInputSlider;
        }
    };

    // console.log("Valor do input slider antes do clique:", valueInputSlider);

    // When clicking the plus button, the value and the slider change
    plusButton.onclick = () => {
        if (valueInputSlider >= minValuePassword && valueInputSlider < maxValuePassword) {           
            let valueInputSliderNumber = Number(valueInputSlider);

            valueInputSliderNumber += 1;
            valueInputSlider = (valueInputSliderNumber).toString();

            numberShowed.textContent = valueInputSlider;
            inputSlider.value = valueInputSlider;

            return valueInputSlider;
        }
    };
  
    function generatePassword(length, uppercase, lowercase, numbers, special) {
        let valuePasswordOutput = '';
        let characters = '';
        const passwordLength = length;

        if(uppercase === true) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(lowercase === true) characters += 'abcdefghijklmnopqrstuvwxyz';
        if(numbers === true) characters += '0123456789';
        if(special === true) characters += '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

        for(let i = 0; i < passwordLength; i++) {
            valuePasswordOutput += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        console.log(characters);
        console.log(characters.length);
        console.log(valuePasswordOutput);
        console.log(passwordLength);

        return valuePasswordOutput;
    }

    // Click to generate the random
    const clickGeneratePassword = () => {        
        const uppercaseOption = document.querySelector("#checkbox-uppercase"); 
        const lowercaseOption = document.querySelector("#checkbox-lowercase"); 
        const numbersOption = document.querySelector("#checkbox-numbers"); 
        const specialOption = document.querySelector("#checkbox-special"); 
        let uppercaseOptionCheckbox = false;
        let lowercaseOptionCheckbox = false;
        let numbersOptionCheckbox = false;
        let specialOptionCheckbox = false;

        if(uppercaseOption.checked) uppercaseOptionCheckbox = true;
        if(lowercaseOption.checked) lowercaseOptionCheckbox = true;
        if(numbersOption.checked) numbersOptionCheckbox = true;
        if(specialOption.checked) specialOptionCheckbox = true;

        if(!(uppercaseOptionCheckbox) && !(lowercaseOptionCheckbox) && !(numbersOptionCheckbox) && !(specialOptionCheckbox)) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                text: "Please select at least one option.",
                showConfirmButton: false,
                timer: 1500,
                width: 250,
                customClass: {
                    htmlContainer: 'popup_message-text'                
                }
            });
            passwordOutput.value = '';
        } else {
            const newPassword = generatePassword(valueInputSlider, uppercaseOptionCheckbox, lowercaseOptionCheckbox, numbersOptionCheckbox, specialOptionCheckbox);
            passwordOutput.value = newPassword; 
        }        
    };   

    generateButton.onclick = clickGeneratePassword;
    generateButtonSymbol.onclick = clickGeneratePassword;

    
    function copyToClipboard(passwordToCopy) {
        if (passwordToCopy == '') {
            // Error message
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops...",
                text: "Nothing to copy.",
                showConfirmButton: false,
                timer: 1500,
                width: 250,
                customClass: {
                    title: 'popup_message-title',
                    htmlContainer: 'popup_message-text'                
                }
            });
        } else {      

            navigator.clipboard.writeText(passwordToCopy)
            .then(() => {
                // Success message
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Copied!",
                    showConfirmButton: false,
                    timer: 1500,
                    width: 200,
                    customClass: {
                        htmlContainer: 'popup_message-title'                
                    }
                });
                // console.log('Text copied:', passwordToCopy);
            })
            .catch(err => {
                // Error message
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to copy. Your browser may not support automatic copying.",
                    // footer: '<a href="#">Why do I have this issue?</a>'
                    customClass: {
                        title: 'popup_message-title',
                        htmlContainer: 'popup_message-text'                    
                    }
                });
                // console.error('Error:', err);
            });
        }
    }

    copyButton.onclick = () => {
        const passwordToCopy = passwordOutput.value;
        copyToClipboard(passwordToCopy);
    }

};