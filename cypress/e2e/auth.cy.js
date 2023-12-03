describe("Login", () => {

	it("[SUCCESS L-1] correct login", () => {
		cy.visit("/login", {
			failOnStatusCode: false,
		});
		cy.get('input[id="login-email"').type("d.acuna05@ufromail.cl")
		cy.get('input[id="login-password"').type("9JJna5cm")
		cy.get("button").click();
		cy.url().should('eq', 'http://pruebas-soft.s3-website.us-east-2.amazonaws.com/');
	});

	it("[Error L-2] invalid credentials", () => {
		cy.visit("/login", {
			failOnStatusCode: false,
		});
		cy.get('input[id="login-email"').type("correo@incorrecto.cl");
		cy.get('input[id="login-password"').type("correo");
		cy.get("button").click();

		cy.get(".text-negative").should("text", "invalid credentials");
	});

	
});

