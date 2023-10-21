const VendorItem = {
    item_name:"Some Item",
    price: "$1.99",
    stauts: "Available",
}

const Vendor = {
    name: "Random Vendor",
    contact: ["vendor@somedomain.com","XXX-XXX-XXXX"],
    menu: [new VendorItem(), new VendorItem(), new VendorItem(), new VendorItem(), new VendorItem(),new VendorItem(), new VendorItem(), new VendorItem(), new VendorItem(), new VendorItem()],
    signup: ["Google","Apple"],
}

var vendor_list = [new Vendor(), new Vendor(), new Vendor(), new Vendor(),new Vendor(), new Vendor(), new Vendor(), new Vendor(),new Vendor(), new Vendor(), new Vendor(), new Vendor()];

export {Vendor,VendorItem,vendor_list};
