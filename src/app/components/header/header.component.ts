import { Component } from '@angular/core';
import { CurrencyDataService } from 'src/app/services/currency-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currjson: any = [];

  curencyUSD = 'USD';
  currencyEUR = 'EUR';
  currencyUAH = 'UAH';

  uahToUSD = 0;
  uahToEUR = 0;

  constructor(private currency:CurrencyDataService){}

  ngOnInit() {
    this.getBaseRates();
  }

  getBaseRates() {
    this.currency
      .getCurrencyData(this.currencyUAH)
      .subscribe((data: any) => {
        const rates = data.rates;
        this.uahToUSD = rates[this.curencyUSD]
        this.uahToEUR = rates[this.currencyEUR]
      });
  }
}
