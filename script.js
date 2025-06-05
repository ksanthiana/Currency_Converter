async function convertCurrency() {
  const from = document.getElementById("from").value.toUpperCase();
  const to = document.getElementById("to").value.toUpperCase();
  const amount = parseFloat(document.getElementById("amount").value);
  const resultDiv = document.getElementById("result");

  if (!from || !to || isNaN(amount)) {
    resultDiv.innerText = "Please enter valid data.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();

    if (!data.rates[to]) {
      resultDiv.innerText = "Invalid currency code.";
      return;
    }

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDiv.innerText = "Error fetching exchange rates.";
    console.error(error);
  }
}
