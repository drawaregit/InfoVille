var API_DEP = "https://api.zippopotam.us/fr/";

var app = Vue.createApp({
	data() {
		return {
			affichVilles: true,
			reponseObjet: {},
			cp: '',
			listeCodePostal: [], // Stockera les détails de chaque code postal
		};
	},

	methods: {
		// Fonction pour appeler l'API
		async fetchAPI() {
			try {
				const response = await axios.get(API_DEP + this.cp);
				this.reponseObjet = response.data;
			} catch (error) {
				console.log("Erreur : " + error);
				this.reponseObjet = null;
			}
		},

		changePage() {
			this.affichVilles = !this.affichVilles;
		},

		// Fonction cherche() qui ajoute le code postal à la liste
		async cherche() {
			await this.fetchAPI();

			// Si la réponse API est valide, on extrait les informations et les ajoute à la liste
			if (this.reponseObjet && this.reponseObjet.places && this.reponseObjet.places.length > 0) {
				const placeInfo = this.reponseObjet.places[0];

				// Ajouter les informations du code postal dans la liste
				const villeInfo = {
					cp: this.cp,
					placename: placeInfo['place name'],
					region: placeInfo['state'],
					latitude: placeInfo['latitude'],
					longitude: placeInfo['longitude']
				};

				// On l'ajoute à la liste
				this.listeCodePostal.push(villeInfo);

				// Réinitialiser le champ de saisie
				this.cp = '';
			} else {
				console.log("Ce code postal n'existe pas!");
			}
		},

		// Supprime un code postal de la liste
		suprimer(index) {
			this.listeCodePostal.splice(index, 1);
		},
	}
});

app.mount('#app');
