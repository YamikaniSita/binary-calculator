/**
	Copyright 2020 Yamikani Steven Sita (sitayamikani@gmail.com)
	ICT Department, Mzuzu University 
**/
"use strict"
const convertToDecimal = (base, num) =>{
	var sum=0;
	if( base === 'binary'){
		var valueToConvert=startValueFromEnd(num);
		for(var c=0; c<valueToConvert.length; c++){
			var con=parseInt(valueToConvert[c])*Math.pow(2, c); ;
			sum+=con;
		}
		return sum;
	}
	if(base === 'octal'){
		var valueToConvert=startValueFromEnd(num);
		for(var c=0; c<valueToConvert.length; c++){
			var con=parseInt(valueToConvert[c])*Math.pow(8, c);
			sum+=con;
		}
		return sum;
	}
	if(base === 'hex'){
		var valueToConvert=startValueFromEnd(num);
		for(var c=0; c<valueToConvert.length; c++){
			var decValue=realHex(valueToConvert[c]);
			var con=decValue*Math.pow(16, c); ;
			sum+=con;
		}
		return sum;
	}
}
const startValueFromEnd = num => {
	/**
		makes string start from the end
		this is important when converting to decimal from other bases since index
		count starts from end to beginning
	**/
	var palindrome=[];
	for(var x=num.length-1; x>=0; x--){
		palindrome.push(num[x]);
		}
	return palindrome;
}
const realHex = v =>{
	/**gets value of HEX value**/
	switch(v){
		case '0':
			return 0;
			break;
		case '1':
			return 1;
			break;
		case '2':
			return 2;
			break;
		case '3':
			return 3;
			break;
		case '4':
			return 4;
			break;
		case '5':
			return 5;
			break;
		case '6':
			return 6;
			break;
		case '7':
			return 7;
			break;
		case '8':
			return 8;
			break;
		case '9':
			return 9;
			break;
		case 'A':
			return 10;
			break;
		case 'B':
			return 11;
			break;
		case 'C':
			return 12;
			break;
		case 'D':
			return 13;
			break;
		case 'E':
			return 14;
			break;
		case 'F':
			return 15;
			break;
	}
}
const convertToBinary = val => {
	var x=parseInt(val);
	var t=[];
	if(x==0){
		t.push(x);
	}
	while(x!==0){
		t.push(x%2);
		x=Math.floor(x/2);
	}
	return t;
}
const convertToOctal = val => {
	var x=parseInt(val);
	var t=[];
	if(x==0){
		t.push(x);
	}
	while(x!==0){
		t.push(x%8);
		x=Math.floor(x/8);
	}
	return t;
}
const convertToHex = val => {
	var x=parseInt(val);
	var t=[];
	if(x==0){
		t.push(x);
	}
	while(x!==0){
		var dec=x%16;
		if(dec<10){
			t.push(dec);
		}
		else{
			t.push(hexValue(dec));
		}
		x=Math.floor(x/16);
	}
	return t;
}
const convertArrToStr = arr =>{
	var hold="";
	for(var x=0; x<arr.length; x++){
		var v=arr[x];
		hold=hold+v;
	}
	return hold;
}
const hexValue = val =>{
	switch(val){
		case 10:
			return 'A';
			break;
		case 11:
			return 'B';
			break;
		case 12: 
			return 'C';
			break;
		case 13:
			return 'D';
			break;
		case 14:
			return 'E';
			break;
		case 15: 
			return 'F';
			break;
	}
}
const padZeros = val =>{
	/**Pads zeros to bits to make a byte
	bits must be in string not array form before this
	and must already start from the end after convertion...This is because padded zeros are 
	to the left of the byte**/
	var h="";
	var howMany=8-val.length;
	for(var x=0; x<howMany; x++){
		h=h+"0"
	}
	return h+val;
}