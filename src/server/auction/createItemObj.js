const VendorModel = require("../vendor/vendor.model");
("use strict");
const categories = [
  "Jewel",
  "Painting",
  "Artifacts",
  "Sclpture",
  "Memorabilia",
];
const categoriesBasePrice = [3000, 4000, 6000, 9000, 8000];

module.exports = class CreateItemObj {
  constructor(itemName, vendorID, category, itemBasePrice) {
    this.itemName = itemName;
    this.vendorID = vendorID;
    this.category = category;
    this.itemBasePrice = itemBasePrice;
    this.serviceCharges = 0;
  }

  verify = async () => {
    let result = true;
    let _vendorObj = new Vendor();
    let _categoryObj = new Category();
    let _itemBasePrice = new ItemBasePrice();
    let _vendor = await _vendorObj.verify(this.vendorID);
    let _category = await _categoryObj.verify(this.category);
    this.categoryIndex = await _categoryObj.getCategoryIndex();
    _itemBasePrice = await _itemBasePrice.verify(
      this.itemBasePrice,
      this.categoryIndex
    );
    if (!_vendor) {
      result = "Vendor not verified";
    }
    if (!_category) {
      result = "Category not available";
    }
    if (!_itemBasePrice) {
      result = "Category base price is less than expected";
    }
    return result;
  };

  calServiceCharge = () => {
    if (this.category == "Jewel") this.serviceCharges = JewelServiceCharge();
    if (this.category == "Painting")
      this.serviceCharges = PaintingServiceCharge();
    if ((this.category = "Artifacts"))
      this.serviceCharges = ArtifactsServiceCharge();
    if (this.category == "Sclpture")
      this.serviceCharges = SclptureServiceCharge();
    if (this.category == "Memorabilia")
      this.serviceCharges = MemorabiliaServiceCharge();
  };

  AddServiceCharge = () => {
    this.totalPrice = this.itemBasePrice + this.serviceCharges;
  };

  createObject = () => {
    return {
      itemName: this.itemName,
      itemCategory: this.category,
      itemBasePrice: this.itemBasePrice,
      servicePrice: this.serviceCharges,
      totalPrice: this.totalPrice,
      vendorId: this.vendorID,
    };
  };
};

class Vendor {
  verify = async (vendorID) => {
    try {
      let vendordetails = await VendorModel.get(vendorID);
      if (vendordetails) return true;
      else return false;
    } catch (err) {
      return false;
    }
  };
}

class Category {
  verify = async (category) => {
    if (categories.indexOf(category) > -1) {
      this.categoryIndex = categories.indexOf(category);
      return true;
    } else {
      return false;
    }
  };
  getCategoryIndex = async () => {
    return this.categoryIndex;
  };
}

class ItemBasePrice {
  verify = async (itemBasePrice, categoryIndex) => {
    if (itemBasePrice < categoriesBasePrice[categoryIndex]) return false;
    else return true;
  };
}

function JewelServiceCharge() {
  return 200;
}
function PaintingServiceCharge() {
  return 300;
}
function ArtifactsServiceCharge() {
  return 400;
}
function SclptureServiceCharge() {
  return 500;
}
function MemorabiliaServiceCharge() {
  return 600;
}
