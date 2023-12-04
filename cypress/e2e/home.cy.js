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
			cy.contains('h2', 'Welcome DAIRA');
		});
	});

	it("[SUCCESS H-3] Get clubs", () => {
		cy.login().then((token) => {
		  cy.getClubs(token).then((clubs) => {

			expect(clubs).to.not.be.empty;
	  
			cy.visit("/", {
			  failOnStatusCode: false,
			});
			// The number of clubs should be the same as the number of icons
			cy.get('.material-icons:contains("groups")').should('have.length', clubs.length);

		  });
		});
	  });
	  

	it("[SUCCESS H-4] Add club", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubsBefore) => {
				let initialClubCount = clubsBefore.length;

				cy.visit("/", {
					failOnStatusCode: false,
				});

				cy.get('.material-icons:contains("add")').click();
				cy.get('input[aria-label="Club name"]').type("Club de prueba");
				cy.get('input[aria-label="Club description"]').type("Descripcion de prueba");
				cy.contains('button', 'Add Club').click();
				// cy.get('button[span="Add Club"]').click(); // Asegúrate de cambiar esto al id correcto del botón de envío
				cy.wait(1000);
				cy.getClubs(token).then((clubsAfter) => {
					const finalClubCount = clubsAfter.length;

					expect(finalClubCount).to.eq(initialClubCount + 1);
				});
			});
			
		});
	});

	it("[ERROR H-5] Fail to add club for missing cub name", () => {
		cy.login().then((token) => {
			cy.visit("/", {
				failOnStatusCode: false,
			});

			cy.get('.material-icons:contains("add")').click();
			cy.get('input[aria-label="Club description"]').type("Descripcion de prueba");
			cy.contains('button', 'Add Club').click();
			// cy.get('button[span="Add Club"]').click(); // Asegúrate de cambiar esto al id correcto del botón de envío
			cy.contains('p', 'name is required').contains("name is required");

		});
	});


});

