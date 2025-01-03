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

    //Quando digirar o número do cartão, ele habilite os botões
    document.querySelector('#card-number').addEventListener('input', function () {
        var cardNumber = document.querySelector('#card-number').value;
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
