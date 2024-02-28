import { addItemPage } from "../page_object/add_item";
import { basePage } from "../page_object/base_page";
import { constants } from "../support/constants";


const add_item_page = new addItemPage();
const base_page = new basePage();

describe("adding item to cart", () => {
 

  before('', () => {
    base_page.open_url();
  });

  it('click "Add to cart" button', () => {
    add_item_page
      .hoverOverProductCard()
      .clickAddToCartButton()
      .verifyCartCounter(1)
      .verifyButtonColor("rgb(208, 45, 39)")
      .checkAddItemMsg(constants.SUCCESSFUL_ADD_ITEM_MSG)
  });

  it('Remove item from cart and verify button color', () => {
    add_item_page
      .clickRemoveFromCartButton()
      .verifyCartCounter(0)
      .verifyButtonColor("rgb(208, 45, 39)")
      .checkAddItemMsg(constants.SUCCESSFUL_DELETE_ITEM_MSG)
  });
  
});
