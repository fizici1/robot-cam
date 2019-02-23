document.getElementById('home').className= 'active';

var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");

setInterval(function() {
	var date = new Date();
	document.getElementById('date').innerHTML = "Nous sommes le " + jours[date.getDay()] + " " + date.getDate() + " " + mois[date.getMonth()] + " " + date.getFullYear() + ". Il est " + date.getHours() + "h et " + date.getMinutes() +"min.";
	}, 1000)
