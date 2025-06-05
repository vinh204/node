const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");


// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    };

    if(req.query.status){
        find.status = req.query.status;
    }

    const objectSearch = searchHelper(req.query);

    if(objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // Pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper(
        {
        currentPage: 1,
        limitItems: 4
        },
        req.query,
        countProducts
    );
    // End Pagination

    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);


    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus ,
        keyword: objectSearch.keyword,
        pagination: objectPagination  
    });

    
};

// [PATCH] /admin/products/change-status/:status/123

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, { status: status});
    
    const backUrl = req.get('Referer') || '/default-page';
    res.redirect(backUrl);
};

module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    
    switch (type) {
        case "active":
            await Product.updateMany({_id: { $in:  ids} }, { status: "active"});
            break;
        case "inactive":
            await Product.updateMany({_id: { $in:  ids} }, { status: "inactive"});
            break;  
        default:
            break;  
    }
    const backUrl = req.get('Referer') || '/default-page';
    res.redirect(backUrl);
};

// [DELETE] /admin/products/delete/:id

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.deleteOne({_id: id});
    
    const backUrl = req.get('Referer') || '/default-page';
    res.redirect(backUrl);
};
