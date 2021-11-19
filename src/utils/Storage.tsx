import CurrencyType from '../pages/landing/consts/CurrencyType';
import axios from 'axios';
import pkg from '../../package.json'

export interface Balance {
	[key: string]:number
}

export interface Rate {
	[key:string]:number
}

export interface ServerData {
	base:string,
	result:Rate,
	updated:string,
	ms:string
}

class Storage {
	readonly key:string = 'xcoin';
	balance:Balance = {};

	/**
	 * constructor
 	**/
	constructor() {
		const data = window.localStorage.getItem(this.key);
		if(data == null)
		{
			this.balance[CurrencyType.USD] = 200;
			this.balance[CurrencyType.EUR] = 150;
			this.balance[CurrencyType.GBP] = 10;
		}
		else
		{
			this.balance = JSON.parse(data);
		}
	}

	/**
	 * getBalance 
	 * get balance info with currency type
	 * 
	 * @param {string} currency_type	currency type to get balance
	 * 
	 * @return {number}
	**/
	getBalance(currency_type:string) {
		if(this.balance == null)
			return 0;
		if(!this.balance.hasOwnProperty(currency_type))
			return 0;
		return this.balance[currency_type];
	}

	/**
	 * save
	 * save current balance to local storage
	 * 
	 * @return {void}
	**/
	save():void {
		window.localStorage.setItem(this.key, JSON.stringify(this.balance));
	}

	/**
	 * control 
	 * control currency data
	 * 
	 * @param {string}	currency_type	currncy type to control
	 * @param {boolean}	is_plus			true: plus, false: minus 
	 * @param {number}	amount 			amount to control (larger than 0)
	 * 
	 * @return {void}
	**/
	control(currency_type:string, is_plus:boolean, amount:number) {
		if(this.balance == null)
			return;

		if(is_plus)
			this.balance[currency_type] += amount;
		else
			this.balance[currency_type] -= amount;
	}

	/**
	 * relodRateInfo 
	 * reloads rate info from rate api server
	 * 
	 * @param {string}	fromCurrency	base currency name
	 * @param {string}	toCurrency		target currency name
	 * 
	 * @return {number}
	 * 
 	**/
	reloadRateInfo(fromCurrency:string, toCurrency:string, callback:(rate:number) => void) {
		axios.get<ServerData>('https://api.fastforex.io/fetch-one', {
			params: { 
				api_key: pkg.apiKey,
				from: fromCurrency,
				to: toCurrency
			}
		}).then(response => {
			const rateInfo:Rate = response.data.result;
			let rate:number = 0;
			if(rateInfo !== undefined && rateInfo.hasOwnProperty(toCurrency))
				rate = rateInfo[toCurrency];
			callback(rate);
		});
	}
}

export default Storage;