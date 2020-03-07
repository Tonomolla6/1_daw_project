function product_validator_js() {
	var name_error = "";
	var sale_price_error = "";
	var purchase_price_error = "";
	var stock_error = "";
	var interruptor = false;
	console.log(document.form_create_product.provider.value);
	// Borra el validador de php para empezar con el de javascript.
	if(document.getElementById("error"))
		document.getElementById('error').innerHTML = "";
	if(document.getElementById("succes"))
		document.getElementById('succes').innerHTML = "";
	
	// Nombre
		// Valida si el nombre esta vacio
		name_error = isempty(document.form_create_product.name.value, name_error);
		if (name_error) {
			document.getElementById('e_name').style.display = "block";
			document.getElementById('e_name').innerHTML = name_error;
			document.getElementById('name').style.border = "1px solid red";
			document.form_create_product.name.focus();
			interruptor = true;
		} else {
			document.getElementById('name').style.borderColor = "#00BCD4";
			document.getElementById('e_name').style.display = "none";
			document.getElementById('e_name').innerHTML = "";
		}

	// Pecios
		purchase_price_error = isempty(document.form_create_product.purchase_price.value, purchase_price_error);
		if (!purchase_price_error)
			purchase_price_error = regexp_price(document.form_create_product.purchase_price.value, purchase_price_error);
		if (purchase_price_error) {
			document.getElementById('e_purchase_price').innerHTML = purchase_price_error;
			document.getElementById('e_purchase_price').style.display = "block";
			document.getElementById('purchase_price').style.border = "1px solid red";
			if (!interruptor)
				document.form_create_product.purchase_price.focus();
			interruptor = true;
		} else {
			document.getElementById('purchase_price').style.borderColor = "#00BCD4";
			document.getElementById('e_purchase_price').innerHTML = "";
			document.getElementById('e_purchase_price').style.display = "none";
		}

		sale_price_error = isempty(document.form_create_product.sale_price.value, sale_price_error);
		if (!sale_price_error)
			sale_price_error = regexp_price(document.form_create_product.sale_price.value, sale_price_error);
		if (!sale_price_error)
			sale_price_error = gain(document.form_create_product.sale_price.value, document.form_create_product.purchase_price.value, sale_price_error);
		if (sale_price_error) {
			document.getElementById('e_sale_price').innerHTML = sale_price_error;
			document.getElementById('e_sale_price').style.display = "block";
			document.getElementById('sale_price').style.border = "1px solid red";
			if (!interruptor)
				document.form_create_product.sale_price.focus();
			interruptor = true;
		} else {
			document.getElementById('sale_price').style.borderColor = "#00BCD4";
			document.getElementById('e_sale_price').innerHTML = "";
			document.getElementById('e_sale_price').style.display = "none";
		}

		//Stock
		stock_error = isempty(document.form_create_product.stock.value, stock_error);
		if (!stock_error)
			stock_error = numeric(document.form_create_product.stock.value, stock_error);
		if (stock_error) {
			document.getElementById('e_stock').innerHTML = stock_error;
			document.getElementById('e_stock').style.display = "block";
			document.getElementById('stock').style.border = "1px solid red";
			if (!interruptor)
				document.form_create_product.stock.focus();
			interruptor = true;
		} else {
			document.getElementById('stock').style.borderColor = "#00BCD4";
			document.getElementById('e_stock').innerHTML = "";
			document.getElementById('e_stock').style.display = "none";
		}

		if (interruptor) {
			return 0;
		}

	document.form_create_product.submit();
	document.form_create_product.action="index.php?page=controller_product";
}

function isempty(input, text) {
	var error;
	if (!input.length) {
		if (text != "") {
			error = text + "\n" + "* This field is required";
		} else {
			error = "* This field is required";
		}
	} else {
		error = text + "";
	}
	return error;
}

function regexp_price(input, text) {
	var error;
	var regexp = /^[0-9]+([.][0-9]+)?$/i;
	if (text) {
		if (regexp.test(input) == false) {
			error = text + "<br>" + "* It is not a valid price";
		} else {
			error = text + "";
		} 
	} else {
		if (regexp.test(input) == false) {
			error = text + "* It is not a valid price";
		} else {
			error = text + "";
		} 
	}
	return error;
}

function numeric(input, text) {
	var error;
	var regexp = /^\d+$/i;
	if (text) {
		if (!regexp.test(input)) {
			error = text + "<br>" + "* It is not numeric";
		} else {
			error = text + "";
		} 
	} else {
		if (!regexp.test(input)) {
			error = text + "* It is not numeric";
		} else {
			error = text + "";
		} 
	}
	return error;
}

function gain(sale_price, purchase_price, text) {
	var error;
	if (text) {
		if (parseFloat(sale_price) <= parseFloat(purchase_price)) {
			error = text + "<br>" + "* There is no gain in the product";
		} else {
			error = text + "";
		} 
	} else {
		if (parseFloat(sale_price) <= parseFloat(purchase_price)) {
			error = text + "* There is no gain in the product";
		} else {
			error = text + "";
		} 
	}
	return error;
}

