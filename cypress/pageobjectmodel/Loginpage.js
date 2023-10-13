class Loginpage{

    txtusername = "#user-name";
    txtpassword = '#password';
    txtsubmit = '#login-button';
    lblmsg = "span[class='title']";
    textitem = '.inventory_item';
    txtitemname = '.inventory_item_name';
    txtitemprice = '.inventory_item_price';
    cartbtn = 'a.shopping_cart_link';
    cartitem = '.cart_item';
    chkoutbtn= '[data-test="checkout"]';
   bxfirstname = '[data-test="firstName"]'; 
   lastname = '[data-test="lastName"]';
   postalcode = '[data-test="postalCode"]';
   continuebtn = '[data-test="continue"]';

//    chkoutbtn
//     cy.get(this.firstname).type('Harthick')
//     cy.get('[data-test="lastName"]').type('SM')
//     cy.get('[data-test="postalCode"]').type('560021')
//     cy.get('[data-test="continue"]').click();
    
    setUserName(username)
    {
       cy.get(this.txtusername).type(username)
       
    }
    setPassword(password)
    {
        cy.get(this.txtpassword).type(password);


    }
    clicksubmit()
    {
        cy.get(this.txtsubmit).click();
    }

    verifyLogin(expected)
    {
        cy.get(this.lblmsg).should('have.text',expected);
    }

    featchtheitemname_price()
    {
        const items = []; 
        cy.get(this.textitem).each(($itemElement) => {
            const name = $itemElement.find(this.txtitemname).text();
            const priceText = $itemElement.find(this.txtitemprice).text();
            const price = parseFloat(priceText.replace('$', ''));
      
            if (!isNaN(price)) { // Check if the price is a valid number
              items.push({ name, price });
              cy.log(`Item: ${name}, Price: $${price}`);
            }
          }); 
    }

Click_AddtoCart_button_ofthe_lowestpriceitem(lowestpriceitem) {
  cy.get(this.txtitemprice).then(($priceElements) => {
    let lowestPrice = Infinity;
    let lowestPriceIndex = -1;

    $priceElements.each((index, element) => {
      const priceText = Cypress.$(element).text();
      const price = parseFloat(priceText.replace('$', ''));
      if (!isNaN(price) && price < lowestPrice) {
        lowestPrice = price;
        lowestPriceIndex = index;
      }
    });

    if (lowestPriceIndex >= 0) {
      const lowestPriceElement = $priceElements.eq(lowestPriceIndex);
      cy.wrap(lowestPriceElement).click();
      cy.get('.inventory_item_name').eq(lowestPriceIndex).click();
      cy.contains('Add to cart').click();
      cy.get(this.cartbtn).click();
    }
  });
}

cnftheqtytotwo() {
  cy.get('.cart_quantity').then(($div) => {
    if (!$div.is(':disabled')) {
      const currentQuantity = $div.text();
      const newQuantity = parseInt(currentQuantity, 10) + 1;
      $div[0].textContent = newQuantity.toString();
    } else {
      cy.log('The element is disabled and cannot be changed.');
    }
  });
}

totalitemsshowing() {
  cy.get(this.cartbtn).click();
  cy.get(this.txtitemname).each(($itemElement) => {
    const itemName = $itemElement.text();
    cy.log(`Checking item: ${itemName}`);
    cy.get(this.cartitem).contains(itemName).should('exist');
  });

  cy.get(this.cartitem).each(($cartItem) => {
    const cartItemName = $cartItem.find('.inventory_item_name').text();
    cy.log(`Item in the cart: ${cartItemName}`);
  });

  cy.get(this.chkoutbtn).click();
}

checkverifythe_items(firstname, lastname, pincode) {
  cy.get(this.bxfirstname).type(firstname)
  cy.get(this.lastname).type(lastname)
  cy.get(this.postalcode).type(pincode)
  cy.get(this.continuebtn).click();

  cy.get(this.txtitemname).each(($itemElement) => {
    const itemName = $itemElement.text();
    cy.get(this.cartitem).contains(itemName).should('exist');
  });

  cy.get(this.cartitem).each(($cartItem) => {
    const cartItemName = $cartItem.find('.inventory_item_name').text();
    cy.log(`Item in the cart: ${cartItemName}`);
  });

  cy.get(this.txtitemname).each(($itemElement) => {
    const itemName = $itemElement.text();
    cy.get(this.cartitem).contains(itemName).should('exist');
  });

  cy.get(this.cartitem).each(($cartItem) => {
    const cartItemName = $cartItem.find('.inventory_item_name').text();
    cy.log(`Item in the cart: ${cartItemName}`);
  });

  let totalAmount = 0;
  cy.get(this.cartitem).each(($cartItem) => {
    const itemPriceText = $cartItem.find('.inventory_item_price').text();
    const itemPrice = parseFloat(itemPriceText.replace('$', ''));
    totalAmount += itemPrice;
  });

  cy.log(`Total Amount in the cart: $${totalAmount.toFixed(2)}`);

  cy.get('.summary_total_label').should('have.text', 'Total: $8.63');
  cy.get('.summary_subtotal_label').invoke('text').then((text) => {
    cy.log(`Actual text: ${text}`);
  });
}

ordertax() {
  cy.get('.summary_total_label').invoke('text').then((itemTotal) => {
    cy.get('.summary_total_label').invoke('text').then((itemTotal) => {
      cy.get('.summary_tax_label').invoke('text').then((actualTax) => {
        console.log(`Item Total Text: "${itemTotal}"`);
        console.log(`Actual Tax Text: "${actualTax}"`);
        itemTotal = parseFloat(itemTotal.replace(/[^\d.]/g, ''));
        actualTax = parseFloat(actualTax.replace(/[^\d.]/g, ''));

        if (!isNaN(actualTax) && !isNaN(itemTotal)) {
          const expectedMinTax = itemTotal * 0.05;
          const expectedMaxTax = itemTotal * 0.10;

          cy.log(`Item total: $${itemTotal}`);
          cy.log(`Tax: $${actualTax}`);
          cy.log(`Expected tax range: $${expectedMinTax} - $${expectedMaxTax}`);

          expect(actualTax).to.be.gte(expectedMinTax);
          expect(actualTax).to.be.lte(expectedMaxTax);
        } else {
          throw new Error("actualTax or itemTotal is not a valid number");
        }
      });
    });
  });
}
}

export default Loginpage;


