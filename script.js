document.addEventListener('DOMContentLoaded', function () {

    function openNewTabFromCardNumber() {
        var link = generateLink();
        if (link) {
            window.open(link, '_blank');
        } else {
            var x = document.getElementById("toasty");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);
        }
    }

    document.querySelector('#btn').addEventListener('click', function () {
        openNewTabFromCardNumber();
    });

    document.querySelector('#card-number').focus();

    document.querySelector('#prefix').addEventListener('change', function () {
        document.querySelector('#card-number').focus();
    });

    document.querySelector('#card-number').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            openNewTabFromCardNumber();
        }
    });
    // quando eu colar um número de cartão e ele começar com GATEWAY, SMTP OU POROTAJE ele deve selecionar o prefixo automaticamente
    document.querySelector('#card-number').addEventListener('paste', function (e) {
        var clipboardData = e.clipboardData || window.clipboardData;
        var pastedData = clipboardData.getData('Text');
        var prefix = document.querySelector('#prefix');
        if (pastedData.startsWith('GATEWAY')) {
            prefix.value = 'GATEWAY';
        } else if (pastedData.startsWith('SMPR')) {
            prefix.value = 'SMPR';
        } else if (pastedData.startsWith('POROTAJE')) {
            prefix.value = 'POROTAJE';
        }
    });
    //Quando digirar o número do cartão, ele habilite os botões
    document.querySelector('#card-number').addEventListener('input', function () {
        var cardNumber = document.querySelector('#card-number').value;
        if (cardNumber.startsWith('-')) {
            cardNumber = cardNumber.substring(1);
            document.querySelector('#card-number').value = cardNumber;
        }

        if (cardNumber.length > 0) {
            document.querySelector('#btn').removeAttribute('disabled');
            document.querySelector('#btn-copy').removeAttribute('disabled');
        } else {
            document.querySelector('#btn').setAttribute('disabled', 'disabled');
            document.querySelector('#btn-copy').setAttribute('disabled', 'disabled');
        }
    });

    function generateLink() {
        var cardNumber = document.querySelector('#card-number').value;
        if (cardNumber.length === 0) {
            return undefined;
        }
        var prefix = document.querySelector('#prefix').value;
        // se cardNumber começar com - remove
        if (cardNumber.startsWith('-')) {
            cardNumber = cardNumber.substring(1);
        }
        return 'https://mercadolibre.atlassian.net/browse/' + prefix + '-' + cardNumber;
    }

    document.querySelector('#btn-copy').addEventListener('click', function () {
        var link = generateLink();
        if (link) {

            if (navigator.clipboard) {
                navigator.clipboard.writeText(link).then(() => {
                    console.log('Copied to clipboard successfully.');
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);
                }, (err) => {
                    console.log('Failed to copy the text to clipboard.', err);
                });
            } else if (window.clipboardData) {
                window.clipboardData.setData("Text", input);
            }
        } else {
            var x = document.getElementById("toasty");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);
        }
    });
});
