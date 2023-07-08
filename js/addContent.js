var signInButton = function(callback1, callback2) {
	document.getElementById("submitSignIn").addEventListener("click", function() {
		console.log(document.getElementById("signInInput").value);
		if (document.getElementById("signInInput").value == "abc") {
			document.getElementById("wrongSignIn").innerHTML = "";
			document.getElementById("signInPage").innerHTML = "";
			$ajaxUtils
				.sendGetRequest("../Dannys-Dolls/snippets/editSnippet.html", true,
					function(request) {
						var editPageHtml = request.responseText;
						document.getElementById("body")
							.innerHTML = editPageHtml;
						callback1();
						callback2();
				});
		}
		else {
			document.getElementById("wrongSignIn").innerHTML = "You entered the wrong password. Try again.";
		}
	});
}

var submitNewDoll = function() {
	//make file adders show the name of the files
	document.getElementById("inputEditDollImage").addEventListener("input",() => {
		var imageInput = document.getElementById("inputEditDollImage").value;
		var imageInputName = imageInput.substr(12);
		document.getElementById("dollImageInputName").innerHTML = imageInputName;
	});
	document.getElementById("inputEditClothesImage").addEventListener("input",() => {
		var imageInput = document.getElementById("inputEditClothesImage").value;
		var imageInputName = imageInput.substr(12);
		document.getElementById("clothesImageInputName").innerHTML = imageInputName;
	});

	document.getElementById("editDollSubmit").addEventListener("click", function() {
		document.getElementById("submitDollError").innerHTML = "";
		var canSubmit = true;
		var moveButtonDown = 0;
		var categoryInput = document.getElementById("inputEditCategory").value;
		if (categoryInput == null || categoryInput == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered a category";
		}
		else if (categoryInput!="American Girl"&&categoryInput!="American Girl Mini"&&categoryInput!="Barbie"&&categoryInput!="Bratz"&&categoryInput!="Disney"&&categoryInput!="Ever After High"&&categoryInput!="LOL Surprise (entire franchise)"&&categoryInput!="McDonald's Toys"&&categoryInput!="Monster High"&&categoryInput!="Rainbow High"&&categoryInput!="Miscellaneous") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the category correctly";
		}
		if (document.getElementById("inputEditName").value == null || document.getElementById("inputEditName").value == ""){
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered a name";
		}
		if (document.getElementById("inputEditYear").value == null || document.getElementById("inputEditYear").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered a year";
		}
		if (document.getElementById("inputEditCondition").value == null || document.getElementById("inputEditCondition").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the condition";
		}
		if (document.getElementById("inputEditQuantity").value == null || document.getElementById("inputEditQuantity").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the quantity";
		}
		if (document.getElementById("inputEditManufacturer").value == null || document.getElementById("inputEditManufacturer").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the manufacturer";
		}
		// if (document.getElementById("inputEditDollImage").value == null || document.getElementById("inputEditDollImage").value == "") {
		// 	canSubmit = false;
		// 	moveButtonDown -= 17;
		// 	document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the image";
		// }
		if (document.getElementById("inputEditQuantity").value == 100) {
			canSubmit = true;
		}
		//if (canSubmit == true) {
		if (canSubmit==true) {
			moveButtonDown = 0;
			document.getElementById("submitDollError").style.setProperty('--submitDollError', moveButtonDown + "px");
			document.getElementById("editDollSubmit").style.setProperty('--editDollSubmit', moveButtonDown + "px");
			document.getElementById("addDoll").style.setProperty('--addDoll', moveButtonDown*(-1) + "px");
			document.getElementById("submitDollError").innerHTML = "";
			

			//if dolls is a repeat
			var correctRepeatInput;
			if (document.getElementById("inputEditQuantity").value == 100) {
				for (i in dataArrDolls) {
					if (dataArrDolls[i].name == document.getElementById("inputEditName").value) {
						correctRepeatInput = true;
						dataArrDolls[i].quantity += 1;
					}
				}
			}
			if (document.getElementById("inputEditQuantity").value == 100 && correctRepeatInput == false) {
				moveButtonDown -= 17;
				document.getElementById("submitDollError").innerHTML += "<br>The name that you entered is not in the data. Check that you copied the name of the doll EXACTLY as it appears on the id page";
			}
			var ids = new Array();
			for (i in dataArrDolls) {
				ids.push(dataArrDolls[i].id);
			}

			//if the doll is not a repeat
			
			if (correctRepeatInput == null) {
				var newId = 1;
				var newIdFound = false;
				while (!newIdFound) {
					if (ids.includes(newId)) {
						newId += 1;
					}
					else {
						newIdFound = true;
					}
				}

				var newCategory = document.getElementById("inputEditCategory").value;
				var newName = document.getElementById("inputEditName").value;
				var newYear = document.getElementById("inputEditYear").value;
				var newCondition = document.getElementById("inputEditCondition").value;
				var newQuantity = document.getElementById("inputEditCondition").value;
				var newManufacturer = document.getElementById("inputEditManufacturer").value;
				var newShortCategory;

				if (newCategory == "Barbie") {
					newShortCategory = "barbie";
				}
				else if (newCategory == "Bratz") {
					newShortCategory = "bratz";
				}
				else if (newCategory == "Ever After High") {
					newShortCategory = "eah";
				}
				else if (newCategory == "Monster High") {
					newShortCategory = "mh";
				}
				else if (newCategory == "American Girl") {
					newShortCategory = "ag";
				}
				else if (newCategory == "Rainbow High") {
					newShortCategory = "rh";
				}
				else if (newCategory == "LOL Surprise (entire franchise)") {
					newShortCategory = "lol";
				}
				else if (newCategory == "Miscellaneous") {
					newShortCategory = "misc";
				}
				else if (newCategory == "McDonald's Toys") {
					newShortCategory = "mac";
				}
				var newImage = document.getElementById("inputEditDollImage").value;
				console.log(newImage);

				var clothesData; 
				$ajaxUtils.sendGetRequest("../Dannys-Dolls/dolls.json", false, function(res) {
					clothesData = res.responseText;
				});
				var newDoll = {
			        "id": newId,
			        "categoryshort": newShortCategory,
			        "category": newCategory,
			        "name": newName,
			        "year": newYear,
			        "conditionpurchased": newCondition,
			        "quantity": newQuantity,
			        "manufacturer": newManufacturer
			    };
			    
			    clothesData = JSON.parse(clothesData);
			    console.log(clothesData.length);
			    clothesData.push(newDoll);
			    console.log(clothesData.length);
			    console.log(clothesData);
			    clothesData = clothesData.toString();


			    $ajaxUtils
				.post("../Dannys-Dolls/dolls.json", clothesData);

				$ajaxUtils.sendGetRequest("../Dannys-Dolls/dolls.json", false,
					function(request) {
						var newData = request.responseText;
						newData = JSON.parse(newData);
						console.log(newData);
					});

				//POST SEEMS LIKE IT'S DOING FINE. I'M VERY CONFUSED WHY THE PULL ISN'T SHOWING IT. I THINK IT HAS TO DO WITH TIMING.

				
				//figure out how to write to folder to save image and write to json file to save new doll
				//looks like i need nodejs. figure out what that is
				//HOW THE FUCK DO I SAVE IMAGESSSSS




				//document.getElementById("inputEditDollImage").value
			}
		}
		
		document.getElementById("submitDollError").style.setProperty('--submitDollError', moveButtonDown + "px");
		document.getElementById("editDollSubmit").style.setProperty('--editDollSubmit', moveButtonDown + "px");
		document.getElementById("addDoll").style.setProperty('--addDoll', moveButtonDown*(-1) + "px");
		});
}
var submitNewClothes = function() {}