describe("Club", () => {
	it("[SUCCESS C-1] club details", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.get('span[class="text-h3"]').contains(clubes[0].name);
			});
		});
	});

	it("[Error C-2] access to club without token", () => {
		cy.getClubsNotToken().then((body)=> {
			cy.visit("/", {
				failOnStatusCode: false,
			});
			cy.url().should('eq', 'http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login');
		})
	});
	
	it("SUCCESS C-3] Add member", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.getMembers(token, clubes[0]._id).then((membersBefore) => {
					let initialMembersCount = membersBefore.length;
					cy.get(`div[id=${clubes[0]._id}]`).click();
					cy.contains('button', 'New member').click();
					cy.get('input[aria-label="Member name*"]').type(`Nombre de prueba${initialMembersCount}`);
					cy.get('input[aria-label="Member lastName*"]').type(`Apellido de prueba${initialMembersCount}`);
					cy.get('input[aria-label="Member email*"]').type(`email${initialMembersCount}@prueba.cl`);
					cy.get('input[aria-label="Member DNI"]').type("209034832");
					cy.get('input[aria-label="Member Nickname"]').type(`Nickname de prueba${initialMembersCount}`);
					cy.contains('span', 'Add Member').click();
					cy.wait(2000);
					cy.getMembers(token, clubes[0]._id).then((membersAfter) => {
						const finalMembersCount = membersAfter.length;
						expect(finalMembersCount).to.eq(initialMembersCount + 1);
					});
				});
			
			});
		});
	});

	it("Error C-4] Try to add member without email", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.getMembers(token, clubes[0]._id).then((membersBefore) => {
					let initialMembersCount = membersBefore.length;
					cy.get(`div[id=${clubes[0]._id}]`).click();
					cy.contains('button', 'New member').click();
					cy.get('input[aria-label="Member name*"]').type(`Nombre de prueba${initialMembersCount}`);
					cy.get('input[aria-label="Member lastName*"]').type(`Apellido de prueba${initialMembersCount}`);
					cy.get('input[aria-label="Member DNI"]').type("209034832");
					cy.get('input[aria-label="Member Nickname"]').type(`Nickname de prueba${initialMembersCount}`);
					cy.contains('span', 'Add Member').click();
					cy.wait(2000);
					cy.getMembers(token, clubes[0]._id).then((membersAfter) => {
						const finalMembersCount = membersAfter.length;
						expect(finalMembersCount).to.eq(initialMembersCount);
					});
					cy.get("p.text-negative").should("text","email is required and must be a valid email");
				});
			
			});
		});
	});
	it("Error C-5] Delete a member", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.contains('i', 'delete_forever').click();
				cy.get('div').should('contain', 'Unavailable');
			});
		});
	});
	
});
