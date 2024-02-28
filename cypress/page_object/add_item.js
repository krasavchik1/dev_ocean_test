export class addItemPage {
    constructor() {
      this.elements = {
        badgeCounter: () => cy.get('.v-badge__badge'),
        productName: () => cy.contains('.cardV__content__info-name', 'PRO CRAFT UNIVERSAL PSL2400'),
        addToCartButton: () => cy.contains('.card-container', 'PRO CRAFT UNIVERSAL PSL2400').find('button[title="Додати в кошик"]'),
        reg_msg: () => cy.get(".v-snackbar__content"),
        removeFromCartButton: () => cy.contains('.card-container', 'PRO CRAFT UNIVERSAL PSL2400').find('button[title="Видалити з кошика"]')
      };
    }
  
    hoverOverProductCard() {
      this.elements.productName().parents('.card-container').trigger('mouseover', { force: true });
      return this;
    }
  
    clickAddToCartButton() {
      this.elements.addToCartButton().click({ force: true });
      return this;
    }
  
    clickRemoveFromCartButton() {
        this.elements.removeFromCartButton().click({ force: true });
        return this;
      }
      
    verifyCartCounter(expectedCount) {
      this.elements.badgeCounter().should('contain', expectedCount.toString());
      return this;
    }
  
    verifyButtonColor(expectedColor) {
      this.elements.addToCartButton().should('have.css', 'color', expectedColor);
      return this;
    }
    checkAddItemMsg(text){
        this.elements.reg_msg().should('have.text', text)
        return this;
    }
  }
  