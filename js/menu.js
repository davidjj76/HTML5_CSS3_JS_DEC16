var navbarItems = document.getElementsByClassName("navbar-item");

for (var i = 0; i < navbarItems.length; i++) {
	navbarItems[i].addEventListener("click", function(event) {
		deleteAvctiveClass();

		if (Modernizr.classList) {
			this.classList.add('active');
		} else {
			this.className += " active";
		}

		var sectionToGo = this.getElementsByTagName("a")[0].href.split("#");
		if (sectionToGo.length > 1) {
			event.preventDefault();
			var goTo = sectionToGo[sectionToGo.length - 1];
			getElementByIdAndScroll(goTo);
		}
	});
}

function getElementByIdAndScroll(name) {
	var element;
	if (name == "") {
		element = document.getElementsByClassName("header")[0];
	} else {
		element = document.getElementById(name);
	}
	scrollToElement(element);
}

function scrollToElement(element) {
	var jump = parseInt(element.getBoundingClientRect().top * 0.3);
	document.body.scrollTop += jump;
	document.documentElement.scrollTop += jump;  // IE 9

	if (!element.lastJump || element.lastJump > Math.abs(jump)) {
		element.lastJump = Math.abs(jump);
		setTimeout(function() {
			scrollToElement(element);
		}, 60);
	} else {
		element.lastJump = null;
	}
}

function deleteAvctiveClass() {
	if (Modernizr.classList) {
		document.getElementsByClassName('navbar-item active')[0].classList.remove("active");
	} else {
		// Reemplazamos todas nuestras clases por lo que queremos (quitar active)
		document.getElementsByClassName('navbar-item active')[0].className = "navbar-item";
	}
}

var cumulativeOffset = function(element) {
	var top = 0;
	do {
		top += element.offsetTop || 0;
		element = element.offsetParent;
	} while(element)
	return top;
};

// Restamos a los offsets el alto de la barra de navegacion, ya que está posicionada fija 
var offsetQuienSoy = cumulativeOffset(document.getElementById("quien-soy")) - 59;
var offsetEquipo = cumulativeOffset(document.getElementById("equipo")) - 59;
var offsetTransporte = cumulativeOffset(document.getElementById("transporte")) - 59;

window.addEventListener("scroll", changeMenuStyle);

function changeMenuStyle(event) {
	if (window.pageYOffset >= 0 && window.pageYOffset < offsetQuienSoy) {
		deleteAvctiveClass();
		if (Modernizr.classList) {
			document.querySelector("a[href='#']").parentNode.classList.add("active");
		} else {
			document.querySelector("a[href='#']").parentNode.className += " active";
		}
	} else if (window.pageYOffset >= offsetQuienSoy && window.pageYOffset < offsetEquipo) {
		deleteAvctiveClass();
		if (Modernizr.classList) {
			document.querySelector("a[href$='quien-soy']").parentNode.classList.add("active");
		} else {
			document.querySelector("a[href$='quien-soy']").parentNode.className += " active";
		}
	} else if (window.pageYOffset >= offsetEquipo && window.pageYOffset < offsetTransporte) {
		deleteAvctiveClass();
		if (Modernizr.classList) {
			document.querySelector("a[href$='equipo']").parentNode.classList.add("active");
		} else {
			document.querySelector("a[href$='equipo']").parentNode.className += " active";
		}
	}

}