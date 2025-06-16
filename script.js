document.getElementById("investmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Show loading animation
  document.getElementById("loading").style.display = "block";
  document.getElementById("results").style.display = "none";

  // Simulate loading delay for better UX
  setTimeout(() => {
    const companyName = document.getElementById("companyName").value;
    const investmentPeriod = parseInt(document.getElementById("investmentPeriod").value);
    const initialStocks = parseInt(document.getElementById("initialStocks").value);
    const currentPrice = parseFloat(document.getElementById("currentPrice").value);
    const monthlySavings = parseFloat(document.getElementById("monthlySavings").value);
    const avgPurchasePrice = parseFloat(document.getElementById("avgPurchasePrice").value);
    const distributionAmount = parseFloat(document.getElementById("distributionAmount").value);
    const purchasePeriod = parseInt(document.getElementById("purchasePeriod").value);

    let number_of_stocks = initialStocks;
    const total_months = investmentPeriod * 12;
    let balance = 0;

    const initialInvestmentValue = initialStocks * currentPrice;
    const initialDistributionPeriod = initialStocks * distributionAmount;
    const initialDistributionMonth = initialDistributionPeriod / purchasePeriod;

    for (let month = 1; month <= total_months; month++) {
      balance += monthlySavings;
      if (month % purchasePeriod === 0) {
        balance += number_of_stocks * distributionAmount;
        const stocksToBuy = Math.floor(balance / avgPurchasePrice);
        number_of_stocks += stocksToBuy;
        balance -= stocksToBuy * avgPurchasePrice;
      }
    }

    const finalInvestmentValue = number_of_stocks * ((avgPurchasePrice + currentPrice) / 2);
    const additionalStocks = number_of_stocks - initialStocks;
    const investmentValueDiff = finalInvestmentValue - initialInvestmentValue;
    const finalDistributionPeriod = number_of_stocks * distributionAmount;
    const finalDistributionMonth = finalDistributionPeriod / purchasePeriod;
    const distributionDiffPeriod = finalDistributionPeriod - initialDistributionPeriod;
    const distributionDiffMonth = finalDistributionMonth - initialDistributionMonth;

    document.getElementById("results").innerHTML = `
      <div class="result-section">
        <h3><span class="icon">📋</span> ملخص الاستثمار</h3>
        <div class="result-grid">
          <div class="result-card">
            <div class="label">🏢 اسم الشركة</div>
            <div class="value">${companyName}</div>
          </div>
          <div class="result-card">
            <div class="label">⏰ مدة الاستثمار</div>
            <div class="value">${investmentPeriod} سنة</div>
          </div>
          <div class="result-card highlight">
            <div class="label">📊 عدد الأسهم النهائي</div>
            <div class="value">${number_of_stocks.toLocaleString()}</div>
          </div>
          <div class="result-card highlight">
            <div class="label">💰 القيمة الاستثمارية النهائية</div>
            <div class="value">${finalInvestmentValue.toLocaleString()} ريال</div>
          </div>
          <div class="result-card">
            <div class="label">🎁 توزيع الأرباح (${purchasePeriod} أشهر)</div>
            <div class="value">${finalDistributionPeriod.toLocaleString()} ريال</div>
          </div>
          <div class="result-card">
            <div class="label">📅 توزيع الأرباح الشهري</div>
            <div class="value">${finalDistributionMonth.toLocaleString()} ريال</div>
          </div>
          <div class="result-card">
            <div class="label">💳 الرصيد المتبقي</div>
            <div class="value">${balance.toLocaleString()} ريال</div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <h3><span class="icon">📈</span> النمو والزيادة</h3>
        <div class="result-grid">
          <div class="result-card highlight">
            <div class="label">➕ الأسهم المضافة</div>
            <div class="value">${additionalStocks.toLocaleString()}</div>
          </div>
          <div class="result-card highlight">
            <div class="label">📈 زيادة في القيمة</div>
            <div class="value">${investmentValueDiff.toLocaleString()} ريال</div>
          </div>
          <div class="result-card">
            <div class="label">🎁 زيادة التوزيع (${purchasePeriod} أشهر)</div>
            <div class="value">${distributionDiffPeriod.toLocaleString()} ريال</div>
          </div>
          <div class="result-card">
            <div class="label">📅 زيادة التوزيع الشهري</div>
            <div class="value">${distributionDiffMonth.toLocaleString()} ريال</div>
          </div>
        </div>
      </div>
    `;

    // Hide loading and show results
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";
  }, 1000);
});