import Login from "../../pageobjectmodel/Loginpage.js";
describe('Select Lowest Price Item and Add to Cart', () => {
  let ln; // Declare the 'ln' variable at the suite level to make it accessible to all test cases.
  let data; // Declare the 'data' variable for fixture data.

  before(() => {
    // Perform setup code, like logging in, only once for the entire test suite.
    cy.fixture('configdts').then((fixtureData) => {
      data = fixtureData;
      ln = new Login();
      cy.visit(data.url);
      ln.setUserName(data.username);
      ln.setPassword(data.password);
      ln.clicksubmit();
      ln.verifyLogin(data.expected);
    });
  });

  it('Confirmthe lowest price in the storet', () => {
    
    ln.featchtheitemname_price();
    // Test the item product view: 
    ln.Click_AddtoCart_button_ofthe_lowestpriceitem(data.lowestpriceitem);
    ln.cnftheqtytotwo();
    ln.checkverifythe_items(data.firstname, data.lastname, data.pincode);
  });

  it('Ensure the order items total is showing correctly based on products added to the cart.  ', () => {
    totalitemsshowing();
 });

  it('Test the checkout process: ', () => {
   cy.fixture('configdts').then((fixtureData) => {
      data = fixtureData;
      ln.checkverifythe_items(data.firstname, data.lastname, data.pincode);
         });
     });

  it('. Ensure the order tax: ', () => {
        ordertax();
      });

  after(() => {
    // This code will run once after all tests in the suite.
    cy.wait(5000); // Wait for an element or event to load.
    cy.log("completed!!");
  });
});
