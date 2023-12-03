describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});

	it("[SUCCESS H-2] Redirect to / page when login is correct", () => {
		cy.login().then((token) => {
			cy.visit("/", {
				failOnStatusCode: false,
			});
			cy.contains('h2','Welcome DAIRA');
		});	
	});

	it("[SUCCESS H-3] Get clubs", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubs) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get('[class="q-icon notranslate material-icons"]');
			});
		});
	});
});
// it("[SUCCESS C-1] club details", () => {
// 	cy.login().then((token) => {
// 		cy.getClubs(token).then((clubes) => {
// 			cy.visit("/", {
// 				failOnStatusCode: false,
// 			});
// 			cy.get(`div[id=${clubes[0]._id}]`).click();
// 			cy.get('span[class="text-h3"]').contains(clubes[0].name);
// 		});
// 	});
// });