
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Sakrij rezultate
  document.getElementById('results').style.display = 'none';

  // Dohvati loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Izracunaj
function calculateResults(){
  console.log('Calculating...');

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Mjesecna zarada
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Prikazi rezultate
    document.getElementById('results').style.display = 'block';

    // Sakrij loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }
}

// Prikazi gresku
function showError(error){
//Sakrij rezultate
  document.getElementById('results').style.display = 'none';

  // Sakrij loader
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');

  // Dohvati elemente
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');


  errorDiv.className = 'alert alert-danger';


  errorDiv.appendChild(document.createTextNode(error));

  // Greska iznad headinga
  card.insertBefore(errorDiv, heading);

  // Obrisi gresku
  setTimeout(clearError, 3000);
}


function clearError(){
  document.querySelector('.alert').remove();
}
