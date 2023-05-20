import { Component, OnInit } from '@angular/core';
import { CurrencyDataService } from 'src/app/services/currency-data.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  currjson:any =[];
  base ="UAH";
  cont2="USD";
  result:any = [];
  amount:any = [1];
  resultToFixed: any;
  
  changeBase(a:string){
    this.base = a;
    this.result = 0;
    this.convert();
  }

  toCountry(b:string){
    this.cont2 = b;
    this.convert();

    if(this.base = this.cont2 ){
      this.reverseCurrencies()
    }
  }
  
  amounts(c:string){
    this.amount = c;
    this.convert();
  }
  
  constructor(private currency:CurrencyDataService){}
  
  ngOnInit(): void {
    this.convert();
  }

  convert(){

    if (!this.amount) {
      this.result = 0;
      return;
    }
    
    this.currency.getCurrencyData(this.base).subscribe(data=>{
      this.currjson= JSON.stringify(data);
      this.currjson= JSON.parse(this.currjson);
      this.amount = JSON.parse(this.amount);
    
      if (this.cont2 ==="USD"){
        this.result = this.currjson.rates.USD * this.amount;
      }
      
      if (this.cont2 ==="EUR"){
        this.result = this.currjson.rates.EUR * this.amount;
      }
      
      if (this.cont2 ==="UAH"){
        this.result = this.currjson.rates.UAH * this.amount;
      }
      this.result=this.result.toFixed(3);
    })
  }

  reverseCurrencies() {
    const temp = this.base;
    this.base = this.cont2;
    this.cont2 = temp;
    this.convert();
  }

  convertBack() {
    if (this.cont2 ==="USD"){
      this.amount = this.result / this.currjson.rates.USD;
    }
    
    if (this.cont2 ==="EUR"){
      this.amount = this.result / this.currjson.rates.EUR;
    }
    
    if (this.cont2 ==="UAH"){
      this.amount = this.result / this.currjson.rates.UAH;
    }
    this.amount=this.amount.toFixed(3);
  }
}
