const VendorItem = {
    item_name:"Some Item",
    price: "$1.99",
    stauts: "Available",
};
const Vendor = {
    name: "Random Vendor",
    contact: ["vendor@somedomain.com","XXX-XXX-XXXX"],
    menu: [VendorItem,VendorItem,VendorItem,VendorItem,VendorItem,VendorItem,VendorItem,VendorItem],
    signup: ["Google","Apple"],
};

var vendor_list = [Vendor, Vendor, Vendor,Vendor,Vendor, Vendor, Vendor, Vendor,Vendor, Vendor, Vendor, Vendor];

var email_info = null;

export {VendorItem,Vendor,vendor_list,email_info};