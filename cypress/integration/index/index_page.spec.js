describe("Check index page links existense and integrity", function() {
  beforeEach(function() {
    // runs before each test in this block
    cy.visit("/");
  });

  function getNavLinks(i) {
    let link = menu[i];
    let navLink = link[0].toUpperCase() + link.slice(1, 0);

    return navLink;
  }

  const menu = ["bedrooms", "chests", "classic kitchens", "kitchens", "wardrobes", "kids", "closets", "handless kitchens", "bar counter", "commercial"];

  it("clicks menu links", function() {
    menu.forEach(function(l, i) {
      let navLink = getNavLinks(i);
      cy.contains(navLink).click({ force: true });
    });
  });

  it("checks footer links text", function() {
    const footer = ["About us", "Contacts", "Home"];

    footer.forEach(function(footerLink) {
      cy.get(".footer").should("contain", footerLink);
    });
  });

  it("checks number of card links on page", function() {
    cy.get(".container")
      .find(".card a")
      .should("have.length", 10);
  });

  it("checks card text", function() {
    const menu = ["bedrooms", "chests", "classic kitchens", "kitchens", "wardrobes", "kids", "closets", "handless kitchens", "bar counter", "commercial"];

    menu.forEach(function(item, i) {
      const title = getNavLinks(i);
      cy.get(".container").contains(title);
    });
  });
});
