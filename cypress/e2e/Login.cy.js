import Login from "../pageobjectmodel/Loginpage.js";
describe('Select Lowest Price Item and Add to Cart', () => {
  let ln; // Declare the 'ln' variable at the suite level to make it accessible to all test cases.
//  -- let mn; // Declare the 'mn' variable for the 'Single' instance.
  let data; // Declare the 'data' variable for fixture data.

  before(() => {
    // Perform setup code, like logging in, only once for the entire test suite.
    cy.fixture('configdts').then((fixtureData) => {
      data = fixtureData;
      ln = new Login();
      // mn = new Single(); // Create an instance of the 'Single' class
      cy.visit(data.url);
      ln.setUserName(data.username);
      ln.setPassword(data.password);
      ln.clicksubmit();
      ln.verifyLogin(data.expected);
    });
  });

  it('Confirm the lowest price in the storet', () => {
    // Test case 1: Access the 'ln' instance to perform test actions.
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
