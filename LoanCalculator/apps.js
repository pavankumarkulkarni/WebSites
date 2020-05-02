document.getElementById('loan-form').addEventListener('submit', calculateLoan);

function calculateLoan(e) {
  e.preventDefault();
  document.getElementById('resultGrid').style.display = 'none';
  document.getElementById('loadGif').style.display = 'block';
  setTimeout(displayResults, 2000);
}

function displayResults() {

  document.getElementById('loadGif').style.display = 'none';
  loanAmountEL = document.getElementById('lAmt');
  iRateEL = document.getElementById('annIntRate');
  loanYearEL = document.getElementById('loanYears');

  //Calculation formula and vars
  const n = loanYearEL.value * 12 // Number of months loan to be repaid
  const r = iRateEL.value / 100 / 12 // Monthly interest factor
  const p = loanAmountEL.value // loan principal
  if (p === '' || p < 0) {
    displayError('Loan Amount should be +ve number !!');
    return;
  }

  if (r === '' || r <= 0) {
    displayError('Annual Interest Rate should to be +ve number !!');
    return;
  }

  if (n === '' || n <= 0) {
    displayError('Loan repayment years should to be +ve number !!');
    return;
  }

  const monthlyPayment = ((r * p) / (1 - Math.pow(1 + r, -n))).toFixed(2);
  const totalPayment = (monthlyPayment * n).toFixed(2);
  const interestPayment = (totalPayment - p).toFixed(2);
  if (isFinite(monthlyPayment)) {
    document.getElementById('resultGrid').style.display = 'block';
    document.getElementById('monthlyPayment').value = monthlyPayment;
    document.getElementById('totalPayment').value = totalPayment;
    document.getElementById('interestPayment').value = interestPayment;
  } else {
    displayError('Error in calculating results. Please check inputs !!');
  }

}

function displayError(error) {
  errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.setAttribute('id', 'errorDiv');
  errorDiv.setAttribute('role', 'alert');
  errorDiv.appendChild(document.createTextNode(error));
  document.getElementById('loan-form').appendChild(errorDiv);
  setTimeout(dismissError, 5000);
}

function dismissError(e) {
  document.getElementById('errorDiv').remove();
}