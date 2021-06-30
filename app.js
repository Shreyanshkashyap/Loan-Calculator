// listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e) {
    // hide results
    document.getElementById('results').style.display = 'none';

    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,1500);

    e.preventDefault();
});

// calculate results

function calculateResults(e) {
    // UI variables
    const amount =  document.getElementById('amount'); 
    const intrest =  document.getElementById('intrest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalIntrest = document.getElementById('total-intrest');

    const principal = parseFloat(amount.value);
    const calculatedIntrest = parseFloat(intrest.value) / 100 / 12;
    const calculatedPayemnt = parseFloat(years.value) * 12;

    // compute monthly payement
    const x = Math.pow(1 + calculatedIntrest, calculatedPayemnt);
    const monthly = (principal * x * calculatedIntrest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayemnt).toFixed(2);
        totalIntrest.value = ((monthly * calculatedPayemnt)-principal).toFixed(2);
        console.log('hello');

        // show results
        document.getElementById('results').style.display = 'block';

        // hide loading
        document.getElementById('loading').style.display = 'none';
    }
    else {
        console.log('error');
        showError('Please check your numbers');
    }
}

function showError(error) {

    // hide results
    document.getElementById('results').style.display = 'none';

    // hide loading
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger'; 

    // append text node
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv,heading);

    // clear error after 3 seconds
    document.getElementById('loan-form').addEventListener('click',clearErrorOnClick);
    setTimeout(clearError,3000);
}

function clearErrorOnClick(e) {
    console.log('hi',e.target);
    if(e.target.className === 'form-control') {
        document.querySelector('.alert').remove();
    }
}

function clearError() {
    const alert = document.querySelector('.alert');
    if(alert) {
        alert.remove();
    }
}

