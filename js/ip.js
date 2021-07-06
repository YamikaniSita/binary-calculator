"use strict"
/*
@category  Javascript
@package   ICT Calculator
@author    Yamikani Sita <sitayamikani@gmail.com>
@copyright 2020 Yamikani Sita)
**/
function IpAddress(ipAddr, cidrValue){
	this.ipAddr=ipAddr;
	this.cidrValue=cidrValue;
}
IpAddress.prototype.getClass = function() {
	var classDeterminer=this.splitAddress()[0];
	if(classDeterminer<=127){
		return 'A';
	}
	else if(classDeterminer<=191){
		return 'B';
	}
	else if(classDeterminer<=223){
		return 'C';
	}
	else if(classDeterminer<=239){
		return 'D'
	}
	else{
		return 'E';
	}
}
IpAddress.prototype.splitAddress = function(){
	/**
		Splits IP address into groups, each group into element of array
	**/
	var arr = [];
	var addr=this.ipAddr;
	var hold="";
	for(var x=0; x<addr.length; x++){
		if(addr[x]!=='.'){
			hold=hold+addr[x];
		}
		else{
			arr.push(hold);
			hold="";
		}
	}
	return arr;
}
IpAddress.prototype.isValid = function(){
	var ip=this.splitAddress();
	if(ip.length===4){
		if(parseInt(ip[0])<=255){
			if(parseInt(ip[1])<=255){
				if(parseInt(ip[2])<=255){
					if(parseInt(ip[3])<=255){
						return true;
					}
				}
			}
		}
	}
}
IpAddress.prototype.inBinary = function(){
	var addr=this.splitAddress();
	var hold="";
	for(var b=0; b<addr.length; b++){
		hold=hold+" "+padZeros(convertArrToStr(startValueFromEnd(convertToBinary(addr[b]))));
	}
	return hold;
}
IpAddress.prototype.getSubnetMask = function(){
	/**
	The subnet mask is based on two things the class and the CIDR(classless inter domain routing)
	Value, if the CIDR value is available the Mask is based on it if not it 
	is based on the class
	The CIDR if its not available must be zero
	**/
	if(this.cidrValue===0){
		//based on class
		if(this.getClass()==='A'){
			return '255.0.0.0.';
		}
		else if(this.getClass()==='B'){
			return '255.255.0.0.'
		}
		else if(this.getClass()==='C'){
			return '255.255.255.0.'
		}
		else if(this.getClass()==='D' || this.getClass()==='E'){
			return 'The concept of subnet mask does not apply to this class';
		}
	}
	else{
		/**CIDR is more than 0 that means that the mask will be based on the CIDR**/
		var arr = [];
		var hold = "";
		var cidr=this.cidrValue;
		for(var x=0; x<32; x++){
			if(x<cidr){
				hold=hold+"1";
			}
			else{
				hold=hold+"0";
			}
		}
		var v=this.splitIntoOctets(hold);
		var t=convertToDecimal('binary', v[0])+'.'+convertToDecimal('binary', v[1])+'.'+convertToDecimal('binary', v[2])+'.'+convertToDecimal('binary', v[3]);
		return t;
	}
}
IpAddress.prototype.splitIntoOctets = function(val){
	/**Splits contagious string of bits into groups of 8 returns array**/
	//implementation is old school but extremely faster 
	var r=[];
	if(val.length==32){
		var firstOctet=val[0]+val[1]+val[2]+val[3]+val[4]+val[5]+val[6]+val[7];
		var secondOctet=val[8]+val[9]+val[10]+val[11]+val[12]+val[13]+val[14]+val[15];
		var thirdOctet=val[16]+val[17]+val[18]+val[19]+val[20]+val[21]+val[22]+val[23];
		var fourthOctet=val[24]+val[25]+val[26]+val[27]+val[28]+val[29]+val[30]+val[31];
		r.push(firstOctet);
		r.push(secondOctet);
		r.push(thirdOctet);
		r.push(fourthOctet);
	}
	return r;
}
IpAddress.prototype.ipBinaryToDecimal = function(arr){
	/**Pass array please**/
	var c="";

	for(var h=0; h<arr.length; h++){
		c=c+convertToDecimal('binary', arr[h])+"."
	}
	return c;
}
var getIpValue=function(ip){
	var p='';
	if(getCidrValue(ip)!=false){
		for(var x=0; x<ip.length; x++){
			if(ip[x]=='/')p=x;
		}
		var h='';
		for(var i=0; i<p; i++){
			h+=ip[i];
		}
		return h;
	}
	return ip;
}
var getCidrValue=function(ip){
	var p='';
	for(var x=0; x<ip.length; x++){
		if(ip[x]=='/')p=x;
	}
	if(p==''){
		return false;
	}
	var h='';
	for(var i=p+1; i<ip.length; i++){
		h+=ip[i];
	}
	return h;
}
var removeDots=function(str){
	var h='';
	for(var x=0; x<str.length; x++){
		if(str[x]!='.'){
			h+=str[x];
		}
	}
	return h;
}
